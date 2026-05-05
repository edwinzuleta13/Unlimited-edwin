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

    const fullDescription = `Empresa: ${companyName ?? 'N/A'}\nActividad: ${companyActivity ?? 'N/A'}\n\n${description}`;

    console.log(`[API] Iniciando solicitud de soporte para: ${email}`);
    const { error: pendingError } = await supabase.from('support_requests').insert([
      {
        token,
        first_name: firstName ?? null,
        last_name: lastName ?? null,
        phone_number: phone ?? null,
        email,
        request_type: isOther ? null : requestType,
        custom_reason: isOther ? customReason : null,
        description: fullDescription,
        user_id: userId ?? null,
        status: 'pending',
        created_at: createdAt,
      },
    ]);

    if (pendingError) {
      console.error('[API] Error al insertar en DB (intento 1):', pendingError);

      const pgCode = (pendingError as any)?.code || (pendingError as any)?.details || '';
      const isNotNullViolation = String(pgCode).includes('23502') || String(pendingError.message || '').includes('null value in column "request_type"');

      if (isNotNullViolation) {
        console.log('[API] Reintentando inserción con request_type="OTRO"...');
        const { error: retryError } = await supabase.from('support_requests').insert([
          {
            token,
            first_name: firstName ?? null,
            last_name: lastName ?? null,
            phone_number: phone ?? null,
            email,
            request_type: isOther ? 'OTRO' : requestType,
            custom_reason: isOther ? customReason : null,
            description: fullDescription,
            user_id: userId ?? null,
            status: 'pending',
            created_at: createdAt,
          },
        ]);

        if (retryError) {
          console.error('[API] Error crítico al insertar en DB:', retryError);
          return NextResponse.json({ error: retryError.message || 'Error guardando la solicitud.' }, { status: 500 });
        }
      } else {
        return NextResponse.json({ error: pendingError.message || 'Error guardando la solicitud.' }, { status: 500 });
      }
    }

    console.log('[API] Registro insertado en DB con éxito. Token:', token);

    const confirmUrl = `${BASE_URL}/api/support-request/confirm?token=${token}`;
    try {
      console.log('[API] Intentando enviar correos...');
      
      // Correo para el usuario
      console.log(`[API] Enviando correo de confirmación a: ${email}`);
      await transporter.sendMail({
        from: `"${firstName} via Untitled" <${process.env.SMTP_USER}>`,
        to: email,
        subject: 'Confirma tu solicitud de soporte',
        html: `<p>Hola ${firstName},</p>
          <p>Haz clic en el siguiente enlace para confirmar tu solicitud de soporte:</p>
          <a href="${confirmUrl}">${confirmUrl}</a>
          <p>Si no solicitaste esto, ignora este correo.</p>`,
      }).then(() => console.log(`[API] Correo de confirmación enviado a: ${email}`))
        .catch(e => console.error(`[API] Error enviando correo al usuario (${email}):`, e.message));

      console.log('[API] Enviando notificación a UTC (untitledtechcompany@gmail.com)');
      await transporter.sendMail({
        from: `"${firstName} via Untitled" <${process.env.SMTP_USER}>`,
        replyTo: email,
        to: 'untitledtechcompany@gmail.com',
        subject: `🚨 Nueva solicitud de: ${firstName} (${requestType})`,
        html: `
          <h1>Nueva solicitud de contacto</h1>
          <p><strong>Nombre:</strong> ${firstName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>Tipo:</strong> ${requestType === 'Otro' ? customReason : requestType}</p>
          <p><strong>Descripción:</strong></p>
          <p>${fullDescription}</p>
        `,
      }).then(() => console.log('[API] Notificación enviada a UTC con éxito'))
        .catch(e => console.error('[API] Error enviando correo a la empresa:', e.message));

      return NextResponse.json({ message: 'Solicitud recibida correctamente.' });
    } catch (error: any) {
      console.error('[API] Error inesperado en el proceso de correo:', error);
      return NextResponse.json({ message: 'Solicitud recibida correctamente.' });
    }
  } catch (err: any) {
    console.error('Error en handler support-request:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}
