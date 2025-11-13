"use client";

import AuthNav from '@/components/AuthNav';
import FloatingChatWidget from '@/components/floating-chat-widget';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ParticleBackground from '@/components/particle-background';
import TechCursor from '@/components/tech-cursor';
import SupportRequestForm from '@/components/SupportRequestForm';
import { AlertProvider, GlobalAlerts } from '@/components/alert-context';

export default function SolicitudPage() {
  return (
    <AlertProvider>
      <div className="relative min-h-screen bg-black text-white overflow-hidden cursor-none">
        {/* Fondo decorativo SIN bloquear eventos */}
        <div className="absolute inset-0 z-0">
          <ParticleBackground />
          <div className="fixed inset-0 noise" />
        </div>

        {/* Header igual que landing */}
        <header className="relative z-[9999] w-full py-6 px-8 flex justify-end">
          <AuthNav />
        </header>

        {/* Cursor personalizado y chat flotante */}
        <TechCursor />
        <FloatingChatWidget />

        {/* Alertas globales */}
        <div className="absolute top-8 left-0 right-0 z-20 flex justify-center pointer-events-none">
          <GlobalAlerts />
        </div>

        {/* Contenido principal: formulario */}
        <div className="relative z-10 flex justify-center pt-12 px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-black/50 backdrop-blur-md p-10 rounded-xl shadow-xl border border-purple-500 w-full max-w-5xl"
          >
            <motion.div
              className="relative w-40 h-40 mx-auto mb-6 md:w-48 md:h-48"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <Image
                src="/logo-Untitled-17.png"
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
    </AlertProvider>
  );
}
