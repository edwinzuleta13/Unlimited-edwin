"use client"
import { motion } from "framer-motion"
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee"

const techLogos = [
  { name: "React",      icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "Node.js",    icon: "https://nodejs.org/static/images/logo.svg" },
  { name: "Python",     icon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
  { name: "AWS",        icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "Docker",     icon: "https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png" },
  { name: "Kubernetes", icon: "/icons/kubernetes.svg" },
  { name: "TensorFlow", icon: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg" },
  { name: "PostgreSQL", icon: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
  { name: "GraphQL",    icon: "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg" },
  { name: "Rust",       icon: "/icons/rust.svg" },
  { name: "Vue.js",     icon: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" },
  { name: "Golang",     icon: "https://upload.wikimedia.org/wikipedia/commons/0/05/Go_Logo_Blue.svg" },
]

interface TechLogoMarqueeProps {
  /** Velocidad del marquee en px/s. Por defecto 80. */
  speed?: number
  /** Clases extra para el wrapper del Marquee */
  className?: string
}

export default function TechLogoMarquee({ speed = 80, className = "" }: TechLogoMarqueeProps) {
  return (
    <Marquee
      className={`
        w-screen
        relative left-1/2 right-1/2
        -ml-[50vw] -mr-[50vw]
        overflow-hidden py-10
        ${className}
      `}
    >
      <MarqueeContent speed={speed}>
        {techLogos.map((tech) => (
          <MarqueeItem
            key={tech.name}
            className="mx-12 flex flex-col items-center group cursor-pointer relative z-40 pointer-events-auto"
          >
            <motion.img
              src={tech.icon}
              alt={tech.name}
              className="w-16 h-16 object-contain"
              initial={{ filter: "grayscale(100%)", opacity: 0.5 }}
              whileHover={{
                filter: "grayscale(0%)",
                opacity: 1,
                scale: 1.1,
              }}
              transition={{ duration: 0.3 }}
            />
          </MarqueeItem>
        ))}
      </MarqueeContent>
    </Marquee>
  )
}
