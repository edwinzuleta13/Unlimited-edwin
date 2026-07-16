"use client";

import React from "react";
import { motion } from "framer-motion";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";
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

  const LogoItem = ({ client, className }: { client: Client; className?: string }) => {
    const isLink = !!client.href;
    
    return (
      <MarqueeItem className={cn("mx-6 md:mx-10", className)}>
        <motion.a
          href={isLink ? client.href : undefined}
          target={isLink ? "_blank" : undefined}
          rel={isLink ? "noopener noreferrer" : undefined}
          className={cn(
            "block group transition-all duration-300",
            isLink ? "cursor-pointer" : "cursor-default"
          )}
          whileHover={isLink ? { scale: 1.1, y: -15 } : {}}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative w-36 h-[70px] md:w-[211px] md:h-[106px] flex items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10 glass-effect-purple backdrop-blur-sm transition-all duration-300">
            <img
              src={client.image}
              alt={client.name}
              className="max-w-full max-h-full object-contain filter grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
            />
            {/* Subtle glow highlight on hover */}
            <div className="absolute inset-0 rounded-2xl bg-purple-500/0 group-hover:bg-purple-500/10 blur-xl transition-all duration-500 -z-10" />
          </div>
          <p className="mt-3 text-[10px] md:text-xs text-white/30 uppercase tracking-widest AlongSanss2-Thin opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
            {client.name}
          </p>
        </motion.a>
      </MarqueeItem>
    );
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

      <div className="relative space-y-0">
        {/* Top Marquee - Scrolling Left */}
        <Marquee style={{ overflow: "visible" }}>
          <MarqueeContent speed={30} direction="left" pauseOnHover={true} style={{ overflow: "visible" }}>
            {firstRow.map((client) => (
              <LogoItem key={client.name} client={client} className="py-10" />
            ))}
          </MarqueeContent>
        </Marquee>

        {/* Bottom Marquee - Scrolling Right */}
        <Marquee style={{ overflow: "visible" }}>
          <MarqueeContent speed={30} direction="right" pauseOnHover={true} style={{ overflow: "visible" }}>
            {secondRow.map((client) => (
              <LogoItem key={client.name} client={client} className="py-10" />
            ))}
          </MarqueeContent>
        </Marquee>




        
        {/* Soft Side Blurs */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-20 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-20 pointer-events-none" />
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
