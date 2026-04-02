"use client"
import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import BotonConSonido from "@/components/BotonConSonido"

interface FooterProps {
  onExploreClick: (id?: string) => void
}

export default function Footer({ onExploreClick }: FooterProps) {
  return (
    <footer className="my-19 py-8 px-4 border-t border-purple-500/20 relative z-[9999]">
      <motion.div
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/logo-Untitled-10.png"
              alt="Untitled Tech Logo"
              width={100}
              height={100}
              className="mb-4"
            />
          </div>
          <div>
            <h3 className="mb-4 ALONGSANSS-REGULAR text-white">Servicios</h3>
            <ul className="space-y-2 text-sm text-gray-400 AlongSanss2-Thin">
              <li>
                <BotonConSonido onClick={() => onExploreClick("servicios")} className="hover:text-purple-400 AlongSanss2-Thin">
                  Desarrollo Web y Móvil
                </BotonConSonido>
              </li>
              <li>
                <BotonConSonido onClick={() => onExploreClick("servicios")} className="hover:text-purple-400 AlongSanss2-Thin">
                  CRM y ERP
                </BotonConSonido>
              </li>
              <li>
                <BotonConSonido onClick={() => onExploreClick("servicios")} className="hover:text-purple-400 AlongSanss2-Thin">
                  Cloud Solutions
                </BotonConSonido>
              </li>
              <li>
                <BotonConSonido onClick={() => onExploreClick("servicios")} className="hover:text-purple-400 AlongSanss2-Thin">
                  Inteligencia Artificial
                </BotonConSonido>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 ALONGSANSS-REGULAR text-white">Empresa</h3>
            <ul className="space-y-2 text-sm text-gray-400 AlongSanss2-Thin">
              <li className="AlongSanss2-Thin">Sobre Nosotros</li>
              <li className="AlongSanss2-Thin">Casos de Éxito</li>
              <li className="AlongSanss2-Thin">Blog</li>
              <li className="AlongSanss2-Thin">Carreras</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-purple-500/20 mt-8 pt-8 text-center text-sm text-gray-400 AlongSanss2-Thin">
          <p className="AlongSanss2-Thin">© {new Date().getFullYear()} Untitled Tech Company. Todos los derechos reservados.</p>
        </div>
      </motion.div>
    </footer>
  )
}
