"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/services/supabaseClient";
import ParticleBackground from "@/components/particle-background";
import TechCursor from "@/components/tech-cursor";
import FloatingChatWidget from "@/components/floating-chat-widget";
import { motion } from "framer-motion";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const searchParams = useSearchParams();

useEffect(() => {
  if (!searchParams) return; // Esto es opcional, pero seguro
  const access_token = searchParams.get("access_token");
  if (access_token) {
    supabase.auth.setSession({
      access_token,
      refresh_token: access_token,
    });
  }
}, [searchParams]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) setError("No se pudo cambiar la contraseña.");
    else setMsg("¡Contraseña cambiada correctamente! Ya puedes iniciar sesión.");
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
          <h1 className="text-2xl font-bold mb-6 text-center">Restablecer contraseña</h1>
          <form onSubmit={handleReset} className="space-y-4">
            <input
              type="password"
              className="w-full px-4 py-2 rounded bg-black/70 border border-purple-500 focus:outline-none"
              placeholder="Nueva contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded font-semibold transition"
              disabled={loading}
            >
              {loading ? "Cambiando..." : "Cambiar contraseña"}
            </button>
            {msg && <div className="text-green-400 text-sm mt-4">{msg}</div>}
            {error && <div className="text-red-400 text-sm mt-4">{error}</div>}
          </form>
        </motion.div>
      </div>
    </div>
  );
}