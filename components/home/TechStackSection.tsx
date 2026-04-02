"use client"
import * as React from "react"
import { motion } from "framer-motion"
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/marquee"
import CardBloom from "@/components/CardBloom"
import { Layout, Server, Database, Cpu, Cloud, Zap } from "lucide-react"

const techData = [
  {
    title: "Frontend",
    icon: <Layout className="w-8 h-8" />,
    items: [
      { subtitle: "React, Vue.js, Angular", text: "Desarrollo de interfaces modernas y escalables, con componentes reutilizables y arquitectura avanzada." }
    ],
    delay: 0.1
  },
  {
    title: "Backend",
    icon: <Server className="w-8 h-8" />,
    items: [
      { subtitle: "Node.js, Express, Nest.js", text: "Desarrollo de servidores y APIs eficientes y seguras, optimizadas para alto rendimiento." },
      { subtitle: "Golang", text: "Microservicios concurrentes y de alto desempeño." }
    ],
    delay: 0.2
  },
  {
    title: "Bases de Datos",
    icon: <Database className="w-8 h-8" />,
    items: [
      { subtitle: "PostgreSQL, MySQL, MongoDB", text: "Diseño de bases relacionales y no relacionales optimizadas para consultas rápidas." },
      { subtitle: "Firebase & Redis", text: "Soluciones en tiempo real y caching de alto rendimiento." }
    ],
    delay: 0.3
  },
  {
    title: "IA y ML",
    icon: <Cpu className="w-8 h-8" />,
    items: [
      { subtitle: "TensorFlow, PyTorch, Python", text: "Modelos de deep learning para visión por computadora, NLP y análisis predictivo." }
    ],
    delay: 0.1
  },
  {
    title: "Infraestructura y Cloud",
    icon: <Cloud className="w-8 h-8" />,
    items: [
      { subtitle: "AWS, Google Cloud, Azure", text: "Arquitectura escalable y segura en la nube." },
      { subtitle: "Docker & Kubernetes", text: "Contenedores y orquestación profesional." }
    ],
    delay: 0.2
  },
  {
    title: "APIs y Comunicación",
    icon: <Zap className="w-8 h-8" />,
    items: [
      { subtitle: "GraphQL & REST", text: "Creación de APIs flexibles, rápidas y bien documentadas." }
    ],
    delay: 0.3
  }
];

function TechStackCard({ icon, title, items, delay, idx }: { 
  icon: React.ReactNode; 
  title: string; 
  items: { subtitle: string; text: string }[];
  delay: number;
  idx: number;
}) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay }}
      className="flex h-full w-full"
    >
      <CardBloom
        className="w-full !p-1 !rounded-[2.2rem] group hover:-translate-y-2 transition-all duration-500"
        innerClassName="flex flex-col items-center text-center p-6 bg-black/40 border-white/5 h-full"
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
        <div className="mb-6 relative z-10 flex items-center justify-center">
            <motion.div 
              className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-inner relative flex items-center justify-center overflow-hidden"
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

        <h2 className="text-xl lg:text-2xl ALONGSANSS-REGULAR text-white text-center drop-shadow-[0_0_12px_rgba(170,100,255,0.25)] mb-2 mt-2">
          {title}
        </h2>

        {items.map((item, itemIdx) => (
          <div key={itemIdx} className="mt-3 mb-1">
            <h3 className="text-base lg:text-lg text-purple-300 text-center ALONGSANSS-REGULAR">
              {item.subtitle}
            </h3>
            <p className="mt-1 text-white/90 text-center leading-relaxed text-xs lg:text-sm AlongSanss2-Thin">
              {item.text}
            </p>
          </div>
        ))}

        <motion.div 
          className="mt-6 w-10 h-[2px] rounded-full mx-auto"
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
      </CardBloom>
    </motion.div>
  )
}

export default function TechStackSection() {
  const techLogos = [
    { name: "React", icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
    { name: "Node.js", icon: "https://nodejs.org/static/images/logo.svg" },
    { name: "Python", icon: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
    { name: "AWS", icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
    { name: "Docker", icon: "https://www.docker.com/wp-content/uploads/2022/03/vertical-logo-monochromatic.png" },
    { name: "Kubernetes", icon: "/icons/kubernetes.svg" },
    { name: "TensorFlow", icon: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg" },
    { name: "PostgreSQL", icon: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
    { name: "GraphQL", icon: "https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg" },
    { name: "Rust", icon: "/icons/rust.svg" },
    { name: "Vue.js", icon: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg" },
    { name: "Golang", icon: "https://go.dev/blog/go-brand/Go-Logo/SVG/Go-Logo_Blue.svg" },
  ];

  return (
    <section id="tecnologias" className="py-20 px-4 bg-gradient-to-b from-transparent via-black/80 to-transparent relative">
      <div className="container mx-auto relative z-20">
        {/* Texto superior */}
        <motion.div
          className="text-center mb-16"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h1 className="text-3xl md:text-5xl ALONGSANSS-REGULAR mb-6 text-white">
            Stack Tecnológico Avanzado
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto AlongSanss2-Thin">
            Dominamos las tecnologías más innovadoras para ofrecer soluciones de vanguardia
          </p>
        </motion.div>

        {/* MARQUEE */}
        <Marquee
          className="
            w-screen
            relative left-1/2 right-1/2
            -ml-[50vw] -mr-[50vw]
            overflow-hidden py-10
          "
        >
          <MarqueeContent speed={80}>
            {techLogos.map((tech) => (
              <MarqueeItem key={tech.name} className="mx-12 flex flex-col items-center group cursor-pointer relative z-40 pointer-events-auto">
                <motion.img
                  src={tech.icon}
                  alt={tech.name}
                  className="w-16 h-16 object-contain"
                  initial={{ filter: "grayscale(100%)", opacity: 0.5 }}
                  whileHover={{ 
                    filter: "grayscale(0%)", 
                    opacity: 1,
                    scale: 1.1 
                  }}
                  transition={{ duration: 0.3 }}
                />
              </MarqueeItem>
            ))}
          </MarqueeContent>
        </Marquee>
      </div>

      {/* CONTENIDO COMPLETO ORGANIZADO */}
      <div className="relative">
        <motion.div 
          className="pt-[40px] relative z-20"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {techData.map((card, idx) => (
              <TechStackCard
                key={idx}
                idx={idx}
                icon={card.icon}
                title={card.title}
                items={card.items}
                delay={card.delay}
              />
            ))}
          </div>
        </motion.div>

        {/* Texto final */}
        <motion.div
          className="mt-6 px-4 pt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="text-lg md:text-2xl text-white ALONGSANSS-REGULAR">
              Muchas más tecnologías líderes aplicadas para ofrecer soluciones completas, innovadoras y escalables.
            </h4>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
