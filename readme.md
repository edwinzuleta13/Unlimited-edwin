🧑‍💻 Sistema de Autenticación con Supabase — Unlimited Edwin

Este proyecto implementa un sistema completo de inicio de sesión (SignIn) y registro (SignUp) conectado a Supabase, usando Next.js, TypeScript y siguiendo una estructura organizada por carpetas (TLF: Top Level Folders).

🚀 Funcionalidades principales

✅ Registro de usuarios con elección de rol: Usuario, Admin, Cliente, Socio.

✅ Inicio de sesión con validación.

✅ Manejo de sesión a través de Supabase.

✅ Estructura de proyecto limpia y escalable.

✅ Variables de entorno seguras con .env.local.

🧱 Estructura del proyecto

.
├── components/           # Componentes reutilizables
│   ├── AuthForm.tsx
│   ├── InputField.tsx
│   ├── Button.tsx
│   └── RoleSelector.tsx
│
├── pages/                # Rutas del sistema
│   ├── signin.tsx
│   └── signup.tsx
│
├── services/             # Configuración del cliente de Supabase
│   └── supabaseClient.ts
│
├── .env.local            # Claves privadas (NO subir a Git)
├── tsconfig.json         # Alias para imports con @/
└── package.json

🔐 Roles disponibles al registrarse

Usuario: Puede actualizar su información personal.

Admin: Accede a todo el sistema.

Cliente: Puede solicitar proyectos.

Socio: Accede a programas de afiliados.

🔧 Configuración

1. Instalar dependencias

npm install

2. Configurar variables de entorno

Crear el archivo .env.local en la raíz del proyecto con lo siguiente:

NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

⚠️ Asegúrate de que .env.local esté en .gitignore.

3. Configurar Supabase Client

Archivo: services/supabaseClient.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

4. Crear componentes reutilizables

InputField.tsx: Campo de entrada.

Button.tsx: Botón de envío.

RoleSelector.tsx: Selector de rol.

AuthForm.tsx: Formulario general para login y registro.

5. Crear páginas Signin y Signup

// pages/signin.tsx
import { AuthForm } from '@/components/AuthForm';
export default function SigninPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm type="signin" />
    </div>
  );
}

// pages/signup.tsx
import { AuthForm } from '@/components/AuthForm';
export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <AuthForm type="signup" />
    </div>
  );
}

6. Configurar alias en tsconfig.json

"paths": {
  "@/*": ["./*"]
}

7. Probar la aplicación

npm run dev

Luego abrir:

http://localhost:3000/signup → registro.

http://localhost:3000/signin → inicio de sesión.

🌐 Rutas principales

/signup — Registro de nuevos usuarios.

/signin — Inicio de sesión para usuarios existentes.

📌 Notas adicionales

El proyecto usa Supabase como proveedor de autenticación.

Todas las claves y configuraciones sensibles están protegidas en .env.local.

El código está dividido en componentes reutilizables.

Se usa TailwindCSS para los estilos.

✅ Siguientes pasos sugeridos

Proteger rutas según rol de usuario.

Crear dashboard personalizado.

Agregar validaciones y notificaciones visuales.

Mejorar diseño con animaciones y logos.

