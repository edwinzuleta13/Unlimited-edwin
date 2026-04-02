"use client"
import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ServiceMarquee } from "@/components/ServiceMarquee"

export default function SolutionsSection() {
  return (
    <AnimatePresence mode="wait">
      <motion.section
        id="servicios"
        className="py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div 
          className="container mx-auto relative"
          initial={{ x: -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* TITULO CENTRADO */}
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-5xl ALONGSANSS-REGULAR mb-4 text-white">
              Soluciones Tecnológicas
            </h2>
            <p className="text-lg text-white max-w-2xl mx-auto AlongSanss2-Thin">
              Servicios diseñados para impulsar la transformación digital.
            </p>
          </div>

          {/* MARQUEE CON DOS COLUMNAS */}
          <div className="overflow-hidden relative pt-10 hide-scrollbar">
            <div>
              <div className="relative w-full hide-scrollbar">
                <ServiceMarquee />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  )
}
