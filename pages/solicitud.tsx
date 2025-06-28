"use client";

import AuthNav from '../components/AuthNav';
import FloatingChatWidget from '../components/floating-chat-widget';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ParticleBackground from '../components/particle-background';
import TechCursor from '../components/tech-cursor';
import SupportRequestForm from '../components/SupportRequestForm';

export default function SolicitudPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden cursor-none">
      {/* Fondo decorativo SIN bloquear eventos */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
        <div className="fixed inset-0 noise" />
      </div>

      {/* Header igual que landing */}
      <header className="relative z-10 w-full py-6 px-8 flex justify-end">
        <AuthNav />
      </header>

      {/* Cursor personalizado y chat flotante */}
      <TechCursor />
      <FloatingChatWidget />

      {/* Contenido principal: formulario */}
      <div className="relative z-50 flex justify-center pt-12 px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-black/50 backdrop-blur-md p-10 rounded-xl shadow-xl border border-purple-500 w-full max-w-5xl"
        >
          <motion.div
            className="relative w-32 h-32 mx-auto mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Disen%CC%83o%20sin%20ti%CC%81tulo%20(5)-5zZ7WMmMeOTo8NMFzV3ZUFkD5fkOEW.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.h1
            className="text-3xl font-bold text-center mb-6 gradient-text"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Solicita Atención al Cliente
          </motion.h1>

          <p className="text-purple-300 mb-8 text-center">
            Completa el siguiente formulario y nuestro equipo se pondrá en contacto contigo lo antes posible.
          </p>

          {/* Usa el formulario funcional */}
          <SupportRequestForm />
        </motion.div>
      </div>
    </div>
  );
}