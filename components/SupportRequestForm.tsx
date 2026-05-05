import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../services/supabaseClient';
import { COUNTRIES } from '../lib/countries';
import { AlertProvider, GlobalAlerts, useAlert } from "@/components/alert-context";
import MagneticButton from './magnetic-button';

const REQUEST_TYPES = [
  'Soporte técnico',
  'Consulta general',
  'Reclamo',
  'Otro',
];



export default function SupportRequestForm() {
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [requestType, setRequestType] = useState(REQUEST_TYPES[0]);
  const [description, setDescription] = useState('');
  const [otherDetails, setOtherDetails] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyActivity, setCompanyActivity] = useState('');
  const [country, setCountry] = useState({ iso: 'VE', code: '+58', name: 'Venezuela' });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const { showAlert } = useAlert();

  // Rellenar automáticamente el email si el usuario ya está autenticado en Supabase
  useEffect(() => {
    let subscription: any = null;

    const fetchUser = async () => {
      try {
        const { data } = await supabase.auth.getUser();
        const user = (data as any)?.user;
        if (user?.email) setEmail(user.email);
      } catch (err) {
        // no bloquear si hay error
        console.debug('No se pudo obtener el usuario en SupportRequestForm:', err);
      }
    };

    fetchUser();

    // Mantener sincronizado si cambia el estado de autenticación
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = (session as any)?.user;
      setEmail(u?.email ?? '');
    });
    subscription = sub?.subscription ?? sub;

    return () => {
      try {
        subscription?.unsubscribe?.();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotLoggedIn(false);

  // La descripción del ticket siempre viene del textarea `description`.
  // El campo `otherDetails` solo se usa para `custom_reason` cuando el usuario
  // selecciona "Otro". Evitar duplicados: no mezclar ambos en `description`.
  const finalDescription = description;

    if (!firstName || !lastName || !email || !finalDescription || !phoneNumber || !companyName || !companyActivity) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    if (!validateEmail(email)) {
      setError('El correo electrónico no es válido.');
      return;
    }
    setLoading(true);

    // Verifica si el usuario está autenticado
    const { data: { user } } = await supabase.auth.getUser();
    const isOther = requestType === 'Otro' || requestType === 'OTRO';

    if (user) {
      // Usuario autenticado: para compatibilidad con constraint NOT NULL,
      // si es OTRO, request_type = 'OTRO' y custom_reason = texto personalizado
      const token = uuidv4();
      const created_at = new Date().toISOString();

      // Intentar insertar con campos extendidos; si la tabla no tiene esas columnas
      // (p. ej. country_code) reintentar con un payload reducido para compatibilidad.
      const fullDescription = `Empresa: ${companyName}\nActividad: ${companyActivity}\n\n${finalDescription}`;

      const initialRow: any = {
        token,
        created_at,
        first_name: firstName,
        last_name: lastName,
        phone_number: `${country.code}${phoneNumber}`,
        email,
        request_type: isOther ? 'OTRO' : requestType,
        custom_reason: isOther ? otherDetails : null,
        description: fullDescription,
        user_id: user.id,
        status: 'confirmed',
      };

      const tryInsert = async (row: any) => {
        const { error: insertError } = await supabase.from('support_requests').insert([row]);
        return insertError;
      };

      let insertError = await tryInsert(initialRow);

      setLoading(false);
      if (insertError) {
        console.error('Insert error support_requests:', insertError);
        setError('Error al enviar la solicitud. Intenta de nuevo.');
      } else {
        // Mostrar alerta global en lugar de modal
        showAlert('success', 'Tu solicitud fue enviada correctamente. Pronto nos pondremos en contacto contigo.');
        setFirstName('');
        setLastName('');
        setEmail('');
        setRequestType(REQUEST_TYPES[0]);
        setDescription('');
        setOtherDetails('');
        setPhoneNumber('');
        setCountry({ iso: 'VE', code: '+58', name: 'Venezuela' });
      }
    } else {
      // Usuario no autenticado: envía a la API para email de confirmación
      try {
        const response = await fetch('/api/support-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName,
            lastName,
            companyName,
            companyActivity,
            email,
            requestType,
            customReason: isOther ? otherDetails : null,
            description: finalDescription,
            country: country.iso,
            phone: `${country.code}${phoneNumber}`,
          }),
        });
        setLoading(false);
        if (!response.ok) {
          setError('Error al enviar la solicitud.');
        } else {
          // Mostrar alerta de información para usuarios no autenticados
          showAlert('info', 'Revisa tu correo para confirmar tu solicitud. Por favor inicia sesión para mantenernos en contacto.');
          setFirstName('');
          setLastName('');
          setEmail('');
          setRequestType(REQUEST_TYPES[0]);
          setDescription('');
          setOtherDetails('');
          setPhoneNumber('');
          setCountry({ iso: 'VE', code: '+58', name: 'Venezuela' });
        }
      } catch (err) {
        setLoading(false);
        setError('Error al enviar la solicitud.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto px-4 hide-scrollbar">
        {/* Columna izquierda */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="block font-medium text-purple-200 mb-1">Nombre</label>
            <input
              type="text"
              className="w-full border border-purple-700 bg-black/60 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black placeholder-purple-400"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              required
              placeholder="Nombre"
            />
          </div>
          <div>
            <label className="block font-medium text-purple-200 mb-1">Nombre de empresa</label>
            <input
              type="text"
              className="w-full border border-purple-700 bg-black/60 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black placeholder-purple-400"
              value={companyName}
              onChange={e => setCompanyName(e.target.value)}
              required
              placeholder="Nombre de empresa"
            />
          </div>
          <div>
            <label className="block font-medium text-purple-200 mb-1">¿A qué se dedica la empresa?</label>
            <input
              type="text"
              className="w-full border border-purple-700 bg-black/60 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black placeholder-purple-400"
              value={companyActivity}
              onChange={e => setCompanyActivity(e.target.value)}
              required
              placeholder="Actividad principal"
            />
          </div>
          <div>
            <label className="block font-medium text-purple-200 mb-1">Apellido</label>
            <input
              type="text"
              className="w-full border border-purple-700 bg-black/60 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black placeholder-purple-400"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
              placeholder="Apellido"
            />
          </div>
          <div>
            <label className="block font-medium text-purple-200 mb-1">Correo electrónico</label>
            <input
              type="email"
              className="w-full border border-purple-700 bg-black/60 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black placeholder-purple-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Correo electrónico"
            />
          </div>
          <div>
            <label className="block font-medium text-purple-200 mb-1">Tipo de solicitud</label>
            <select
              className="w-full border border-purple-700 bg-black/60 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black"
              value={requestType}
              onChange={e => setRequestType(e.target.value)}
            >
              {REQUEST_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <AnimatePresence>
              {requestType === 'Otro' && (
                <motion.textarea
                  layout
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.18 }}
                  className="mt-3 w-full border border-purple-700 bg-black/60 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black placeholder-purple-400 resize-none"
                  value={otherDetails}
                  onChange={e => setOtherDetails(e.target.value)}
                  placeholder="Describe tu solicitud"
                  rows={4}
                />
              )}
            </AnimatePresence>
          </div>

          <div>
            <label className="block font-medium text-purple-200 mb-1">País</label>
            <div className="flex gap-2">
              <select
                className="w-1/2 border border-purple-700 bg-black/60 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                value={country.iso}
                onChange={e => {
                  const c = COUNTRIES.find(x => x.iso === e.target.value)
                  if (c) setCountry(c)
                }}
              >
                {COUNTRIES.map(c => (
                  <option key={c.iso} value={c.iso}>{c.name} ({c.code})</option>
                ))}
              </select>
              <input
                type="tel"
                className="w-1/2 border border-purple-700 bg-black/60 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-purple-400"
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
                placeholder="Número de teléfono"
                required
              />
            </div>
          </div>
        </div>
        {/* Columna derecha */}
        <div className="flex flex-col">
          <label className="block font-medium text-purple-200 mb-1">Descripción</label>
          <textarea
            className="w-full border border-purple-700 bg-black/60 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black placeholder-purple-400 flex-1 resize-none"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
            rows={10}
            placeholder="Descripción"
          />
        </div>
        {/* Botón de enviar */}
        <div className="md:col-span-2 flex justify-end mt-4">
          <MagneticButton
            type="submit"
            className="glow bg-purple-600 hover:bg-purple-700 text-lg px-8 py-6 w-full md:w-auto"
            disabled={loading}
          >
            {loading ? (
              <span className="inline-block">Enviando...</span>
            ) : (
              <>
                Enviar solicitud
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
          </MagneticButton>
        </div>
        {/* Los mensajes inline se muestran ahora vía AlertProvider/GlobalAlerts */}
      </form>
      {/* Global alerts renderizadas desde el contexto */}
      <GlobalAlerts />
    </div>
  );
}