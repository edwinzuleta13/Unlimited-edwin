"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/services/supabaseClient';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { spaceGrotesk } from '@/lib/fonts';
import { Home } from 'lucide-react';
import { FaRectangleXmark } from 'react-icons/fa6';
import { GrStatusGood } from 'react-icons/gr';
import styles from './AuthNav.module.css';
import Image from 'next/image';

export default function AuthNav() {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      try {
        listener.subscription.unsubscribe();
      } catch (e) {}
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = window.location.origin;
  };

  const handleGoToStatus = () => router.push("/user-status");
  const handleGoHome = () => router.push("/");

  const getInitials = (email: string) => {
    const namePart = email.split('@')[0];
    const parts = namePart.split(/[._\-]/);
    const initials = parts.map((p) => p[0]?.toUpperCase()).join('');
    return initials.slice(0, 2);
  };

  return (
    <div className="w-full flex items-center justify-between flex-wrap md:flex-nowrap p-2 md:p-0">
      {/* Left: Logo */}
      <div className="flex items-center h-14">
        <Link href="/" aria-label="Inicio" className="flex items-center">
          <Image
            src="/logo-Untitled-10.png"
            alt="Untitled Tech"
            width={120}
            height={120}
            className="object-contain "
          />
        </Link>
      </div>

      {/* Center: texts (solo en desktop) */}
      <div className="hidden md:flex flex-wrap justify-center gap-6 md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
        {["Tecnologias", "Servicios", "Sobre Nosotros", "Contacto", "Aliados"].map((text) => (
          <span
            key={text}
            className={`text-lg md:text-xl text-gray-200 transition-transform duration-200 transform hover:scale-110 ${styles['underline-anim']}`}
          >
            <span
              className={`inline-block px-3 py-1.5 rounded-sm transition-colors hover:text-purple-400 ${styles['text-glow']}`}
            >
              {text}
            </span>
          </span>
        ))}
      </div>

      {/* Right: User / Auth buttons */}
      <div className="relative flex items-center gap-4 mt-2 md:mt-0">
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
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className={cn(
                "w-10 h-10 rounded-full bg-purple-700 text-white flex items-center justify-center font-bold uppercase shadow-md focus:outline-none",
                spaceGrotesk.className
              )}
            >
              {getInitials(user.email)}
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-2 min-w-[180px] bg-black border border-purple-600 rounded-lg rounded-tl-lg rounded-bl-lg rounded-tr-none shadow-lg z-[9999] overflow-hidden flex flex-col gap-0"
                >
                  {[
                    { onClick: handleGoToStatus, label: "Estado de Usuario", icon: <GrStatusGood className="inline-block mr-2 w-5 h-5 align-text-bottom" /> },
                    { onClick: handleGoHome, label: "Ir a inicio", icon: <Home className="inline-block mr-2 w-5 h-5 align-text-bottom" /> },
                    { onClick: handleLogout, label: "Cerrar sesión", icon: <FaRectangleXmark className="inline-block mr-2 w-5 h-5 align-text-bottom" /> },
                  ].map((btn, idx) => (
                    <motion.button
                      key={btn.label}
                      onClick={btn.onClick}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ delay: 0.08 * idx, duration: 0.25 }}
                      className="text-left px-4 py-3 text-purple-200 hover:bg-purple-700 hover:text-white transition whitespace-nowrap font-bold tracking-tight text-lg flex items-center gap-2"
                    >
                      {btn.icon}
                      {btn.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
