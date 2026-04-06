"use client"
import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import BotonConSonido from "@/components/BotonConSonido"

interface FooterProps {
  onExploreClick: (id?: string) => void
}

export default function Footer({ onExploreClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: "Empresa",
      links: [
        { name: "Sobre Nosotros", href: "sobre-nosotros" },
        { name: "Casos de Éxito", href: "aliados" },
        { name: "Nuestros Aliados", href: "aliados" },
        { name: "Contacto", href: "contacto" },
      ],
    },
  ];

  return (
    <footer className="relative mt-24 pt-16 pb-12 px-4 border-t border-white/10 backdrop-blur-sm isolate">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 text-center">
          
          {/* Logo */}
          <div className="flex flex-col items-center">
            <Image
              src="/logo-Untitled-10.png"
              alt="Untitled Tech Logo"
              width={120}
              height={120}
              className="object-contain"
            />
          </div>

          {/* Link Columns */}
          {footerLinks.map((column, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <h4 className="text-white ALONGSANSS-REGULAR text-sm uppercase tracking-[0.2em] mb-8">
                {column.title}
              </h4>
              <ul className="space-y-4">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <BotonConSonido
                      onClick={() => onExploreClick(link.href)}
                      className="text-white/80 hover:text-purple-400 AlongSanss2-Thin text-sm transition-colors duration-200 block text-center"
                    >
                      {link.name}
                    </BotonConSonido>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-white/60 text-[10px] AlongSanss2-Thin uppercase tracking-[0.3em] text-center md:text-left">
          <p className="w-full md:w-auto">© {currentYear} Untitled Tech Company. All rights reserved.</p>
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10 w-full md:w-auto justify-center">
            <span className="hover:text-white cursor-pointer transition-colors duration-300">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors duration-300">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
