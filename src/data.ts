
export interface SocialLink {
  name: string;
  url: string;
  color: string;
  icon: 'Github' | 'Instagram' | 'Facebook' | 'MessageCircle';
}

export interface ContactInfo {
  email: string;
  phone: string;
  phoneUrl?: string; // Optional because it wasn't in the second profile object in your original file, but good to have
  linkedin?: string;
  github?: string;
  socials?: SocialLink[];
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  photo: string;
  location?: string;
  contact: ContactInfo;
}

export interface ProjectLinks {
  deploy?: string;
  github?: string;
  download?: string;
}

export interface Project {
  id: number;
  title: string;
  description?: string; // Optional for mini projects
  tech: string[] | string; // array or string based on your usage
  img?: string;
  images?: string[]; // Array of images for carousel
  links?: ProjectLinks; // Optional for mini projects
}

export interface ProjectsData {
  relevant: Project[];
  intermediate: Project[];
  mini: Project[];
}


export const profile: Profile = {
  name: "Franyer Marin",
  title: "Ingeniero en Computación (En formación) | Full-Stack & Mobile Developer",
  bio: "Desarrollador de software enfocado en soluciones móviles multiplataforma y sistemas web robustos. Experto en automatización de procesos y con pasión por el UI/UX. Actualmente cursando el 8vo semestre de Ingeniería.",
  photo: "https://i.ibb.co/nqjv6Qrv/Whats-App-Image-2025-06-02-at-23-59-07-4ef88d01.jpg", 
  location: "Tocuyito, Urb. La Esperanza, Edo. Carabobo, Venezuela",
  contact: {
    email: "franyerjmarin@gmail.com",
    phone: "0412-413.79.10",
    phoneUrl: "tel:+584124137910",
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


export const skills: string[] = [
  "Flutter/Dart", "React", "TypeScript", "Python", "Node.js", "SQL", "Firebase", "N8N", "Git", "Figma"
];

// Load images dynamically
const latasaImages = Object.values(import.meta.glob('../assets/image/laTasa/*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' }));
const smarketImages = Object.values(import.meta.glob('../assets/image/Smarket/*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' }));
const lebuImages = Object.values(import.meta.glob('../assets/image/LeBu/*.{png,jpg,jpeg,webp}', { eager: true, as: 'url' }));

export const projects: ProjectsData = {
  relevant: [
    {
      id: 1,
      title: "laTasa",
      description: "App móvil completa con tasas cambiarias en Venezuela en tiempo real.",
      tech: ["Flutter", "Dart", "API Rest"],
      img: latasaImages[0] || "/images/latasa-cover.jpg", // Fallback or first image as cover
      images: latasaImages.length > 0 ? latasaImages : ["/images/latasa-cover.jpg"],
      links: { deploy: "#", github: "#", download: "#" }
    },
    {
      id: 2,
      title: "Smarket",
      description: "App de compras inteligentes con base de datos impulsada por la comunidad.",
      tech: ["React Native", "Firebase", "UI/UX"],
      img: smarketImages[0] || "/images/smarket-cover.jpg",
      images: smarketImages.length > 0 ? smarketImages : ["/images/smarket-cover.jpg"],
      links: { deploy: "#", github: "#" }
    },
    {
      id: 3,
      title: "LeBu",
      description: "App de Deep Reading con técnicas de neuroaprendizaje.",
      tech: ["Flutter", "Clean Arch"],
      img: lebuImages[0] || "/images/lebu-cover.jpg",
      images: lebuImages.length > 0 ? lebuImages : ["/images/lebu-cover.jpg"],
      links: { deploy: "#", github: "#" }
    }
  ],
  intermediate: [
    {
      id: 4,
      title: "CRM FapyTech",
      description: "Sistema de gestión para ventas de iPhone y control de inventario.",
      tech: ["React", "Node.js", "SQL"],
      links: { github: "#" }
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
