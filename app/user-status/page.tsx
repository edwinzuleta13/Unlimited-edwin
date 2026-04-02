"use client";
import BotonConSonido from "@/components/BotonConSonido";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/services/supabaseClient";
import FloatingChatWidget from "@/components/floating-chat-widget";
import AuthNav from "@/components/AuthNav";
import { GlobalAlerts } from '@/components/alert-context';

import {
  Table,
  TableHeader,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { useAlert } from '@/components/alert-context';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function UserStatus() {
  const [peticiones, setPeticiones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [notAuth, setNotAuth] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const { showAlert } = useAlert();

  useEffect(() => {
    const fetchPeticiones = async () => {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setPeticiones([]);
        setLoading(false);
        setNotAuth(true);
        return;
      }
      setNotAuth(false);
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

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("support_requests").delete().eq("id", id);
      if (error) {
        console.error('Error eliminando solicitud:', error);
        // Support both alert implementations: one accepts (severity, message) and
        // another accepts a single object { severity, message, ... }.
        if (typeof showAlert === 'function') {
          // Prefer the two-argument API (severity, message) provided by the
          // `alert-context` used in the app layout.
          showAlert('error', 'No se pudo eliminar la solicitud. Intenta de nuevo.');
        }
        return;
      }
      setPeticiones((prev) => prev.filter((p) => p.id !== id));
      setOpenMenuId(null);
      if (typeof showAlert === 'function') {
        showAlert('success', 'Solicitud eliminada correctamente.');
      }
    } catch (err) {
      console.error('Excepción al eliminar solicitud:', err);
      if (typeof showAlert === 'function') {
        showAlert('error', 'Error al eliminar la solicitud.');
      }
    }
  };

  // ✅ Filtrar resultados
  const filtered = useMemo(() => {
    if (!search.trim()) return peticiones;
    return peticiones.filter((p) => {
      const str = `${p.status} ${p.request_type} ${p.description}`.toLowerCase();
      return str.includes(search.toLowerCase());
    });
  }, [search, peticiones]);

  const headData = ["Fecha", "Hora", "Estado", "Tipo", "Descripción", ""];

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      <div className="absolute inset-0 z-0">
        <div className="fixed inset-0 noise" />
      </div>

      <div className="absolute top-8 left-0 right-0 z-20 flex justify-center">
        <GlobalAlerts />
      </div>
      <FloatingChatWidget />

      {/* AuthNav */}
      <div className="relative z-[999999]">
        <AuthNav />
      </div>

      {/* Contenido principal SIN BORDE MORADO */}
      <div className="absolute inset-0 z-10 flex items-start justify-center p-10 overflow-auto">
        <div className="w-full max-w-[1400px] flex flex-col gap-10">

          {/* ✅ Título SIN LOGO */}
          <h1 className="mt-20 text-4xl font-bold tracking-tight text-purple-300 drop-shadow-lg">
            Estado de tus Peticiones
          </h1>

          {/* ✅ Barra de búsqueda */}
          <div className="flex justify-end mb-4">
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="px-4 py-2 w-full max-w-sm bg-black/50 border border-purple-700 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-purple-500 text-purple-200 placeholder-purple-400"
            />
          </div>

          {loading ? (
            <div className="text-center text-lg text-purple-200 mt-40">
              Cargando...
            </div>
          ) : notAuth ? (
            <div className="text-center text-purple-400 text-lg mt-40">
              <p className="mb-4">Debes iniciar sesión para ver tus peticiones.</p>
              <div className="flex justify-center gap-4">
                <span
                  className="cursor-pointer underline text-purple-300 hover:text-purple-500"
                  onClick={() => (window.location.href = '/signin')}
                >
                  Iniciar sesión
                </span>
                <span
                  className="cursor-pointer underline text-purple-300 hover:text-purple-500"
                  onClick={() => (window.location.href = '/signup')}
                >
                  Registrarse
                </span>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center text-purple-400 text-lg mt-40">
              No se encontraron resultados.
            </div>
          ) : (
            <div
              className="overflow-auto rounded-xl shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <Table className="text-white w-full">
                <TableHeader>
                  <TableRow className="bg-purple-900/40 backdrop-blur-sm">
                    {headData.map((item, index) => (
                      <TableHead key={index} className="py-5">
                        <p className="text-purple-200 font-semibold text-lg">
                          {item}
                        </p>
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {filtered.map((p, idx) => {
                    const fecha = new Date(p.created_at);

                    return (
                      <TableRow
                        key={p.id}
                        className={`font-medium transition ${idx % 2 === 0 ? "bg-purple-950/40" : "bg-black/40"
                          } hover:bg-purple-800/30`}
                      >
                        <TableCell className="py-5">
                          {fecha.toLocaleDateString()}
                        </TableCell>

                        <TableCell className="py-5">
                          {fecha.toLocaleTimeString()}
                        </TableCell>

                        {/* Estado con animación ping */}
                        <TableCell className="py-5">
                          <div className="flex items-center gap-3">
                            <div className="relative inline-flex">
                              <div
                                className={`w-3 h-3 rounded-full ${["confirmed"].includes(p.status?.toLowerCase())
                                    ? "bg-green-500"
                                    : ["rechazada", "rejected"].includes(
                                      p.status?.toLowerCase()
                                    )
                                      ? "bg-red-500"
                                      : ["recibida", "received"].includes(
                                        p.status?.toLowerCase()
                                      )
                                        ? "bg-yellow-400"
                                        : "bg-purple-400"
                                  }`}
                              ></div>
                              <div
                                className={`w-3 h-3 rounded-full absolute top-0 left-0 animate-ping ${["confirmed"].includes(p.status?.toLowerCase())
                                    ? "bg-green-500"
                                    : ["rechazada", "rejected"].includes(
                                      p.status?.toLowerCase()
                                    )
                                      ? "bg-red-500"
                                      : ["recibida", "received"].includes(
                                        p.status?.toLowerCase()
                                      )
                                        ? "bg-yellow-400"
                                        : "bg-purple-400"
                                  }`}
                              ></div>
                            </div>
                            <p className="capitalize">{p.status}</p>
                          </div>
                        </TableCell>

                        <TableCell className="py-5">{
                          // If the request was submitted as 'OTRO' (or request_type is empty)
                          // prefer showing the custom_reason provided by the user when available.
                          (String(p.request_type || "").toUpperCase() === "OTRO" || !p.request_type) && p.custom_reason
                            ? p.custom_reason
                            : (p.request_type || "-")
                        }</TableCell>
                        <TableCell className="py-5">{p.description || "-"}</TableCell>

                        {/* ✅ Botón con tooltip */}
                        <TableCell className="py-5 relative">
                          <TooltipProvider delayDuration={100}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <BotonConSonido
                                  onClick={() =>
                                    setOpenMenuId(openMenuId === p.id ? null : p.id)
                                  }
                                  className="px-4 py-2 bg-purple-700 hover:bg-purple-800 
                                  border border-purple-500 rounded-lg text-white transition"
                                >
                                  Editar
                                </BotonConSonido>
                              </TooltipTrigger>

                              <TooltipContent side="left">
                                <p>Opciones</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>

                          {openMenuId === p.id && (
                            <div className="absolute right-0 mt-2 w-32 bg-black border border-purple-700 rounded shadow-lg z-50">
                              <BotonConSonido
                                onClick={() => handleDelete(p.id)}
                                className="w-full text-left px-4 py-2 text-red-400 hover:bg-red-700 hover:text-white transition"
                              >
                                Eliminar
                              </BotonConSonido>
                            </div>
                          )}
                        </TableCell>
                       </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
