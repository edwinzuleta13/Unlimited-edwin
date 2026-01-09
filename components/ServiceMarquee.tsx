"use client"

import React, { useState, useEffect, useMemo } from "react"
import { motion, useSpring } from "framer-motion"
import { Marquee, MarqueeContent, MarqueeItem } from '@/components/ui/marquee'
import { ServiceCard } from "./ServiceCard"
import {
    Code,
    Database,
    Cloud,
    Brain,
    Shield,
    Boxes,
} from "lucide-react"

// Hardcoded data to isolate from MainContent
// In a larger app this could be in a separate data file
const SERVICES_DATA = [
    {
        title: "Desarrollo Web y Móvil",
        icon: <Code className="w-8 h-8" />,
        description: "Creamos aplicaciones web y móviles escalables utilizando las últimas tecnologías y mejores prácticas de desarrollo.",
        features: ["Aplicaciones Web Progresivas", "Apps iOS y Android", "Portales Empresariales", "E-commerce"]
    },
    {
        title: "CRM y ERP",
        icon: <Database className="w-8 h-8" />,
        description: "Implementamos y personalizamos sistemas de gestión empresarial adaptados a tus necesidades específicas.",
        features: ["Salesforce", "SAP", "Microsoft Dynamics", "Sistemas Personalizados"]
    },
    {
        title: "Cloud Solutions",
        icon: <Cloud className="w-8 h-8" />,
        description: "Modernizamos tu infraestructura con soluciones cloud que optimizan costos y mejoran la escalabilidad.",
        features: ["AWS", "Azure", "Google Cloud", "Arquitectura Cloud Native"]
    },
    {
        title: "Inteligencia Artificial",
        icon: <Brain className="w-8 h-8" />,
        description: "Implementamos soluciones de IA y Machine Learning para optimizar procesos y tomar mejores decisiones.",
        features: ["Análisis Predictivo", "Procesamiento de Lenguaje Natural", "Computer Vision", "Automatización Inteligente"]
    },
    {
        title: "Ciberseguridad",
        icon: <Shield className="w-8 h-8" />,
        description: "Protegemos tus activos digitales con soluciones de seguridad avanzadas y cumplimiento normativo.",
        features: ["Auditorías de Seguridad", "Implementación Zero Trust", "Gestión de Identidades", "SOC as a Service"]
    },
    {
        title: "Integración de Sistemas",
        icon: <Boxes className="w-8 h-8" />,
        description: "Conectamos tus sistemas y aplicaciones para crear flujos de trabajo eficientes y automatizados.",
        features: ["APIs y Microservicios", "ESB", "ETL", "Automatización de Procesos"]
    },
    {
        title: "E-commerce",
        icon: <Boxes className="w-8 h-8" />,
        description: "Tiendas online personalizadas y optimizadas para convertir más ventas.",
        features: ["Shopify", "WooCommerce", "Pagos y Logística", "Automatización"]
    },
    {
        title: "Chatbots y Automatizaciones",
        icon: <Brain className="w-8 h-8" />,
        description: "Automatizamos flujos de atención y ventas con chatbots inteligentes.",
        features: ["WhatsApp", "Instagram", "Flujos Automatizados", "Integración con CRM"]
    },
    {
        title: "CRM y Soluciones a Medida",
        icon: <Database className="w-8 h-8" />,
        description: "Automatización avanzada y plataformas internas hechas a medida del negocio.",
        features: ["Workflows", "Sistemas Internos", "Integraciones", "Optimización"]
    },
    {
        title: "Aplicaciones Web",
        icon: <Code className="w-8 h-8" />,
        description: "Plataformas web tipo SaaS, dashboards y sistemas empresariales.",
        features: ["SaaS", "ERP", "Dashboards", "PWA"]
    },
    {
        title: "Tecnologías",
        icon: <Code className="w-8 h-8" />,
        description: "Expertos en los lenguajes y frameworks más modernos.",
        features: ["React / Vue / Angular", "Node / Python / PHP", "SQL / NoSQL", "Docker / APIs"]
    },
    {
        title: "Quality Assurance (QA)",
        icon: <Shield className="w-8 h-8" />,
        description: "Aseguramos calidad, rendimiento y seguridad en todos los proyectos.",
        features: ["Pruebas Funcionales", "Usabilidad", "Seguridad", "Optimización"]
    }
];

