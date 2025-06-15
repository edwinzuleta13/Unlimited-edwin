'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import Link from 'next/link';

export default function AuthNav() {
  const [user, setUser] = useState<any>(null);

  // Observar cambios en la sesión
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Cerrar sesión
  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/'; // Redirige al home después de cerrar sesión
  };

  return (
    <div className="fixed top-6 right-6 z-50 flex gap-4">
      {!user ? (
        <>
          <Link href="/signin">
            <button className="glow bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg">
              Iniciar sesión
            </button>
          </Link>
          <Link href="/signup">
            <button className="bg-transparent border border-purple-500 hover:bg-purple-500/10 text-white px-5 py-3 rounded-lg">
              Registrarse
            </button>
          </Link>
        </>
      ) : (
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg"
        >
          Cerrar sesión
        </button>
      )}
    </div>
  );
}
