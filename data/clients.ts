export interface Client {
  name: string;
  image: string;
  href?: string;
  description?: string;
  services?: string[];
}

export const clients: Client[] = [
  {
    name: "Ana's Accounting",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/ANAS%20ACCOUNTING%20SERV%20LOGO%20(2).png",
    href: "https://anasaccounting.com/",
    description: "Soluciones contables integrales impulsadas por tecnología. Modernizamos sus procesos financieros con herramientas digitales de vanguardia para optimizar la gestión empresarial.",
    services: ["Contabilidad digital", "Automatización de procesos", "Consultoría financiera"],
  },
  {
    name: "DAKA",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/daka-logo.png",
    href: "https://tiendasdaka.com",
    description: "Tienda departamental líder en su sector. Transformamos su experiencia de compra con una plataforma de e-commerce robusta y personalizada.",
    services: ["E-commerce", "Plataforma web", "Integración de pagos"],
  },
  {
    name: "Extra ganga",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/extra_ganga_logo.jpeg",
    href: "",
    description: "Cadena de tiendas de descuento con expansión digital. Implementamos soluciones para llevar sus ofertas y promociones al mundo online.",
    services: ["Catálogo digital", "Marketing digital", "Presencia web"],
  },
  {
    name: "KAOZ",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/KAOZ.png",
    href: "kaosve.com",
    description: "Marca de moda urbana y estilo de vida. Creamos una identidad digital única que refleja su espíritu innovador y conecta con su audiencia.",
    services: ["Identidad digital", "Redes sociales", "Plataforma de ventas"],
  },
  {
    name: "KEYTON",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/keyton_logo.png",
    href: "https://keyton.com.ve",
    description: "Empresa de tecnología especializada en soluciones empresariales. Desarrollamos herramientas a medida para potenciar su infraestructura tecnológica.",
    services: ["Desarrollo de software", "Infraestructura TI", "Consultoría tecnológica"],
  },
  {
    name: "Rental Deluxe",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/logo-Rental-deluxe-JPEG-(8).jpg",
    href: "https://somosrentaldeluxe.com",
    description: "Agencia de alquiler de vehículos de lujo. Digitalizamos su proceso de reservas y creamos una experiencia premium para sus clientes.",
    services: ["Sistema de reservas", "Portal web", "Gestión de flota"],
  },
  {
    name: "Reys Smart",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/logo-reys-smart-01.jpg",
    href: "https://reysmartsolution.com",
    description: "Soluciones inteligentes para hogares y empresas. Integramos tecnología IoT y automatización para crear espacios más eficientes y conectados.",
    services: ["IoT", "Automatización", "Smart solutions"],
  },
  {
    name: "Piter",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/piper_logo.png",
    href: "https://piter.com.ve/",
    description: "Plataforma de delivery y servicios on-demand. Optimizamos su plataforma para conectar usuarios con negocios locales de manera eficiente.",
    services: ["App delivery", "Plataforma on-demand", "Logística digital"],
  },
  {
    name: "yenfit",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/yenfit.png",
    href: "https://www.yenfit.shop",
    description: "Tienda de productos fitness y bienestar. Creamos una experiencia de compra digital que inspira un estilo de vida saludable.",
    services: ["E-commerce fitness", "CRM", "Marketing digital"],
  },
  {
    name: "You Space",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/you_space_logo.png",
    href: "",
    description: "Espacios de coworking y oficinas flexibles. Digitalizamos la gestión de espacios y creamos una comunidad virtual para profesionales.",
    services: ["Gestión de espacios", "Plataforma comunitaria", "Reservas online"],
  },
  {
    name: "Campo Meat",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/logo%20campo%20meat%20JPEG%20(1).jpg",
    href: "https://www.campomeat.com",
    description: "Carnicería premium con tradición y calidad. Llevamos la mejor carne a los hogares con una plataforma de pedidos online eficiente.",
    services: ["E-commerce alimenticio", "Logística", "Portal corporativo"],
  },
  {
    name: "WH Mattdres",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/4-%20(WH)%201.png",
    href: "https://www.whmattress.com",
    description: "Fabricante de colchones y productos de descanso. Transformamos la experiencia de compra con un showroom virtual y catálogo interactivo.",
    services: ["Showroom virtual", "Catálogo interactivo", "E-commerce"],
  },
  {
    name: "CSBIKE",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/csbike.png",
    href: "https://cs-bike.vercel.app",
    description: "Tienda especializada en bicicletas y accesorios. Creamos una plataforma digital para la comunidad ciclista con venta de equipamiento y repuestos.",
    services: ["E-commerce deportivo", "Catálogo técnico", "Portal comunitario"],
  },
  {
    name: "Torino",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/Torino.png",
    href: "https://www.torinocaffe.info/",
    description: "Marca de moda y estilo con presencia en el mercado venezolano. Impulsamos su transformación digital para conectar con una nueva generación de clientes.",
    services: ["Identidad digital", "E-commerce", "Marketing digital"],
  },
  {
    name: "Gustobikes",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/gustobikes.png",
    href: "https://www.gustobike-latam.com",
    description: "Tienda especializada en bicicletas y accesorios. Desarrollamos su plataforma digital para ofrecer una experiencia de compra única a los amantes del ciclismo.",
    services: ["E-commerce", "Catálogo digital", "Portal web"],
  },
  {
    name: "HCS",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/HCS.jpg",
    href: "https://www.hcstrading.org/",
    description: "Empresa de soluciones corporativas. Implementamos tecnología innovadora para optimizar sus procesos y llevar su negocio al siguiente nivel.",
    services: ["Soluciones corporativas", "Transformación digital", "Consultoría"],
  },
];
