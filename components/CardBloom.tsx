import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export interface CardBloomProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  
  /** Clases adicionales para el contenedor más externo (tamaño, margen, fondo) */
  className?: string;

  /** Clases adicionales para el recuadro interno que contiene tus elementos (bordes, sombras) */
  innerClassName?: string;
  
  /** Clases para modificar la "luz" mancha externa de color (por defecto naranja) */
  bloomOuterClassName?: string;

  /** Clases para modificar la "luz" interna de la tarjeta (por defecto naranja) */
  bloomInnerClassName?: string;

  /** Mostrar los 3 puntitos decorativos en la esquina inferior derecha */
  showDots?: boolean;
}

export default function CardBloom({
  children,
  className,
  innerClassName,
  bloomOuterClassName,
  bloomInnerClassName,
  showDots = false,
  ...props
}: CardBloomProps) {
  return (
    <div 
      className={cn(
        "relative w-full max-w-lg rounded-[3rem] bg-white/5 backdrop-blur-xl p-8 md:p-10 border border-white/5 shadow-2xl overflow-hidden font-sans",
        className
      )}
      {...props}
    >
      {/* Bloom Exterior (Animado que respira de fondo) */}
      <div className={cn(
        "absolute -left-20 -top-20 h-64 w-64 rounded-full bg-purple-600/10 blur-[100px] animate-pulse-glow pointer-events-none",
        bloomOuterClassName
      )}></div>

      {/* Contenedor Interior (El recuadro del contenido con bordes y sombras brillantes) */}
      <div className={cn(
        "relative z-10 overflow-hidden rounded-[2.5rem] bg-black/40 backdrop-blur-md p-6 md:p-8",
        /* Estilos base por defecto: Púrpura fluorescente */
        "border border-purple-500/40 shadow-[0_0_60px_-15px_rgba(168,85,247,0.3),inset_0_0_20px_rgba(168,85,247,0.1)]",
        innerClassName
      )}>
        
        {/* Bloom Interior (El reflejo superior en la esquina) */}
        <div className={cn(
          "absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/20 blur-[50px] pointer-events-none",
          bloomInnerClassName
        )}></div>

        {/* Aquí se inyecta tu contenido personalizado */}
        <div className="relative z-10 w-full h-full flex flex-col">
          {children}
        </div>
      </div>

      {/* Puntitos decorativos opcionales (inferior derecha) */}
      {showDots && (
        <div className="absolute bottom-10 right-10 flex gap-2 opacity-30 pointer-events-none">
            <div className="h-1.5 w-1.5 rounded-full bg-purple-500 shadow-[0_0_5px_#a855f7]"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-zinc-700"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-zinc-700"></div>
        </div>
      )}
    </div>
  );
}
