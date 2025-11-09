"use client"

import React from "react";

interface BotonConSonidoProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const BotonConSonido: React.FC<BotonConSonidoProps> = ({ children, className = "", ...props }) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export default BotonConSonido;
