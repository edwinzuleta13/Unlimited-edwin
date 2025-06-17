'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // 🔁 Redirección para App Router
import { InputField } from './InputField';
import MagneticButton from './magnetic-button';
import { supabase } from '@/services/supabaseClient';

type Props = {
  type: 'signin' | 'signup';
};

export const AuthForm: React.FC<Props> = ({ type }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (type === 'signup') {
  // Paso 1: Verificar si el correo ya existe
  const { data: existsData, error: existsError } = await supabase.rpc('email_exists', {
    email_input: email,
  });

  if (existsError) {
    console.error("Error al verificar existencia:", existsError);
    setError("Error al verificar el correo. Intenta nuevamente.");
    return;
  }

  if (existsData) {
    setError("Ese correo ya está registrado. Redirigiendo a iniciar sesión...");
    setTimeout(() => {
      router.push('/signin');
    }, 3000);
    return;
  }

  // Paso 2: Crear cuenta si el correo NO existe
  const { error: signupError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { role },
    },
  });

  if (signupError) {
    setError(signupError.message);
  } else {
    setSuccess("Cuenta creada correctamente. Revisa tu correo.");
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
        router.push('/');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-black/20 border border-purple-500 p-6 rounded-xl"
    >
      <InputField
        label="Correo electrónico"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <InputField
        label="Contraseña"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {type === 'signup' && (
        <div className="mt-4">
          <label className="block mb-1 text-purple-300">Rol</label>
          <div className="relative">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-purple-950 bg-opacity-40 border border-purple-500 text-white placeholder-purple-300 rounded-md p-3 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-400"
            >
              <option disabled value="">Selecciona un rol</option>
              <option value="usuario">Usuario</option>
              <option value="admin">Admin</option>
              <option value="cliente">Cliente</option>
              <option value="socio">Socio</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-purple-300">
              ▼
            </div>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

      <div className="mt-6 text-center">
        <MagneticButton
          type="submit"
          className="glow bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6 w-full"
          onClick={() => {
            const audio = new Audio('/hover.mp3');
            audio.volume = 0.1;
            audio.play().catch((err) => console.error('Error playing audio:', err));
          }}
        >
          {type === 'signup' ? 'Registrarse' : 'Entrar'}
        </MagneticButton>
      </div>
    </form>
  );
};
