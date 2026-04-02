"use client"
import * as React from "react"
import { motion } from "framer-motion"

export default function ProcessSection() {
  return (
    <section id="proceso" className="py-20 px-4">
      <motion.div 
        className="container mx-auto"
        initial={{ x: -60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-5xl ALONGSANSS-REGULAR mb-6 text-white">Nuestro Proceso</h2>
          <p className="text-lg text-white max-w-2xl mx-auto AlongSanss2-Thin">
            Un enfoque metodológico que garantiza resultados excepcionales en cada proyecto
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="glass-effect-purple rounded-2xl p-6 h-full flex flex-col justify-center items-center text-center cursor-default">
            <div className="flex flex-col items-center w-full pb-0">
              <h3 className="text-xl text-white ALONGSANSS-REGULAR">Descubrimiento</h3>
            </div>
            <p className="mt-3 text-white text-center AlongSanss2-Thin">
              Analizamos tus necesidades y objetivos para diseñar la solución perfecta
            </p>
          </div>

          <div className="glass-effect-purple rounded-2xl p-6 h-full flex flex-col justify-center items-center text-center cursor-default">
            <div className="flex flex-col items-center w-full">
              <h3 className="text-xl text-white ALONGSANSS-REGULAR">Planificación</h3>
            </div>
            <p className="mt-3 text-white text-center AlongSanss2-Thin">
              Definimos la arquitectura y roadmap del proyecto
            </p>
          </div>

          <div className="glass-effect-purple rounded-2xl p-6 h-full flex flex-col justify-center items-center text-center cursor-default">
            <div className="flex flex-col items-center w-full">
              <h3 className="text-xl text-white ALONGSANSS-REGULAR">Desarrollo</h3>
            </div>
            <p className="mt-3 text-white text-center AlongSanss2-Thin">
              Implementamos la solución usando metodologías ágiles
            </p>
          </div>

          <div className="glass-effect-purple rounded-2xl p-6 h-full flex flex-col justify-center items-center text-center cursor-default">
            <div className="flex flex-col items-center w-full">
              <h3 className="text-xl text-white ALONGSANSS-REGULAR">Despliegue</h3>
            </div>
            <p className="mt-3 text-white text-center AlongSanss2-Thin">
              Lanzamos tu solución con un plan de adopción gradual
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
