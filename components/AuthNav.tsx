'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

export default function AuthNav() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Observar sesión
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const getInitials = (email: string) => {
    const namePart = email.split('@')[0];
    const parts = namePart.split(/[._\-]/);
    const initials = parts.map((p) => p[0]?.toUpperCase()).join('');
    return initials.slice(0, 2);
  };

  return (
    <div className="relative flex items-center gap-4">
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
        <div className="relative">
          {/* Avatar redondo */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold uppercase shadow-md focus:outline-none"
          >
            {getInitials(user.email)}
          </button>

          {/* Menú desplegable animado */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 4 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-40 bg-black border border-purple-600 rounded-lg shadow-lg z-50 overflow-hidden"
              >
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3 text-white hover:bg-purple-700 transition"
                >
                  Cerrar sesión
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
