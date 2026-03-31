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
                <ServiceMarquee />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}
