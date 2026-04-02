"use client"
import * as React from "react"
import { motion } from "framer-motion"
import MagneticButton from "@/components/magnetic-button"
import { Twitter, Facebook, Linkedin, Instagram } from "lucide-react"
import { FaWhatsapp } from "react-icons/fa"

interface ContactBannerSectionProps {
  onContactClick: () => void
}

export default function ContactBannerSection({ onContactClick }: ContactBannerSectionProps) {
  return (
    <section
      id="contacto"
      className="relative w-full py-24 px-6 bg-purple-950/40 backdrop-blur-2xl overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/20 blur-[120px] opacity-60"></div>

      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10"
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* LEFT SIDE */}
        <div className="space-y-8">
          <h3 className="text-3xl md:text-4xl text-white leading-tight ALONGSANSS-REGULAR">
            Trabajemos juntos y<br />creemos soluciones a medida. 
          </h3>

          <div className="relative inline-block group">
            {/* Glow botón */}
            <div className="absolute inset-0 bg-purple-500/30 blur-2xl rounded-full scale-150 opacity-50 group-hover:opacity-80 transition-opacity"></div>

            <MagneticButton
              onClick={() => window.open("https://wa.me/584243296034", "_blank")}
              className="relative px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 transition group"
            >
              <div className="flex items-center gap-3">
                <div className="bg-purple-500 p-1.5 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-110 transition-transform duration-300">
                  <FaWhatsapp className="w-5 h-5 text-white" />
                </div>
                <span className="tracking-wide AlongSanss2-Thin">WhatsApp</span>
              </div>
            </MagneticButton>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6 text-white/70 text-sm AlongSanss2-Thin">
          <p className="max-w-md AlongSanss2-Thin">
            Llevamos tu proyecto al siguiente nivel, con tecnología que impulsa tu negocio.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-white/60 text-xs mb-1 AlongSanss2-Thin uppercase tracking-widest">Dirección:</p>
              <p className="text-white/80 AlongSanss2-Thin">Valencia, Venezuela</p>
              <p className="text-white/80 AlongSanss2-Thin">Lima, Perú</p>
            </div>

            <div>
              <p className="text-white/60 text-xs mb-1 AlongSanss2-Thin uppercase tracking-widest">Teléfono:</p>
              <a 
                href="https://wa.me/584243296034" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-white/80 hover:text-purple-400 transition-colors duration-300 block AlongSanss2-Thin"
              >
                +58-4243296034
              </a>
            </div>

            <div>
              <p className="text-white/60 text-xs mb-1 AlongSanss2-Thin uppercase tracking-widest">E-mail:</p>
              <a 
                href="mailto:untitledtechcompany@gmail.com" 
                className="text-white/80 hover:text-purple-400 transition-colors duration-300 block AlongSanss2-Thin"
              >
                untitledtechcompany@gmail.com
              </a>
            </div>

            <div>
              <p className="text-white/60 text-xs mb-1 AlongSanss2-Thin uppercase tracking-widest">Redes Sociales:</p>
              <div className="flex gap-4 text-white/50 pt-1">
                <Facebook className="w-5 h-5 hover:text-blue-600 cursor-pointer transition-colors duration-300" />
                <Linkedin className="w-5 h-5 hover:text-blue-500 cursor-pointer transition-colors duration-300" />
                <Instagram className="w-5 h-5 hover:text-pink-500 cursor-pointer transition-colors duration-300" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
