// components/Button.tsx
import React from 'react';

type Props = {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

export const Button: React.FC<Props> = ({ text, onClick, type = 'button' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {text}
    </button>
  );
};
