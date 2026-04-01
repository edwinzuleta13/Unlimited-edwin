"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee"
import CardBloom from "@/components/CardBloom"

const techData = [
  {
    title: "Frontend",
    items: [
      { subtitle: "React, Vue.js, Angular", text: "Desarrollo de interfaces modernas y escalables, con componentes reutilizables y arquitectura avanzada." }
    ],
    delay: 0.1
  },
  {
    title: "Backend",
    items: [
      { subtitle: "Node.js, Express, Nest.js", text: "Desarrollo de servidores y APIs eficientes y seguras, optimizadas para alto rendimiento." },
      { subtitle: "Golang", text: "Microservicios concurrentes y de alto desempeño." }
    ],
    delay: 0.2
  },
  {
    title: "Bases de Datos",
    items: [
      { subtitle: "PostgreSQL, MySQL, MongoDB", text: "Diseño de bases relacionales y no relacionales optimizadas para consultas rápidas." },
      { subtitle: "Firebase & Redis", text: "Soluciones en tiempo real y caching de alto rendimiento." }
    ],
    delay: 0.3
  },
  {
    title: "IA y ML",
    items: [
      { subtitle: "TensorFlow, PyTorch, Python", text: "Modelos de deep learning para visión por computadora, NLP y análisis predictivo." }
    ],
    delay: 0.1
  },
  {
    title: "Infraestructura y Cloud",
    items: [
      { subtitle: "AWS, Google Cloud, Azure", text: "Arquitectura escalable y segura en la nube." },
      { subtitle: "Docker & Kubernetes", text: "Contenedores y orquestación profesional." }
    ],
    delay: 0.2
  },
  {
    title: "APIs y Comunicación",
    items: [
      { subtitle: "GraphQL & REST", text: "Creación de APIs flexibles, rápidas y bien documentadas." }
    ],
    delay: 0.3
  }
];

export default function TechStackSection() {
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

  return (
    <section id="tecnologias" className="py-20 px-4 bg-gradient-to-b from-transparent via-black/80 to-transparent relative">
      <div className="container mx-auto relative z-20">
        {/* Texto superior */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Stack Tecnológico Avanzado
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Dominamos las tecnologías más innovadoras para ofrecer soluciones de vanguardia
          </p>
        </motion.div>

        {/* MARQUEE */}
        <Marquee
          className="
            w-screen
            relative left-1/2 right-1/2
            -ml-[50vw] -mr-[50vw]
            overflow-hidden py-10
          "
        >
          <MarqueeContent speed={80}>
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
      </div>

      {/* CONTENIDO COMPLETO ORGANIZADO */}
      <div className="relative">
        <div className="pt-[40px] relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {techData.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: card.delay }}
                className="w-full h-full flex"
              >
                <CardBloom
                  className="p-1 md:p-1 h-full w-full max-w-full transition-all duration-500 hover:-translate-y-2 hover:bg-white/10"
                  innerClassName="h-full flex flex-col justify-center"
                >
                  <h2 className="text-2xl lg:text-3xl font-bold text-white text-center drop-shadow-[0_0_12px_rgba(170,100,255,0.25)] mb-2 mt-4">
                    {card.title}
                  </h2>

                  {card.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="mt-4 mb-2">
                      <h3 className="text-lg lg:text-xl font-semibold text-purple-300 text-center">
                        {item.subtitle}
                      </h3>
                      <p className="mt-2 text-white/90 text-center leading-relaxed text-sm lg:text-base">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </CardBloom>
              </motion.div>
            ))}
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
            <h4 className="text-lg md:text-2xl font-semibold text-white">
              Muchas más tecnologías líderes aplicadas para ofrecer soluciones completas, innovadoras y escalables.
            </h4>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
