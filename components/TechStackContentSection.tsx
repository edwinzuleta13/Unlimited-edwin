import React from 'react';
import { motion, Variants } from 'framer-motion';

// --- INTERFACES Y TIPOS ---

interface TechFeature {
  subTitle: string;
  description: string;
}

interface TechBlockData {
  id: number; // Nuevo ID numérico como el de tu imagen (2, 3, 6)
  title: string;
  features: TechFeature[];
  iconUrl?: string; // URL de un icono si fuera necesario (opcional)
}

// --- DATOS CENTRALIZADOS DEL STACK (Adaptados al nuevo formato) ---

const techStackData: TechBlockData[] = [
  {
    id: 1, // Usaremos 1 para Frontend
    title: "Frontend Development",
    features: [
      {
        subTitle: "React, Vue.js, Angular:",
        description: "Desarrollo de interfaces modernas, reactivas y escalables, con experiencia en componentes reutilizables y arquitectura frontend avanzada.",
      },
    ],
  },
  {
    id: 2, // Usaremos 2 para Backend
    title: "Backend & APIs",
    features: [
      {
        subTitle: "Node.js, Python, Java:",
        description: "Desarrollo de servidores y APIs eficientes y seguros, adaptados a necesidades de alto rendimiento y escalabilidad.",
      },
      {
        subTitle: "Golang:",
        description: "Creación de microservicios concurrentes y de alto desempeño para sistemas críticos.",
      },
      {
        subTitle: "GraphQL y REST APIs:",
        description: "Desarrollo de APIs flexibles y eficientes para optimizar la comunicación de datos.",
      },
    ],
  },
  {
    id: 3, // Usaremos 3 para Bases de Datos
    title: "Bases de Datos & Data",
    features: [
      {
        subTitle: "PostgreSQL, MySQL, MongoDB:",
        description: "Diseño de bases de datos relacionales y no relacionales, optimizadas para consultas rápidas y gestión eficiente de datos.",
      },
      {
        subTitle: "Firebase y Redis:",
        description: "Soluciones en tiempo real y cacheo para mejorar rendimiento y experiencia de usuario.",
      },
    ],
  },
  {
    id: 4, // Usaremos 4 para Cloud e Infra
    title: "Cloud & DevOps",
    features: [
      {
        subTitle: "AWS, Google Cloud, Azure:",
        description: "Arquitectura en la nube escalable, segura y eficiente.",
      },
      {
        subTitle: "Docker y Kubernetes:",
        description: "Contenerización y orquestación para despliegues consistentes.",
      },
    ],
  },
  {
    id: 5, // Usaremos 5 para IA/ML
    title: "IA y Machine Learning",
    features: [
      {
        subTitle: "TensorFlow y Python:",
        description: "Integración de modelos de aprendizaje automático y deep learning para análisis predictivo, visión por computadora y NLP.",
      },
    ],
  },
];

// --- COMPONENTE INDIVIDUAL SIMILAR AL 'PLAN ITEM' DE LA IMAGEN ---

interface TechDetailProps extends TechBlockData {
  delay?: number;
}

const TechDetailBlock: React.FC<TechDetailProps> = ({ id, title, features, delay = 0 }) => {
  
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut", delay } },
  };

  const circleVariants: Variants = {
    hover: { scale: 1.1, backgroundColor: 'rgba(147, 51, 234, 0.8)', transition: { duration: 0.3 } }, // Morado más oscuro
  };

  return (
    <motion.div
      className="flex gap-4 mb-8 items-start"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Círculo de Número/ID */}
      <motion.div
        className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg"
        variants={circleVariants}
        whileHover="hover"
      >
        {id}
      </motion.div>

      {/* Contenido del Bloque */}
      <div className="flex flex-col text-left">
        <h3 className="text-3xl font-bold gradient-text mb-3">{title}</h3>
        
        {features.map((feature, index) => (
          <div key={index} className="mb-4">
            <h4 className="text-xl font-semibold text-purple-300 mt-0">{feature.subTitle}</h4>
            <p className="text-lg text-purple-300 max-w-lg mt-1">{feature.description}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};


// --- ESTRUCTURA PRINCIPAL DE LA SECCIÓN (Sustituyendo el contenido vertical) ---

// NOTA: El Marquee y la parte superior de la sección (títulos, degradados) se mantienen igual.
// Solo estamos modificando la estructura de las filas de contenido.

export const TechStackContentSection: React.FC = () => {

  return (
    <div className="relative">

      {/* === DEGRADADO DESDE LA MITAD HACIA ABAJO === */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-b from-transparent to-transparent z-30" />

      {/* Sección donde empieza tu contenido (Ahora en formato de lista) */}
      <div className="pt-[30px] px-4 relative z-20">

        <div className="relative z-20">
          <div className="max-w-5xl mx-auto">
            
            {/* Contenedor Principal de la Lista - 2 Columnas en escritorio */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
              
              {techStackData.map((tech, index) => (
                <TechDetailBlock
                  key={tech.title}
                  id={tech.id}
                  title={tech.title}
                  features={tech.features}
                  delay={index * 0.1} // Aparición escalonada de todos los bloques
                />
              ))}

            </div>
          </div>
        </div>

        {/* Texto final animado */}
        <motion.div 
            className="mt-16 px-4 pt-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl mx-auto text-center">
            <h4 className="text-lg md:text-2xl font-semibold text-purple-300">
              Muchas más tecnologías líderes aplicadas para ofrecer soluciones completas, innovadoras y escalables.
            </h4>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default TechStackContentSection;