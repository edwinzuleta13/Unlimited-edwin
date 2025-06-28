import { useState } from 'react';
import { supabase } from '../services/supabaseClient';
import { Dialog } from './ui/dialog';
import MagneticButton from './magnetic-button';

const REQUEST_TYPES = [
  'Soporte técnico',
  'Consulta general',
  'Reclamo',
  'Otro',
];

export default function SupportRequestForm() {
  const [notLoggedIn, setNotLoggedIn] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [requestType, setRequestType] = useState(REQUEST_TYPES[0]);
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotLoggedIn(false);

    if (!fullName || !email || !description) {
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
    if (user) {
      // Usuario autenticado: guarda directo en Supabase
      const { error } = await supabase.from('support_requests').insert([
        {
          full_name: fullName,
          email,
          request_type: requestType,
          description,
          user_id: user.id,
          status: 'confirmed',
        },
      ]);
      setLoading(false);
      if (error) {
        setError('Error al enviar la solicitud. Intenta de nuevo.');
      } else {
        setShowModal(true);
        setFullName('');
        setEmail('');
        setRequestType(REQUEST_TYPES[0]);
        setDescription('');
      }
    } else {
      // Usuario no autenticado: envía a la API para email de confirmación
      try {
        const response = await fetch('/api/support-request', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fullName, email, requestType, description }),
        });
        setLoading(false);
        if (!response.ok) {
          setError('Error al enviar la solicitud.');
        } else {
          setNotLoggedIn(true);
          setShowModal(true);
          setFullName('');
          setEmail('');
          setRequestType(REQUEST_TYPES[0]);
          setDescription('');
        }
      } catch (err) {
        setLoading(false);
        setError('Error al enviar la solicitud.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto px-4">
        {/* Columna izquierda */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="block font-medium text-purple-200 mb-1">Nombre y Apellido</label>
            <input
              type="text"
              className="w-full border border-purple-700 bg-black/60 text-white rounded p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-black placeholder-purple-400"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
              placeholder="Nombre y Apellido"
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
          </div>
        </div>
        {/* Columna derecha */}
        <div className="flex flex-col h-full">
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
          <button
            type="submit"
            className="glow bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            disabled={loading}
          >
            {loading ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </div>
        {error && (
          <div className="md:col-span-2 text-red-500 text-sm mt-2">{error}</div>
        )}
      </form>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        {showModal && (
          <div className="p-6 text-center">
            {notLoggedIn ? (
              <>
                <h3 className="text-lg font-bold mb-2">¡Tu solicitud ha sido enviada!</h3>
                <p className="mb-4 text-purple-300">
                  Revisa tu correo para confirmar tu solicitud.<br />
                  No has iniciado sesión, por favor inicia sesión para mantenernos en contacto.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4 mt-4">
                  <MagneticButton className="glow bg-purple-600 hover:bg-purple-700 text-lg px-8 py-3 w-full md:w-auto">
                    <a href="/signup">Registrarme</a>
                  </MagneticButton>
                  <MagneticButton className="glow bg-purple-800 hover:bg-purple-900 text-lg px-8 py-3 w-full md:w-auto">
                    <a href="/signin">Iniciar sesión</a>
                  </MagneticButton>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold mb-2">¡Gracias por tu solicitud!</h3>
                <p className="mb-4 text-purple-300">
                  Tu solicitud fue enviada correctamente. Pronto nos pondremos en contacto contigo.
                </p>
              </>
            )}
          </div>
        )}
      </Dialog>
    </div>
  );
}