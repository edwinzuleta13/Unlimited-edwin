"use client";
import React, { ReactNode } from "react";

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
}

const HolographicCardPurpleMid: React.FC<HolographicCardProps> = ({ children, className = "" }) => {
  return (
    <div className={`flex justify-center items-center h-screen bg-black ${className}`}>
      <div className="relative w-96 h-64 bg-purple-500 flex justify-center items-center overflow-hidden
        rounded-xl transition-transform duration-500 hover:scale-105
        hover:shadow-[0_0_25px_rgba(168,85,247,0.35)] group border border-purple-400/40">
        
        {/* Glow */}
        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]
          bg-gradient-to-b from-transparent via-purple-300/30 to-transparent
          rotate-[-45deg] transition-all duration-500 
          opacity-0 group-hover:opacity-100 blur-xl">
        </div>

        {/* Contenido */}
        <div className="relative z-10 w-full h-full p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default HolographicCardPurpleMid;