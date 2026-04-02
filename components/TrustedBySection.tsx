"use client";

import React from "react";
import { motion } from "framer-motion";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";


interface Client {
  name: string;
  image: string;
  href?: string;
}

const clients: Client[] = [
  {
    name: "Ana's Accounting",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/ANAS%20ACCOUNTING%20SERV%20LOGO%20(2).png",
    href: "https://anasaccounting.com/",
  },
  {
    name: "DAKA",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/daka-logo.png",
    href: "https://tiendasdaka.com",
  },
  {
    name: "Extra ganga",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/extra_ganga_logo.jpeg",
    href: "",
  },
  {
    name: "KAOZ",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/KAOZ.png",
    href: "",
  },
  {
    name: "KEYTON",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/keyton_logo.png",
    href: "https://keyton.com.ve",
  },
  {
    name: "Rental Deluxe",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/logo-Rental-deluxe-JPEG-(8).jpg",
    href: "https://somosrentaldeluxe.com",
  },
  {
    name: "Reys Smart",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/logo-reys-smart-01.jpg",
    href: "https://reysmartsolution.com",
  },
  {
    name: "Piter",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/piper_logo.png",
    href: "https://piter.com.ve/",
  },
  {
    name: "yenfit",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/yenfit.png",
    href: "https://www.yenfit.shop",
  },
  {
    name: "You Space",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/you_space_logo.png",
    href: "",
  },
  {
    name: "Campo Meat",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/logo%20campo%20meat%20JPEG%20(1).jpg",
    href: "https://www.campomeat.com",
  },
  {
    name: "WH Mattdres",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/4-%20(WH)%201.png",
    href: "https://www.whmattress.com",
  },
];

const splitArray = (arr: Client[]) => {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
};

export default function TrustedBySection() {
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
          <div className="relative w-32 h-16 md:w-48 md:h-24 flex items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10 glass-effect-purple backdrop-blur-sm transition-all duration-300">
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
    </section>
  );
}
