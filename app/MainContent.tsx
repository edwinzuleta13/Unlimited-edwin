"use client"
import * as React from "react"
import TrustedBySection from "@/components/TrustedBySection";
import { Marquee, MarqueeFade, MarqueeContent, MarqueeItem } from '@/components/ui/marquee';
import { SiGithub, SiFacebook, SiGoogle } from '@icons-pack/react-simple-icons';
import TechnologicalExpertise from "@/components/technological-expertise";
import { useRouter, useSearchParams } from "next/navigation";
import AuthNav from '@/components/AuthNav';
import BotonConSonido from "@/components/BotonConSonido";
import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import SplashScreen from "@/components/SplashScreen"
import { Card } from "@/components/ui/card"
import {
  Code,
  Database,
  Linkedin,
  Instagram,
  Twitter,
  Phone,
  ChevronDown,
  ChevronUp,
  Shield,
  Cloud,
  Boxes,
  Brain,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { SlSocialLinkedin } from "react-icons/sl"
import { AiOutlineInstagram } from "react-icons/ai"
import { FaWhatsapp } from "react-icons/fa"
import { FaTiktok } from "react-icons/fa"
import { useMouse } from "@/components/mouse-context"
import { useTransition } from "./providers"
import dynamic from "next/dynamic"
import MagneticButton from "@/components/magnetic-button"
import AnimatedSVG from "@/components/animated-svg"
import TechCursor from "@/components/tech-cursor"
import FloatingChatWidget from "@/components/floating-chat-widget"
import SolicitudModal from "../components/SolicitudModal"
import AnimatedButton from "@/components/AnimatedButton1";
import HolographicCardPurpleMidRect from "@/components/HolographicCardPurpleMidRect";
import PartnershipPlans from "@/components/PartnershipPlans";


const Scene = dynamic(() => import("@/components/scene"), { ssr: false })
const ParticleBackground = dynamic(() => import("@/components/particle-background"), { ssr: false })


export default function Home() {
  const { setCursorVariant } = useMouse()
  const { startTransition } = useTransition()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [showSplash, setShowSplash] = useState(true)
  const [audioReady, setAudioReady] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioUnlocked, setAudioUnlocked] = useState(false)
  const [isSolicitudOpen, setIsSolicitudOpen] = useState(false)
  const [altReload, setAltReload] = useState(0)
  const [servicesReload, setServicesReload] = useState(0)
  const [pexelsVideoUrl, setPexelsVideoUrl] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
    // Fetch video URL from our server API (`/api/pexels-media`) which hides the Pexels key
    useEffect(() => {
      // If you have a Pexels page URL, extract its numeric ID (e.g. ...-5821984)
      const userPage = "https://www.pexels.com/video/point-of-view-of-a-person-riding-a-bus-5821984";
      const match = userPage.match(/-(\d+)(?:\/|$)/);

      const fetchServerMedia = async () => {
        try {
          let endpoint = '/api/pexels-media?type=video';

          if (match) {
            // If we extracted an ID, request the server to fetch by ID
            endpoint = `/api/pexels-media?id=${encodeURIComponent(match[1])}&type=video`;
            console.log('[PEXELS] Requesting server media by id:', match[1]);
          } else {
            // Otherwise use a query fallback
            const q = 'bus ride';
            endpoint = `/api/pexels-media?query=${encodeURIComponent(q)}&type=video&per_page=1`;
            console.log('[PEXELS] Requesting server media by query:', q);
          }

          const res = await fetch(endpoint);
          if (!res.ok) {
            const body = await res.text().catch(() => '<no body>');
            console.error('[PEXELS] /api/pexels-media error', res.status, body);
            return;
          }

          const json = await res.json();
          if (json && json.url) {
            setPexelsVideoUrl(json.url);
            console.log('[PEXELS] Hero video URL set (from server):', json.url);
          } else {
            console.warn('[PEXELS] /api/pexels-media returned no URL', json);
          }
        } catch (err) {
          console.error('[PEXELS] Error fetching /api/pexels-media:', err);
        }
      };

      fetchServerMedia();
    }, []);

    // Log when we receive a video URL (helpful for debugging)
    useEffect(() => {
      if (pexelsVideoUrl) {
        console.log('[PEXELS] pexelsVideoUrl state updated:', pexelsVideoUrl)
      } else {
        console.log('[PEXELS] pexelsVideoUrl is empty')
      }
    }, [pexelsVideoUrl])
  // carousel now uses pure CSS keyframes animation (no JS measurement required)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Toggle between default services layout and alternative one
  const [altLayout, setAltLayout] = useState(false)

 // 1️⃣ Crear array de cards
const allCards = [
  {
    title: "Desarrollo Web y Móvil",
    icon: <Code className="w-8 h-8" />,
    description: "Creamos aplicaciones web y móviles escalables utilizando las últimas tecnologías y mejores prácticas de desarrollo.",
    features: ["Aplicaciones Web Progresivas", "Apps iOS y Android", "Portales Empresariales", "E-commerce"]
  },
  {
    title: "CRM y ERP",
    icon: <Database className="w-8 h-8" />,
    description: "Implementamos y personalizamos sistemas de gestión empresarial adaptados a tus necesidades específicas.",
    features: ["Salesforce", "SAP", "Microsoft Dynamics", "Sistemas Personalizados"]
  },
  {
    title: "Cloud Solutions",
    icon: <Cloud className="w-8 h-8" />,
    description: "Modernizamos tu infraestructura con soluciones cloud que optimizan costos y mejoran la escalabilidad.",
    features: ["AWS", "Azure", "Google Cloud", "Arquitectura Cloud Native"]
  },
  {
    title: "Inteligencia Artificial",
    icon: <Brain className="w-8 h-8" />,
    description: "Implementamos soluciones de IA y Machine Learning para optimizar procesos y tomar mejores decisiones.",
    features: ["Análisis Predictivo", "Procesamiento de Lenguaje Natural", "Computer Vision", "Automatización Inteligente"]
  },
  {
    title: "Ciberseguridad",
    icon: <Shield className="w-8 h-8" />,
    description: "Protegemos tus activos digitales con soluciones de seguridad avanzadas y cumplimiento normativo.",
    features: ["Auditorías de Seguridad", "Implementación Zero Trust", "Gestión de Identidades", "SOC as a Service"]
  },
  {
    title: "Integración de Sistemas",
    icon: <Boxes className="w-8 h-8" />,
    description: "Conectamos tus sistemas y aplicaciones para crear flujos de trabajo eficientes y automatizados.",
    features: ["APIs y Microservicios", "ESB", "ETL", "Automatización de Procesos"]
  },
  {
    title: "E-commerce",
    icon: <Boxes className="w-8 h-8" />,
    description: "Tiendas online personalizadas y optimizadas para convertir más ventas.",
    features: ["Shopify", "WooCommerce", "Pagos y Logística", "Automatización"]
  },
  {
    title: "Chatbots y Automatizaciones",
    icon: <Brain className="w-8 h-8" />,
    description: "Automatizamos flujos de atención y ventas con chatbots inteligentes.",
    features: ["WhatsApp", "Instagram", "Flujos Automatizados", "Integración con CRM"]
  },
  {
    title: "CRM y Soluciones a Medida",
    icon: <Database className="w-8 h-8" />,
    description: "Automatización avanzada y plataformas internas hechas a medida del negocio.",
    features: ["Workflows", "Sistemas Internos", "Integraciones", "Optimización"]
  },
  {
    title: "Aplicaciones Web",
    icon: <Code className="w-8 h-8" />,
    description: "Plataformas web tipo SaaS, dashboards y sistemas empresariales.",
    features: ["SaaS", "ERP", "Dashboards", "PWA"]
  },
  {
    title: "Tecnologías",
    icon: <Code className="w-8 h-8" />,
    description: "Expertos en los lenguajes y frameworks más modernos.",
    features: ["React / Vue / Angular", "Node / Python / PHP", "SQL / NoSQL", "Docker / APIs"]
  },
  {
    title: "Quality Assurance (QA)",
    icon: <Shield className="w-8 h-8" />,
    description: "Aseguramos calidad, rendimiento y seguridad en todos los proyectos.",
    features: ["Pruebas Funcionales", "Usabilidad", "Seguridad", "Optimización"]
  }
];
  // removed JS width measurement — CSS keyframes will handle continuous scroll

useEffect(() => {
  // Solo ejecuta en el cliente y si searchParams está disponible
  if (typeof window !== "undefined" && searchParams?.get("type") === "recovery") {
    router.replace("/reset-password" + window.location.search);
  }
  // eslint-disable-next-line
}, [searchParams, router]);

  useEffect(() => {
    setIsLoaded(true)

    // Comprobar si el asset de audio existe antes de crear un objeto Audio.
    // Evita warnings si el archivo no está presente en /public.
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
              console.log('[AUDIO] Audio listo para reproducir')
            }
          }
        } else {
          console.warn('🔇 /hover.mp3 no existe (HEAD returned ' + res.status + ')')
        }
      } catch (err) {
        console.warn('🔇 Error comprobando /hover.mp3:', err)
      }
    }

    initAudioIfExists()

    const tryPlayUnlock = async () => {
      // Intento de reproducir para "desbloquear" la política de autoplay del navegador.
      const a = audioRef.current
      if (!a) return
      try {
        await a.play()
        a.pause()
        a.currentTime = 0
        console.log('[AUDIO] Audio desbloqueado por interacción')
      } catch (err) {
        console.warn('[AUDIO] Falló el unlock:', err)
        // Ignoramos errores aquí: si falla, seguiremos esperando otra interacción válida
      }
    }

    const markUserInteracted = (e?: Event) => {
      setAudioUnlocked(true)
      console.log('[AUDIO] Usuario interactuó, desbloqueando audio')
      tryPlayUnlock()
      // una vez desbloqueado no necesitamos estos listeners
      document.removeEventListener('pointerdown', markUserInteracted)
      document.removeEventListener('keydown', markUserInteracted)
      document.removeEventListener('touchstart', markUserInteracted)
    }


    const playSound = () => {
      if (!audioUnlocked) {
        console.log('[AUDIO] Intento de reproducir sonido antes de unlock')
        return // no reproducir hasta que usuario interactúe
      }
      const a = audioRef.current
      if (a && a.readyState >= 2) {
        a.currentTime = 0
        a.play().then(() => {
          console.log('[AUDIO] Sonido reproducido')
        }).catch((error) => console.error('Error al reproducir el audio:', error))
      } else {
        console.log('[AUDIO] Audio no listo (readyState:', a?.readyState, ')')
      }
    }

    const handleInteractionTrigger = (e: MouseEvent) => {
      // Disparador más amplio: botones reales, enlaces, elementos con role="button" o marcado con data-sound
      const el = (e.target as HTMLElement).closest('button, a, [role="button"], [data-sound]') as HTMLElement | null
      if (el) {
        console.log('[AUDIO] Evento detectado en', el.tagName, el.className)
        playSound()
      }
    }

    // Listeners para "desbloquear" la reproducción en el primer gesto del usuario
    document.addEventListener('pointerdown', markUserInteracted)
    document.addEventListener('keydown', markUserInteracted)
    document.addEventListener('touchstart', markUserInteracted)

  // Escuchar clicks (en fase de captura) para reproducir sonido en elementos interactivos.
  // Usamos captura para asegurarnos de atrapar el evento incluso si algún handler en la cadena
  // llama a stopPropagation() en la fase de burbujeo.
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
  }, [])


  const handleExploreClick = (id?: string) => {
    startTransition()
    scrollToSection(id ?? "servicios")
  }

  // Nota: la reproducción ahora la maneja el listener global de 'click' en document

  // Force-set favicon from client to bypass aggressive caching in some browsers
