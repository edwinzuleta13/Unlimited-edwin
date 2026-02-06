"use client";

import MultiActionAreaCard from "@/components/MultiActionAreaCard";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  cardWidth?: number;
  imageHeight?: number;
  imageFit?: "cover" | "contain" | "fill";
  imageBorderRadius?: string | number;
  cardPadding?: number;       // padding general del Card
  cardPaddingTop?: number;    // padding top del Card
  hoverColor?: string;
  imagePaddingTop?: number;   // margen superior de la imagen
  imagePadding?: number;      // padding general alrededor de la imagen
  textColorHover?: string;
  href?: string;              // URL para redirección
}

const testimonials: Testimonial[] = [

  {
    quote:
      "Anas Accounting es una plataforma digital especializada en la reserva y gestión de citas. Transformamos la organización interna de los negocios mediante herramientas automáticas que eliminan los errores de agenda y mejoran la experiencia del cliente.",
    name: "Anas Acounding",
    role: "Head of Engineering",
    company: "TechFlow",
    image:
      "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/ANAS%20ACCOUNTING%20SERV%20LOGO%20(2).png",
    cardWidth: 500,
    imageHeight: 190,
    imageFit: "contain",
    imageBorderRadius: 0,
    hoverColor: "#ffffff",
    textColorHover: "#000000",
    imagePadding: 2,
    imagePaddingTop: 6,
    href: "https://anasaccounting.com/", // <<== URL para redirección
  },
  {
    quote:
      "DAKA logró modernizar su infraestructura digital gracias a nuestra integración ágil y soporte continuo, potenciando su innovación en la nube.",
    name: "DAKA",
    role: "CTO",
    company: "CloudNova",
    image:
      "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/daka-logo.png",
    cardWidth: 420,
    imageHeight: 190,
    imageFit: "cover",
    imagePaddingTop: 16,
    imageBorderRadius: 12,
    cardPaddingTop: 28,
    hoverColor: "#f7ef14",
    textColorHover: "#0224bd",
    href: "https://tiendasdaka.com", // <<== URL para redirección
  },
  {
    quote:
      "Extra Ganga consiguió un sistema más eficiente para la gestión de productos y ventas, impulsando su capacidad de respuesta en el sector retail.",
    name: "Extra ganga",
    role: "Product Manager",
    company: "Finnect",
    image:
      "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/extra_ganga_logo.jpeg",
    cardWidth: 400,
    imageHeight: 190,
    imageFit: "cover",
    imagePadding: 16,
    hoverColor: "#015438",
    textColorHover: "#FF4500",
    href: "https://www.instagram.com/extragangave/?hl=es", // <<== URL para redirección
  },
  {
    quote:
      "KAOZ confió en nosotros para digitalizar procesos y mejorar la calidad tecnológica de sus operaciones, logrando un salto significativo en eficiencia.",
    name: "KAOZ",
    role: "Director de Tecnología",
    company: "RetailPro",
    image:
      "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/KAOZ.png",
    imageHeight: 190,
    cardWidth: 400,
    imageFit: "contain",
    imageBorderRadius: 0,
    hoverColor: "#ffffff",
    textColorHover: "#000000",
    href: "https://www.instagram.com/kaos.vzla?igsh=eWxrNmEyZXI0NzM2", // <<== URL para redirección
  },
  {
    quote:
      "Keyton escaló sus servicios en la nube sin interrupciones, implementando soluciones estables y confiables desarrolladas a la medida.",
    name: "KEYTON",
    role: "Head of Cloud",
    company: "DataWorks",
    image:
      "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/keyton_logo.png",
    imageHeight: 190,
    cardWidth: 400,
    imageFit: "contain",
    imageBorderRadius: 0,
    hoverColor: "#adacac",
    textColorHover: "#000000",
    href: "https://keyton.com.ve", // <<== URL para redirección
  },
  {
    quote:
      "Rental Deluxe es una plataforma de alquiler vacacional que combina tecnología de vanguardia para ofrecer reservas rápidas y seguras en casas y hoteles, optimizando la experiencia de viaje de sus usuarios.",
    name: "Rental Deluxe",
    role: "CTO",
    company: "HealthAxis",
    image:
      "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/logo-Rental-deluxe-JPEG-(8).jpg",
    imageHeight: 215,
    cardWidth: 450,
    imageFit: "cover",
    imageBorderRadius: 0,
    cardPaddingTop: 20,
    hoverColor: "#938376",
    textColorHover: "#ffffff",
    href: "https://somosrentaldeluxe.com", // <<== URL para redirección
  },
  { 
    quote:
      "Reys Smart logró automatizar tareas clave y fortalecer su presencia digital con herramientas modernas y un desarrollo impecable.",
    name: "Reys Smart",
    role: "CEO",
    company: "MarketHive",
    image:
      "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/logo-reys-smart-01.jpg",
    imageHeight: 210,
    imageFit: "cover",
    imageBorderRadius: 0,
    cardWidth: 400,
    hoverColor: "#ffffff",
    textColorHover: "#06892E",
    href: "https://reysmartsolution.com", // <<== URL para redirección
  },
  {
    quote:
      "Piper incrementó la estabilidad y calidad de su plataforma gracias a nuestras prácticas de ingeniería y un soporte técnico altamente especializado.",
    name: "Piter",
    role: "Engineering Manager",
    company: "BrightEdge",
    image:
      "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/piper_logo.png",
    imageHeight: 220,
    imageFit: "cover",
    imagePaddingTop: 10,
    cardWidth: 400,
    hoverColor: "#ffffff",
    textColorHover: "#bd0000",
    href: "https://piter.com.ve", // <<== URL para redirección
  },
  {
    quote:
      "Yenfit transformó su modelo de ventas mediante una plataforma digital que aceleró su crecimiento comercial y permitió una operación escalable.",
    name: "yenfit",
    role: "VP of Product",
    company: "Untitled Tech",
    image:
      "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/yenfit.png",
    imageHeight: 190,
    imageFit: "contain",
    imageBorderRadius: 0,
    cardWidth: 400,
    imagePaddingTop: 16,
    cardPaddingTop: 20,
    hoverColor: "#949494",
    textColorHover: "#ffffff",
    href: "https://www.yenfit.shop", // <<== URL para redirección
  },
  {
    quote:
      "You Space escaló su plataforma con un enfoque más robusto y seguro, reduciendo costos operativos y mejorando su tiempo de entrega.",
    name: "You Space",
    role: "COO",
    company: "Nextify",
    image:
      "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/you_space_logo.png",
    imageHeight: 190,
    imageFit: "cover",
    imageBorderRadius: 0,
    cardWidth: 400,
    cardPaddingTop: 16,
    hoverColor: "#235888",
    textColorHover: "#ffffff",
    href: "", // <<== URL para redirección
  },
]


