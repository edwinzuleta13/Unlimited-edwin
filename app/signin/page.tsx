"use client";
import BotonConSonido from "@/components/BotonConSonido";
import { useRouter } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import ParticleBackground from "@/components/particle-background";
import TechCursor from "@/components/tech-cursor";
import FloatingChatWidget from "@/components/floating-chat-widget";
import { AuthForm } from "@/components/AuthForm";
import { AlertProvider, GlobalAlerts, useAlert } from "@/components/alert-context";
import { motion } from "framer-motion";
import Image from "next/image";

function SignInContent() {
  const [audioReady, setAudioReady] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMsg, setResetMsg] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { showAlert } = useAlert();

  useEffect(() => {
    const audio = new Audio("/hover.mp3");
    audio.volume = 0.1;
    audio.load();
    audio.oncanplaythrough = () => setAudioReady(true);

    const playSound = () => {
      if (audioReady) {
        audio.currentTime = 0;
        audio
          .play()
          .catch((error) => console.error("[AUDIO ERROR] Error playing audio:", error));
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

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetMsg("");
    setError("");

    console.group("🔍 Password Reset Debug");
    console.log("📧 Email ingresado:", resetEmail);
    console.log("🌐 NEXT_PUBLIC_BASE_URL:", process.env.NEXT_PUBLIC_BASE_URL);

    if (!process.env.NEXT_PUBLIC_BASE_URL) {
      console.error(
        "⚠️ [CONFIG ERROR] Falta NEXT_PUBLIC_BASE_URL en el entorno (.env.local)."
      );
      setError("Error interno: falta configuración del servidor.");
      console.groupEnd();
      return;
    }

    try {
      console.log("🚀 Enviando solicitud a Supabase...");
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password`,
      });

      if (error) {
        console.error("❌ [SUPABASE ERROR]:", error);
        setError(
          error.message ||
            "No se pudo enviar el correo de recuperación. Ver consola para más detalles."
        );
        showAlert('error', error.message || 'No se pudo enviar el correo de recuperación.');
      } else {
        console.log("✅ Correo de recuperación enviado correctamente a:", resetEmail);
        setResetMsg("¡Revisa tu correo para restablecer tu contraseña!");
        showAlert('success', 'Correo de recuperación enviado correctamente.');
      }
    } catch (err: any) {
      console.error("💥 [EXCEPCIÓN NO CONTROLADA]:", err);
      setError(`Error inesperado: ${err.message || "Ver consola"}`);
      showAlert('error', `Error inesperado: ${err.message || 'Ver consola'}`);
    } finally {
      console.groupEnd();
    }
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
        <div className="absolute top-8 left-0 right-0 z-20 flex justify-center">
          <GlobalAlerts />
        </div>
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
                onChange={(e) => setResetEmail(e.target.value)}
                placeholder="Tu correo electrónico"
                required
                className="w-full px-4 py-2 rounded bg-black/70 border border-purple-500 focus:outline-none"
              />
              <BotonConSonido
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold transition"
              >
                Enviar enlace de recuperación
              </BotonConSonido>
              {resetMsg && <div className="text-green-400 text-sm">{resetMsg}</div>}
              {error && <div className="text-red-400 text-sm">{error}</div>}
              <BotonConSonido
                type="button"
                onClick={() => setShowReset(false)}
                className="mt-2 text-purple-400 hover:underline w-full"
              >
                Volver a iniciar sesión
              </BotonConSonido>
            </form>
          ) : (
            <>
              <AuthForm type="signin" />
              <BotonConSonido
                className="mt-4 text-purple-400 hover:underline w-full"
                onClick={() => setShowReset(true)}
              >
                ¿Olvidaste tu contraseña?
              </BotonConSonido>
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

export default function SignIn() {
  return (
    <AlertProvider>
      <SignInContent />
    </AlertProvider>
  );
}
