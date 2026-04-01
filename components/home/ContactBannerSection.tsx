"use client"
import * as React from "react"
import { motion } from "framer-motion"
import MagneticButton from "@/components/magnetic-button"

interface ContactBannerSectionProps {
  onContactClick: () => void
}

export default function ContactBannerSection({ onContactClick }: ContactBannerSectionProps) {
  return (
    <section id="contacto" className="relative z-20 w-full py-12 px-4 overflow-hidden">
      <motion.div
        className="relative w-full max-w-[95vw] mx-auto h-[350px] flex items-center justify-center rounded-[4rem] overflow-hidden border border-white/50 shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] bg-black/20 backdrop-blur-sm group before:absolute before:inset-0 before:rounded-[4rem] before:bg-gradient-to-br before:from-white/60 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-[4rem] after:bg-gradient-to-tl after:from-white/30 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none"



        initial={{ opacity: 0, y: 100, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        {/* Background Image with Zoom Effect and Soft Blur - Hidden for testing */}
        {/*
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 opacity-60 blur-[2px]"
          style={{ 
            backgroundImage: "url('/wachinton.png')",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          }}
        ></div>
        */}



        {/* Content - botón y texto centrados */}
        <div className="relative z-10 w-full flex flex-col items-center justify-center px-6 text-center gap-10">
          <div className="space-y-4 max-w-3xl">
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-white ALONGSANSS-REGULAR tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Trayectoria + Objetivo
            </motion.h2>
            <motion.p 
              className="text-lg md:text-2xl text-white/80 AlongSanss2-Thin leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Llevamos tu proyecto al siguiente nivel con tecnología que impulsa tu negocio.
            </motion.p>
          </div>

          <motion.div 
            className="inline-block relative"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {/* Subtle glow behind button */}
            <div className="absolute inset-0 bg-purple-500/20 blur-2xl rounded-full scale-150"></div>
            
            <MagneticButton
              className="glow rounded-full glass-effect-2 border-2 border-purple-500 hover:bg-purple-500/10 text-lg px-8 py-6"
              onClick={onContactClick}
            >
              Contactanos
            </MagneticButton>
          </motion.div>
        </div>

      </motion.div>
    </section>
  )
}
