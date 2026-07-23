"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { clients, type Client } from "@/data/clients";

interface AlliesOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AlliesOverlay({ isOpen, onClose }: AlliesOverlayProps) {
  const totalClients = clients.length;
  const displayClients = useMemo(() => [...clients, ...clients, ...clients], []);

  const [renderedIndex, setRenderedIndex] = useState(totalClients);
  const selectedIndex = renderedIndex % totalClients;
  const selectedClient = clients[selectedIndex];

  const carouselRef = useRef<HTMLDivElement>(null);
  const selectedCardRef = useRef<HTMLDivElement>(null);
  const isArrowNav = useRef(false);
  const teleportTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const touchStartX = useRef(0);

  const getCardStep = useCallback((container: HTMLElement) => {
    const card = container.querySelector("[data-card]") as HTMLElement | null;
    if (!card) return 0;
    const gap = parseInt(getComputedStyle(container).gap) || 16;
    return card.offsetWidth + gap;
  }, []);

  // Función de scroll mejorada para soportar múltiples pasos
  const scrollCarousel = useCallback((steps: number, direction: "prev" | "next") => {
    const container = carouselRef.current;
    if (!container) return;
    const step = getCardStep(container);
    if (!step) return;

    const moveAmount = step * steps;
    const newScrollLeft = direction === "next" 
      ? container.scrollLeft + moveAmount 
      : container.scrollLeft - moveAmount;

    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  }, [getCardStep]);

  const goToPrevious = useCallback((steps: number = 1) => {
    isArrowNav.current = true;
    const newIndex = renderedIndex - steps;

    if (newIndex < totalClients) {
      if (teleportTimer.current) clearTimeout(teleportTimer.current);
      scrollCarousel(steps, "prev");
      setRenderedIndex(newIndex);
      teleportTimer.current = setTimeout(() => {
        const container = carouselRef.current;
        const step = container ? getCardStep(container) : 0;
        if (container && step) {
          const targetIndex = newIndex + totalClients;
          container.scrollLeft = targetIndex * step - 24;
          setRenderedIndex(targetIndex);
        }
      }, 350);
    } else {
      scrollCarousel(steps, "prev");
      setRenderedIndex(newIndex);
    }
  }, [renderedIndex, totalClients, scrollCarousel, getCardStep]);

  const goToNext = useCallback((steps: number = 1) => {
    isArrowNav.current = true;
    if (teleportTimer.current) clearTimeout(teleportTimer.current);
    const newIndex = renderedIndex + steps;

    if (newIndex >= totalClients * 2) {
      scrollCarousel(steps, "next");
      setRenderedIndex(newIndex);
      teleportTimer.current = setTimeout(() => {
        const container = carouselRef.current;
        const step = container ? getCardStep(container) : 0;
        if (container && step) {
          const targetIndex = newIndex - totalClients;
          container.scrollLeft = targetIndex * step - 24;
          setRenderedIndex(targetIndex);
        }
      }, 350);
    } else {
      scrollCarousel(steps, "next");
      setRenderedIndex(newIndex);
    }
  }, [renderedIndex, totalClients, scrollCarousel, getCardStep]);

  // Manejo de swipe con detección de velocidad/distancia
  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const absDiff = Math.abs(diffX);
    const threshold = 40; 

