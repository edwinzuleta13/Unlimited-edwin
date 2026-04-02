"use client"

import React, { useMemo } from "react"
import { motion, useSpring, AnimatePresence } from "framer-motion"
import { Marquee, MarqueeContent, MarqueeItem } from '@/components/ui/marquee'
import CardBloom from "@/components/CardBloom"
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
    const [showAll, setShowAll] = React.useState(false);
    // Velocidad fija tras quitar los botones
    const speed = 20;

    const visibleServices = showAll ? SERVICES_DATA : SERVICES_DATA.slice(0, 6);

    return (
        <div className="relative w-full hide-scrollbar">




            {/* Grid Layout Experiment */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="popLayout">
                        {visibleServices.map((card, idx) => (
                            <motion.div
                                layout
                                key={card.title}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                                transition={{
                                    duration: 0.4,
                                    delay: showAll && idx >= 6 ? (idx - 6) * 0.05 : 0,
                                    ease: "easeOut"
                                }}
                                className="flex items-start justify-center"
                            >
                                <motion.div
                                    whileHover={{ y: -8 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.4, 0, 0.2, 1],
                                    }}
                                    className="w-full group"
                                >
                                    <CardBloom
                                        className="!p-3 md:!p-4 !rounded-[2rem] w-full cursor-pointer flex flex-col transition-all duration-500 border border-white/5"
                                        innerClassName="flex flex-col items-start justify-start p-5 bg-black/40 w-full gap-2 border border-white/5 shadow-none !rounded-[1.5rem]"
                                        bloomOuterClassName={
                                            idx % 3 === 0 ? "bg-[#9167F1]/20 blur-[80px]" : 
                                            idx % 3 === 1 ? "bg-[#0000FF]/20 blur-[80px]" : 
                                            "bg-[#B4F100]/10 blur-[80px]"
                                        }
                                        bloomInnerClassName={
                                            idx % 3 === 0 ? "bg-[#9167F1]/20" : 
                                            idx % 3 === 1 ? "bg-[#0000FF]/20" : 
                                            "bg-[#B4F100]/20"
                                        }
                                        showDots={true}
                                    >
                                        <div className="flex w-full justify-center mb-4 relative z-10">
                                            <motion.div 
                                                className="flex-shrink-0 p-5 rounded-2xl bg-white/5 border border-white/10 w-fit h-fit flex items-center justify-center shadow-inner relative"
                                                animate={{
                                                    color: [
                                                        idx % 3 === 0 ? '#9167F1' : idx % 3 === 1 ? '#0000FF' : '#B4F100',
                                                        idx % 3 === 0 ? '#0000FF' : idx % 3 === 1 ? '#B4F100' : '#9167F1',
                                                        idx % 3 === 0 ? '#B4F100' : idx % 3 === 1 ? '#9167F1' : '#0000FF',
                                                        idx % 3 === 0 ? '#9167F1' : idx % 3 === 1 ? '#0000FF' : '#B4F100',
                                                    ]
                                                }}
                                                transition={{
                                                    duration: 7.5 + (idx % 3) * 1.5,
                                                    repeat: Infinity,
                                                    ease: "linear"
                                                }}
                                            >
                                                <div className="flex-shrink-0 uppercase ALONGSANSS-REGULAR text-[10px] opacity-10 absolute top-2 left-2 pointer-events-none">
                                                    {idx + 1}
                                                </div>
                                                {card.icon}
                                            </motion.div>
                                        </div>
                                        <h3 className="text-white ALONGSANSS-REGULAR text-xl md:text-2xl tracking-tight text-center w-full mb-2 relative z-10">
                                            {card.title}
                                        </h3>
                                        <div className="max-h-0 opacity-0 group-hover:max-h-[400px] group-hover:opacity-100 transition-all duration-500 ease-in-out overflow-hidden w-full relative z-10">
                                            <div className="pt-4 flex flex-col gap-4">
                                                <p className="text-white/60 text-sm leading-relaxed AlongSanss2-Thin">
                                                    {card.description}
                                                </p>
                                                <ul className="space-y-2 w-full border-t border-white/10 pt-4 AlongSanss2-Thin">
                                                    {card.features.slice(0, 4).map((feature: string, i: number) => (
                                                        <li key={i} className="flex items-center text-xs text-white/50 AlongSanss2-Thin">
                                                            <div 
                                                                className="w-1.5 h-1.5 rounded-full mr-2" 
                                                                style={{ 
                                                                    backgroundColor: idx % 3 === 0 ? '#9167F1' : idx % 3 === 1 ? '#0000FF' : '#B4F100'
                                                                }} 
                                                            />
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </CardBloom>
                                </motion.div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Show Toggle Button */}
                {SERVICES_DATA.length > 6 && (
                    <div className="mt-16 flex justify-center">
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="px-8 py-4 rounded-2xl glass-effect-dark border border-white/10 text-white AlongSanss2-Thin 
                                     hover:bg-white/5 transition-all duration-300 hover:scale-105 active:scale-95
                                     shadow-[0_0_20px_rgba(168,85,247,0.15)] group"
                        >
                            <span className="flex items-center gap-2">
                                {showAll ? "Ver menos soluciones" : "Ver todas las soluciones"}
                                <motion.span
                                    animate={{ y: showAll ? [0, -5, 0] : [0, 5, 0] }}
                                    transition={{ repeat: Infinity, duration: 2 }}
                                >
                                    {showAll ? "↑" : "↓"}
                                </motion.span>
                            </span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
