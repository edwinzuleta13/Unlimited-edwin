"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import AlliesCarousel, { type AlliesCarouselHandle } from "@/components/AlliesCarousel";
import MagneticButton from "@/components/magnetic-button";


import { clients, type Client } from "@/data/clients";

const splitArray = (arr: Client[]) => {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
};

interface TrustedBySectionProps {
  onOpenAllies?: () => void;
}

export default function TrustedBySection({ onOpenAllies }: TrustedBySectionProps = {}) {
  const [firstRow, secondRow] = splitArray(clients);

  const carousel1Ref = useRef<AlliesCarouselHandle>(null);
  const carousel2Ref = useRef<AlliesCarouselHandle>(null);

  const handlePrev = () => {
    carousel1Ref.current?.goToPrevious(1);
    carousel2Ref.current?.goToPrevious(1);
  };

  const handleNext = () => {
    carousel1Ref.current?.goToNext(1);
    carousel2Ref.current?.goToNext(1);
  };

  return (
    <section className="relative py-24 w-full overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black z-0" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 mb-20 text-center"
        initial={{ x: 60, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.span 
          className="inline-block text-purple-400 ALONGSANSS-REGULAR text-xs uppercase tracking-[0.3em] mb-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Confianza Global
        </motion.span>
        <motion.h2
          className="text-4xl md:text-6xl text-white ALONGSANSS-REGULAR tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Nuestros Aliados
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto AlongSanss2-Thin"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
        >
          Colaboramos con empresas innovadoras para construir el futuro digital.
        </motion.p>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="relative space-y-4 md:space-y-6">
          {/* Difuminados laterales */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />

          {/* Primer carrusel */}
          <AlliesCarousel ref={carousel1Ref} clients={firstRow} />

          {/* Segundo carrusel */}
          <AlliesCarousel ref={carousel2Ref} clients={secondRow} reverse />

          {/* Flechas compartidas - centradas verticalmente entre los dos carruseles */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:-left-6 top-[40%] -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/20 text-purple-300 hover:bg-purple-500/15 hover:border-purple-400/50 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-xl shadow-lg shadow-black/10"
            aria-label="Anterior"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={handleNext}
            className="absolute right-0 md:-right-6 top-[40%] -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/5 border border-white/20 text-purple-300 hover:bg-purple-500/15 hover:border-purple-400/50 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-xl shadow-lg shadow-black/10"
            aria-label="Siguiente"
          >
            <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Botón Ver todos los aliados */}
      <motion.div
        className="relative z-10 flex justify-center mt-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <MagneticButton
          onClick={onOpenAllies}
          className="glow rounded-full glass-effect-2 border-2 border-purple-500 hover:bg-purple-500/10 text-lg px-8 py-6 AlongSanss2-Thin"
        >
          Ver todos los aliados
        </MagneticButton>
      </motion.div>
    </section>
  );
}
