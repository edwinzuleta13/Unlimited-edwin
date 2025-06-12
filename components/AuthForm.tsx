// components/AuthForm.tsx
'use client';

import { useState } from 'react';
import { InputField } from './InputField';
import { Button } from './Button';
import { RoleSelector } from './RoleSelector';
import { supabase } from '@/services/supabaseClient';

type Props = {
  type: 'signin' | 'signup'; // para saber si es login o registro
};

export const AuthForm: React.FC<Props> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (type === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { role }
        }
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Cuenta creada correctamente. Revisa tu correo.');
      }
    }

    if (type === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setSuccess('Inicio de sesión exitoso.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {type === 'signup' ? 'Crear cuenta' : 'Iniciar sesión'}
      </h2>

      <InputField label="Correo electrónico" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField label="Contraseña" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

      {type === 'signup' && (
        <RoleSelector value={role} onChange={(e) => setRole(e.target.value)} />
      )}

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

      <Button type="submit" text={type === 'signup' ? 'Registrarse' : 'Entrar'} />
    </form>
  );
};
