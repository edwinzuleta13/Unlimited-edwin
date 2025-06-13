// components/InputField.tsx
import React from 'react';

type Props = {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField: React.FC<Props> = ({ label, name, type = 'text', value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded"
      />
    </div>
  );
};
