"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee"

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
    <section id="tecnologias" className="py-20 px-4 bg-black/60 relative">
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
                p-7 rounded-2xl shadow-xl border-2 border-purple-500/20 
                transition-all duration-500 
                hover:bg-white/15 hover:border-purple-400/40 hover:-translate-y-2
                hover:shadow-[0_0_40px_8px_rgba(168,85,247,0.5),_0_20px_40px_-10px_rgba(147,51,234,0.3)]
              "
              style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-800/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />
              <h2 className="text-3xl font-bold text-purple-200 text-center drop-shadow-[0_0_12px_rgba(170,100,255,0.25)]">Frontend</h2>
              <h3 className="text-xl font-semibold text-purple-400/80 mt-2 text-center">React, Vue.js, Angular</h3>
              <p className="mt-3 text-purple-100/80 text-center leading-relaxed">Desarrollo de interfaces modernas y escalables, con componentes reutilizables y arquitectura avanzada.</p>
            </motion.div>

            {/* CARD 2: Backend */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="
                group relative bg-white/10 backdrop-blur-xl 
                p-7 rounded-2xl shadow-xl border-2 border-purple-500/20 
                transition-all duration-500 
                hover:bg-white/15 hover:border-purple-400/40 hover:-translate-y-2
                hover:shadow-[0_0_40px_8px_rgba(168,85,247,0.5),_0_20px_40px_-10px_rgba(147,51,234,0.3)]
              "
              style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-800/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />
              <h2 className="text-3xl font-bold text-purple-200 text-center drop-shadow-[0_0_12px_rgba(170,100,255,0.25)]">Backend</h2>
              <h3 className="text-xl font-semibold text-purple-400/80 mt-2 text-center">Node.js, Express, Nest.js</h3>
              <p className="mt-3 text-purple-100/80 text-center leading-relaxed">Desarrollo de servidores y APIs eficientes y seguras, optimizadas para alto rendimiento.</p>
              <h3 className="text-xl font-semibold text-purple-300 mt-4 text-center">Golang</h3>
              <p className="mt-3 text-purple-100/80 text-center leading-relaxed">Microservicios concurrentes y de alto desempeño.</p>
            </motion.div>

            {/* CARD 3: Bases de Datos */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="
                group relative bg-white/10 backdrop-blur-xl 
                p-7 rounded-2xl shadow-xl border-2 border-purple-500/20 
                transition-all duration-500 
                hover:bg-white/15 hover:border-purple-400/40 hover:-translate-y-2
                hover:shadow-[0_0_40px_8px_rgba(168,85,247,0.5),_0_20px_40px_-10px_rgba(147,51,234,0.3)]
              "
              style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-800/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />
              <h2 className="text-3xl font-bold text-purple-200 text-center drop-shadow-[0_0_12px_rgba(170,100,255,0.25)]">Bases de Datos</h2>
              <h3 className="text-xl font-semibold text-purple-400/80 mt-2 text-center">PostgreSQL, MySQL, MongoDB</h3>
              <p className="mt-3 text-purple-100/80 text-center leading-relaxed">Diseño de bases relacionales y no relacionales optimizadas para consultas rápidas.</p>
              <h3 className="text-xl font-semibold text-purple-300 mt-4 text-center">Firebase & Redis</h3>
              <p className="mt-3 text-purple-100/80 text-center leading-relaxed">Soluciones en tiempo real y caching de alto rendimiento.</p>
            </motion.div>

            {/* CARD 4: IA y ML */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="
                group relative bg-white/10 backdrop-blur-xl 
                p-7 rounded-2xl shadow-xl border-2 border-purple-500/20 
                transition-all duration-500 
                hover:bg-white/15 hover:border-purple-400/40 hover:-translate-y-2
                hover:shadow-[0_0_40px_8px_rgba(168,85,247,0.5),_0_20px_40px_-10px_rgba(147,51,234,0.3)]
              "
              style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-800/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />
              <h2 className="text-3xl font-bold text-purple-200 text-center drop-shadow-[0_0_12px_rgba(170,100,255,0.25)]">IA y ML</h2>
              <h3 className="text-xl font-semibold text-purple-400/80 mt-2 text-center">TensorFlow, PyTorch, Python</h3>
              <p className="mt-3 text-purple-100/80 text-center leading-relaxed">Modelos de deep learning para visión por computadora, NLP y análisis predictivo.</p>
            </motion.div>

            {/* CARD 5: Infraestructura y Cloud */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="
                group relative bg-white/10 backdrop-blur-xl 
                p-7 rounded-2xl shadow-xl border-2 border-purple-500/20 
                transition-all duration-500 
                hover:bg-white/15 hover:border-purple-400/40 hover:-translate-y-2
                hover:shadow-[0_0_40px_8px_rgba(168,85,247,0.5),_0_20px_40px_-10px_rgba(147,51,234,0.3)]
              "
              style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-800/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />
              <h2 className="text-3xl font-bold text-purple-200 text-center drop-shadow-[0_0_12px_rgba(170,100,255,0.25)]">Infraestructura y Cloud</h2>
              <h3 className="text-xl font-semibold text-purple-400/80 mt-2 text-center">AWS, Google Cloud, Azure</h3>
              <p className="mt-3 text-purple-100/80 text-center leading-relaxed">Arquitectura escalable y segura en la nube.</p>
              <h3 className="text-xl font-semibold text-purple-300 mt-4 text-center">Docker & Kubernetes</h3>
              <p className="mt-3 text-purple-100/80 text-center leading-relaxed">Contenedores y orquestación profesional.</p>
            </motion.div>

            {/* CARD 6: APIs y Comunicación */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="
                group relative bg-white/10 backdrop-blur-xl 
                p-7 rounded-2xl shadow-xl border-2 border-purple-500/20 
                transition-all duration-500 
                hover:bg-white/15 hover:border-purple-400/40 hover:-translate-y-2
                hover:shadow-[0_0_40px_8px_rgba(168,85,247,0.5),_0_20px_40px_-10px_rgba(147,51,234,0.3)]
              "
              style={{ transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-800/10 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-700" />
              <h2 className="text-3xl font-bold text-purple-200 text-center drop-shadow-[0_0_12px_rgba(170,100,255,0.25)]">APIs y Comunicación</h2>
              <h3 className="text-xl font-semibold text-purple-400/80 mt-2 text-center">GraphQL & REST</h3>
              <p className="mt-3 text-purple-100/80 text-center leading-relaxed">Creación de APIs flexibles, rápidas y bien documentadas.</p>
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
  )
}