export function ServiceMarquee() {
    // Instant speed implementation (no spring)
    const [speed, setSpeed] = useState(100);

    // Memoized rows logic
    const marqueeRows = useMemo(() => {
        return SERVICES_DATA.reduce((rows: any[], card, index) => {
            if (index % 2 === 0) {
                rows.push([card]);
            } else {
                if (rows.length > 0) rows[rows.length - 1].push(card);
                else rows.push([card]);
            }
            return rows;
        }, []);
    }, []);

    return (
        <div className="relative w-full hide-scrollbar">
            {/* Lateral Gradients */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-black via-black/70 to-transparent z-20" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-black via-black/70 to-transparent z-20" />

            {/* Decrease Speed Button - Left Side */}
            <motion.button
                className="
                    absolute left-4 top-1/2 -translate-y-1/2 z-30
                    bg-purple-600/80 hover:bg-purple-500/90
                    text-white p-3 rounded-full
                    shadow-lg hover:shadow-purple-500/50
                    transition-all duration-300
                    border-2 border-purple-400/40 hover:border-purple-300/60
                    backdrop-blur-sm
                    active:bg-purple-400/90 active:scale-95"
                whileHover={{ scale: 1.1 }}
                title="Disminuir velocidad"
                onClick={() => {
                    // Decrease by 20, keeping minimum 100
                    setSpeed(prev => Math.max(100, prev - 20));
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transform rotate-180"
                >
                    <polyline points="13 17 18 12 13 7" />
                    <polyline points="6 17 11 12 6 7" />
                </svg>
            </motion.button>

            {/* Increase Speed Button - Right Side */}
            <motion.button
                className="
                    absolute right-4 top-1/2 -translate-y-1/2 z-30
                    bg-purple-600/80 hover:bg-purple-500/90
                    text-white p-3 rounded-full
                    shadow-lg hover:shadow-purple-500/50
                    transition-all duration-300
                    border-2 border-purple-400/40 hover:border-purple-300/60
                    backdrop-blur-sm
                    active:bg-purple-400/90 active:scale-95"
                whileHover={{ scale: 1.1 }}
                title="Aumentar velocidad"
                onClick={() => {
                    // Increase by 20, max 200
                    setSpeed(prev => Math.min(200, prev + 20));
                }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="13 17 18 12 13 7" />
                    <polyline points="6 17 11 12 6 7" />
                </svg>
            </motion.button>

            {/* Marquee */}
            <Marquee className="w-full hide-scrollbar">
                <MarqueeContent
                    speed={speed}
                    pauseOnHover={true}
                    autoFill={true}
                    gradient={false}
                >
                    {marqueeRows.map((pair, idx) => (
                        <MarqueeItem
                            key={idx}
                            className="mx-6 pt-10 flex flex-col gap-6 hide-scrollbar"
                        >
                            {Array.isArray(pair) &&
                                pair.map((card: any, i: number) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -8 }}
                                        transition={{
                                            duration: 0.8,
                                            ease: [0.4, 0, 0.2, 1],
                                        }}
                                        className="w-96"
                                    >
                                        <ServiceCard
                                            icon={card.icon}
                                            title={card.title}
                                            description={card.description}
                                            features={card.features}
                                            className="w-auto h-auto"
                                        />
                                    </motion.div>
                                ))}
                        </MarqueeItem>
                    ))}
                </MarqueeContent>
            </Marquee>
        </div>
    );
}
