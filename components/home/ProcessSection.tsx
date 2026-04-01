"use client"
import * as React from "react"
import { motion } from "framer-motion"

export default function ProcessSection() {
  return (
    <section id="proceso" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-5xl font-bold mb-6 text-white">Nuestro Proceso</h2>
          <p className="text-lg text-white max-w-2xl mx-auto">
            Un enfoque metodológico que garantiza resultados excepcionales en cada proyecto
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-effect-purple rounded-2xl p-6 h-full flex flex-col justify-center items-center text-center cursor-default">
            <div className="flex flex-col items-center w-full pb-0">
              <h3 className="text-xl font-semibold text-white">Descubrimiento</h3>
            </div>
            <p className="mt-3 text-white text-center">
              Analizamos tus necesidades y objetivos para diseñar la solución perfecta
            </p>
          </div>

          <div className="glass-effect-purple rounded-2xl p-6 h-full flex flex-col justify-center items-center text-center cursor-default">
            <div className="flex flex-col items-center w-full">
              <h3 className="text-xl font-semibold text-white">Planificación</h3>
            </div>
            <p className="mt-3 text-white text-center">
              Definimos la arquitectura y roadmap del proyecto
            </p>
          </div>

          <div className="glass-effect-purple rounded-2xl p-6 h-full flex flex-col justify-center items-center text-center cursor-default">
            <div className="flex flex-col items-center w-full">
              <h3 className="text-xl font-semibold text-white">Desarrollo</h3>
            </div>
            <p className="mt-3 text-white text-center">
              Implementamos la solución usando metodologías ágiles
            </p>
          </div>

          <div className="glass-effect-purple rounded-2xl p-6 h-full flex flex-col justify-center items-center text-center cursor-default">
            <div className="flex flex-col items-center w-full">
              <h3 className="text-xl font-semibold text-white">Despliegue</h3>
            </div>
            <p className="mt-3 text-white text-center">
              Lanzamos tu solución con un plan de adopción gradual
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