useEffect(() => {
  try {
    const href = '/favicon.png?v=' + Date.now()

    const setLink = (rel: string, type?: string) => {
      let link = document.querySelector(`link[rel='${rel}']`) as HTMLLinkElement | null
      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', rel)
        document.head.appendChild(link)
      }
      link.setAttribute('href', href)
      if (type) link.setAttribute('type', type)
    }

    setLink('icon', 'image/png')
    setLink('shortcut icon', 'image/png')
    setLink('apple-touch-icon', 'image/png')
  } catch (e) {
    console.warn('favicon injection failed', e)
  }
}, [])

// Mostrar SplashScreen hasta que la página termine de cargar (evento window.load)
// Mostrar SplashScreen inmediatamente y ocultarlo al finalizar carga
useEffect(() => {
  if (typeof window === "undefined") return

  // Asegurarnos de que el splash esté visible desde el primer render
  setShowSplash(true)

  const hideSplash = () => {
    // pequeña pausa para permitir animación de salida
    setTimeout(() => setShowSplash(false), 800)
  }

  if (document.readyState === "complete") {
    hideSplash()
  } else {
    window.addEventListener("load", hideSplash)
  }

  // Fallback por si la carga falla o tarda demasiado
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
      className="relative min-h-screen text-white overflow-x-hidden cursor-none"
      style={{ pointerEvents: showSplash ? "none" : "auto", opacity: showSplash ? 0 : 1, transition: 'opacity 0.8s ease 0.15s' }}
      aria-hidden={showSplash}
    >
      {/* Fondo animado global: cubre todo el sitio desde hero hacia abajo */}
      <div className="absolute inset-0 -z-10">
        <ParticleBackground />
        <div className="fixed inset-0 noise" />
      </div>
      <TechCursor />

      {/* Wrapper que contiene header + hero: solo el video y overlay */}
      <div className="relative">
        {/* VIDEO DE FONDO (cubre header y hero) */}
        {pexelsVideoUrl && (
          <video
            className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            src={pexelsVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            crossOrigin="anonymous"
            onLoadedData={() => console.log('[VIDEO] Header+Hero video loaded successfully:', pexelsVideoUrl)}
            onError={(e) => console.error('[VIDEO] Header+Hero video failed to load:', pexelsVideoUrl, e)}
          />
        )}

        {/* overlay entre video y contenido (aumentada para mayor oscuridad) */}
<div className="absolute inset-0 bg-black/80 pointer-events-none z-10" />

{/* degradado extra en la parte inferior */}
<div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black pointer-events-none z-20" />


        <header className="relative z-30 w-full py-6 px-8 flex justify-end">
          <AuthNav />
        </header>

        <FloatingChatWidget />

        <SolicitudModal isOpen={isSolicitudOpen} onClose={() => setIsSolicitudOpen(false)} fullScreen={true} />

        {/* Hero Section */}

        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-0 -mt-6 pb-0 overflow-hidden">
          {/* Contenido principal del Hero */}
          <div className="relative z-30 w-full flex flex-col items-center justify-center">
    <motion.h1
      className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 gradient-text"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      Untitled Tech Company
    </motion.h1>

    <motion.p
      className="text-xl md:text-2xl mb-8 text-purple-300 max-w-3xl"
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
        className="bg-transparent border border-purple-500 hover:bg-purple-500/10 text-lg px-8 py-6"
        onClick={() => scrollToSection("servicios")}
      >
        Servicios
      </MagneticButton>
      <MagneticButton
        className="glow bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6"
        onClick={() => handleExploreClick("contacto")}
      >
        Contactanos
      </MagneticButton>
    </motion.div>

    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      className="mt-6 flex justify-center cursor-pointer"
      onClick={() => handleExploreClick("contacto")}
      role="button"
      tabIndex={0}
      aria-label="Ir a contacto"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault()
          handleExploreClick('contacto')
        }
      }}
    >
      <ChevronDown className="w-8 h-8 text-purple-400" />
    </motion.div>
  </div>
