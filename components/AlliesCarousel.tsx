"use client";

import React, { useState, useRef, useEffect, useCallback, useMemo, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type Client } from "@/data/clients";

interface AlliesCarouselProps {
  clients: Client[];
  reverse?: boolean;
}

export interface AlliesCarouselHandle {
  goToPrevious: (steps?: number) => void;
  goToNext: (steps?: number) => void;
}

const AlliesCarousel = forwardRef<AlliesCarouselHandle, AlliesCarouselProps>(({ clients, reverse = false }, ref) => {
  const totalClients = clients.length;
  const displayClients = useMemo(() => [...clients, ...clients, ...clients], [clients]);

  const initialIndex = reverse ? totalClients * 2 - 1 : totalClients;
  const [renderedIndex, setRenderedIndex] = useState(initialIndex);
  const selectedIndex = renderedIndex % totalClients;

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

  const scrollCarousel = useCallback((steps: number, dir: "prev" | "next") => {
    const container = carouselRef.current;
    if (!container) return;
    const step = getCardStep(container);
    if (!step) return;

    const moveAmount = step * steps;
    const newScrollLeft = dir === "next" 
      ? container.scrollLeft + moveAmount 
      : container.scrollLeft - moveAmount;

    container.scrollTo({ left: newScrollLeft, behavior: "smooth" });
  }, [getCardStep]);

  const goToPrevious = useCallback((steps: number = 1) => {
    isArrowNav.current = true;
    const newIndex = renderedIndex + (reverse ? steps : -steps);

    if (reverse ? newIndex >= totalClients * 2 : newIndex < totalClients) {
      if (teleportTimer.current) clearTimeout(teleportTimer.current);
      scrollCarousel(steps, reverse ? "next" : "prev");
      setRenderedIndex(newIndex);
      teleportTimer.current = setTimeout(() => {
        const container = carouselRef.current;
        if (!container) return;
        const targetIndex = reverse ? newIndex - totalClients : newIndex + totalClients;
        const cards = container.querySelectorAll("[data-card]");
        const targetCard = cards[targetIndex] as HTMLElement | undefined;
        if (targetCard) {
          container.scrollLeft = targetCard.offsetLeft - (container.clientWidth / 2) + (targetCard.offsetWidth / 2);
        }
        setRenderedIndex(targetIndex);
      }, 350);
    } else {
      scrollCarousel(steps, reverse ? "next" : "prev");
      setRenderedIndex(newIndex);
    }
  }, [renderedIndex, totalClients, scrollCarousel, getCardStep, reverse]);

  const goToNext = useCallback((steps: number = 1) => {
    isArrowNav.current = true;
    if (teleportTimer.current) clearTimeout(teleportTimer.current);
    const newIndex = renderedIndex + (reverse ? -steps : steps);

    if (reverse ? newIndex < totalClients : newIndex >= totalClients * 2) {
      scrollCarousel(steps, reverse ? "prev" : "next");
      setRenderedIndex(newIndex);
      teleportTimer.current = setTimeout(() => {
        const container = carouselRef.current;
        if (!container) return;
        const targetIndex = reverse ? newIndex + totalClients : newIndex - totalClients;
        const cards = container.querySelectorAll("[data-card]");
        const targetCard = cards[targetIndex] as HTMLElement | undefined;
        if (targetCard) {
          container.scrollLeft = targetCard.offsetLeft - (container.clientWidth / 2) + (targetCard.offsetWidth / 2);
        }
        setRenderedIndex(targetIndex);
      }, 350);
    } else {
      scrollCarousel(steps, reverse ? "prev" : "next");
      setRenderedIndex(newIndex);
    }
  }, [renderedIndex, totalClients, scrollCarousel, getCardStep, reverse]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const absDiff = Math.abs(diffX);
    const threshold = 40;

    if (absDiff > threshold) {
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
      const scrollTarget = card.offsetLeft - (container.clientWidth / 2) + (card.offsetWidth / 2);
      container.scrollTo({ left: scrollTarget, behavior: "smooth" });
    }
  }, [selectedIndex]);

  useImperativeHandle(ref, () => ({
    goToPrevious,
    goToNext,
  }), [goToPrevious, goToNext]);

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;
    const step = getCardStep(container);
    if (!step) return;
    const initialCardIndex = reverse ? totalClients * 2 - 1 : totalClients;
    setRenderedIndex(initialCardIndex);
    const cards = container.querySelectorAll("[data-card]");
    const targetCard = cards[initialCardIndex] as HTMLElement | undefined;
    if (targetCard) {
      container.scrollLeft = targetCard.offsetLeft - (container.clientWidth / 2) + (targetCard.offsetWidth / 2);
    }
  }, [totalClients, getCardStep, reverse]);

  return (
    <div className="relative">
      {/* Carrusel */}
      <div
        ref={carouselRef}
        className="flex gap-3 md:gap-4 overflow-x-auto py-2 md:py-4 px-4 md:px-6 scrollbar-none touch-pan-y"
        onTouchStart={(e) => touchStartX.current = e.touches[0].clientX}
        onTouchEnd={handleTouchEnd}
      >
        {displayClients.map((client, i) => {
          const isSelected = i === renderedIndex;
          const isLink = !!client.href;
          return (
            <motion.div
              key={`${client.name}-${i}`}
              ref={isSelected ? selectedCardRef : undefined}
              data-card
              onClick={() => {
                if (isLink) window.open(client.href, "_blank");
              }}
              className={cn(
                "relative flex-shrink-0 w-[170px] md:w-[240px] h-[85px] md:h-[120px] flex items-center justify-center p-3 md:p-4 rounded-xl border transition-all duration-500 cursor-pointer",
                isSelected 
                  ? "bg-white/10 border-purple-500/50 scale-105 shadow-lg shadow-purple-500/20" 
                  : "bg-white/5 border-white/5 opacity-50 hover:opacity-80 hover:border-white/20"
              )}
              whileHover={{ scale: isSelected ? 1.05 : 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <img 
                src={client.image} 
                alt={client.name} 
                className="max-w-full max-h-full object-contain pointer-events-none"
                draggable={false}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
});

AlliesCarousel.displayName = "AlliesCarousel";

export default AlliesCarousel;
