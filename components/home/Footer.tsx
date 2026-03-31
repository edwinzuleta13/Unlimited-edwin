"use client"
import * as React from "react"
import Image from "next/image"
import BotonConSonido from "@/components/BotonConSonido"

interface FooterProps {
  onExploreClick: (id?: string) => void
}

export default function Footer({ onExploreClick }: FooterProps) {
  return (
    <footer className="py-8 px-4 border-t border-purple-500/20 relative z-[9999]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/logo-Untitled-10.png"
              alt="Untitled Tech Logo"
              width={100}
              height={100}
              className="mb-4"
            />
            <p className="text-sm text-gray-400">
              Transformando empresas a través de soluciones tecnológicas innovadoras
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-4">Servicios</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <BotonConSonido onClick={() => onExploreClick("servicios")} className="hover:text-purple-400">
                  Desarrollo Web y Móvil
                </BotonConSonido>
              </li>
              <li>
                <BotonConSonido onClick={() => onExploreClick("servicios")} className="hover:text-purple-400">
                  CRM y ERP
                </BotonConSonido>
              </li>
              <li>
                <BotonConSonido onClick={() => onExploreClick("servicios")} className="hover:text-purple-400">
                  Cloud Solutions
                </BotonConSonido>
              </li>
              <li>
                <BotonConSonido onClick={() => onExploreClick("servicios")} className="hover:text-purple-400">
                  Inteligencia Artificial
                </BotonConSonido>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Empresa</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>Sobre Nosotros</li>
              <li>Casos de Éxito</li>
              <li>Blog</li>
              <li>Carreras</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=untitledtechcompany@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-purple-400 transition-colors underline underline-offset-2"
                >
                  untitledtechcompany@gmail.com
                </a>
              </li>
              <li>+58 424-3296034</li>
              <li>Valencia, Venezuela. </li>
              <li>Lima, Peru. </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-purple-500/20 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Untitled Tech Company. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
