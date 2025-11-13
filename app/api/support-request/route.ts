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
    const { firstName, lastName, email, requestType, description, customReason, country, phone } = body;
    const isOther = String(requestType ?? '').toUpperCase() === 'OTRO';

    // Validaciones: nombre (nombre y apellido), email, teléfono y descripción son obligatorios.
    if (!firstName || !lastName || !email || !description || !phone) {
      return NextResponse.json({ error: 'Faltan campos requeridos.' }, { status: 400 });
    }

    // Si es "OTRO", customReason debe existir; si no, requestType debe existir
    if (isOther) {
      if (!customReason) {
        return NextResponse.json({ error: 'Falta la razón personalizada para "OTRO".' }, { status: 400 });
      }
    } else {
      if (!requestType) {
        return NextResponse.json({ error: 'Falta el tipo de solicitud.' }, { status: 400 });
      }
    }

    const token = uuidv4();

    // Guardar como pending en la tabla
    const createdAt = new Date().toISOString();

    const { error: pendingError } = await supabase.from('support_requests').insert([
      {
        token,
        first_name: firstName ?? null,
        last_name: lastName ?? null,
        country_code: country ?? null,
        phone_number: phone ?? null,
        email,
        // Si es OTRO guardamos request_type como NULL y ponemos la razón en custom_reason
        request_type: isOther ? null : requestType,
        custom_reason: isOther ? customReason : null,
        description,
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
            country_code: country ?? null,
            phone_number: phone ?? null,
            email,
            request_type: isOther ? 'OTRO' : requestType,
            custom_reason: isOther ? customReason : null,
            description,
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
      console.log('Enviando correo a:', email);
      const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Confirma tu solicitud de soporte',
        html: `<p>Hola ${firstName} ${lastName},</p>
          <p>Haz clic en el siguiente enlace para confirmar tu solicitud de soporte:</p>
          <a href="${confirmUrl}">${confirmUrl}</a>
          <p>Si no solicitaste esto, ignora este correo.</p>`,
      });
      console.log('Resultado de sendMail:', info);
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
