import { NextResponse } from 'next/server';
import { createTransport } from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from '@/services/supabaseClient';

const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, companyName, companyActivity, email, requestType, description, customReason, country, phone, userId } = body;
    const isOther = String(requestType ?? '').toUpperCase() === 'OTRO';

    // Validaciones: nombre, email, teléfono y descripción son obligatorios.
    if (!firstName || !email || !description || !phone) {
      return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
    }

    const token = uuidv4();
    const createdAt = new Date().toISOString();

    const { error: pendingError } = await supabase.from('support_requests').insert([
      {
        token,
        first_name: firstName ?? null,
        last_name: lastName ?? null,
        company_name: companyName ?? null,
        company_activity: companyActivity ?? null,
        phone_number: phone ?? null,
        email,
        request_type: isOther ? null : requestType,
        custom_reason: isOther ? customReason : null,
        description,
        user_id: userId ?? null,
        status: 'pending',
        created_at: createdAt,
      },
    ]);

    // Manejo específico: si la tabla tiene una constraint NOT NULL en request_type
    // (p. ej. código Postgres 23502), reintentamos insertando 'OTRO' en request_type
    // en lugar de NULL. Preferible: ejecutar una migración para permitir NULL en
    // request_type. SQL sugerido:
    // ALTER TABLE support_requests ALTER COLUMN request_type DROP NOT NULL;
    if (pendingError) {
      console.error('Error guardando la solicitud pendiente:', pendingError);

      const pgCode = (pendingError as any)?.code || (pendingError as any)?.details || '';
      const isNotNullViolation = String(pgCode).includes('23502') || String(pendingError.message || '').includes('null value in column "request_type"');

      if (isNotNullViolation) {
        // Reintentar insertando request_type = 'OTRO' para evitar la violación
        const { error: retryError } = await supabase.from('support_requests').insert([
          {
            token,
            first_name: firstName ?? null,
            last_name: lastName ?? null,
            company_name: companyName ?? null,
            company_activity: companyActivity ?? null,
            phone_number: phone ?? null,
            email,
            request_type: isOther ? 'OTRO' : requestType,
            custom_reason: isOther ? customReason : null,
            description,
            user_id: userId ?? null,
            status: 'pending',
            created_at: createdAt,
          },
        ]);

        if (retryError) {
          console.error('Reintento falló guardando la solicitud pendiente:', retryError);
          return NextResponse.json({ error: retryError.message || 'Error guardando la solicitud pendiente.' }, { status: 500 });
        }
      } else {
        return NextResponse.json({ error: pendingError.message || 'Error guardando la solicitud pendiente.' }, { status: 500 });
      }
    }

    const confirmUrl = `${BASE_URL}/api/support-request/confirm?token=${token}`;
    try {
      console.log('Enviando correos...');
      
      // Correo para el usuario
      await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Confirma tu solicitud de soporte',
        html: `<p>Hola ${firstName},</p>
          <p>Haz clic en el siguiente enlace para confirmar tu solicitud de soporte:</p>
          <a href="${confirmUrl}">${confirmUrl}</a>
          <p>Si no solicitaste esto, ignora este correo.</p>`,
      });

      // Correo para la empresa (Notificación inmediata)
      await transporter.sendMail({
        from: `"${firstName} via Untitled" <${process.env.SMTP_USER}>`,
        replyTo: email,
        to: 'untitledtechcompany@gmail.com',
        subject: `🚨 Nueva solicitud de: ${firstName} (${requestType})`,
        html: `
          <h1>Nueva solicitud de contacto (Pendiente de confirmación)</h1>
          <p><strong>Nombre:</strong> ${firstName}</p>
          <p><strong>Empresa:</strong> ${companyName ?? 'N/A'}</p>
          <p><strong>Actividad:</strong> ${companyActivity ?? 'N/A'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Tipo:</strong> ${requestType === 'Otro' ? customReason : requestType}</p>
          <p><strong>Descripción:</strong></p>
          <p>${description}</p>
          <p><em>Nota: El usuario aún debe confirmar su correo.</em></p>
        `,
      });

      return NextResponse.json({ message: 'Correo de confirmación enviado.' });
    } catch (error: any) {
      console.error('Error enviando el correo:', error);
      return NextResponse.json({ error: error?.message || 'Error enviando el correo.' }, { status: 500 });
    }
  } catch (err: any) {
    console.error('Error en handler support-request:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}
