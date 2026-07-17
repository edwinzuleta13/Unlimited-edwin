export interface Client {
  name: string;
  image: string;
  href?: string;
  description?: string;
  services?: string[];
}

export const clients: Client[] = [
  {
    name: "Ana’s Accounting",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/ANAS%20ACCOUNTING%20SERV%20LOGO%20(2).png",
    href: "https://anasaccounting.com/",
    description: `Empresa estadounidense especializada en soluciones contables, administrativas y tributarias para personas y empresas.

En UTC desarrollamos un sitio web informativo con un sistema integral de gestión de citas, donde los clientes pueden iniciar sesión, agendar servicios, cargar documentos importantes y consultar el historial de sus declaraciones, pagos y servicios realizados. Además, administramos toda la infraestructura cloud de la empresa, garantizando un entorno seguro, escalable y de alto rendimiento.`,
    services: ["Contabilidad digital", "Automatización de procesos", "Consultoría financiera"],
  },
  {
    name: "Tiendas Daka",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/daka-logo.png",
    href: "https://tiendasdaka.com",
    description: `La cadena de tiendas por departamento más grande de Venezuela, especializada en electrodomésticos, tecnología y artículos para el hogar de las principales marcas internacionales.

En UTC desarrollamos un sistema de gestión de SKU para optimizar el control del inventario y agilizar los procesos logísticos internos.`,
    services: ["E-commerce", "Plataforma web", "Integración de pagos"],
  },
  {
    name: "Extraganga",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/extra_ganga_logo.jpeg",
    href: "",
    description: `Tienda especializada en la comercialización de artículos electrónicos y tecnología para el hogar.

En UTC desarrollamos un sistema de gestión de SKU para optimizar el control de inventario y agilizar la administración de sus productos.`,
    services: ["Catálogo digital", "Marketing digital", "Presencia web"],
  },
  {
    name: "KAOS",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/KAOZ.png",
    href: "kaosve.com",
    description: `Tienda de ropa deportiva, accesorios y artículos deportivos ubicada en Valencia, Venezuela.

En UTC desarrollamos un eCommerce que optimiza la experiencia de compra, automatiza la gestión del catálogo e incorpora una sección especializada para empresas interesadas en uniformes y productos personalizados.`,
    services: ["Identidad digital", "Redes sociales", "Plataforma de ventas"],
  },
  {
    name: "Keyton",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/keyton_logo.png",
    href: "https://keyton.com.ve",
    description: `Empresa venezolana dedicada a la fabricación y comercialización de electrodomésticos y productos de línea blanca, reconocida por la calidad de sus productos.

En UTC desarrollamos su sitio web corporativo, diseñado para fortalecer su presencia digital y presentar de forma clara su catálogo, marca y líneas de productos.

Encuentra todos sus productos en MULTIMAX Venezuela.`,
    services: ["Desarrollo de software", "Infraestructura TI", "Consultoría tecnológica"],
  },
  {
    name: "Rental Deluxe",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/logo-Rental-deluxe-JPEG-(8).jpg",
    href: "https://somosrentaldeluxe.com",
    description: `Empresa estadounidense-venezolana especializada en el alquiler de propiedades de lujo, con exclusivas locaciones turísticas a lo largo del litoral venezolano.

En UTC desarrollamos un sitio web que permite explorar su catálogo de propiedades, gestionar reservas y realizar pagos en línea de forma segura mediante la integración con Stripe.`,
    services: ["Sistema de reservas", "Portal web", "Gestión de flota"],
  },
  {
    name: "Reys Smart",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/logo-reys-smart-01.jpg",
    href: "https://reysmartsolution.com",
    description: `Empresa estadounidense especializada en la reparación de crédito personal e hipotecario, ayudando a sus clientes a mejorar su perfil financiero.

En UTC rediseñamos su sitio web, optimizando la experiencia de usuario (UI/UX) para ofrecer una navegación más intuitiva, moderna y enfocada en la conversión.`,
    services: ["IoT", "Automatización", "Smart solutions"],
  },
  {
    name: "PITER",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/piper_logo.png",
    href: "https://piter.com.ve/",
    description: `Empresa venezolana dedicada a la producción de pan árabe y snacks, con una propuesta enfocada en calidad y sabor.

En UTC desarrollamos un sitio web alineado con la identidad de la marca, diseñado para fortalecer su presencia digital y mostrar de forma activa su catálogo de productos.`,
    services: ["App delivery", "Plataforma on-demand", "Logística digital"],
  },
  {
    name: "YENFIT",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/yenfit.png",
    href: "https://www.yenfit.shop",
    description: `Marca venezolana de ropa deportiva para damas y caballeros, especializada en prendas para entrenamiento, viajes, accesorios deportivos, bolsos y más.

En UTC desarrollamos su eCommerce, creando una plataforma digital que permite gestionar y exhibir su catálogo de productos, ofreciendo a sus clientes una experiencia de compra ágil y moderna.`,
    services: ["E-commerce fitness", "CRM", "Marketing digital"],
  },
  {
    name: "YouSpace",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/you_space_logo.png",
    href: "",
    description: `Empresa peruana-estadounidense dedicada al alquiler de espacios para coworking, eventos corporativos y creación de contenido, ofreciendo ambientes ideales para grabaciones, podcasts y experiencias profesionales.

En UTC desarrollamos una plataforma digital para la gestión, catálogo y reserva de espacios, con perfiles para usuarios y arrendatarios. Además, integramos soluciones de inteligencia artificial para validar la autenticidad de las imágenes de las propiedades, fortaleciendo la seguridad de la plataforma y previniendo posibles fraudes o transacciones riesgosas.`,
    services: ["Gestión de espacios", "Plataforma comunitaria", "Reservas online"],
  },
  {
    name: "Campo Meat Miami",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/logo%20campo%20meat%20JPEG%20(1).jpg",
    href: "https://www.campomeat.com",
    description: `Boutique de carnes premium ubicada en Hallandale Beach, Miami, especializada en cortes selectos provenientes de más de 5 países y artículos de cocina de alta gama, incluyendo parrilleras y cuchillos artesanales.

En UTC optimizamos su experiencia digital mediante una mejora en la interfaz y exposición del catálogo, creando una plataforma de compra más atractiva y funcional impulsada por Shopify.`,
    services: ["E-commerce alimenticio", "Logística", "Portal corporativo"],
  },
  {
    name: "WH Mattress Company",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/4-%20(WH)%201.png",
    href: "https://www.whmattress.com",
    description: `Empresa panameña especializada en la fabricación y comercialización de colchones de alta gama, diseñados con tecnología premium para ofrecer una experiencia superior de descanso.

En UTC desarrollamos una web para su presencia digital, creando una plataforma enfocada en comunicar la calidad de sus productos y fortalecer la conexión de la marca con sus clientes.`,
    services: ["Showroom virtual", "Catálogo interactivo", "E-commerce"],
  },
  {
    name: "CS Bike",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/csbike.png",
    href: "https://cs-bike.vercel.app",
    description: `Empresa Peruana especializada en servicio técnico, venta y distribución de artículos de alta gama para apasionados del Mountain Bike, ofreciendo productos y soluciones para ciclistas exigentes.

En UTC desarrollamos su eCommerce con una experiencia de compra optimizada, además de integrar un sistema de agendamiento de citas para la gestión del servicio técnico y reparación de bicicletas.`,
    services: ["E-commerce deportivo", "Catálogo técnico", "Portal comunitario"],
  },
  {
    name: "Torino Caffé",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/Torino.png",
    href: "https://www.torinocaffe.info/",
    description: `Academia de café con raíces italianas y taiwanesas, dedicada a formar baristas de alto nivel combinando teoría, práctica y pasión por el mundo del café.

En UTC desarrollamos su sitio web corporativo, incorporando una sección especializada para mostrar sus cursos, pensums académicos y certificaciones, facilitando a los estudiantes conocer su oferta educativa.`,
    services: ["Identidad digital", "E-commerce", "Marketing digital"],
  },
  {
    name: "GUSTO-bikes Latinoamérica",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/gustobikes.png",
    href: "https://www.gustobike-latam.com",
    description: `Empresa chilena-venezolana dedicada a la distribución de bicicletas de la reconocida marca GUSTO en Latinoamérica, ofreciendo productos de alto rendimiento para ciclistas y entusiastas del deporte.

En UTC desarrollamos su sitio web corporativo, creando una plataforma digital para fortalecer su presencia en la región y presentar su catálogo de productos.`,
    services: ["E-commerce", "Catálogo digital", "Portal web"],
  },
  {
    name: "HCS Distribution",
    image: "https://tmnjhjfayezmqkzjtqgn.supabase.co/storage/v1/object/public/imagenes/logos%20clientes/HCS.jpg",
    href: "https://www.hcstrading.org/",
    description: `Empresa venezolana dedicada a la importación y distribución de soluciones tecnológicas de seguridad inteligente de la marca Hikvision, líder en sistemas de videovigilancia, control de acceso y soluciones basadas en inteligencia artificial.

En UTC desarrollamos su sitio web corporativo y un sistema integral de gestión de inventario con automatizaciones e integraciones de inteligencia artificial, optimizando los procesos internos desde el control de almacén hasta la línea de despacho, mejorando la eficiencia operativa y la gestión de productos.`,
    services: ["Soluciones corporativas", "Transformación digital", "Consultoría"],
  },
];
