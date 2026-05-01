import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

/**
 * Supabase Edge Function: send-support-email
 * 
 * Esta función se dispara mediante un Webhook de Supabase cuando se inserta
 * una nueva fila en la tabla 'support_requests'.
 * 
 * Requiere la variable de entorno RESEND_API_KEY configurada en Supabase.
 */

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
const COMPANY_EMAIL = 'untitledtechcompany@gmail.com'

serve(async (req) => {
  try {
    const { record } = await req.json()

    console.log(`Procesando solicitud de: ${record.email}`)

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Notificaciones Untitled <onboarding@resend.dev>',
        to: COMPANY_EMAIL,
        subject: `🚀 Nueva Solicitud: ${record.request_type || 'Contacto'}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px;">
            <h2 style="color: #6d28d9;">Nueva Solicitud de Soporte/Contacto</h2>
            <hr />
            <p><strong>Nombre:</strong> ${record.first_name}</p>
            <p><strong>Empresa:</strong> ${record.company_name}</p>
            <p><strong>Actividad:</strong> ${record.company_activity}</p>
            <p><strong>Email:</strong> <a href="mailto:${record.email}">${record.email}</a></p>
            <p><strong>Teléfono:</strong> ${record.phone_number}</p>
            <p><strong>Tipo de Solicitud:</strong> ${record.request_type === 'OTRO' ? record.custom_reason : record.request_type}</p>
            <hr />
            <h3>Descripción:</h3>
            <p style="white-space: pre-wrap;">${record.description}</p>
            <hr />
            <p style="font-size: 12px; color: #888;">Este correo fue enviado automáticamente por el sistema de Supabase.</p>
          </div>
        `,
      }),
    })

    const data = await res.json()
    console.log('Respuesta de Resend:', data)

    return new Response(JSON.stringify({ success: true, data }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error) {
    console.error('Error enviando email:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
