// src/data.ts
import { Profile, ProjectsData } from './types';

export const profileES: Profile = {
  name: "Franyer Marin",
  title: "Ingeniero en Computación (En formación) | Full-Stack & Mobile Developer",
  bio: "Desarrollador de software enfocado en soluciones móviles multiplataforma y sistemas web robustos. Experto en automatización de procesos y con pasión por el UI/UX. Actualmente cursando el 8vo semestre de Ingeniería.",
  photo: "https://i.ibb.co/mVtQY7zQ/IMG-7942-Copy.jpg", 
  contact: {
    email: "franyerjmarin@gmail.com",
    phone: "0412-413.79.10",
    phoneUrl: "tel:+584124137910",
    location: "Valencia, Carabobo",
    github: "https://github.com/FranyerJM",
    socials: [
      { 
        name: "GitHub", 
        url: "https://github.com/FranyerJM", 
        color: "hover:text-gray-900 hover:bg-white", 
        icon: "Github" 
      },
      { 
        name: "Instagram", 
        url: "https://www.instagram.com/franyerjosuem/", 
        color: "hover:text-pink-600 hover:bg-pink-50", 
        icon: "Instagram" 
      },
      { 
        name: "Facebook", 
        url: "https://www.facebook.com/josue.chavez.387026", 
        color: "hover:text-blue-600 hover:bg-blue-50", 
        icon: "Facebook" 
      },
      { 
        name: "WhatsApp", 
        url: "https://wa.me/+584124137910", 
        color: "hover:text-green-600 hover:bg-green-50", 
        icon: "MessageCircle" 
      },
    ]
  }
};

export const profileEN: Profile = {
  ...profileES,
  title: "Computer Engineering Student | Full-Stack & Mobile Developer",
  bio: "Software developer focused on cross-platform mobile solutions and robust web systems. Expert in process automation with a passion for UI/UX. Currently in the 8th semester of Engineering.",
  contact: {
    ...profileES.contact,
    location: "Valencia, Carabobo, Venezuela"
  }
};

export const skills: string[] = [
  "Flutter/Dart", "React", "TypeScript", "Python", "Node.js", "SQL", "Firebase", "N8N", "Git", "Figma"
];

// --- CARGA DE IMÁGENES ---
const latasaGlob = import.meta.glob('../assets/image/laTasa/*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' });
const latasaImages = Object.values(latasaGlob) as string[];

const smarketGlob = import.meta.glob('../assets/image/Smarket/*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' });
const smarketImages = Object.values(smarketGlob) as string[];

const lebuGlob = import.meta.glob('../assets/image/LeBu/*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' });
const lebuImages = Object.values(lebuGlob) as string[];

export const projectsES: ProjectsData = {
  relevant: [
    {
      id: 1,
      title: "laTasa",
      description: "Calculadora de tasas cambiarias en Venezuela en tiempo real, incluye multiples funciones.",
      tech: ["Futter", "Dart", "Node.js"],
      img: latasaImages.length > 0 ? latasaImages[0] : "/images/latasa-cover.jpg",
      images: latasaImages.length > 0 ? latasaImages : ["/images/latasa-cover.jpg"],
      links: { deploy: "https://latasa-three.vercel.app/", github: "#", download: "https://franyerjm.github.io/build-projects/laTasaARM.apk" },
      details: {
        overview: "Aplicación líder en monitoreo de tasas cambiarias en Venezuela. Proporciona información actualizada en tiempo real de múltiples fuentes financieras, con herramientas integradas para conversión y análisis histórico.",
        features: ["Actualización en tiempo real", "Calculadora multimoneda", "Gráficos históricos", "Modo offline", "Notificaciones de volatilidad"],
        stack: {
          mobile: ["Flutter", "Dart"],
          backend: ["Node.js", "Express"],
          tools: ["Figma", "Git"]
        }
      }
    },
    {
      id: 2,
      title: "Smarket",
      description: "App de compras inteligentes con base de datos impulsada por la comunidad.",
      tech: ["Flutter", "Dart", "Node.js", "FastAPI"],
      img: smarketImages.length > 0 ? smarketImages[0] : "/images/smarket-cover.jpg",
      images: smarketImages.length > 0 ? smarketImages : ["/images/smarket-cover.jpg"],
      links: { deploy: "#", github: "#" },
      details: {
        overview: "Plataforma comunitaria para comparar precios de supermercados. Los usuarios escanean códigos de barras para compartir y consultar precios actualizados por la comunidad.",
        features: ["Escaneo de código de barras", "Comparativa de precios", "Listas de compras colaborativas", "Geolocalización de ofertas"],
        stack: {
          mobile: ["Flutter", "Dart"],
          backend: ["Node.js", "FastAPI"],
          database: ["Firebase", "PostgreSQL"],
          tools: ["TensorFlow (OCR)"]
        }
      }
    },
    {
      id: 3,
      title: "LeBu",
      description: "App de Deep Reading con técnicas de neuroaprendizaje.",
      tech: ["Flutter", "Dart"],
      img: lebuImages.length > 0 ? lebuImages[0] : "/images/lebu-cover.jpg",
      images: lebuImages.length > 0 ? lebuImages : ["/images/lebu-cover.jpg"],
      links: { deploy: "#", github: "#" },
      details: {
        overview: "Herramienta de lectura optimizada que aplica técnicas de neuroaprendizaje para mejorar la retención y velocidad de lectura.",
        features: ["Lectura biónica (Bionic Reading)", "Seguimiento ocular guiado", "Resúmenes inteligentes", "Estadísticas de progreso"],
        stack: {
          mobile: ["Flutter", "Dart"],
          tools: ["Clean Architecture", "Riverpod"]
        }
      }
    }
  ],
  intermediate: [
    {
      id: 4,
      title: "CRM FapyTech",
      description: "Sistema de gestión para ventas de iPhone y control de inventario.",
      tech: ["React", "Node.js", "SQL"],
      links: { github: "#", deploy: "https://crm-iphones.vercel.app/" },
      details: {
        overview: "Sistema integral para la gestión administrativa de tiendas de ventas de equipos Apple. Controla desde el inventario hasta la facturación y garantía.",
        features: ["Gestión de inventario por IMEI", "Control de ventas y facturación", "Base de datos de clientes", "Reportes financieros", "Dashboard administrativo"],
        stack: {
          frontend: ["React", "TypeScript", "TailwindCSS"],
          backend: ["Node.js", "Express"],
          database: ["PostgreSQL", "Supabase"],
          tools: ["Vite", "Recharts"]
        }
      }
    },
    {
      id: 5,
      title: "Automatización Ufrayan",
      description: "Generación automática de cartas, certificados y recursos académicos.",
      tech: ["Python", "Pandas", "xlwings"],
      links: { github: "#" }
    }
  ],
  mini: [ 
    { id: 6, title: "BotFather Telegram Bot", tech: "Python" },
    { id: 7, title: "Scraper de Datos Web", tech: "Python/Soup" },
    { id: 8, title: "Diseño UI Sistema de Crédito", tech: "Figma" },
    { id: 9, title: "Calculadora Lógica", tech: "JS/HTML" }
  ]
};

