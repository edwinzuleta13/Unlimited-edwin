"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { createPortal } from "react-dom"

export default function FloatingChatWidget() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleWhatsApp = () => {
    window.open("https://wa.me/584243296034", "_blank");
  };

  if (!mounted) return null

  const portalContent = (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-6 right-6 z-[9999]"
    >
      <Button
        onClick={handleWhatsApp}
        className="w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 text-white shadow-[0_0_25px_rgba(37,211,102,0.4)] transition-all duration-500 hover:scale-110 active:scale-95 group border-none"
        title="Contactar por WhatsApp"
      >
        <FaWhatsapp className="w-8 h-8 transition-transform group-hover:scale-110" />
      </Button>
    </motion.div>
  )

  return createPortal(portalContent, document.body)
}

