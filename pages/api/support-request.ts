import type { NextApiRequest, NextApiResponse } from 'next';
import { createTransport } from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

import { supabase } from '@/services/supabaseClient';

// Configure your email provider (example: Gmail SMTP, for production use Resend/SendGrid)
const transporter = createTransport({
  service: 'gmail', // or use your provider
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { fullName, email, requestType, description } = req.body;
    if (!fullName || !email || !requestType || !description) {
      return res.status(400).json({ error: 'Faltan campos requeridos.' });
    }

    // Generate a unique token for confirmation
    const token = uuidv4();

    // Guarda la solicitud pendiente en Supabase
    // Tabla: support_requests (token UNIQUE o PRIMARY KEY)
    const { error: pendingError } = await supabase.from('support_requests').insert([
      {
        token,
        full_name: fullName,
        email,
        request_type: requestType,
        description,
        status: 'pending',
      },
    ]);
    if (pendingError) {
      console.error('Error guardando la solicitud pendiente:', pendingError);
      return res.status(500).json({ error: pendingError.message || 'Error guardando la solicitud pendiente.' });
    }

    // Send confirmation email
    const confirmUrl = `${BASE_URL}/api/support-request/confirm?token=${token}`;
    try {
      console.log('Enviando correo a:', email);
      const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Confirma tu solicitud de soporte',
        html: `<p>Hola ${fullName},</p>
          <p>Haz clic en el siguiente enlace para confirmar tu solicitud de soporte:</p>
          <a href="${confirmUrl}">${confirmUrl}</a>
          <p>Si no solicitaste esto, ignora este correo.</p>`
      });
      console.log('Resultado de sendMail:', info);
      return res.status(200).json({ message: 'Correo de confirmación enviado.' });
    } catch (error: any) {
      console.error('Error enviando el correo:', error);
      return res.status(500).json({ error: error?.message || 'Error enviando el correo.' });
    }
  }
  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
