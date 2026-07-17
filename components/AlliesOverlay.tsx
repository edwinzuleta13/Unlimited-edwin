"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { clients } from "@/data/clients";

interface AlliesOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AlliesOverlay({ isOpen, onClose }: AlliesOverlayProps) {
  const totalClients = clients.length;
  const displayClients = useMemo(() => [...clients, ...clients, ...clients], []);

  // Inicializamos con el índice del medio
  const [renderedIndex, setRenderedIndex] = useState(totalClients);

  // SEGURIDAD: Calculamos el cliente seleccionado con una salvaguarda
  const selectedIndex = totalClients > 0 ? renderedIndex % totalClients : 0;
  const selectedClient = clients[selectedIndex];

  const carouselRef = useRef<HTMLDivElement>(null);
  const isTeleporting = useRef(false);
  const rafRef = useRef<number | null>(null);

  const getCardStep = useCallback((container: HTMLElement) => {
    const card = container.querySelector("[data-card]") as HTMLElement | null;
    if (!card) return 0;
    const gap = parseInt(getComputedStyle(container).gap) || 12;
    return card.offsetWidth + gap;
  }, []);

  const getSnapScrollLeft = useCallback((index: number) => {
    const container = carouselRef.current;
    if (!container) return 0;
    const step = getCardStep(container);
    if (!step) return 0;
    const gap = parseInt(getComputedStyle(container).gap) || 12;
    const cardWidth = step - gap;
    const snapOffset = (container.clientWidth - cardWidth) / 2;
    return index * step - snapOffset;
  }, [getCardStep]);

  const handleScroll = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (isTeleporting.current) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      const container = carouselRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      const cards = container.querySelectorAll<HTMLElement>("[data-card]");
      let closestIdx = -1;
      let closestDist = Infinity;

