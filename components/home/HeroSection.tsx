"use client"
import * as React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import MagneticButton from "@/components/magnetic-button"
import { ChevronDown } from "lucide-react"


interface HeroSectionProps {
  onContactClick: () => void
  onExploreClick: (id?: string) => void
}

export default function HeroSection({ onContactClick, onExploreClick }: HeroSectionProps) {
  const [pexelsVideoUrl, setPexelsVideoUrl] = useState<string>("")

  // Fetch video URL from our server API (`/api/pexels-media`)
  useEffect(() => {
    const userPage = "https://www.pexels.com/video/point-of-view-of-a-person-riding-a-bus-5821984"
    const match = userPage.match(/-(\d+)(?:\/|$)/)

    const fetchServerMedia = async () => {
      try {
        let endpoint = '/api/pexels-media?type=video'

        if (match) {
          endpoint = `/api/pexels-media?id=${encodeURIComponent(match[1])}&type=video`
        } else {
          const q = 'bus ride'
          endpoint = `/api/pexels-media?query=${encodeURIComponent(q)}&type=video&per_page=1`
        }

        const res = await fetch(endpoint)
        if (!res.ok) return

        const json = await res.json()
        if (json && json.url) {
          setPexelsVideoUrl(json.url)
        }
      } catch (err) {
        console.error('[PEXELS] Error fetching:', err)
      }
    }

    fetchServerMedia()
  }, [])

  return (
    <div 
      className="relative"
      style={{
        maskImage: "linear-gradient(to bottom, black 95%, transparent 100%)",
        WebkitMaskImage: "linear-gradient(to bottom, black 95%, transparent 100%)"
      }}
    >
      {/* BACKGROUND VIDEO */}
      {pexelsVideoUrl && (
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
          src={pexelsVideoUrl}
          autoPlay
          loop
          muted
          playsInline
          crossOrigin="anonymous"
        />
      )}

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/80 pointer-events-none z-10" />

      {/* Header Info removed to be placed at root level */}

      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-32 pb-0 overflow-hidden">
        <div className="relative z-30 w-full flex flex-col items-center justify-center">
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl mb-6 ALONGSANSS-REGULAR text-white"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Untitled Tech Company
          </motion.h1>

          <motion.p
            className="AlongSanss2-Thin text-xl md:text-3xl mb-8 max-w-3xl text-white/90"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Transformamos empresas a través de soluciones tecnológicas innovadoras y personalizadas
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton
              className="glow rounded-full glass-effect-2 border-2 border-purple-500 hover:bg-purple-500/10 text-lg px-8 py-6 AlongSanss2-Thin"
              onClick={() => onExploreClick("servicios")}
            >
              Servicios
            </MagneticButton>
            <MagneticButton
              className="glow rounded-full glass-effect-2 border-2 border-purple-500 hover:bg-purple-500/10 text-lg px-8 py-6 AlongSanss2-Thin"
              onClick={onContactClick}
            >
              Contactanos
            </MagneticButton>
          </motion.div>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="mt-6 flex justify-center cursor-pointer"
            onClick={() => onExploreClick("contacto")}
            role="button"
            tabIndex={0}
            aria-label="Ir a contacto"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault()
                onExploreClick('contacto')
              }
            }}
          >
            <ChevronDown className="w-8 h-8 text-purple-400" />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
