"use client";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { supabase } from "../services/supabaseClient";
import MagneticButton from "./magnetic-button";
import { GlobalAlerts, useAlert } from "@/components/alert-context";
import { COUNTRIES } from "../lib/countries";

export default function SolicitudModal({ isOpen, onClose, fullScreen = false }) {
  const { showAlert } = useAlert();
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyActivity, setCompanyActivity] = useState("");
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState("Soporte técnico");
  const [description, setDescription] = useState("");
  const [otherDetails, setOtherDetails] = useState("");
  const [country, setCountry] = useState({ iso: "VE", code: "+58", name: "Venezuela" });
  const [phoneNumber, setPhoneNumber] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const REQUEST_TYPES = ["Soporte técnico", "Consulta general", "Reclamo", "Otro"];

  useEffect(() => {
    let subscription = null;
    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const user = data?.user;
        if (user?.email) setEmail(user.email);
      } catch (err) {
        console.debug("No se pudo obtener el usuario en SolicitudModal:", err);
      }
    };

    fetchUser();
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user;
      setEmail(u?.email ?? "");
    });
    subscription = sub?.subscription ?? sub;

    return () => {
      try {
        subscription?.unsubscribe?.();
      } catch {
        // ignore
      }
    };
  }, []);

  const validateEmail = (e) => /\S+@\S+\.\S+/.test(e);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotLoggedIn(false);

    const finalDescription = description;

    if (!firstName || !companyName || !companyActivity || !email || !finalDescription || !phoneNumber) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (!consent) {
      setError("Debes aceptar la política de privacidad y el consentimiento de comunicación para enviar el formulario.");
      setLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("El correo electrónico no es válido.");
      return;
    }
    setLoading(true);

    const { data: { user } = {} } = await supabase.auth.getUser();
    const isOther = requestType === "Otro" || requestType === "OTRO";

    try {
      const response = await fetch("/api/support-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          companyName,
          companyActivity,
          email,
          requestType,
          customReason: isOther ? otherDetails : null,
          description: finalDescription,
          country: country.iso,
          phone: `${country.code}${phoneNumber}`,
          userId: user?.id || null, // Pasamos el ID si existe, pero no es obligatorio
        }),
      });

      setLoading(false);

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Error al enviar la solicitud.");
      } else {
        showAlert("success", "Tu solicitud fue enviada correctamente. Por favor, revisa tu correo electrónico para confirmarla.");
        setFirstName("");
        setCompanyName("");
        setCompanyActivity("");
        setEmail("");
        setRequestType(REQUEST_TYPES[0]);
        setDescription("");
        setOtherDetails("");
        setPhoneNumber("");
        setCountry({ iso: "VE", code: "+58", name: "Venezuela" });
        onClose(); // Cerramos el modal tras éxito
      }
    } catch (err) {
      setLoading(false);
      setError("Error de conexión al enviar la solicitud.");
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setFirstName("");
      setCompanyName("");
      setCompanyActivity("");
      setEmail("");
      setRequestType(REQUEST_TYPES[0]);
      setDescription("");
      setOtherDetails("");
      setLoading(false);
      setError("");
      setNotLoggedIn(false);
    }
  }, [isOpen]);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              style={{ zIndex: 100000 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />

            <motion.div
              className={fullScreen ? "fixed inset-0" : "fixed inset-0 flex items-center justify-center p-4"}
              style={{ zIndex: 100001 }}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div
                className={
                  fullScreen
                    ? "bg-black/90 border border-purple-500/30 rounded-none shadow-2xl w-full h-full p-4 md:p-8 relative overflow-auto hide-scrollbar"
                    : "bg-black/90 border border-purple-500/30 rounded-[36px] shadow-2xl w-full max-w-4xl p-8 relative"
                }
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={onClose}
                  className="absolute top-3 right-4 text-purple-400 hover:text-white text-2xl"
                >
                  ✕
                </button>

                <div
                  className={
                    fullScreen
                      ? "bg-black/80 rounded-none p-6 md:p-8 h-full overflow-auto hide-scrollbar"
                      : "bg-black/80 rounded-t-2xl rounded-b-[36px] p-6"
                  }
                >
                  <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {/* Campos del formulario */}
                    <div className="flex flex-col gap-6">
                      <div>
                        <label className="block text-purple-200 mb-1 AlongSanss2-Thin">Nombre</label>
                        <input
                          type="text"
                          className="w-full border border-purple-700 bg-black/60 text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black placeholder-purple-400 AlongSanss2-Thin"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                          placeholder="Nombre"
                        />
                      </div>
                      <div>
                        <label className="block text-purple-200 mb-1 AlongSanss2-Thin">Nombre de empresa</label>
                        <input
                          type="text"
                          className="w-full border border-purple-700 bg-black/60 text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black placeholder-purple-400 AlongSanss2-Thin"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          required
                          placeholder="Nombre de empresa"
                        />
                      </div>
                      <div>
                        <label className="block text-purple-200 mb-1 AlongSanss2-Thin">¿A qué se dedica la empresa?</label>
                        <input
                          type="text"
                          className="w-full border border-purple-700 bg-black/60 text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black placeholder-purple-400 AlongSanss2-Thin"
                          value={companyActivity}
                          onChange={(e) => setCompanyActivity(e.target.value)}
                          required
                          placeholder="Actividad principal de la empresa"
                        />
                      </div>
                      <div>
                        <label className="block text-purple-200 mb-1 AlongSanss2-Thin">Correo electrónico</label>
                        <input
                          type="email"
                          className="w-full border border-purple-700 bg-black/60 text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black placeholder-purple-400 AlongSanss2-Thin"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="Correo electrónico"
                        />
                      </div>
                      <div>
                        <label className="block text-purple-200 mb-1 AlongSanss2-Thin">Tipo de solicitud</label>
                        <select
                          className="w-full border border-purple-700 bg-black/60 text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black AlongSanss2-Thin"
                          value={requestType}
                          onChange={(e) => setRequestType(e.target.value)}
                        >
                          {REQUEST_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>

                        <AnimatePresence>
                          {requestType === "Otro" && (
                            <motion.textarea
                              layout
                              initial={{ opacity: 0, y: -6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -6 }}
                              transition={{ duration: 0.18 }}
                              className="mt-3 w-full border border-purple-700 bg-black/60 text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black placeholder-purple-400 resize-none"
                              value={otherDetails}
                              onChange={(e) => setOtherDetails(e.target.value)}
                              placeholder="Describe tu solicitud"
                              rows={4}
                            />
                          )}
                        </AnimatePresence>
                      </div>
                      <div>
                        <label className="block text-purple-200 mb-1 AlongSanss2-Thin">País</label>
                        <div className="flex gap-2 AlongSanss2-Thin">
                          <select
                            className="w-1/2 border border-purple-700 bg-black/60 text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 AlongSanss2-Thin"
                            value={country.iso}
                            onChange={(e) => {
                              const c = COUNTRIES.find((x) => x.iso === e.target.value);
                              if (c) setCountry(c);
                            }}
                          >
                            {COUNTRIES.map((c) => (
                              <option key={c.iso} value={c.iso}>
                                {c.flag} {c.name} ({c.code})
                              </option>
                            ))}
                          </select>
                          <input
                            type="tel"
                            className="w-1/2 border border-purple-700 bg-black/60 text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400 AlongSanss2-Thin"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="Número de teléfono"
                            required
                          />
                        </div>
                      </div>

                      {/* Consentimiento */}
                      <div className="md:col-span-2 mt-2 AlongSanss2-Thin">
                        <label className="flex items-start gap-3 text-sm text-purple-200 AlongSanss2-Thin">
                          <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            className="mt-1 w-4 h-4 text-purple-600 bg-black/60 border border-purple-700 rounded focus:ring-2 focus:ring-purple-500"
                          />
                          <span className="AlongSanss2-Thin">
                            Acepto recibir comunicaciones por correo electrónico de Truelogic Software, incluyendo
                            actualizaciones, recursos y información relevante. Al enviar este formulario, acepto la{" "}
                            <a href="/privacy-policy" className="underline">
                              Política de Privacidad
                            </a>
                            . <span className="ALONGSANSS-REGULAR">*</span>
                            <div className="mt-2 AlongSanss2-Thin">
                              Al proporcionar un número de teléfono y enviar este formulario, usted consiente ser
                              contactado por mensaje de texto SMS. Pueden aplicarse tarifas de mensaje y datos. Puede
                              responder STOP para cancelar más mensajes.
                            </div>
                          </span>
                        </label>
                      </div>
                    </div>


                    {/* Descripción */}
                    <div className="flex flex-col">
                      <label className="block text-purple-200 mb-1 AlongSanss2-Thin">Descripción</label>
                      <textarea
                        className="w-full border border-purple-700 bg-black/60 text-white rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black placeholder-purple-400 flex-1 resize-none AlongSanss2-Thin"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        rows={10}
                        placeholder="Descripción"
                      />
                    </div>

                    {/* Botón */}
                    <div className="md:col-span-2 flex justify-end mt-4">
                      <MagneticButton
                        type="submit"
                        className="glow bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6 w-full md:w-auto AlongSanss2-Thin"
                        disabled={loading}
                      >
                        {loading ? (
                          <span className="AlongSanss2-Thin">Enviando...</span>
                        ) : (
                          <span className="flex items-center AlongSanss2-Thin">
                            Enviar solicitud
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </span>
                        )}
                      </MagneticButton>
                    </div>

                    {error && <div className="md:col-span-2 text-red-400">{error}</div>}
                  </form>
                </div>

                <GlobalAlerts />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 🔥 Oculta scrollbars pero mantiene scroll funcional */}
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE y Edge antiguos */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari y Opera */
        }
      `}</style>
    </>
  );
}
