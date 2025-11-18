"use client"

import { useEffect } from "react";
import { motion } from "framer-motion";

export default function SplashScreen() {
  useEffect(() => {
    // Preload del logo para que cargue lo más rápido posible
    try {
      const href = "/logo-Untitled-26.png";
      if (!document.querySelector(`link[rel='preload'][href='${href}']`)) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "image";
        link.href = href;
        document.head.appendChild(link);
      }
    } catch (e) {
      // Ignorar errores menores
    }
    console.log("[SplashScreen] mounted");
  }, []);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-purple-900 z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* LOGO */}
      <motion.div
        // 👇 forzamos tamaño fijo visible
        style={{
          width: 250,   // ajusta aquí (60 = original, 80 = un poco más grande)
          height: 250,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        initial={{ opacity: 1, scale: 1 }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <img
          src="/logo-Untitled-26.png"
          alt="Logo Untitled Tech Company"
          className="w-full h-full object-contain"
          decoding="async"
          loading="eager"
          style={{ backgroundColor: "transparent" }} // diagnóstico visual
        />
      </motion.div>

      {/* TEXTO */}
      <motion.span
        className="text-purple-300 mt-2 text-sm"
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 0.9 }}
        transition={{ duration: 0.4 }}
      >
        Cargando...
      </motion.span>
    </motion.div>
  );
}
