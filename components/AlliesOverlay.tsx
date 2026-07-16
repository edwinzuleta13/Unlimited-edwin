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
  // Triple the data for infinite loop illusion
  const displayClients = useMemo(() => [...clients, ...clients, ...clients], []);

  // renderedIndex: actual position in the tripled array (starts in the middle copy)
  const [renderedIndex, setRenderedIndex] = useState(totalClients);
  const selectedIndex = renderedIndex % totalClients;
  const selectedClient = clients[selectedIndex];

  const carouselRef = useRef<HTMLDivElement>(null);
  const selectedCardRef = useRef<HTMLDivElement>(null);
  const isArrowNav = useRef(false);
  const teleportTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const touchStartX = useRef(0);

  // Helper: get one card step width (card + gap)
  const getCardStep = useCallback((container: HTMLElement) => {
    const card = container.querySelector("[data-card]") as HTMLElement | null;
    if (!card) return 0;
    const gap = parseInt(getComputedStyle(container).gap) || 16;
    return card.offsetWidth + gap;
  }, []);


  const scrollCarousel = useCallback((direction: "prev" | "next") => {
    const container = carouselRef.current;
    if (!container) return;
    const step = getCardStep(container);
    if (!step) return;

    const newScrollLeft =
      direction === "next"
        ? container.scrollLeft + step
        : container.scrollLeft - step;

    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  }, [getCardStep]);



  const goToPrevious = useCallback(() => {
    isArrowNav.current = true;
    const newIndex = renderedIndex - 1;

    if (newIndex < totalClients) {
      if (teleportTimer.current) clearTimeout(teleportTimer.current);
      // 1. Smooth scroll to the previous card (in the first copy)
      scrollCarousel("prev");
      setRenderedIndex(newIndex);
      // 2. After scroll animation, teleport back to middle copy (invisible)
      teleportTimer.current = setTimeout(() => {
        const container = carouselRef.current;
        const step = container ? getCardStep(container) : 0;
        if (container && step) {
          const targetIndex = newIndex + totalClients;
          container.scrollLeft = targetIndex * step;
          setRenderedIndex(targetIndex);
        }
      }, 350);
    } else {
      if (teleportTimer.current) clearTimeout(teleportTimer.current);
      scrollCarousel("prev");
      setRenderedIndex(newIndex);
    }
  }, [renderedIndex, totalClients, scrollCarousel, getCardStep]);

  const goToNext = useCallback(() => {
    isArrowNav.current = true;
    if (teleportTimer.current) clearTimeout(teleportTimer.current);
    const newIndex = renderedIndex + 1;

    if (newIndex >= totalClients * 2) {
      // 1. Smooth scroll to the next card (in the third copy)
      scrollCarousel("next");
      setRenderedIndex(newIndex);
      // 2. After scroll animation, teleport back to middle copy (invisible)
      teleportTimer.current = setTimeout(() => {
        const container = carouselRef.current;
        const step = container ? getCardStep(container) : 0;
        if (container && step) {
          const targetIndex = newIndex - totalClients;
          container.scrollLeft = targetIndex * step;
          setRenderedIndex(targetIndex);
        }
      }, 350);
    } else {
      scrollCarousel("next");
      setRenderedIndex(newIndex);
    }
  }, [renderedIndex, totalClients, scrollCarousel, getCardStep]);

  // Auto-scroll to position selected card at the LEFT edge (for dots / initial)
  useEffect(() => {
    if (isArrowNav.current) {
      isArrowNav.current = false;
      return;
    }
    if (selectedCardRef.current && carouselRef.current) {
      const card = selectedCardRef.current;
      const container = carouselRef.current;
      const cardLeft = card.offsetLeft;
      const containerPadding = 24; // px-6 = 24px left padding
      const scrollTarget = cardLeft - containerPadding;
      container.scrollTo({ left: scrollTarget, behavior: "smooth" });
    }
  }, [selectedIndex]);

  // On open, position carousel so the first card is at the LEFT edge + reset state
  useEffect(() => {
    if (!isOpen) return;
    const container = carouselRef.current;
    if (!container) return;
    const step = getCardStep(container);
    if (!step) return;
    // Reset renderedIndex to first card of middle copy
    setRenderedIndex(totalClients);
    // Scroll to show the first card at the left edge (accounting for padding)
    const padLeft = parseFloat(getComputedStyle(container).paddingLeft) || 24;
    container.scrollLeft = totalClients * step - padLeft;
  }, [isOpen, totalClients, getCardStep]);

  // Touch swipe handlers for mobile (same functionality as arrows)
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const threshold = 30; // minimum swipe distance in px
    if (diffX > threshold) {
      goToPrevious();
    } else if (diffX < -threshold) {
      goToNext();
    }
  }, [goToPrevious, goToNext]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, goToPrevious, goToNext, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{ overscrollBehavior: "none" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/85 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 w-full h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="fixed top-6 right-6 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>

            {/* ========== HEADER ========== */}
            <div className="text-center mb-4 md:mb-6 flex-shrink-0">
              <motion.span
                className="inline-block text-purple-400 ALONGSANSS-REGULAR text-[10px] md:text-xs uppercase tracking-[0.3em] mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Confianza Global
              </motion.span>
              <motion.h2
                className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl text-white ALONGSANSS-REGULAR tracking-tight"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.5 }}
              >
                Nuestros <span className="text-purple-400">Aliados Comerciales</span>
              </motion.h2>
              <motion.div
                className="mt-3 mx-auto w-12 h-[2px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.35 }}
              />
            </div>

            {/* ========== INFINITE CAROUSEL ========== */}
            <div className="relative flex-shrink-0 mb-4 md:mb-6">
              {/* Left arrow - hidden on mobile */}
              <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 z-10 -ml-2 md:-ml-3">
                <motion.button
                  onClick={goToPrevious}
                  className="w-11 h-11 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.10] backdrop-blur-md text-white/50 hover:text-white hover:bg-white/[0.12] hover:border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </motion.button>
              </div>

              {/* Right arrow - hidden on mobile */}
              <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 z-10 -mr-2 md:-mr-3">
                <motion.button
                  onClick={goToNext}
                  className="w-11 h-11 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/[0.06] border border-white/[0.10] backdrop-blur-md text-white/50 hover:text-white hover:bg-white/[0.12] hover:border-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </div>

              {/* Right fade gradient */}
              <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none z-[5]" />

              {/* Infinite carousel track - touch swipe on mobile */}
              <motion.div
                ref={carouselRef}
                className="flex gap-4 md:gap-5 overflow-x-auto pt-1 pb-3 px-6 scrollbar-none touch-pan-y"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {displayClients.map((client, i) => {
                  const isSelected = i === renderedIndex;
                  return (
                    <motion.div
                      key={`${client.name}-${i}`}
                      ref={isSelected ? selectedCardRef : undefined}
                      data-card
                      className={cn(
                        "relative flex-shrink-0 w-[208px] sm:w-[190px] md:w-[220px] lg:w-[256px] h-[104px] sm:h-[95px] md:h-[110px] lg:h-[128px]",
                        "flex items-center justify-center p-4 md:p-5 rounded-xl border backdrop-blur-sm",
                        "transition-all duration-300 select-none",
                        isSelected
                          ? "bg-white/[0.08] border-purple-500/50 shadow-lg shadow-purple-500/10 scale-105"
                          : "bg-white/[0.03] border-white/[0.06]"
                      )}
                    >
                      {isSelected && (
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-purple-500/10 blur-md -z-10"
                          layoutId="carousel-glow"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                      <img
                        src={client.image}
                        alt={client.name}
                        className={cn(
                          "max-w-full max-h-full object-contain transition-all duration-400",
                          isSelected
                            ? "opacity-100 grayscale-0"
                            : "opacity-50 grayscale"
                        )}
                      />
                      {isSelected && (
                        <motion.div
                          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-[3px] bg-purple-500 rounded-full"
                          layoutId="carousel-indicator"
                          transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* ========== INFO + IMAGE PANEL ========== */}
            <motion.div
              className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-6 lg:gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <motion.div
                className="col-span-1 md:col-span-3 bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 md:p-6 lg:p-8 backdrop-blur-sm flex flex-col justify-center overflow-y-auto"
                key={selectedClient.name + "-info"}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="text-[26px] sm:text-2xl md:text-3xl lg:text-4xl text-white ALONGSANSS-REGULAR tracking-tight mb-3">
                  {selectedClient.name}
                </h3>
                {selectedClient.href && (
                  <a
                    href={selectedClient.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-purple-400/70 hover:text-purple-300 text-[15px] md:text-sm AlongSanss2-Thin mb-4 transition-colors duration-200 w-fit"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    Visitar sitio web
                  </a>
                )}
                <p className="text-[18px] md:text-base text-white/60 AlongSanss2-Thin leading-relaxed">
                  {selectedClient.description || "Empresa aliada que confía en nosotros para impulsar su transformación digital."}
                </p>
              </motion.div>

              <motion.div
                className="col-span-1 md:col-span-2 flex items-center justify-center overflow-hidden"
                key={selectedClient.name + "-img"}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="relative w-full max-w-[252px] md:max-w-[480px] aspect-square flex items-center justify-center"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                >
                  <div className="absolute inset-[15%] rounded-full bg-purple-500/[0.04] border border-purple-500/10" />
                  <div className="absolute inset-[8%] rounded-full bg-purple-500/[0.02] border border-purple-500/[0.05]" />
                  <img
                    src={selectedClient.image}
                    alt={selectedClient.name}
                    className="relative z-10 w-[80%] h-[80%] object-contain filter drop-shadow-lg"
                  />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Bottom dots */}
            <motion.div
              className="flex-shrink-0 flex items-center justify-center gap-1.5 mt-3 md:mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {clients.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setRenderedIndex(totalClients + i);
                  }}
                  className={cn(
                    "rounded-full transition-all duration-300",
                    i === selectedIndex
                      ? "w-5 h-1.5 bg-purple-500"
                      : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
                  )}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