    if (absDiff > threshold) {
      // Si el swipe es largo (ej. más de 140px), salta 2 o 3 posiciones
      const steps = absDiff > 220 ? 3 : absDiff > 120 ? 2 : 1;
      if (diffX > 0) goToPrevious(steps);
      else goToNext(steps);
    }
  }, [goToPrevious, goToNext]);

  useEffect(() => {
    if (isArrowNav.current) {
      isArrowNav.current = false;
      return;
    }
    if (selectedCardRef.current && carouselRef.current) {
      const card = selectedCardRef.current;
      const container = carouselRef.current;
      const scrollTarget = card.offsetLeft - 24;
      container.scrollTo({ left: scrollTarget, behavior: "smooth" });
    }
  }, [selectedIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const container = carouselRef.current;
    if (!container) return;
    const step = getCardStep(container);
    if (!step) return;
    setRenderedIndex(totalClients);
    container.scrollLeft = totalClients * step - 24;
  }, [isOpen, totalClients, getCardStep]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        >
          <motion.div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />

          <motion.div
            className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 flex flex-col overflow-hidden"
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white"
              whileHover={{ rotate: 90 }}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </motion.button>

            {/* HEADER */}
            <div className="text-center mb-4 flex-shrink-0">
              <span className="text-purple-400 text-[10px] uppercase tracking-[0.3em] mb-1 block">Alianzas Estratégicas</span>
              <h2 className="text-2xl md:text-4xl text-white ALONGSANSS-REGULAR">Nuestros <span className="text-purple-400">Aliados</span></h2>
            </div>

            {/* CAROUSEL */}
            <div className="relative flex-shrink-0 mb-6">
              {/* Flecha Anterior - visible solo en desktop */}
              <button
                onClick={() => goToPrevious(1)}
                className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white/80 hover:bg-purple-600/60 hover:border-purple-500/50 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md shadow-lg"
                aria-label="Anterior"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>

              {/* Flecha Siguiente - visible solo en desktop */}
              <button
                onClick={() => goToNext(1)}
                className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white/80 hover:bg-purple-600/60 hover:border-purple-500/50 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 backdrop-blur-md shadow-lg"
                aria-label="Siguiente"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>

              <motion.div
                ref={carouselRef}
                className="flex gap-4 overflow-x-auto py-4 px-6 scrollbar-none touch-pan-y"
                onTouchStart={(e) => touchStartX.current = e.touches[0].clientX}
                onTouchEnd={handleTouchEnd}
              >
                {displayClients.map((client, i) => {
                  const isSelected = i === renderedIndex;
                  return (
                    <motion.div
                      key={`${client.name}-${i}`}
                      ref={isSelected ? selectedCardRef : undefined}
                      data-card
                      className={cn(
                        "relative flex-shrink-0 w-[160px] md:w-[220px] h-[80px] md:h-[110px] flex items-center justify-center p-4 rounded-xl border transition-all duration-500",
                        isSelected ? "bg-white/10 border-purple-500/50 scale-105" : "bg-white/5 border-white/5 opacity-40"
                      )}
                    >
                      <img src={client.image} alt={client.name} className="max-w-full max-h-full object-contain" />
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* INFO + IMAGE PANEL (Texto adaptable y logo visible) */}
            <div className="flex-1 min-h-0 w-full flex flex-col md:grid md:grid-cols-5 gap-4 md:gap-8 overflow-hidden">
              {/* Contenedor de Texto */}
              <motion.div
                key={selectedClient.name + "-info"}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                className="md:col-span-3 bg-white/[0.03] border border-white/[0.08] rounded-2xl p-5 md:p-8 flex flex-col justify-center overflow-y-auto scrollbar-none"
              >
                <h3 className="text-[26px] md:text-3xl lg:text-4xl text-white ALONGSANSS-REGULAR mb-2 leading-tight text-center">
                  {selectedClient.name}
                </h3>
                
                {selectedClient.href && (
                  <a href={selectedClient.href} target="_blank" className="text-purple-400 text-lg md:text-xl mb-4 block text-center hover:underline">Visitar sitio web</a>
                )}

                {/* Texto con tamaño fluido que se adapta al espacio */}
                <p className="text-[19px] sm:text-[21px] md:text-xl lg:text-2xl text-white/70 AlongSanss2-Thin leading-relaxed whitespace-pre-line text-center">
                  {selectedClient.description || "Aliado estratégico comprometido con la innovación y el desarrollo tecnológico continuo."}
                </p>
              </motion.div>

              {/* Contenedor de Logo (Se mantiene visible al lado) */}
              <motion.div
                key={selectedClient.name + "-img"}
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="md:col-span-2 flex items-center justify-center bg-white/[0.02] rounded-2xl p-6"
              >
                <div className="relative w-full max-w-[180px] md:max-w-[300px] aspect-square flex items-center justify-center">
                  <div className="absolute inset-0 bg-purple-500/5 rounded-full blur-3xl" />
                  <img
                    src={selectedClient.image}
                    alt={selectedClient.name}
                    className="relative z-10 w-full h-full object-contain filter drop-shadow-2xl"
                  />
                </div>
              </motion.div>
            </div>

            {/* DOTS */}
            <div className="flex justify-center gap-1.5 mt-4 flex-shrink-0">
              {clients.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setRenderedIndex(totalClients + i)}
                  className={cn(
                    "h-1.5 transition-all duration-300 rounded-full",
                    i === selectedIndex ? "w-6 bg-purple-500" : "w-1.5 bg-white/20"
                  )}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}