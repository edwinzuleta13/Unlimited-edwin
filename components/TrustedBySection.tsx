"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}


const logos = [
  "https://cdn.simpleicons.org/google/4285F4",   // Google blue
  "https://cdn.simpleicons.org/meta/0467DF",     // Meta blue
  "https://cdn.simpleicons.org/airbnb/FF5A5F",   // Airbnb coral
  "https://cdn.simpleicons.org/openai/412991",   // OpenAI purple
  "https://cdn.simpleicons.org/stripe/008CDD",   // Stripe blue
  "https://cdn.simpleicons.org/nvidia/76B900",   // NVIDIA green
  "https://cdn.simpleicons.org/shopify/95BF47",  // Shopify green
  "https://cdn.simpleicons.org/slack/4A154B",    // Slack purple
];

const testimonials: Testimonial[] = [
  {
    quote:
      "Truelogic has been instrumental in scaling our development team efficiently. Their talent pool is impressive!",
    name: "Jane Doe",
    role: "Head of Engineering",
    company: "TechFlow",
  },
  {
    quote:
      "They seamlessly integrated with our processes and delivered exceptional quality every sprint.",
    name: "Carlos Ramírez",
    role: "CTO",
    company: "CloudNova",
  },
  {
    quote:
      "El equipo de Truelogic transformó nuestro producto en meses; su entrega y responsabilidad fueron ejemplares.",
    name: "María González",
    role: "Product Manager",
    company: "Finnect",
  },
  {
    quote:
      "Excelente comunicación y control de calidad. Superaron nuestras expectativas en tiempo y alcance.",
    name: "Luis Fernández",
    role: "Director de Tecnología",
    company: "RetailPro",
  },
  {
    quote:
      "Su experiencia en cloud y arquitectura nos permitió escalar sin dolores de cabeza.",
    name: "Ana Silva",
    role: "Head of Cloud",
    company: "DataWorks",
  },
  {
    quote:
      "Profesionales y proactivos: resolvieron problemas complejos con soluciones limpias.",
    name: "Diego Martínez",
    role: "CTO",
    company: "HealthAxis",
  },
  {
    quote:
      "La colaboración fue fluida y el resultado final superó ampliamente nuestras expectativas.",
    name: "Sofía López",
    role: "CEO",
    company: "MarketHive",
  },
  {
    quote:
      "El soporte continuo y la calidad del código fueron excepcionales durante todo el proyecto.",
    name: "Andrés Torres",
    role: "Engineering Manager",
    company: "BrightEdge",
  },
  {
    quote:
      "Un equipo confiable y altamente calificado, fueron un socio estratégico clave.",
    name: "Lucía Hernández",
    role: "VP of Product",
    company: "InnovaTech",
  },
  {
    quote:
      "Logramos reducir costos y acelerar nuestro roadmap gracias a su talento.",
    name: "Felipe Vargas",
    role: "COO",
    company: "Nextify",
  },
  {
    quote:
      "La comunicación fue clara y efectiva. Recomiendo totalmente su servicio.",
    name: "Paula Jiménez",
    role: "CTO",
    company: "Medilogic",
  },
  {
    quote:
      "Sus ingenieros se integraron perfectamente a nuestro stack y cultura de trabajo.",
    name: "Miguel Soto",
    role: "Director de Tecnología",
    company: "OmniDev",
  },
];

<style jsx>{`
  .hover\\:filter-purple:hover {
    filter: hue-rotate(270deg) saturate(2) brightness(1.3);
  }
`}</style>

export default function TrustedBySection() {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextPage = () => setPage((prev) => (prev + 1) % totalPages);
  const prevPage = () =>
    setPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));

  // 🔁 Auto-slide cada 6 segundos
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      nextPage();
    }, 6000);
    return () => clearInterval(timer);
  }, [paused, totalPages]);

  const start = page * itemsPerPage;
  const visibleTestimonials = testimonials.slice(start, start + itemsPerPage);

  // Animación vertical tipo "slide"
  const slideVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  };

  return (
    <section
      className="relative py-20 text-center bg-gradient-to-b from-purple-900/40 via-purple-800/10 to-transparent"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Título */}
      <motion.h2
        className="text-3xl md:text-5xl font-bold mb-6 gradient-text"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Confiado por líderes de la industria
      </motion.h2>

      <motion.p
        className="text-lg text-purple-300 max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Desde startups hasta empresas Fortune 500 — más de 20 años entregando
        resultados.
      </motion.p>

      {/* Logos (doble capa para overlay morado en hover) */}
      <motion.div
        className="flex flex-wrap justify-center gap-8 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {logos.map((logo, i) => (
          <motion.div
            key={i}
            className="w-28 h-14 relative group transition-all duration-300 opacity-80 hover:opacity-100"
            whileHover={{ scale: 1.08 }}
          >
            {/* Logo original */}
            <Image
              src={logo}
              alt={`Logo ${i}`}
              width={112}
              height={56}
              unoptimized
              className="object-contain w-full h-full transition-all duration-500 group-hover:opacity-0"
            />

            {/* Capa morada que aparece al hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
              <Image
                src={logo}
                alt={`Logo ${i}`}
                width={112}
                height={56}
                unoptimized
                className="object-contain w-full h-full"
                style={{ filter: "brightness(0) saturate(100%) invert(51%) sepia(91%) saturate(7474%) hue-rotate(259deg) brightness(96%) contrast(103%)" }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Testimonios (solo 4 visibles) */}
      <div className="relative max-w-5xl mx-auto overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {visibleTestimonials.map((t, i) => (
              <motion.div key={i} whileHover={{ y: -6 }} transition={{ duration: 0.2 }}>
                <Card className="p-6 bg-black/30 border-purple-500/20 hover:border-purple-500/40 transition-all group rounded-2xl">
                  <p className="italic mb-4 text-gray-300">“{t.quote}”</p>
                  <h3 className="text-xl font-bold mb-2 group-hover:gradient-text transition-all">
                    {t.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {t.role} — {t.company}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Flechas de navegación */}
        <div className="flex justify-center items-center gap-6 mt-10">
          <button
            onClick={prevPage}
            className="p-2 rounded-full bg-purple-700/30 hover:bg-purple-700/50 transition"
            aria-label="Ver anteriores"
          >
            <ChevronUp className="w-6 h-6 text-purple-300" />
          </button>
          <button
            onClick={nextPage}
            className="p-2 rounded-full bg-purple-700/30 hover:bg-purple-700/50 transition"
            aria-label="Ver siguientes"
          >
            <ChevronDown className="w-6 h-6 text-purple-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