export const projectsEN: ProjectsData = {
  relevant: [
    {
      id: 1,
      title: "laTasa",
      description: "Real-time exchange rate calculator for Venezuela, including multiple financial tools.",
      tech: ["Futter", "Dart", "Node.js"],
      img: latasaImages.length > 0 ? latasaImages[0] : "/images/latasa-cover.jpg",
      images: latasaImages.length > 0 ? latasaImages : ["/images/latasa-cover.jpg"],
      links: { deploy: "https://latasa-three.vercel.app/", github: "#", download: "https://franyerjm.github.io/build-projects/laTasaARM.apk" },
      details: {
        overview: "Leading application for monitoring exchange rates in Venezuela. Provides real-time information from multiple financial sources, with integrated tools for conversion and historical analysis.",
        features: ["Real-time updates", "Multi-currency calculator", "Historical charts", "Offline mode", "Volatility notifications"],
        stack: {
          mobile: ["Flutter", "Dart"],
          backend: ["Node.js", "Express"],
          tools: ["Figma", "Git"]
        }
      }
    },
    {
      id: 2,
      title: "Smarket",
      description: "Smart shopping app with a community-driven database.",
      tech: ["Flutter", "Dart", "Node.js", "FastAPI"],
      img: smarketImages.length > 0 ? smarketImages[0] : "/images/smarket-cover.jpg",
      images: smarketImages.length > 0 ? smarketImages : ["/images/smarket-cover.jpg"],
      links: { deploy: "#", github: "#" },
      details: {
        overview: "Community platform for comparing supermarket prices. Users scan barcodes to share and consult prices updated by the community.",
        features: ["Barcode scanning", "Price comparison", "Collaborative shopping lists", "Offer geolocation"],
        stack: {
          mobile: ["Flutter", "Dart"],
          backend: ["Node.js", "FastAPI"],
          database: ["Firebase", "PostgreSQL"],
          tools: ["TensorFlow (OCR)"]
        }
      }
    },
    {
      id: 3,
      title: "LeBu",
      description: "Deep Reading app using neuro-learning techniques to improve focus and speed.",
      tech: ["Flutter", "Dart"],
      img: lebuImages.length > 0 ? lebuImages[0] : "/images/lebu-cover.jpg",
      images: lebuImages.length > 0 ? lebuImages : ["/images/lebu-cover.jpg"],
      links: { deploy: "#", github: "#" },
      details: {
        overview: "Optimized reading tool that applies neuro-learning techniques to improve retention and reading speed.",
        features: ["Bionic Reading", "Guided eye tracking", "Smart summaries", "Progress statistics"],
        stack: {
          mobile: ["Flutter", "Dart"],
          tools: ["Clean Architecture", "Riverpod"]
        }
      }
    }
  ],
  intermediate: [
    {
      id: 4,
      title: "CRM FapyTech",
      description: "Management system for iPhone sales and inventory control.",
      tech: ["React", "Node.js", "SQL"],
      links: { github: "#", deploy: "https://crm-iphones.vercel.app/" },
      details: {
        overview: "Comprehensive system for administrative management of Apple equipment sales stores. Controls everything from inventory to billing and warranty.",
        features: ["Inventory management by IMEI", "Sales and billing control", "Customer database", "Financial reports", "Administrative dashboard"],
        stack: {
          frontend: ["React", "TypeScript", "TailwindCSS"],
          backend: ["Node.js", "Express"],
          database: ["PostgreSQL", "Supabase"],
          tools: ["Vite", "Recharts"]
        }
      }
    },
    {
      id: 5,
      title: "Ufrayan Automation",
      description: "Automatic generation of letters, certificates, and academic resources.",
      tech: ["Python", "Pandas", "xlwings"],
      links: { github: "#" }
    }
  ],
  mini: [ 
    { id: 6, title: "BotFather Telegram Bot", tech: "Python" },
    { id: 7, title: "Web Data Scraper", tech: "Python/Soup" },
    { id: 8, title: "Credit System UI Design", tech: "Figma" },
    { id: 9, title: "Logic Calculator", tech: "JS/HTML" }
  ]
};

