"use client"

import { motion } from "framer-motion"
import { Server, Cpu, Globe } from "lucide-react"
import Scene from "@/components/scene"
import type React from "react" // Import React

export default function TechnologicalExpertise() {
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">Nuestra Experiencia Tecnológica</h2>
          <p className="text-lg text-purple-300 max-w-2xl mx-auto">
            Dominamos las tecnologías más avanzadas para impulsar la innovación en tu empresa
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ExpertiseCard
            icon={<Server className="w-12 h-12 text-purple-500" />}
            title="Arquitectura de Microservicios"
            description="Diseñamos e implementamos arquitecturas escalables y resilientes basadas en microservicios, utilizando tecnologías como Docker, Kubernetes, y service mesh."
          />
          <ExpertiseCard
            icon={<Cpu className="w-12 h-12 text-purple-500" />}
            title="Inteligencia Artificial y Machine Learning"
            description="Desarrollamos soluciones de IA y ML personalizadas, desde chatbots inteligentes hasta sistemas de recomendación avanzados y análisis predictivo."
          />
          <ExpertiseCard
            icon={<Globe className="w-12 h-12 text-purple-500" />}
            title="Desarrollo Web Full-Stack"
            description="Creamos aplicaciones web modernas y responsivas utilizando las últimas tecnologías como React, Vue.js, Node.js, y GraphQL para APIs eficientes."
          />
        </div>

        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 text-center gradient-text">Visualización de Datos en Tiempo Real</h3>
          <div className="relative h-96">
            <Scene />
          </div>
        </div>
      </div>
    </section>
  )
}

function ExpertiseCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="bg-gray-900 border border-purple-500 rounded-lg p-6 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-purple-300">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

