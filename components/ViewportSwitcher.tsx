"use client";
import { useEffect } from "react";

export default function ViewportSwitcher() {
  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');

    const updateViewport = () => {
      if (!meta) return;

      const width = window.innerWidth;

      if (width >= 1024) {
        // PCs y laptops → usar 90% del ancho real
        const viewportWidth = Math.round(width * 0.9);
        meta.setAttribute(
          "content",
          `width=${viewportWidth}, initial-scale=1`
        );
      } else {
        // Móviles y tablets → comportamiento normal
        meta.setAttribute(
          "content",
          "width=device-width, initial-scale=1"
        );
      }
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return null;
}
