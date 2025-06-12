// services/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// Lee las variables del .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Crea una instancia de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);
