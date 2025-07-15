"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/services/supabaseClient";
import ParticleBackground from "@/components/particle-background";
import TechCursor from "@/components/tech-cursor";
import FloatingChatWidget from "@/components/floating-chat-widget";
import AuthNav from "@/components/AuthNav";
import Image from "next/image";

export default function UserStatus() {
  const [peticiones, setPeticiones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeticiones = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setPeticiones([]);
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("support_requests")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      setPeticiones(data || []);
      setLoading(false);
    };
    fetchPeticiones();
  }, []);

  // Función para eliminar una petición
  const handleDelete = async (id: string) => {
    await supabase.from("support_requests").delete().eq("id", id);
    setPeticiones((prev) => prev.filter((p) => p.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden cursor-none">
      <div className="absolute inset-0 z-0">
        <ParticleBackground />
        <div className="fixed inset-0 noise" />
      </div>
      <TechCursor />
      <FloatingChatWidget />

      {/* Menú de usuario arriba a la derecha */}
      <div className="fixed top-6 right-8 z-20">
        <AuthNav />
      </div>

      {/* Formulario ocupa toda la pantalla, bordes cuadrados y encabezado elegante */}
      <div className="fixed inset-0 z-10 flex items-center justify-center px-0 py-0">
        <div className="bg-transparent backdrop-blur-[1px] w-full h-full flex flex-col border-2 border-purple-700 rounded-none shadow-2xl">
          <div className="flex items-center gap-4 mb-10 mt-16 pl-16">
            <div className="relative h-16 w-16">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Disen%CC%83o%20sin%20ti%CC%81tulo%20(5)-5zZ7WMmMeOTo8NMFzV3ZUFkD5fkOEW.png"
                alt="Untitled Tech Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-4xl font-extrabold text-left text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-200 to-purple-600 tracking-tight drop-shadow-lg uppercase m-0">
              Estado de tus Peticiones
            </h1>
          </div>
          {loading ? (
            <div className="text-center text-lg text-purple-200 flex-1 flex items-center justify-center">Cargando...</div>
          ) : peticiones.length === 0 ? (
            <div className="text-center text-purple-400 text-lg flex-1 flex items-center justify-center">No tienes peticiones registradas.</div>
          ) : (
            <div className="overflow-x-auto flex-1 max-h-[calc(100vh-12rem)]">
              <table className="min-w-full overflow-hidden shadow-lg">
                <thead>
                  <tr className="bg-gradient-to-r from-purple-700 to-purple-900 text-white">
                    <th className="px-6 py-4 text-left font-semibold">Fecha</th>
                    <th className="px-6 py-4 text-left font-semibold">Hora</th>
                    <th className="px-6 py-4 text-left font-semibold">Estado</th>
                    <th className="px-6 py-4 text-left font-semibold">Tipo</th>
                    <th className="px-6 py-4 text-left font-semibold">Descripción</th>
                    <th className="px-6 py-4 text-left font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {peticiones.map((p, idx) => {
                    const fecha = new Date(p.created_at);
                    return (
                      <tr
                        key={p.id}
                        className={`${
                          idx % 2 === 0
                            ? "bg-black/60"
                            : "bg-purple-950/40"
                        } border-b border-purple-800 hover:bg-purple-800/30 transition`}
                      >
                        <td className="px-6 py-4">{fecha.toLocaleDateString()}</td>
                        <td className="px-6 py-4">{fecha.toLocaleTimeString()}</td>
                        <td className="px-6 py-4 capitalize">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              ["confirmed"].includes(p.status?.toLowerCase())
                                ? "bg-green-700/80 text-green-200"
                                : ["rechazada", "rejected"].includes(p.status?.toLowerCase())
                                ? "bg-red-700/80 text-red-200"
                                : ["recibida", "received"].includes(p.status?.toLowerCase())
                                ? "bg-yellow-700/80 text-yellow-200"
                                : "bg-purple-700/80 text-purple-200"
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">{p.request_type || "-"}</td>
                        <td className="px-6 py-4">{p.description || "-"}</td>
                        <td className="px-6 py-4 relative">
                          <button
                            onClick={() => setOpenMenuId(openMenuId === p.id ? null : p.id)}
                            className="p-2 rounded-full hover:bg-purple-800 transition"
                            aria-label="Acciones"
                          >
                            <span className="text-2xl">⋮</span>
                          </button>
                          {openMenuId === p.id && (
                            <div className="absolute right-0 mt-2 w-32 bg-black border border-purple-700 rounded shadow-lg z-50">
                              <button
                                onClick={() => handleDelete(p.id)}
                                className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-700 hover:text-white transition"
                              >
                                Eliminar
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}