"use client";

import { motion } from "framer-motion";
import ServiceCard from "@/components/ServiceCard";
import { Code, Database, Cloud, Brain, Shield, Boxes } from "lucide-react";

export default function AltServicesLayout({ onBack }) {
  return (
    <motion.section
      key="altLayout"
      id="servicios"
      className="py-20 px-4 bg-black/50 backdrop-blur"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.45 }}
    >
      <div className="container mx-auto">

        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 gradient-text">
            Soluciones Tecnológicas Integrales
          </h2>

          <p className="text-lg text-purple-300 max-w-2xl mx-auto">
            Ofrecemos un ecosistema completo de servicios tecnológicos para impulsar la transformación digital de tu empresa.
          </p>

          <button
            onClick={onBack}
            className="mt-6 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded text-white"
          >
            Volver
          </button>
        </motion.div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ServiceCard icon={<Code />} title="Desarrollo Web y Móvil" />
          <ServiceCard icon={<Database />} title="CRM y ERP" />
          <ServiceCard icon={<Cloud />} title="Cloud Solutions" />
          <ServiceCard icon={<Brain />} title="Inteligencia Artificial" />
          <ServiceCard icon={<Shield />} title="Ciberseguridad" />
          <ServiceCard icon={<Boxes />} title="Integración de Sistemas" />
        </div>

      </div>
    </motion.section>
  );
}
