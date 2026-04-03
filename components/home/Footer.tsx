"use client"
import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { FaTiktok } from "react-icons/fa6"
import BotonConSonido from "@/components/BotonConSonido"

interface FooterProps {
  onExploreClick: (id?: string) => void
}

export default function Footer({ onExploreClick }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: <FaTiktok />, href: "https://www.tiktok.com/@untitledtechco1?_r=1&_t=ZS-95CoPLSvG0z", label: "TikTok", hoverClass: "hover:text-white" },
    { icon: <Linkedin />, href: "https://www.linkedin.com/company/untitled-tech-company/", label: "LinkedIn", hoverClass: "hover:text-blue-500" },
    { icon: <Instagram />, href: "https://www.instagram.com/untitledtechco?igsh=MWdwd3U1Mjhia2g=", label: "Instagram", hoverClass: "hover:text-pink-500" },
  ];

  const footerLinks = [
    {
      title: "Servicios",
      links: [
        { name: "Desarrollo Web & Móvil", href: "servicios" },
        { name: "CRM & ERP", href: "servicios" },
        { name: "Cloud Solutions", href: "servicios" },
        { name: "Inteligencia Artificial", href: "servicios" },
      ],
    },
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          
          {/* Brand & Socials */}
          <div className="space-y-8 flex flex-col items-center md:items-start">
            <Image
              src="/logo-Untitled-10.png"
              alt="Untitled Tech Logo"
              width={120}
              height={120}
              className="object-contain"
            />
            <div className="flex gap-6">
              {socialLinks.map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white text-xl transition-all duration-300 ${social.hoverClass}`}
                  whileHover={{ scale: 1.2, y: -2 }}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column, idx) => (
            <div key={idx} className="flex flex-col items-center md:items-start w-full md:w-auto">
              <h4 className="text-white ALONGSANSS-REGULAR text-sm uppercase tracking-[0.2em] mb-8 text-center md:text-left w-full">
                {column.title}
              </h4>
              <ul className="space-y-4 w-full">
                {column.links.map((link, linkIdx) => (
                  <li key={linkIdx} className="w-full">
                    <BotonConSonido
                      onClick={() => onExploreClick(link.href)}
                      className="text-white/80 hover:text-purple-400 AlongSanss2-Thin text-sm transition-colors duration-200 block w-full text-center md:text-left"
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