export default function TrustedBySection() {
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const nextPage = () => setPage((p) => (p + 1) % totalPages);
  const prevPage = () => setPage((p) => (p === 0 ? totalPages - 1 : p - 1));

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(nextPage, 6000);
    return () => clearInterval(timer);
  }, [paused, totalPages]);

  const start = page * itemsPerPage;
  const visible = testimonials.slice(start, start + itemsPerPage);

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
      <motion.h2
        className="text-3xl md:text-5xl font-bold mb-6 gradient-text"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Nuestros Aliados
      </motion.h2>

      <motion.p
        className="text-lg text-purple-300 max-w-2xl mx-auto mb-12"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Desde startups hasta empresas Fortune 500 — más de 20 años entregando resultados.
      </motion.p>

      <div className="mt-8 min-h-[420px] flex flex-col items-center justify-center w-full">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={page}
            className={`grid gap-8 justify-items-center ${visible.length === 1
              ? "grid-cols-1 justify-center"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            style={{ maxWidth: 1320 }}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
          >
            {visible.map((t) => (
              <motion.div
                key={t.name + t.company}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MultiActionAreaCard
                  title={t.name}
                  description={`“${t.quote}”`}
                  image={t.image || "/logo-Untitled-26.png"}
                  alt={`${t.role} — ${t.company}`}
                  maxWidth={t.cardWidth || 420}
                  imageHeight={t.imageHeight || 140}
                  imageFit={t.imageFit || "contain"}
                  imageBorderRadius={t.imageBorderRadius || 0}
                  imagePaddingTop={t.imagePaddingTop || 0}
                  imagePadding={t.imagePadding || 0}
                  className=""
                  titleClassName="text-xl font-semibold text-white"
                  descriptionClassName="mt-3 text-purple-200 text-center"
                  bgColor="rgba(124,58,237,0.12)"
                  hoverColor={t.hoverColor || "rgba(133,77,255,0.85)"}
                  textColorHover={t.textColorHover || "#FFE600"}  // <<===== hover text color
                  innerPadding={t.cardPadding ?? 16}
                  innerPaddingTop={t.cardPaddingTop ?? t.cardPadding ?? 16}
                  href={t.href}  // <<== URL para redirección
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-4 mt-8">
          <button
            className="p-2 rounded-full bg-purple-900/30 hover:bg-purple-700/60 transition"
            onClick={prevPage}
            aria-label="Anterior"
          >
            <ChevronUp className="w-5 h-5" />
          </button>

          <button
            className="p-2 rounded-full bg-purple-900/30 hover:bg-purple-700/60 transition"
            onClick={nextPage}
            aria-label="Siguiente"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
