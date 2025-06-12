// components/RoleSelector.tsx
import React from 'react';

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const RoleSelector: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-bold mb-1" htmlFor="role">
        Select Role
      </label>
      <select
        id="role"
        name="role"
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 border border-gray-300 rounded"
      >
        <option value="">Choose one</option>
        <option value="Usuario">Usuario</option>
        <option value="Admin">Admin</option>
        <option value="Cliente">Cliente</option>
        <option value="Socio">Socio</option>
      </select>
    </div>
  );
};
