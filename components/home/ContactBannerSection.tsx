"use client"
import * as React from "react"
import { motion } from "framer-motion"
import AnimatedButton from "@/components/AnimatedButton1"

interface ContactBannerSectionProps {
  onContactClick: () => void
}

export default function ContactBannerSection({ onContactClick }: ContactBannerSectionProps) {
  return (
    <motion.section
      id="contacto"
      className="relative z-20 w-full h-[50vh] bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/wachinton.png')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%',
        paddingBottom: '3rem',
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Contenido - botón centrado */}
      <div className="relative z-10 w-full flex items-center justify-center px-4">
        <div className="inline-block">
          <AnimatedButton
            text="Contactanos"
            onClick={onContactClick}
            className="glow bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6"
            disabled={false}
          />
        </div>
      </div>
    </motion.section>
  )
}
