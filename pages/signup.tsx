"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import ParticleBackground from "@/components/particle-background";
import TechCursor from "@/components/tech-cursor";
import FloatingChatWidget from "@/components/floating-chat-widget";
import { AuthForm } from "@/components/AuthForm";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SignUp() {
  const [audioReady, setAudioReady] = useState(false);

  useEffect(() => {
    const audio = new Audio("/hover.mp3");
    audio.volume = 0.1;
    audio.load();
    audio.oncanplaythrough = () => setAudioReady(true);

    const playSound = () => {
      if (audioReady) {
        audio.currentTime = 0;
        audio.play().catch((error) => console.error("Error playing audio:", error));
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("button, a")) {
        playSound();
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      audio.pause();
      audio.src = "";
    };
  }, [audioReady]);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden cursor-none">
      {/* Partículas debajo del contenido */}
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
        <div className="fixed inset-0 noise" />
      </div>

      <TechCursor />
      <FloatingChatWidget />

      {/* Contenido en capa superior */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="bg-black/50 backdrop-blur-md p-10 rounded-xl shadow-xl border border-purple-500 max-w-md w-full"
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
            Crear Cuenta
          </motion.h1>

          <AuthForm type="signup" />

          <p className="mt-4 text-center text-sm text-purple-300">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/signin" className="text-purple-400 underline hover:text-purple-200">
              Inicia sesión
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