      cards.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - containerCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = i;
        }
      });

      if (closestIdx >= 0) {
        setRenderedIndex(closestIdx);
      }
    });
  }, []);

  const goToPrevious = useCallback(() => {
    const container = carouselRef.current;
    if (!container) return;
    const step = getCardStep(container);
    if (!step) return;
    container.scrollTo({ left: container.scrollLeft - step, behavior: "smooth" });
  }, [getCardStep]);

  const goToNext = useCallback(() => {
    const container = carouselRef.current;
    if (!container) return;
    const step = getCardStep(container);
    if (!step) return;
    container.scrollTo({ left: container.scrollLeft + step, behavior: "smooth" });
  }, [getCardStep]);

  useEffect(() => {
    if (!carouselRef.current || totalClients === 0) return;

    if (renderedIndex < totalClients) {
      isTeleporting.current = true;
      const container = carouselRef.current;
      const targetIndex = renderedIndex + totalClients;
      container.scrollLeft = getSnapScrollLeft(targetIndex);
      setRenderedIndex(targetIndex);
      requestAnimationFrame(() => { isTeleporting.current = false; });
    } else if (renderedIndex >= totalClients * 2) {
      isTeleporting.current = true;
      const container = carouselRef.current;
      const targetIndex = renderedIndex - totalClients;
      container.scrollLeft = getSnapScrollLeft(targetIndex);
      setRenderedIndex(targetIndex);
      requestAnimationFrame(() => { isTeleporting.current = false; });
    }
  }, [renderedIndex, totalClients, getSnapScrollLeft]);

  const scrollToCard = useCallback((index: number) => {
    const container = carouselRef.current;
    if (!container) return;
    const scrollLeft = getSnapScrollLeft(index);
    container.scrollTo({ left: scrollLeft, behavior: "smooth" });
  }, [getSnapScrollLeft]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = setTimeout(() => {
      const container = carouselRef.current;
      if (container && totalClients > 0) {
        setRenderedIndex(totalClients);
        container.scrollLeft = getSnapScrollLeft(totalClients);
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [isOpen, totalClients, getSnapScrollLeft]);

  // Si no hay cliente seleccionado (por error de carga), no renderizamos el contenido problemático
  if (!selectedClient && isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-start overflow-hidden bg-black/90 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Botón Cerrar */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 z-[100] w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <motion.div
            className="w-full max-w-7xl h-full flex flex-col px-4 pt-12 pb-4 overflow-y-auto md:overflow-hidden scrollbar-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Header */}
            <div className="text-center mb-6 flex-shrink-0">
              <span className="text-purple-400 ALONGSANSS-REGULAR text-[10px] md:text-xs uppercase tracking-[0.3em] block mb-2">
                Confianza Global
              </span>
              <h2 className="text-2xl md:text-5xl text-white ALONGSANSS-REGULAR tracking-tight">
                Nuestros <span className="text-purple-400">Aliados Comerciales</span>
              </h2>
            </div>

            {/* Carousel */}
            <div className="relative mb-6 md:mb-12 flex-shrink-0">
              <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black/60 to-transparent pointer-events-none z-[5]" />
              <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black/60 to-transparent pointer-events-none z-[5]" />

              <motion.div
                ref={carouselRef}
                onScroll={handleScroll}
                className="flex gap-3 md:gap-6 overflow-x-auto py-4 px-[35%] md:px-12 snap-x snap-mandatory scrollbar-none"
              >
                {displayClients.map((client, i) => (
                  <div
                    key={`${client.name}-${i}`}
                    data-card
                    className={cn(
                      "relative flex-shrink-0 w-[200px] md:w-[240px] h-[110px] md:h-[120px] flex items-center justify-center p-4 rounded-xl border transition-all duration-500 snap-center",
                      i === renderedIndex
                        ? "bg-white/10 border-purple-500/50 scale-110 shadow-lg shadow-purple-500/20"
                        : "bg-white/5 border-white/10 scale-95 opacity-40 grayscale"
                    )}
                  >
                    <img src={client.image} alt={client.name} className="max-w-full max-h-full object-contain" />
                  </div>
                ))}
              </motion.div>
            </div>

            {/* INFO PANEL - Aquí estaba el error */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 md:flex-1 md:min-h-0">
              <div className="col-span-1 md:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 backdrop-blur-md flex flex-col md:h-full md:overflow-hidden">
                <div className="flex-shrink-0">
                  <div className="mb-3">
                    <h3 className="text-5xl md:text-4xl text-white ALONGSANSS-REGULAR mb-2 tracking-tight">
                      {selectedClient.name}
                    </h3>
                    {selectedClient.href && (
                      <a href={selectedClient.href} target="_blank" rel="noopener noreferrer" className="text-purple-400 text-lg md:text-sm flex items-center gap-2 mb-2">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101" strokeWidth={2} /></svg>
                        Sitio Web Oficial
                      </a>
                    )}
                  </div>
                  <p className="text-xl md:text-lg text-white/70 AlongSanss2-Thin leading-relaxed whitespace-pre-line">
                    {selectedClient.description}
                  </p>
                </div>

                {/* LOGO MÓVIL PROTAGONISTA */}
                <div className="mt-8 pt-8 border-t border-white/10 flex flex-col items-center justify-center md:hidden flex-grow">
                  <motion.img
                    key={selectedClient.image}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={selectedClient.image}
                    className="h-44 w-auto max-w-[85%] object-contain brightness-110 drop-shadow-[0_0_30px_rgba(168,85,247,0.35)]"
                  />
                  <div className="w-32 h-1 bg-purple-500/20 blur-xl mt-4"></div>
                </div>
              </div>

              {/* LOGO DESKTOP */}
              <div className="hidden md:flex col-span-2 items-center justify-center bg-white/5 border border-white/10 rounded-2xl relative">
                <img src={selectedClient.image} alt={selectedClient.name} className="relative z-10 w-3/5 object-contain" />
              </div>
            </div>

            {/* DOTS */}
            <div className="flex items-center justify-center gap-2 mt-4 mb-4 flex-shrink-0">
              {clients.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollToCard(totalClients + i)}
                  className={cn(
                    "h-1.5 transition-all duration-300 rounded-full",
                    i === selectedIndex ? "w-8 bg-purple-500" : "w-1.5 bg-white/20"
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