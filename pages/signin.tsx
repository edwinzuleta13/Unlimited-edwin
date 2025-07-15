"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import ParticleBackground from "@/components/particle-background";
import TechCursor from "@/components/tech-cursor";
import FloatingChatWidget from "@/components/floating-chat-widget";
import { AuthForm } from "@/components/AuthForm";
import { motion } from "framer-motion";
import Image from "next/image";

export default function SignIn() {
  const [audioReady, setAudioReady] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

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

  // Handler para recuperación de contraseña
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMsg("");
    setError("");
    const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
      redirectTo: "http://localhost:3000/reset-password"
    });
    if (error) setError("No se pudo enviar el correo de recuperación.");
    else setResetMsg("¡Revisa tu correo para restablecer tu contraseña!");
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden cursor-none">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
        <div className="fixed inset-0 noise" />
      </div>

      <TechCursor />
      <FloatingChatWidget />

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
            Iniciar Sesión
          </motion.h1>

          {showReset ? (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <input
                type="email"
                value={resetEmail}
                onChange={e => setResetEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                required
                className="w-full px-4 py-2 rounded bg-black/70 border border-purple-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold transition"
              >
                Enviar enlace de recuperación
              </button>
              {resetMsg && <div className="text-green-400 text-sm">{resetMsg}</div>}
              {error && <div className="text-red-400 text-sm">{error}</div>}
              <button
                type="button"
                onClick={() => setShowReset(false)}
                className="mt-2 text-purple-400 hover:underline w-full"
              >
                Volver a iniciar sesión
              </button>
            </form>
          ) : (
            <>
              <AuthForm type="signin" />
              <button
                className="mt-4 text-purple-400 hover:underline w-full"
                onClick={() => setShowReset(true)}
              >
                ¿Olvidaste tu contraseña?
              </button>
              <p className="mt-4 text-center text-sm text-purple-300">
                ¿No tienes una cuenta?{" "}
                <Link href="/signup" className="text-purple-400 underline hover:text-purple-200">
                  Regístrate
                </Link>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}