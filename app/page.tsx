"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import {
  Code,
  Database,
  Linkedin,
  Instagram,
  Twitter,
  Phone,
  ChevronDown,
  Shield,
  Cloud,
  Boxes,
  Brain,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import { useMouse } from "@/components/mouse-context"
import { useTransition } from "./providers"
import dynamic from "next/dynamic"
import MagneticButton from "@/components/magnetic-button"
import AnimatedSVG from "@/components/animated-svg"
import TechCursor from "@/components/tech-cursor"
import FloatingChatWidget from "@/components/floating-chat-widget"
import TechnologicalExpertise from "@/components/technological-expertise"

const Scene = dynamic(() => import("@/components/scene"), { ssr: false })
const ParticleBackground = dynamic(() => import("@/components/particle-background"), { ssr: false })

export default function Home() {
  const { setCursorVariant } = useMouse()
  const { startTransition } = useTransition()
  const containerRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [audioReady, setAudioReady] = useState(false)

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

  useEffect(() => {
    setIsLoaded(true)

    // Initialize audio
    const audio = new Audio("/hover.mp3")
    audio.volume = 0.1
    audio.load()

    audio.oncanplaythrough = () => {
      setAudioReady(true)
    }

    const playSound = () => {
      if (audioReady) {
        audio.currentTime = 0
        audio.play().catch((error) => console.error("Error playing audio:", error))
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("button, a")) {
        playSound()
      }
    }

    document.addEventListener("mouseover", handleMouseOver)

    return () => {
      document.removeEventListener("mouseover", handleMouseOver)
      audio.pause()
      audio.src = ""
    }
  }, [audioReady])

  const handleExploreClick = () => {
    startTransition()
    scrollToSection("servicios")
  }

  return (
    <div className="relative" ref={containerRef}>
      <ParticleBackground />
      <div className="fixed inset-0 noise" />
      <TechCursor />
      <FloatingChatWidget />

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
        <AnimatePresence>
          {isLoaded && (
            <motion.div
              className="relative w-40 h-40 mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Disen%CC%83o%20sin%20ti%CC%81tulo%20(5)-5zZ7WMmMeOTo8NMFzV3ZUFkD5fkOEW.png"
                alt="Untitled Tech Logo"
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          )}
        </AnimatePresence>

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
            className="glow bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6"
            onClick={() => {
              if (audioReady) {
                const audio = new Audio("/hover.mp3")
                audio.volume = 0.1
                audio.play().catch((error) => console.error("Error playing audio:", error))
              }
              scrollToSection("contacto")
            }}
          >
            Agenda una Consulta
          </MagneticButton>
          <MagneticButton
            className="bg-transparent border border-purple-500 hover:bg-purple-500/10 text-lg px-8 py-6"
            onClick={() => {
              if (audioReady) {
                const audio = new Audio("/hover.mp3")
                audio.volume = 0.1
                audio.play().catch((error) => console.error("Error playing audio:", error))
              }
              handleExploreClick()
            }}
          >
            Conoce Nuestros Servicios
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="absolute bottom-8"
        >
          <ChevronDown className="w-8 h-8 text-purple-400" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="stats-grid">
            <StatCard number="100+" text="Proyectos Completados" />
            <StatCard number="50+" text="Clientes Satisfechos" />
            <StatCard number="15+" text="Expertos en Tecnología" />
            <StatCard number="24/7" text="Soporte Técnico" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 px-4 bg-black/50 backdrop-blur clip-path-slant">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">Soluciones Tecnológicas Integrales</h2>
            <p className="text-lg text-purple-300 max-w-2xl mx-auto">
              Ofrecemos un ecosistema completo de servicios tecnológicos para impulsar la transformación digital de tu
              empresa
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Code className="w-8 h-8" />}
              title="Desarrollo Web y Móvil"
              description="Creamos aplicaciones web y móviles escalables utilizando las últimas tecnologías y mejores prácticas de desarrollo."
              features={["Aplicaciones Web Progresivas", "Apps iOS y Android", "Portales Empresariales", "E-commerce"]}
            />
            <ServiceCard
              icon={<Database className="w-8 h-8" />}
              title="CRM y ERP"
              description="Implementamos y personalizamos sistemas de gestión empresarial adaptados a tus necesidades específicas."
              features={["Salesforce", "SAP", "Microsoft Dynamics", "Sistemas Personalizados"]}
            />
            <ServiceCard
              icon={<Cloud className="w-8 h-8" />}
              title="Cloud Solutions"
              description="Modernizamos tu infraestructura con soluciones cloud que optimizan costos y mejoran la escalabilidad."
              features={["AWS", "Azure", "Google Cloud", "Arquitectura Cloud Native"]}
            />
            <ServiceCard
              icon={<Brain className="w-8 h-8" />}
              title="Inteligencia Artificial"
              description="Implementamos soluciones de IA y Machine Learning para optimizar procesos y tomar mejores decisiones."
              features={[
                "Análisis Predictivo",
                "Procesamiento de Lenguaje Natural",
                "Computer Vision",
                "Automatización Inteligente",
              ]}
            />
            <ServiceCard
              icon={<Shield className="w-8 h-8" />}
              title="Ciberseguridad"
              description="Protegemos tus activos digitales con soluciones de seguridad avanzadas y cumplimiento normativo."
              features={[
                "Auditorías de Seguridad",
                "Implementación Zero Trust",
                "Gestión de Identidades",
                "SOC as a Service",
              ]}
            />
            <ServiceCard
              icon={<Boxes className="w-8 h-8" />}
              title="Integración de Sistemas"
              description="Conectamos tus sistemas y aplicaciones para crear flujos de trabajo eficientes y automatizados."
              features={["APIs y Microservicios", "ESB", "ETL", "Automatización de Procesos"]}
            />
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

          <div className="process-grid">
            <ProcessCard
              number="01"
              title="Descubrimiento"
              description="Analizamos tus necesidades y objetivos para diseñar la solución perfecta"
            />
            <ProcessCard
              number="02"
              title="Planificación"
              description="Definimos la arquitectura y roadmap del proyecto"
            />
            <ProcessCard
              number="03"
              title="Desarrollo"
              description="Implementamos la solución usando metodologías ágiles"
            />
            <ProcessCard
              number="04"
              title="Despliegue"
              description="Lanzamos tu solución con un plan de adopción gradual"
            />
          </div>
        </div>
      </section>

      {/* Expanded Tech Stack Section */}
      <section className="py-20 px-4 bg-black/50 backdrop-blur">
        <div className="container mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">Stack Tecnológico Avanzado</h2>
            <p className="text-lg text-purple-300 max-w-2xl mx-auto">
              Dominamos las tecnologías más innovadoras para ofrecer soluciones de vanguardia
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <TechCard
              name="React"
              icon="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png"
              description="Desarrollo de interfaces modernas y reactivas"
            />
            <TechCard
              name="Node.js"
              icon="https://nodejs.org/static/images/logo.svg"
              description="Backend escalable y de alto rendimiento"
            />
            <TechCard
              name="Python"
              icon="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1200px-Python-logo-notext.svg.png"
              description="IA, análisis de datos y automatización"
            />
            <TechCard
              name="AWS"
              icon="https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"
              description="Infraestructura cloud robusta y flexible"
            />
            <TechCard
              name="Docker"
              icon="https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png"
              description="Contenedorización para despliegues consistentes"
            />
            <TechCard
              name="Kubernetes"
              icon="https://kubernetes.io/images/favicon.png"
              description="Orquestación de contenedores a escala"
            />
            <TechCard
              name="TensorFlow"
              icon="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Tensorflow_logo.svg/1200px-Tensorflow_logo.svg.png"
              description="Modelos de aprendizaje profundo avanzados"
            />
            <TechCard
              name="PostgreSQL"
              icon="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png"
              description="Base de datos relacional de alto rendimiento"
            />
            <TechCard
              name="GraphQL"
              icon="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png"
              description="APIs flexibles y eficientes"
            />
            <TechCard
              name="Rust"
              icon="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Rust_programming_language_black_logo.svg/1200px-Rust_programming_language_black_logo.svg.png"
              description="Sistemas de bajo nivel seguros y rápidos"
            />
            <TechCard
              name="Vue.js"
              icon="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1200px-Vue.js_Logo_2.svg.png"
              description="Frameworks frontend progresivos"
            />
            <TechCard
              name="Golang"
              icon="https://go.dev/blog/go-brand/Go-Logo/SVG/Go-Logo_Blue.svg"
              description="Microservicios concurrentes y eficientes"
            />
          </div>
        </div>
      </section>

      {/* New Technological Expertise Section */}
      <TechnologicalExpertise />

      {/* CTA Section */}
      <section id="contacto" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="gradient-border">
            <div className="bg-black/50 backdrop-blur rounded-xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                    ¿Listo para transformar tu negocio?
                  </h2>
                  <p className="text-lg text-purple-300 mb-6">
                    Agenda una consulta gratuita con nuestros expertos y descubre cómo podemos ayudarte a alcanzar tus
                    objetivos tecnológicos.
                  </p>
                  <MagneticButton
                    className="glow bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6"
                    onClick={() => {
                      if (audioReady) {
                        const audio = new Audio("/hover.mp3")
                        audio.volume = 0.1
                        audio.play().catch((error) => console.error("Error playing audio:", error))
                      }
                      scrollToSection("contacto")
                    }}
                  >
                    Contactar Ahora <ArrowRight className="ml-2" />
                  </MagneticButton>
                </div>
                <div className="relative h-64 md:h-full">
                  <Scene />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            <SocialLink icon={<Phone className="w-6 h-6" />} href="tel:+1234567890" />
            <SocialLink icon={<Linkedin className="w-6 h-6" />} href="#" />
            <SocialLink icon={<Instagram className="w-6 h-6" />} href="#" />
            <SocialLink icon={<Twitter className="w-6 h-6" />} href="#" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-purple-500/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Disen%CC%83o%20sin%20ti%CC%81tulo%20(5)-5zZ7WMmMeOTo8NMFzV3ZUFkD5fkOEW.png"
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
                  <button onClick={() => scrollToSection("servicios")} className="hover:text-purple-400">
                    Desarrollo Web y Móvil
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("servicios")} className="hover:text-purple-400">
                    CRM y ERP
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("servicios")} className="hover:text-purple-400">
                    Cloud Solutions
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection("servicios")} className="hover:text-purple-400">
                    Inteligencia Artificial
                  </button>
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
                <li>info@untitledtech.com</li>
                <li>+1 234 567 890</li>
                <li>Ciudad, País</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-purple-500/20 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} Untitled Tech Company. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ServiceCard({
  icon,
  title,
  description,
  features,
}: {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
}) {
  const { setCursorVariant } = useMouse()

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setCursorVariant("text")}
      onMouseLeave={() => setCursorVariant("default")}
    >
      <Card className="p-6 bg-black/30 border-purple-500/20 hover:border-purple-500/40 transition-all group parallax-card">
        <div className="parallax-card-content">
          <div className="mb-4 text-purple-500 group-hover:text-purple-400 transition-colors">{icon}</div>
          <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">{title}</h3>
          <p className="text-gray-400 group-hover:text-gray-300 transition-colors mb-4">{description}</p>
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
          <h3 className="text-xl font-bold mb-2 gradient-text">{title}</h3>
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
        <Image src={icon || "/placeholder.svg"} alt={name} width={80} height={80} className="object-contain" />
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

function SocialLink({ icon, href }: { icon: React.ReactNode; href: string }) {
  const { setCursorVariant } = useMouse()

  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.2 }}
      className="text-purple-500 hover:text-purple-400 transition-colors"
      onMouseEnter={() => setCursorVariant("button")}
      onMouseLeave={() => setCursorVariant("default")}
    >
      {icon}
    </motion.a>
  )
}

