"use client"

import React from "react"
import { motion } from "framer-motion"
import { Server, Cpu, Globe } from "lucide-react"
import CardBloom from "@/components/CardBloom"

const expertiseData = [
  {
    icon: <Server className="w-10 h-10" />,
    title: "Arquitectura Microservicios",
    description: "Diseñamos arquitecturas escalables y resilientes con Docker y Kubernetes para un rendimiento ininterrumpido.",
    color: "#9167F1",
    delay: 0.1
  },
  {
    icon: <Cpu className="w-10 h-10" />,
    title: "Inteligencia Artificial",
    description: "Implementamos modelos de machine learning y análisis predictivo para transformar datos en decisiones estratégicas.",
    color: "#0000FF",
    delay: 0.2
  },
  {
    icon: <Globe className="w-10 h-10" />,
    title: "Desarrollo Full-Stack",
    description: "Aplicaciones web de alto impacto con React, Node.js y GraphQL, centradas en la experiencia del usuario final.",
    color: "#B4F100",
    delay: 0.3
  }
];

function ExpertiseCard({ icon, title, description, color, delay, idx }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  color: string;
  delay: number;
  idx: number;
}) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="flex h-full w-full"
    >
      <CardBloom
        className="h-full !p-[1px] !rounded-[2.5rem] group hover:-translate-y-2 transition-all duration-500"
        innerClassName="h-full flex flex-col items-center text-center p-8 bg-black/40 backdrop-blur-2xl border-white/5"
        bloomOuterClassName={
          idx % 3 === 0 ? "bg-[#9167F1]/10 blur-[80px]" : 
          idx % 3 === 1 ? "bg-[#0000FF]/10 blur-[80px]" : 
          "bg-[#B4F100]/10 blur-[80px]"
        }
        bloomInnerClassName={
          idx % 3 === 0 ? "bg-[#9167F1]/20" : 
          idx % 3 === 1 ? "bg-[#0000FF]/20" : 
          "bg-[#B4F100]/20"
        }
        showDots={true}
      >
        <div className="mb-8 relative z-10 flex items-center justify-center">
            <motion.div 
              className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-inner relative flex items-center justify-center overflow-hidden"
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
              {/* Subtle glow highlight behind icon */}
              <motion.div 
                className="absolute inset-0 blur-2xl opacity-10 pointer-events-none rounded-full"
                animate={{
                    backgroundColor: [
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
              />
              <div className="relative z-10 scale-125 transition-transform duration-500 group-hover:scale-135">
                {icon}
              </div>
            </motion.div>
        </div>

        <h3 className="text-xl lg:text-2xl mb-4 text-white ALONGSANSS-REGULAR tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
          {title}
        </h3>
        
        <p className="text-white/60 AlongSanss2-Thin text-sm md:text-base leading-relaxed">
          {description}
        </p>

        {/* Decorative accent line (cintillo) */}
        <div className="mt-auto pt-8 w-full">
            <motion.div 
              className="w-full h-[2px] rounded-full"
              animate={{
                  backgroundColor: [
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
            />
        </div>
      </CardBloom>
    </motion.div>
  )
}


export default function TechnologicalExpertise() {
  return (
    <section id="experiencia" className="relative py-24 px-6 w-full overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[150px] pointer-events-none" />

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-24"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <span className="inline-block text-white ALONGSANSS-REGULAR text-xs uppercase tracking-[0.4em] mb-4">
            Expertis de Vanguardia
          </span>
          <h2 className="text-4xl md:text-6xl mb-6 text-white ALONGSANSS-REGULAR tracking-tight">
            Nuestra <span className="text-white">Trayectoria</span>
          </h2>
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto AlongSanss2-Thin">
            Combinamos innovación constante con solidez tecnológica para construir el futuro digital de tu empresa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {expertiseData.map((exp, idx) => (
            <ExpertiseCard
              key={idx}
              idx={idx}
              icon={exp.icon}
              title={exp.title}
              description={exp.description}
              color={exp.color}
              delay={exp.delay}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

