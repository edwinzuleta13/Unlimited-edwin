"use client"
import * as React from "react"
import { motion } from "framer-motion"

export function StatCard({ number, text }: { number: string; text: string }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      className="p-6 flex flex-col justify-center items-center text-white text-center"
    >
      <h3 className="text-white text-4xl md:text-5xl ALONGSANSS-REGULAR mb-2">{number}</h3>
      <p className="text-white AlongSanss2-Thin">{text}</p>
    </motion.div>
  )
}

export default function StatsSection() {
  return (
    <section className="relative pt-20 px-4 -mt-10 bg-transparent overflow-visible">
      <motion.div 
        className="container mx-auto relative z-20"
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="glass-effect-purple rounded-2xl p-6 h-full flex flex-col justify-center items-center text-center cursor-default stats-grid grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard number="100+" text="Proyectos Completados" />
          <StatCard number="50+" text="Clientes Satisfechos" />
          <StatCard number="15+" text="Expertos en Tecnología" />
          <StatCard number="24/7" text="Soporte Técnico" />
        </div>
      </motion.div>
    </section>
  )
}
