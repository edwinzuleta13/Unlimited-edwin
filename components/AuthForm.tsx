"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // 🔁 Redirección para App Router
import { InputField } from './InputField';
import MagneticButton from './magnetic-button';
import { supabase } from '@/services/supabaseClient';
import { useAlert } from '@/components/alert-context';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

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
  const { showAlert } = useAlert();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    try {
      const a = new Audio('/hover.mp3');
      a.volume = 0.1;
      a.preload = 'auto';
      audioRef.current = a;
    } catch (err) {
      // ignore audio init errors in environments without audio support
    }
  }, []);

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
    showAlert('error', 'Error al verificar el correo. Intenta nuevamente.');
    return;
  }

  if (existsData) {
    setError("Ese correo ya está registrado. Redirigiendo a iniciar sesión...");
    showAlert('warning', 'Ese correo ya está registrado. Te redirigimos a iniciar sesión.');
    setTimeout(() => {
      router.push('/signin');
    }, 2000);
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
    showAlert('error', signupError.message || 'Error creando la cuenta.');
  } else {
    setSuccess("Cuenta creada correctamente. Revisa tu correo.");
    showAlert('success', 'Cuenta creada correctamente. Revisa tu correo.');
  }
}


    if (type === 'signin') {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
          // Map known Supabase error messages to user-friendly alerts
          const msg = error.message || 'Error en el inicio de sesión.';
          if (msg.includes('Invalid login credentials') || msg.includes('invalid')) {
            setError('Correo o contraseña incorrectos.');
            showAlert('error', 'Correo o contraseña incorrectos.');
          } else if (msg.includes('User not found') || msg.includes('No user')) {
            setError('Usuario no registrado.');
            showAlert('warning', 'Usuario no registrado. Por favor regístrate.');
          } else {
            setError(msg);
            showAlert('error', msg);
          }
      } else {
        setSuccess('Inicio de sesión exitoso.');
          showAlert('success', 'Inicio de sesión exitoso.');
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
        showToggle
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {type === 'signup' && (
        <div className="mt-4">
          <FormControl component="fieldset" className="w-full">
            {/* Small title above radios */}
            <RadioGroup
              row
              aria-labelledby="role-radio-group-label"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex flex-row flex-wrap gap-4 w-full"
            >
              <FormControlLabel value="usuario" control={<Radio size="small" sx={{ color: '#7C3AED', '&.Mui-checked': { color: '#7C3AED' } }} />} label="Usuario" />
              <FormControlLabel value="admin" control={<Radio size="small" sx={{ color: '#7C3AED', '&.Mui-checked': { color: '#7C3AED' } }} />} label="Admin" />
              <FormControlLabel value="cliente" control={<Radio size="small" sx={{ color: '#7C3AED', '&.Mui-checked': { color: '#7C3AED' } }} />} label="Cliente" />
              <FormControlLabel value="socio" control={<Radio size="small" sx={{ color: '#7C3AED', '&.Mui-checked': { color: '#7C3AED' } }} />} label="Socio" />
            </RadioGroup>
          </FormControl>
        </div>
      )}

  {/* Eliminado: error inline, ahora solo alertas globales */}
      {success && <p className="text-green-500 text-sm mt-2">{success}</p>}

      <div className="mt-6 text-center">
        <MagneticButton
          type="submit"
          className="glow bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6 w-full"
          onClick={() => {
            try {
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play().catch(() => {});
              }
            } catch (err) {
              // swallow play errors (user gesture required etc.)
            }
          }}
        >
          {type === 'signup' ? 'Registrarse' : 'Entrar'}
        </MagneticButton>
      </div>
    </form>
  );
};
