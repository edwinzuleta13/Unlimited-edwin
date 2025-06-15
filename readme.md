## 🔐 Autenticación y navegación dinámica

Esta aplicación implementa un sistema de autenticación visualmente integrado y dinámico mediante Supabase:

### ✅ Funcionalidades implementadas

- **Redirección automática**: al iniciar sesión correctamente, el usuario es enviado directamente a la página principal (`/`).
- **Cambio dinámico de botones según sesión**:
  - Si **no hay sesión activa**, se muestran los botones:
    - `Iniciar sesión`
    - `Registrarse`
  - Si **el usuario ya está autenticado**, se muestra:
    - `Cerrar sesión` (con redirección al cerrar)
- **Componente reutilizable `AuthNav`**:
  - Detecta cambios de sesión en tiempo real usando `supabase.auth.onAuthStateChange`.
  - Muestra u oculta botones automáticamente.
  - Puede integrarse fácilmente en cualquier página o en `layout.tsx` para comportamiento global.
- **Estética coherente**:
  - Botones personalizados con efectos de hover, cursor animado, partículas de fondo y diseño morado oscuro adaptado.
  - Integrado con el sistema de sonido al pasar el mouse (`hover.mp3`).

### 📦 Archivos clave

- `/components/AuthNav.tsx`
- `/components/AuthForm.tsx`
- `/app/page.tsx`
