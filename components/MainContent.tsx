"use client"
import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"


import SplashScreen from "@/components/SplashScreen"
import FloatingChatWidget from "@/components/floating-chat-widget"
import AuthNav from "@/components/AuthNav"
import SolicitudModal from "@/components/SolicitudModal"
import TrustedBySection from "@/components/TrustedBySection"
import TechnologicalExpertise from "@/components/technological-expertise"
import PartnershipPlans from "@/components/PartnershipPlans"
import { useTransition } from "@/app/providers"


import HeroSection from "@/components/home/HeroSection"
import StatsSection from "@/components/home/StatsSection"
import ProcessSection from "@/components/home/ProcessSection"
import TechStackSection from "@/components/home/TechStackSection"
import SolutionsSection from "@/components/home/SolutionsSection"
import ContactBannerSection from "@/components/home/ContactBannerSection"
import Footer from "@/components/home/Footer"


export default function MainContent() {
  const { startTransition } = useTransition()
  const containerRef = useRef<HTMLDivElement>(null)

  const [showSplash, setShowSplash] = useState(true)
  const [audioReady, setAudioReady] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioUnlocked, setAudioUnlocked] = useState(false)

  const [isSolicitudOpen, setIsSolicitudOpen] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleExploreClick = (id?: string) => {
    startTransition()
    scrollToSection(id ?? "servicios")
  }

  useEffect(() => {
    if (typeof window !== "undefined" && searchParams?.get("type") === "recovery") {
      router.replace("/reset-password" + window.location.search)
    }
  }, [searchParams, router])

  // AUDIO LOGIC
  useEffect(() => {
    let mounted = true
    const initAudioIfExists = async () => {
      try {
        const res = await fetch('/hover.mp3', { method: 'HEAD' })
        if (!mounted) return
        if (res.ok) {
          audioRef.current = new Audio('/hover.mp3')
          if (audioRef.current) {
            audioRef.current.volume = 0.1
            audioRef.current.oncanplaythrough = () => {
              if (!mounted) return
              setAudioReady(true)
            }
          }
        }
      } catch (err) { }
    }
    initAudioIfExists()

    const tryPlayUnlock = async () => {
      const a = audioRef.current
      if (!a) return
      try {
        await a.play()
        a.pause()
        a.currentTime = 0
      } catch (err) { }
    }

    const markUserInteracted = () => {
      setAudioUnlocked(true)
      tryPlayUnlock()
      document.removeEventListener('pointerdown', markUserInteracted)
      document.removeEventListener('keydown', markUserInteracted)
      document.removeEventListener('touchstart', markUserInteracted)
    }

    const playSound = () => {
      if (!audioUnlocked) return
      const a = audioRef.current
      if (a && a.readyState >= 2) {
        a.currentTime = 0
        a.play().catch(() => { })
      }
    }

    const handleInteractionTrigger = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest('button, a, [role="button"], [data-sound]')
      if (el) playSound()
    }

    document.addEventListener('pointerdown', markUserInteracted)
    document.addEventListener('keydown', markUserInteracted)
    document.addEventListener('touchstart', markUserInteracted)
    document.addEventListener('click', handleInteractionTrigger, true)

    return () => {
      mounted = false
      document.removeEventListener('click', handleInteractionTrigger, true)
      document.removeEventListener('pointerdown', markUserInteracted)
      document.removeEventListener('keydown', markUserInteracted)
      document.removeEventListener('touchstart', markUserInteracted)
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.src = ''
        audioRef.current = null
      }
    }
  }, [audioUnlocked])

  // FAVICON BUST
  useEffect(() => {
    try {
      const href = '/favicon.png?v=' + Date.now()
      const setLink = (rel: string) => {
        let link = document.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null
        if (!link) {
          link = document.createElement('link')
          link.setAttribute('rel', rel)
          document.head.appendChild(link)
        }
        link.setAttribute('href', href)
      }
      setLink('icon')
      setLink('shortcut icon')
      setLink('apple-touch-icon')
    } catch { }
  }, [])

  // SPLASH SCREEN
  useEffect(() => {
    if (typeof window === "undefined") return
    setShowSplash(true)
    const hideSplash = () => setTimeout(() => setShowSplash(false), 800)

    if (document.readyState === "complete") {
      hideSplash()
    } else {
      window.addEventListener("load", hideSplash)
    }
    const fallback = setTimeout(hideSplash, 6000)
    return () => {
      window.removeEventListener("load", hideSplash)
      clearTimeout(fallback)
    }
  }, [])

  return (
    <>
      <AnimatePresence>{showSplash && <SplashScreen />}</AnimatePresence>

      <div
        ref={containerRef}
        className="relative min-h-screen text-white overflow-x-hidden"
        style={{ pointerEvents: showSplash ? "none" : "auto", opacity: showSplash ? 0 : 1, transition: 'opacity 0.8s ease 0.15s' }}
        aria-hidden={showSplash}
      >
        {/* Fixed background image */}
        <div
          className="fixed inset-0 -z-10 pointer-events-none"
          style={{
            backgroundImage: 'url(/fondo.png)',
            backgroundSize: '65%',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundColor: '#000',
          }}
          aria-hidden="true"
        />

        <FloatingChatWidget />
        <SolicitudModal isOpen={isSolicitudOpen} onClose={() => setIsSolicitudOpen(false)} fullScreen={true} />

        <AuthNav />

        <HeroSection onContactClick={() => setIsSolicitudOpen(true)} onExploreClick={handleExploreClick} />

        <StatsSection />
        <ProcessSection />

        <section id="sobre-nosotros">
          <PartnershipPlans />
        </section>

        <TechStackSection />
        <SolutionsSection />

        <section id="aliados">
          <TrustedBySection />
        </section>
        <TechnologicalExpertise />

        <ContactBannerSection onContactClick={() => setIsSolicitudOpen(true)} />

        <Footer onExploreClick={handleExploreClick} />
      </div>
    </>
  )
}