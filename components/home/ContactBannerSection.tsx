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
      className="relative w-full py-24 px-6 bg-[#070312] overflow-hidden"
    >
      {/* Glow superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/30 blur-[120px] opacity-60"></div>

      {/* Title */}
      <div className="text-center mb-16">
        <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
          Contactanos
        </h2>
        <p className="text-white/50 mt-2 text-sm">
          Home • Contacts
        </p>
      </div>

      {/* Main container */}
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* LEFT SIDE */}
        <div className="space-y-8">
          <h3 className="text-3xl md:text-4xl font-semibold text-white leading-tight">
            Trabajemos juntos y<br />creemos soluciones a medida. 
          </h3>

          <div className="relative inline-block">
            {/* Glow botón */}
            <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full scale-150"></div>

            <MagneticButton
              onClick={() => window.open("https://wa.me/584243296034", "_blank")}
              className="relative px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition"
            >
              WhatsApp
            </MagneticButton>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6 text-white/70 text-sm">
          <p className="max-w-md">
            Llevamos tu proyecto al siguiente nivel, con tecnología que impulsa tu negocio.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-white text-xs mb-1">DIRECCION:</p>
              <p>Valencia, Venezuela</p>
              <p>Lima, Perú</p>
            </div>

            <div>
              <p className="text-white text-xs mb-1">TELEFONO:</p>
              <p>+58-4243296034</p>
            </div>

            <div>
              <p className="text-white text-xs mb-1">EMAIL:</p>
              <p>untitledtechcompany@gmail.com</p>
            </div>

            <div>
              <p className="text-white text-xs mb-1">REDES SOCUALES:</p>
              <div className="flex gap-3 text-white">
                <span className="hover:text-purple-400 cursor-pointer">X</span>
                <span className="hover:text-purple-400 cursor-pointer">Fb</span>
                <span className="hover:text-purple-400 cursor-pointer">In</span>
                <span className="hover:text-purple-400 cursor-pointer">Ig</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
