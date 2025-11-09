"use client";

import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

type Props = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showToggle?: boolean; // si true y type === 'password' mostrará el botón para alternar
};

export const InputField: React.FC<Props> = ({ label, name, type = 'text', value, onChange, showToggle = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showToggle ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className="mb-4 relative">
      <label className="block text-sm font-bold mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={inputType}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 pr-12 bg-black/20 text-white border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
      />

      {isPassword && showToggle && (
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
  className="absolute right-2 inset-y-0 flex items-center px-2 text-purple-300 hover:text-white bg-transparent transform translate-y-3"
          aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
};