export const data = {
  es: {
    profile: profileES,
    projects: projectsES,
    labels: {
      available: "Siempre Creando 🚀",
      greeting: "Hola, soy",
      contact: "Contactarme",
      github: "GitHub",
      download: "Descargar App",
      openSystem: "Abrir Sistema",
      moreInfo: "Más Información",
      viewCode: "Ver Código",
      demoWeb: "Ver Demo Web",
      projects: "Proyectos",
      skills: "Skills",
      contactNav: "Contacto",
      featuredApps: "Apps Móviles Destacadas",
      featuredAppsDesc: "Soluciones nativas y multiplataforma diseñadas para la palma de tu mano. Cada pantalla es un carrusel de capturas reales.",
      desktopTitle: "Soluciones Web / Desktop",
      desktopFallback: "16:9 Vista de Escritorio",
      about: "Sobre mí",
      stack: "Stack Tecnológico",
      talk: "Hablemos de tu próximo proyecto",
      talkDesc: "Si tienes alguna pregunta o una idea que quieras desarrollar, no dudes en contactarme.",
      call: "Llamar ahora",
      email: "Escribir correo",
      footer: `© ${new Date().getFullYear()}`,
      desktopWarningTitle: "Versión de Escritorio",
      desktopWarningDesc: "Esto es un sistema hecho para <span class='font-bold'>Desktop</span> (computadora de escritorio). No se verá igual en el celular. Si deseas ver cómo es el sistema en realidad, por favor ábrelo en una PC.",
      continue: "Continuar de todos modos",
      close: "Cerrar",
      demoModalTitle: "Nota importante",
      demoModalDesc: "Este es el <strong>Demo Web</strong> de la app mobile. Es posible que algunas funcionalidades nativas no estén disponibles.",
      downloadApp: "Descargar App Funcional",
      continueDemo: "Continuar al Demo Web",
      cancel: "Cancelar",
      aboutProject: "Sobre el proyecto",
      keyFeatures: "Características Clave",
      frontendMobile: "Frontend / Mobile",
      backendData: "Backend & Datos",
      toolsLibs: "Herramientas y Librerías"
    }
  },
  en: {
    profile: profileEN,
    projects: projectsEN,
    labels: {
      available: "Always Building 🚀",
      greeting: "Hi, I'm",
      contact: "Contact Me",
      github: "GitHub",
      download: "Download App",
      openSystem: "Open System",
      moreInfo: "More Info",
      viewCode: "View Code",
      demoWeb: "View Web Demo",
      projects: "Projects",
      skills: "Skills",
      contactNav: "Contact",
      featuredApps: "Featured Mobile Apps",
      featuredAppsDesc: "Native and cross-platform solutions designed for the palm of your hand. Each screen is a carousel of real screenshots.",
      desktopTitle: "Web / Desktop Solutions",
      desktopFallback: "16:9 Desktop View",
      about: "About Me",
      stack: "Tech Stack",
      talk: "Let's talk about your next project",
      talkDesc: "If you have any questions or an idea you want to develop, feel free to contact me.",
      call: "Call Now",
      email: "Send Email",
      footer: `© ${new Date().getFullYear()}`,
      desktopWarningTitle: "Desktop Version",
      desktopWarningDesc: "This system is designed for <span class='font-bold'>Desktop</span>. It will not look the same on mobile. If you want to see the system as intended, please open it on a PC.",
      continue: "Continue Anyway",
      close: "Close",
      demoModalTitle: "Important Note",
      demoModalDesc: "This is the <strong>Web Demo</strong> of the mobile app. Some native functionalities may not be available.",
      downloadApp: "Download Functional App",
      continueDemo: "Continue to Web Demo",
      cancel: "Cancel",
      aboutProject: "About the Project",
      keyFeatures: "Key Features",
      frontendMobile: "Frontend / Mobile",
      backendData: "Backend & Data",
      toolsLibs: "Tools & Libraries"
    }
  }
};