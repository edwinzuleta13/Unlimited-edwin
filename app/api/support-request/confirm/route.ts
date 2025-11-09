import { NextResponse } from 'next/server';
import { supabase } from '@/services/supabaseClient';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');
    if (!token) return NextResponse.json({ error: 'Token inválido.' }, { status: 400 });

    // Buscar la solicitud pendiente
    const { data, error: selectError } = await supabase.from('support_requests').select('*').eq('token', token).maybeSingle();
    if (selectError) return NextResponse.json({ error: selectError.message }, { status: 500 });
    if (!data) return NextResponse.json({ error: 'Solicitud no encontrada.' }, { status: 404 });

    // Actualizar estado a confirmed
    const { error: updateError } = await supabase.from('support_requests').update({ status: 'confirmed' }).eq('token', token);
    if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });

    return NextResponse.json({ message: '¡Solicitud confirmada y enviada! Nuestro equipo te contactará pronto.' });
  } catch (err: any) {
    console.error('Error en confirm handler:', err);
    return NextResponse.json({ error: err.message || 'Error interno' }, { status: 500 });
  }
}
