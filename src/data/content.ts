/**
 * Central Content Repository for Oussama Zazou Portfolio
 * 
 * STRICT VERIFICATION RULES:
 * - All visible text, URLs, and labels originate exclusively from this file.
 * - No invented or unverified claims, metrics, or badges.
 * - Unverified chips or sections are left as empty arrays or null with // TODO comments.
 */

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  url: string;
  displayUrl: string;
  tags: string[];
  isPlaceholder: boolean;
  previewImage?: string;
}

export interface SkillModule {
  id: string;
  moduleNumber: string;
  name: string;
  description: string;
  chips: string[];
}

export interface GitHubRepoItem {
  name: string;
  description: string | null;
  url: string;
}

export interface ContactButton {
  label: string;
  href: string;
  isPlaceholder: boolean;
  type: "linkedin" | "cv" | "github";
}

export const portfolioContent = {
  // Identity & Core Profile
  personal: {
    name: "Oussama Zazou",
    initials: "OZ",
    role: "AI Specialist, Full Stack Developer | Google Analytics, CRO Systems",
    shortBio: "Desarrollo web, sistemas y análisis de datos orientado a soluciones digitales funcionales.",
    email: "ozazou2001@gmail.com",
    website: null,
    github: "https://github.com/zaos22",
    linkedin: "https://www.linkedin.com/in/zaos/",
    cv: "[URL_CV]", // TODO: rellenar con URL real del CV
    profileImage: "/img/foto-perfil.png",
    profileImageAlt: "Fotografía de Oussama Zazou",
  },

  // Navigation
  nav: {
    brand: "OZ",
    brandFullName: "OUSSAMA ZAZOU",
    links: [
      { label: "Proyectos", href: "#proyectos" },
      { label: "Habilidades", href: "#habilidades" },
      { label: "Google Analytics", href: "#google-analytics" },
      { label: "Contacto", href: "#contacto" },
    ],
    ctaCv: {
      label: "Ver CV",
      href: "#contacto",
    },
  },

  // Hero Section
  hero: {
    badge: null, // Eliminado por no estar verificado en datos oficiales
    title: "OUSSAMA ZAZOU",
    role: "AI Specialist, Full Stack Developer | Google Analytics, CRO Systems",
    description: "Desarrollo web, sistemas y análisis de datos orientado a soluciones digitales funcionales.",
    image: "/img/hero-image.jpg",
    imageAlt: "Retrato profesional de Oussama Zazou",
    ctaProjects: "Ver proyectos",
    ctaCv: "Ver CV",
    ctaLinkedIn: "LinkedIn",
    scrollIndicator: "Desplazar para explorar",
  },

  // About Section
  about: {
    badge: "Perfil Profesional",
    heading: "Oussama Zazou",
    bio: "Desarrollo web, sistemas y análisis de datos orientado a soluciones digitales funcionales.",
    directChannelsLabel: "CANALES DIRECTOS Y ENLACES OFICIALES",
    emailLabel: "CORREO DIRECTO",
    linkedinLabel: "LINKEDIN",
    githubLabel: "GITHUB",
  },

  // Skills Section
  skills: {
    badge: "Capacidades Técnicas",
    heading: "Ecosistema & Habilidades",
    description: "Tecnologías y herramientas aplicadas en entornos reales.",
    marqueeAreas: [
      "Frontend",
      "Backend",
      "Full Stack",
      "Automatización de datos (APIs y Google Sheets)",
      "Looker Studio",
      "Google Analytics",
      "Diseño web (WordPress y PrestaShop)",
      "IA aplicada",
      "Sistemas y redes",
    ],
    modules: [
      {
        id: "mod-1",
        moduleNumber: "Módulo 01",
        name: "Frontend",
        description: "Construcción de interfaces interactivas, responsivas y optimizadas.",
        chips: [], // TODO: rellenar con tecnologías reales cuando estén verificadas
      },
      {
        id: "mod-2",
        moduleNumber: "Módulo 02",
        name: "Backend",
        description: "Lógica de servidor, endpoints, persistencia y control transaccional.",
        chips: [], // TODO: rellenar con tecnologías reales cuando estén verificadas
      },
      {
        id: "mod-3",
        moduleNumber: "Módulo 03",
        name: "Full Stack",
        description: "Conexión integral entre interfaz, lógica de negocio y capas de almacenamiento.",
        chips: [], // TODO: rellenar con tecnologías reales cuando estén verificadas
      },
      {
        id: "mod-4",
        moduleNumber: "Módulo 04",
        name: "Automatización de datos (APIs y Google Sheets)",
        description: "Flujos de datos automatizados conectando APIs, webhooks y Google Sheets.",
        chips: ["Google Sheets", "APIs"],
      },
      {
        id: "mod-5",
        moduleNumber: "Módulo 05",
        name: "Looker Studio",
        description: "Visualización de datos analíticos, cuadros de mando interactivos e informes claros.",
        chips: ["Looker Studio"],
      },
      {
        id: "mod-6",
        moduleNumber: "Módulo 06",
        name: "Google Analytics",
        description: "Medición y seguimiento estructurado de tráfico web y eventos de comportamiento.",
        chips: ["Google Analytics"],
      },
      {
        id: "mod-7",
        moduleNumber: "Módulo 07",
        name: "Diseño web (WordPress y PrestaShop)",
        description: "Diseño, personalización y configuración de gestores CMS y tiendas online e-commerce.",
        chips: ["WordPress", "PrestaShop", "Photoshop", "Gimp"],
      },
      {
        id: "mod-8",
        moduleNumber: "Módulo 08",
        name: "IA aplicada",
        description: "Integración de modelos de inteligencia artificial y utilidades para productividad y flujos.",
        chips: [], // TODO: rellenar con tecnologías reales cuando estén verificadas
      },
      {
        id: "mod-9",
        moduleNumber: "Módulo 09",
        name: "Sistemas y redes",
        description: "Soporte, configuración de infraestructura de conectividad, servidores y entornos locales.",
        chips: ["redes", "soporte a usuarios", "seguridad informática", "inventario de equipos"],
      },
    ] as SkillModule[],
  },

  // Google Analytics Section (Official Certification)
  analytics: {
    badge: "Acreditación Oficial",
    title: "Google Analytics Certification (2026)",
    issuer: "Google",
    issueDate: "28 de octubre de 2026",
    expiryDate: null,
    certId: null,
    verificationUrl: "https://skillshop.credential.net/8111e4e1-2566-4172-97b8-dd70808729b1#acc.VHpfk371",
    ctaVerify: "Verificar certificado",
    valueHeading: "Qué puedo aportar con Google Analytics",
    valueDescription: "Capacidad técnica enfocada en la trazabilidad real, implementaciones de eventos sin suposiciones e integración con Looker Studio para generación de informes.",
    valuePoints: [
      "Medición del tráfico y del comportamiento de los usuarios.",
      "Configuración de eventos y conversiones.",
      "Informes para apoyar la toma de decisiones.",
    ],
    complementaryTool: "Looker Studio como herramienta complementaria para la generación de informes visuales.",
    chartTitle: "ESTRUCTURA DE FLUJO DE EVENTOS",
  },

  // Projects Section
  projects: {
    badge: "Portafolio en Vivo",
    heading: "Proyectos seleccionados",
    description: "Implementaciones web funcionales desplegadas en entornos de producción.",
    ctaViewLive: "Ver en vivo ↗",
    ctaComingSoon: "Próximamente",
    items: [
      {
        id: "zaosfy",
        title: "Zaosfy",
        description: "Agencia de automatización de negocios e Inteligencia Artificial",
        url: "https://zaosfy.online/",
        displayUrl: "www.zaosfy.online",
        tags: ["AI", "Web"],
        isPlaceholder: false,
        previewImage:
          "https://api.microlink.io/?url=https%3A%2F%2Fzaosfy.online&screenshot=true&meta=false&embed=screenshot.url",
      },
      {
        id: "ohana",
        title: "Cafetería Ohana",
        description: "Web de cafetería",
        url: "https://cafeteria-ohana.vercel.app/",
        displayUrl: "cafeteria-ohana.vercel.app",
        tags: ["Vercel"],
        isPlaceholder: false,
      },
      {
        id: "arahmatours",
        title: "Arahma Tours",
        description: "Web de agencia de viajes",
        url: "https://arahmatours.vercel.app/",
        displayUrl: "arahmatours.vercel.app",
        tags: ["Vercel"],
        isPlaceholder: false,
      },
      {
        id: "fisiomed",
        title: "Fisiomed",
        description: "Web de clínica de fisioterapia",
        url: "https://fisiomed.vercel.app/",
        displayUrl: "fisiomed.vercel.app",
        tags: ["Vercel"],
        isPlaceholder: false,
      },
    ] as ProjectItem[],
  },

  // Real GitHub Repositories (Retrieved live from https://github.com/zaos22)
  github: {
    heading: "Más proyectos en GitHub",
    description: "Repositorios técnicos, código fuente y arquitecturas abiertas.",
    profileUrl: "https://github.com/zaos22",
    profileHandle: "github.com/zaos22 ↗",
    repos: [
      {
        name: "za-os.com",
        description: "Portafolio personal interactivo desarrollado con Next.js, TypeScript, Tailwind CSS y GSAP.",
        url: "https://github.com/zaos22/za-os.com",
      },
      {
        name: "toptop_app",
        description: "Repositorio de aplicación y arquitectura de software en GitHub.",
        url: "https://github.com/zaos22/toptop_app",
      },
      {
        name: "ohana",
        description: "Código fuente y desarrollo web para Cafetería Ohana.",
        url: "https://github.com/zaos22/ohana",
      },
      {
        name: "fisiomed.com",
        description: "Código fuente y plataforma web para la clínica de fisioterapia Fisiomed.",
        url: "https://github.com/zaos22/fisiomed.com",
      },
      {
        name: "arahmatours",
        description: "Código fuente y plataforma web para la agencia de viajes Arahma Tours.",
        url: "https://github.com/zaos22/arahmatours",
      },
    ] as GitHubRepoItem[],
  },

  // Final CTA / Contact Section
  contact: {
    badge: "Contacto & Trayectoria",
    heading: "Hay mucho más que contar",
    description: "Revisa la trayectoria completa, formación técnica, proyectos en curso y repositorios de código en las plataformas principales.",
    buttons: [
      {
        label: "Ver LinkedIn",
        href: "https://www.linkedin.com/in/zaos/",
        isPlaceholder: false,
        type: "linkedin",
      },
      {
        label: "Descargar CV",
        href: "[URL_CV]", // TODO: rellenar con enlace real
        isPlaceholder: true,
        type: "cv",
      },
      {
        label: "GitHub",
        href: "https://github.com/zaos22",
        isPlaceholder: false,
        type: "github",
      },
    ] as ContactButton[],
    emailLabel: "Correo directo:",
  },

  // Footer Section
  footer: {
    title: "OUSSAMA ZAZOU",
    role: "AI Specialist, Full Stack Developer | Google Analytics, CRO Systems",
    copyright: "© 2026 Oussama Zazou.",
    backToTop: "Volver arriba",
  },
};
