import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/services/supabaseClient';

// Simulación de almacenamiento temporal en memoria (solo para demo, no producción)
declare global {
  // You can replace 'any' with a more specific type if you know the structure of your support requests
  // For example: interface SupportRequest { ... }
  // [token: string]: SupportRequest
  var pendingSupportRequests: { [token: string]: any };
}
globalThis.pendingSupportRequests = globalThis.pendingSupportRequests || {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { token } = req.query;
  if (!token || typeof token !== 'string') {
    return res.status(400).send('Token inválido.');
  }

  // Recupera la solicitud pendiente
  const request = globalThis.pendingSupportRequests[token];
  if (!request) {
    return res.status(404).send('Solicitud no encontrada o ya confirmada.');
  }

  // Aquí deberías guardar la solicitud en Supabase
  const { error } = await supabase.from('support_requests').insert([{ ...request }]);
  if (error) return res.status(500).send('Error al guardar la solicitud.');

  // Elimina la solicitud pendiente
  delete globalThis.pendingSupportRequests[token];

  // Muestra mensaje de éxito
  return res.status(200).send('¡Solicitud confirmada y enviada! Nuestro equipo te contactará pronto.');
}
