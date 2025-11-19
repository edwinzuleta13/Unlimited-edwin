"use client";
import React, { ReactNode } from "react";

interface HolographicCardProps {
  children: ReactNode;
  className?: string;
}

const HolographicCardPurpleMidRect: React.FC<HolographicCardProps> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`relative w-full max-w-md min-h-[140px] bg-purple-500 
      rounded-2xl overflow-hidden flex items-center justify-center
      border border-purple-400/40 transition duration-500
      hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] group ${className}`}>

      {/* Glow Layer */}
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]
        bg-gradient-to-b from-transparent via-purple-300/30 to-transparent
        rotate-[-45deg] opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl">
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 w-full">
        {children}
      </div>
    </div>
  );
};

export default HolographicCardPurpleMidRect;
