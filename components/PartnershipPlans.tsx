import React from 'react';
import { motion, Variants } from 'framer-motion';

// 1. DEFINICIÓN DE TIPOS (Interfaces)
interface Plan {
  number: number;
  title: string;
  description?: string;
  features?: string[];
}

// 2. DATOS
const plansData: Plan[] = [
  {
    number: 1,
    title: "¿Por qué elegirnos?",
    description:
      "Ofrecemos soluciones personalizadas que impulsan tu crecimiento y generan resultados reales.",
  },
  {
    number: 2,
    title: "Misión",
    description:
      "Nuestra misión es brindar servicios profesionales que aporten valor estratégico, innovación y un acompañamiento constante para el éxito de nuestros clientes.",
  },
  {
    number: 3,
    title: "Visión",
    description:
      "Nuestra visión es convertirnos en un aliado global reconocido por la excelencia, la transparencia y la innovación en cada proyecto.",
  },
];

const imageUrl: string =
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?fit=crop&w=800&q=80";

// 3. COMPONENTE: PlanItem
const PlanItem: React.FC<Plan> = ({ number, title, description, features }) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const circleVariants: Variants = {
    hover: { scale: 1.12, backgroundColor: "rgba(168, 85, 247, 0.4)", transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="flex gap-4 mb-8"
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
    >
      {/* Círculo con número */}
      <motion.div
        className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 
                   glass-effect-dark text-white rounded-full flex items-center justify-center 
                   font-bold text-lg cursor-pointer"
        variants={circleVariants}
        whileHover="hover"
      >
        {number}
      </motion.div>

      {/* Contenido */}
      <div>
        <h3 className="text-xl font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.18)] mb-1">
          {title}
        </h3>

        {description && (
          <p className="text-gray-300 drop-shadow-[0_0_4px_rgba(255,255,255,0.12)] mb-2 text-base">
            {description}
          </p>
        )}

        {features && (
          <ul className="list-disc ml-5 text-gray-300 space-y-1">
            {features.map((feature, index) => (
              <li key={index} className="text-sm drop-shadow-[0_0_4px_rgba(255,255,255,0.12)]">
                {feature}
              </li>
            ))}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

// 4. COMPONENTE PRINCIPAL
const PartnershipPlans: React.FC = () => {
  const listContainerVariants: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section className="bg-[#0a0a0a]/80 backdrop-blur-xl py-16 md:py-24 px-4 sm:px-6 lg:px-8 rounded-xl shadow-2xl m-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Lado izquierdo */}
        <div className="order-2 lg:order-1">

          <motion.h2
            className="text-4xl md:text-5xl font-extrabold 
                       text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.18)]
                       mb-12 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Conoce más sobre <br />
            <span className="text-purple-500 drop-shadow-[0_0_10px_rgba(173,105,255,0.35)]">
              Nosotros
            </span>{" "}
            <br />
          </motion.h2>

          <motion.div
            variants={listContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {plansData.map((plan, index) => (
              <PlanItem
                key={index}
                number={plan.number}
                title={plan.title}
                description={plan.description}
                features={plan.features}
              />
            ))}
          </motion.div>
        </div>

        {/* Lado derecho - Imagen */}
        <div className="order-1 lg:order-2 flex justify-center items-center">
          <motion.div
            className="w-full h-full lg:h-auto max-w-lg lg:max-w-none rounded-xl overflow-hidden shadow-2xl"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={imageUrl}
              alt="Equipo trabajando en oficina"
              className="object-cover w-full h-full min-h-[400px] lg:min_h-[500px]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PartnershipPlans;