</section>

  </div>

{/* Stats Section */}
<section className="relative pt-20 px-4 -mt-10 bg-transparent overflow-visible">

  {/* Degradado SOLO en el padding superior (invertido literalmente) */}
  <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-10" />

  <div className="container mx-auto relative z-20">
    <div className="stats-grid">
      <StatCard number="100+" text="Proyectos Completados" />
      <StatCard number="50+" text="Clientes Satisfechos" />
      <StatCard number="15+" text="Expertos en Tecnología" />
      <StatCard number="24/7" text="Soporte Técnico" />
    </div>
  </div>
</section>




{/* Process Section */}
<section id="proceso" className="py-20 px-4">
  <div className="container mx-auto">
    <motion.div
      className="text-center mb-16"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">Nuestro Proceso</h2>
      <p className="text-lg text-purple-300 max-w-2xl mx-auto">
        Un enfoque metodológico que garantiza resultados excepcionales en cada proyecto
      </p>
    </motion.div>

    {/* Responsive grid: ajusta columnas/espaciado según tu diseño */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <HolographicCardPurpleMidRect>
        <div className="h-full flex flex-col justify-center items-center text-center">
          <div className="flex flex-col items-center w-full">
            <h3 className="text-xl font-semibold text-white">Descubrimiento</h3>
            <span className="text-sm text-purple-200"></span>
          </div>
          <p className="mt-3 text-purple-200 text-center">
            Analizamos tus necesidades y objetivos para diseñar la solución perfecta
          </p>
        </div>
      </HolographicCardPurpleMidRect>

      <HolographicCardPurpleMidRect>
        <div className="h-full flex flex-col justify-center items-center text-center">
          <div className="flex flex-col items-center w-full">
            <h3 className="text-xl font-semibold text-white">Planificación</h3>
            <span className="text-sm text-purple-200"></span>
          </div>
          <p className="mt-3 text-purple-200 text-center">
            Definimos la arquitectura y roadmap del proyecto
          </p>
        </div>
      </HolographicCardPurpleMidRect>

      <HolographicCardPurpleMidRect>
        <div className="h-full flex flex-col justify-center items-center text-center">
          <div className="flex flex-col items-center w-full">
            <h3 className="text-xl font-semibold text-white">Desarrollo</h3>
            <span className="text-sm text-purple-200"></span>
          </div>
          <p className="mt-3 text-purple-200 text-center">
            Implementamos la solución usando metodologías ágiles
          </p>
        </div>
      </HolographicCardPurpleMidRect>

      <HolographicCardPurpleMidRect>
        <div className="h-full flex flex-col justify-center items-center text-center">
          <div className="flex flex-col items-center w-full">
            <h3 className="text-xl font-semibold text-white">Despliegue</h3>
            <span className="text-sm text-purple-200"></span>
          </div>
          <p className="mt-3 text-purple-200 text-center">
            Lanzamos tu solución con un plan de adopción gradual
          </p>
        </div>
      </HolographicCardPurpleMidRect>
    </div>
  </div>
</section>





{/*About us secction*/}
<section>
      <PartnershipPlans />
</section>




{/* Test Marquee (logos) */}
<section className="py-20 px-4 bg-black/60 relative">

  {/* Fondo negro con degradado */}
  <div className="absolute inset-0 pointer-events-none z-0 bg-gradient-to-b from-black/80 to-transparent" />

  <div className="container mx-auto relative z-20">

    {/* Texto superior */}
    <motion.div
      className="text-center mb-16"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
        Stack Tecnológico Avanzado
      </h1>
      <p className="text-lg text-purple-300 max-w-2xl mx-auto">
        Dominamos las tecnologías más innovadoras para ofrecer soluciones de vanguardia
      </p>
    </motion.div>

    {/* === MARQUEE === */}
    {(() => {
      const techLogos = [
        { name: "React", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
        { name: "Node.js", icon: "https://nodejs.org/static/images/logo.svg" },
        { name: "Python", icon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
        { name: "AWS", icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
        { name: "Docker", icon: "https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png" },
        { name: "Kubernetes", icon: "/icons/kubernetes.svg" },
        { name: "TensorFlow", icon: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg" },
        { name: "PostgreSQL", icon: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
        { name: "GraphQL", icon: "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg" },
        { name: "Rust", icon: "/icons/rust.svg" },
        { name: "Vue.js", icon: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" },
        { name: "Golang", icon: "https://go.dev/blog/go-brand/Go-Logo/SVG/Go-Logo_Blue.svg" },
      ];

      // NOTA: Asume que Marquee, MarqueeContent y MarqueeItem son componentes definidos que
      // internamente pueden o no usar motion.div. Los dejo como estaban ya que Marquee
      // suele manejar su propia animación.
      return (
        <Marquee
          className="
            w-screen
            relative left-1/2 right-1/2
            -ml-[50vw] -mr-[50vw]
            overflow-hidden py-10
          "
        >
          <MarqueeContent speed={40}>
            {techLogos.map((tech) => (
              <MarqueeItem key={tech.name} className="mx-12 flex flex-col items-center">
                <img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-16 h-16 object-contain opacity-90 hover:opacity-100 transition"
                />
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      );
    })()}

  </div>

  {/* === CONTENIDO COMPLETO ORGANIZADO === */}
  <div className="relative">

    {/* Degradado inferior */}
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-transparent z-30" />

    {/* GRID DE TARJETAS */}
<div className="pt-[40px] px-4 relative z-20">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

    {/* CARD 1: Frontend */}
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="
        group relative bg-white/10 backdrop-blur-xl 
        p-7 rounded-2xl shadow-xl border border-purple-500/20 
        transition-all duration-500 
        hover:bg-white/20 
        hover:scale-[1.03] 
        hover:shadow-purple-500/20 
        hover:border-purple-500/30
        hover:-translate-y-1
      "
    >
      <div
        className="
          absolute inset-0 rounded-2xl 
          bg-gradient-to-br from-purple-500/10 to-purple-800/10 
          opacity-0 group-hover:opacity-100 
          blur-xl transition-all duration-700
        "
      />

      <h2 className="text-3xl font-bold text-purple-200 text-center drop-shadow-[0_0_12px_rgba(170,100,255,0.25)]">
        Frontend
      </h2>

      <h3 className="text-xl font-semibold text-purple-400/80 mt-2 text-center">
        React, Vue.js, Angular
      </h3>

      <p className="mt-3 text-purple-100/80 text-center leading-relaxed">
        Desarrollo de interfaces modernas y escalables, con componentes reutilizables y arquitectura avanzada.
      </p>
    </motion.div>

    {/* CARD 2: Backend */}
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="
        group relative bg-white/10 backdrop-blur-xl 
        p-7 rounded-2xl shadow-xl border border-purple-500/20 
        transition-all duration-500 
        hover:bg-white/20 
        hover:scale-[1.03] 
        hover:shadow-purple-500/20 
        hover:border-purple-500/30
        hover:-translate-y-1
      "
    >
      <div
        className="
          absolute inset-0 rounded-2xl 
          bg-gradient-to-br from-purple-500/10 to-purple-800/10 
          opacity-0 group-hover:opacity-100 
          blur-xl transition-all duration-700
        "
      />

      <h2 className="text-3xl font-bold text-purple-200 text-center drop-shadow-[0_0_12px_rgba(170,100,255,0.25)]">
        Backend
      </h2>

      <h3 className="text-xl font-semibold text-purple-400/80 mt-2 text-center">
        Node.js, Express, Nest.js
      </h3>

      <p className="mt-3 text-purple-100/80 text-center leading-relaxed">
        Desarrollo de servidores y APIs eficientes y seguras, optimizadas para alto rendimiento.
      </p>

      <h3 className="text-xl font-semibold text-purple-300 mt-4 text-center">
        Golang
      </h3>

      <p className="mt-3 text-purple-100/80 text-center leading-relaxed">
        Microservicios concurrentes y de alto desempeño.
      </p>
    </motion.div>

    {/* CARD 3: Bases de Datos */}
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="
        group relative bg-white/10 backdrop-blur-xl 
        p-7 rounded-2xl shadow-xl border border-purple-500/20 
        transition-all duration-500 
        hover:bg-white/20 
        hover:scale-[1.03] 
        hover:shadow-purple-500/20 
        hover:border-purple-500/30
        hover:-translate-y-1
      "
    >
      <div
        className="
          absolute inset-0 rounded-2xl 
          bg-gradient-to-br from-purple-500/10 to-purple-800/10 
          opacity-0 group-hover:opacity-100 
          blur-xl transition-all duration-700
        "
      />

      <h2 className="text-3xl font-bold text-purple-200 text-center drop-shadow-[0_0_12px_rgba(170,100,255,0.25)]">
        Bases de Datos
      </h2>

      <h3 className="text-xl font-semibold text-purple-400/80 mt-2 text-center">
        PostgreSQL, MySQL, MongoDB
      </h3>

      <p className="mt-3 text-purple-100/80 text-center leading-relaxed">
        Diseño de bases relacionales y no relacionales optimizadas para consultas rápidas.
      </p>

      <h3 className="text-xl font-semibold text-purple-300 mt-4 text-center">
        Firebase & Redis
      </h3>

      <p className="mt-3 text-purple-100/80 text-center leading-relaxed">
        Soluciones en tiempo real y caching de alto rendimiento.
      </p>
    </motion.div>

    {/* CARD 4: IA y ML */}
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="
        group relative bg-white/10 backdrop-blur-xl 
        p-7 rounded-2xl shadow-xl border border-purple-500/20 
        transition-all duration-500 
        hover:bg-white/20 
        hover:scale-[1.03] 
        hover:shadow-purple-500/20 
        hover:border-purple-500/30
        hover:-translate-y-1
      "
    >
      <div
        className="
          absolute inset-0 rounded-2xl 
          bg-gradient-to-br from-purple-500/10 to-purple-800/10 
          opacity-0 group-hover:opacity-100 
          blur-xl transition-all duration-700
        "
      />

      <h2 className="text-3xl font-bold text-purple-200 text-center drop-shadow-[0_0_12px_rgba(170,100,255,0.25)]">
        IA y ML
      </h2>

      <h3 className="text-xl font-semibold text-purple-400/80 mt-2 text-center">
        TensorFlow, PyTorch, Python
      </h3>

      <p className="mt-3 text-purple-100/80 text-center leading-relaxed">
        Modelos de deep learning para visión por computadora, NLP y análisis predictivo.
      </p>
    </motion.div>

    {/* CARD 5: Infraestructura y Cloud */}
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="
        group relative bg-white/10 backdrop-blur-xl 
        p-7 rounded-2xl shadow-xl border border-purple-500/20 
        transition-all duration-500 
        hover:bg-white/20 
        hover:scale-[1.03] 
        hover:shadow-purple-500/20 
        hover:border-purple-500/30
        hover:-translate-y-1
      "
    >
      <div
        className="
          absolute inset-0 rounded-2xl 
          bg-gradient-to-br from-purple-500/10 to-purple-800/10 
          opacity-0 group-hover:opacity-100 
          blur-xl transition-all duration-700
        "
      />

      <h2 className="text-3xl font-bold text-purple-200 text-center drop-shadow-[0_0_12px_rgba(170,100,255,0.25)]">
        Infraestructura y Cloud
      </h2>

      <h3 className="text-xl font-semibold text-purple-400/80 mt-2 text-center">
        AWS, Google Cloud, Azure
      </h3>

      <p className="mt-3 text-purple-100/80 text-center leading-relaxed">
        Arquitectura escalable y segura en la nube.
      </p>

      <h3 className="text-xl font-semibold text-purple-300 mt-4 text-center">
        Docker & Kubernetes
      </h3>

      <p className="mt-3 text-purple-100/80 text-center leading-relaxed">
        Contenedores y orquestación profesional.
      </p>
    </motion.div>

    {/* CARD 6: APIs y Comunicación */}
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="
        group relative bg-white/10 backdrop-blur-xl 
        p-7 rounded-2xl shadow-xl border border-purple-500/20 
        transition-all duration-500 
        hover:bg-white/20 
        hover:scale-[1.03] 
        hover:shadow-purple-500/20 
        hover:border-purple-500/30
        hover:-translate-y-1
      "
    >
      <div
        className="
          absolute inset-0 rounded-2xl 
          bg-gradient-to-br from-purple-500/10 to-purple-800/10 
          opacity-0 group-hover:opacity-100 
          blur-xl transition-all duration-700
        "
      />

      <h2 className="text-3xl font-bold text-purple-200 text-center drop-shadow-[0_0_12px_rgba(170,100,255,0.25)]">
        APIs y Comunicación
      </h2>

      <h3 className="text-xl font-semibold text-purple-400/80 mt-2 text-center">
        GraphQL & REST
      </h3>

      <p className="mt-3 text-purple-100/80 text-center leading-relaxed">
        Creación de APIs flexibles, rápidas y bien documentadas.
      </p>
    </motion.div>

  </div>
</div>


    {/* Texto final */}
    <motion.div
      className="mt-6 px-4 pt-10"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h4 className="text-lg md:text-2xl font-semibold text-purple-300">
          Muchas más tecnologías líderes aplicadas para ofrecer soluciones completas, innovadoras y escalables.
        </h4>
      </div>
    </motion.div>

  </div>

</section>



<AnimatePresence mode="wait">
  <motion.section
    id="servicios"
    className="py-20 px-4 bg-black/50 backdrop-blur"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.4 }}
  >
    <div className="container mx-auto relative">

      {/* TITULO CENTRADO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
          Soluciones Tecnológicas
        </h2>
        <p className="text-lg text-purple-300 max-w-2xl mx-auto">
          Servicios diseñados para impulsar la transformación digital.
        </p>
      </motion.div>

      {/* MARQUEE CON DOS COLUMNAS */}
      <div className="overflow-hidden relative pt-10 hide-scrollbar">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <div className="relative w-full hide-scrollbar">

            {/* Degradados laterales */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-black via-black/70 to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-black via-black/70 to-transparent z-20" />

            {/* Scroll horizontal con MarqueeContent / MarqueeItem */}
            <Marquee className="w-full hide-scrollbar">
              <MarqueeContent speed={30} pauseOnHover={true} autoFill={true} gradient={false}>
                {((allCards || []).reduce((rows, card, index) => {
                  if (index % 2 === 0) {
                    // @ts-ignore
                    rows.push([card]);
                  } else {
                    // @ts-ignore
                    if (rows.length > 0) rows[rows.length - 1].push(card);
                    // @ts-ignore
                    else rows.push([card]);
                  }
                  return rows;
                  
                }, [])).map((pair, idx) => (
                  <MarqueeItem key={idx} className="mx-6 flex flex-col gap-6 hide-scrollbar">
                     {/* @ts-ignore */}
                    {Array.isArray(pair) && pair.map((card, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ y: -6, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="w-96"
                      >
                        <ServiceCard
                          icon={card.icon}
                          title={card.title}
                          description={card.description}
                          features={card.features}
                          className="w-auto h-auto"
                        />
                      </motion.div>
                    ))}
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>

          </div>
        </motion.div>
      </div>
    </div>
  </motion.section>
</AnimatePresence>







     {/* Contac secction */}
    <motion.section
      id="contacto"
      className="relative z-20 w-full h-[50vh] bg-cover bg-center flex items-center"
      style={{
        backgroundImage: "url('/wachinton.png')",
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: '100% 100%', // Ocupa todo el ancho, menos espacio vertical
        paddingBottom: '3rem', // Reduce el espacio inferior
      }}
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Contenido - botón centrado */}
      <div className="relative z-10 w-full flex items-center justify-center px-4">
        <div className="inline-block">
          <AnimatedButton
            text="Contactanos"
            onClick={() => setIsSolicitudOpen(true)}
            className="glow bg-purple-600 hover:bg-purple-700 text-white text-lg px-8 py-6"
            disabled={false}
          />
        </div>
      </div>
    </motion.section>

    

      {/* Trusted by Section */}
      <TrustedBySection />

      {/* New Technological Expertise Section */}
      <TechnologicalExpertise />

      



      {/* Contact Section */}
<section className="py-20 px-4 bg-gradient-to-b from-purple-900/20 to-transparent">
  <div className="container mx-auto text-center">
    <motion.h2
      className="text-3xl md:text-5xl font-bold mb-12 gradient-text"
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
    >
      Conecta con Nosotros
    </motion.h2>

    <motion.div
      className="flex justify-center space-x-8"
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* WhatsApp (reemplaza teléfono) */}
      <a
        href="tel:+584243296034"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp +58 424-3296034"
        className="text-purple-500 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
      >
        <FaWhatsapp className="w-8 h-8" />
      </a>

      {/* TikTok */}
      <a
        href="https://www.tiktok.com/@untitledtechco?_t=ZM-8wVCrqpCtlt&_r=1&brid=CKKLqA97M0vUTnBEFheQNQ"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TikTok- Untitled Tech"
        className="text-purple-500 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
      >
        <FaTiktok className="w-8 h-8" />
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/company/untitled-tech-company"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn - Untitled Tech"
        className="text-purple-500 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
      >
        <SlSocialLinkedin className="w-8 h-8" />
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/untitledtechco?igsh=MWU5aHpweDZyaDJuZQ=="
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram - Untitled Tech"
        className="text-purple-500 hover:text-purple-300 transition-colors duration-300 transform hover:scale-110"
      >
        <AiOutlineInstagram className="w-8 h-8" />
      </a>
    </motion.div>
  </div>
</section>


      {/* Footer */}
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
                  <BotonConSonido onClick={() => scrollToSection("servicios")} className="hover:text-purple-400">
                    Desarrollo Web y Móvil
                  </BotonConSonido>
                </li>
                <li>
                  <BotonConSonido onClick={() => scrollToSection("servicios")} className="hover:text-purple-400">
                    CRM y ERP
                  </BotonConSonido>
                </li>
                <li>
                  <BotonConSonido onClick={() => scrollToSection("servicios")} className="hover:text-purple-400">
                    Cloud Solutions
                  </BotonConSonido>
                </li>
                <li>
                  <BotonConSonido onClick={() => scrollToSection("servicios")} className="hover:text-purple-400">
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

  <li>
      +58 424-3296034
  </li>

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
    </div>
    </>
  )
}

function ServiceCard({
  icon,
  title,
  description,
  features,
  className,
}: {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  className?: string
}) {
  const { setCursorVariant } = useMouse()

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
    >
        <Card className={`${className ? className + " " : ""}group p-8 bg-black/30 border-2 border-purple-300/40 transition-all parallax-card overflow-hidden relative`}>
            {/* Animated gradient fill overlay (hidden -> reveal from bottom on hover) */}
            <div className="absolute left-0 right-0 bottom-0 top-0 h-full bg-gradient-to-t from-purple-900/85 via-purple-700/60 to-transparent pointer-events-none z-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-out origin-bottom will-change-transform" />
            {/* Decorative subtle tech-stripes that fade in on hover */}
            <div
              className="absolute left-0 right-0 bottom-0 top-0 pointer-events-none z-10 opacity-0 group-hover:opacity-30 transition-opacity duration-700"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, rgba(255,255,255,0.02) 0 6px, transparent 6px 12px)`,
                mixBlendMode: 'overlay'
              }}
            />
            {/* Subtle permanent border + glow (intensifies on hover via opacity) */}
            <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-purple-400/30 z-20 transition-opacity duration-500 opacity-80 group-hover:opacity-100" style={{ boxShadow: '0 0 0 6px rgba(124,58,237,0.45), 0 0 28px 8px rgba(124,58,237,0.25)' }} />
        <div className="parallax-card-content relative z-10">
          <div className="mb-4 text-purple-400 transition-colors group-hover:text-white">{icon}</div>
          <h3 className="text-xl font-bold mb-2 transition-all">{title}</h3>
          <p className="text-gray-300 transition-colors mb-4">{description}</p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-400">
                <CheckCircle className="w-4 h-4 mr-2 text-purple-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  )
}

function StatCard({ number, text }: { number: string; text: string }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      className="text-center"
    >
      <h3 className="text-4xl md:text-5xl font-bold gradient-text mb-2">{number}</h3>
      <p className="text-gray-400">{text}</p>
    </motion.div>
  )
}

function ProcessCard({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      className="relative"
    >
      <div className="absolute -left-4 -top-4 text-4xl font-bold text-purple-500/20">{number}</div>
      <div className="gradient-border">
        <div className="bg-black/30 p-6 rounded-xl">
          <p className="text-lg text-purple-200 max-w-2xl mx-auto">{title}</p>
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

function TechCard({ name, icon, description }: { name: string; icon: string; description: string }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-20 h-20 mb-4 relative">
        <Image
          src={icon || "/placeholder.svg"}
          alt={name}
          width={80}
          height={80}
          className="object-contain"
          style={{ height: 'auto' }}
        />
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 flex items-center justify-center bg-purple-600/90 rounded-full"
            >
              <AnimatedSVG />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="text-lg font-semibold text-purple-300 mb-2">{name}</p>
      <p className="text-sm text-gray-400 text-center">{description}</p>
    </motion.div>
  )
}

function SocialLink({ icon, href, ariaLabel }: { icon: React.ReactNode; href: string; ariaLabel?: string }) {
  const { setCursorVariant } = useMouse()

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.2 }}
      className="text-purple-500 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 rounded"
      onMouseEnter={() => setCursorVariant("button")}
      onMouseLeave={() => setCursorVariant("default")}
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={(e) => {
        // Make Space also activate the link like a button
        if (e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault()
          ;(e.currentTarget as HTMLElement).click()
        }
      }}
    >
      {icon}
    </motion.a>
  )
}

// Simple test marquee component (logos)
const logos = [
  { name: 'GitHub', icon: SiGithub },
  { name: 'Facebook', icon: SiFacebook },
  { name: 'Google', icon: SiGoogle },
];

function TestMarquee() {
  return (
    <div className="w-full bg-black/20 py-8">
      <Marquee>
        <MarqueeFade side="left" />
        <MarqueeFade side="right" />

        <MarqueeContent speed={40}>
          {logos.map((l) => (
            <MarqueeItem key={l.name} className="mx-12">
              <l.icon className="w-12 h-12 text-purple-400" />
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </div>
  )
}