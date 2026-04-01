"use client"
import * as React from "react"
import { motion } from "framer-motion"
import MagneticButton from "@/components/magnetic-button"

interface ContactBannerSectionProps {
  onContactClick: () => void
}

export default function ContactBannerSection({ onContactClick }: ContactBannerSectionProps) {
  return (
    <section
      id="contacto"
      className="relative z-20 w-full py-16 px-4 overflow-hidden flex justify-center"
    >
      <motion.div
        className="
          relative w-full max-w-[1100px] h-[380px]
          flex items-center justify-center
          rounded-[3rem] overflow-hidden

          bg-white/[0.06]
          backdrop-blur-xl
          border border-white/20

          shadow-[0_8px_40px_rgba(0,0,0,0.35)]
          
          before:absolute before:inset-0 before:rounded-[3rem]
          before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent
          before:opacity-60 before:pointer-events-none

          after:absolute after:inset-0 after:rounded-[3rem]
          after:bg-gradient-to-tl after:from-white/10 after:via-transparent after:to-transparent
          after:opacity-50 after:pointer-events-none
        "
        initial={{ opacity: 0, y: 80, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Content */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-6 text-center gap-8">
          
          {/* TEXT */}
          <div className="space-y-4 max-w-2xl">
            <motion.h2
              className="text-4xl md:text-6xl font-semibold text-white tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Trayectoria + Objetivo
            </motion.h2>

            <motion.p
              className="text-base md:text-xl text-white/70 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              Llevamos tu proyecto al siguiente nivel con tecnología que impulsa tu negocio.
            </motion.p>
          </div>

          {/* CTA */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
          >
            {/* Glow más suave y elegante */}
            <div className="absolute inset-0 bg-white/20 blur-2xl rounded-full scale-125 opacity-60"></div>

            <MagneticButton
              className="
                relative z-10
                rounded-full
                px-8 py-4
                text-base md:text-lg
                
                bg-white text-black
                hover:bg-white/90
                
                transition-all duration-300
                shadow-lg shadow-white/10
              "
              onClick={onContactClick}
            >
              Contáctanos
            </MagneticButton>
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}
