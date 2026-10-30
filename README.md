# Oussama Zazou — Portafolio Profesional

[![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock)](https://greensock.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

Sitio web de portafolio personal de alto rendimiento y estética cinematográfica para **Oussama Zazou** (*AI Specialist, Full Stack Developer | Google Analytics, CRO Systems*). Desarrollado siguiendo el sistema de diseño **Obsidian Precision** derivado de especificaciones Google Stitch, con arquitectura en **Next.js (App Router)**, **TypeScript**, y animaciones fluidas con **GSAP**, **Lenis** y **Framer Motion**.

---

## 🌟 Características Principales

### 1. Rigor Fáctico & Single Source of Truth
- **Centralización total**: Todo el contenido visible, enlaces, títulos y metadatos se administran exclusivamente desde [`src/data/content.ts`](src/data/content.ts).
- **Cero contenido inventado**: Cumplimiento estricto de la lista de datos verificados oficiales (certificación Google Analytics 2026, 3 proyectos seleccionados, 3 repositorios reales de GitHub).
- **Manejo inteligente de estados**: Elementos sin datos verificados se ocultan automáticamente sin generar espacios en blanco ni etiquetas residuales en el DOM.

### 2. Coreografía de Animaciones de Alta Fidelidad
- **Preloader cinemático**: Iniciales animadas "OZ" con duración inferior a 1,4 s y desvanecimiento suave.
- **Hero Section**: Titular gigante con revelado por máscara tipográfica letra por letra y fijado por scroll (*pin*) con efecto de zoom de cámara hacia el nombre.
- **Sobre Mí**: Fotografía con halo azul reactivo, efecto parallax sutil y texto iluminado palabra por palabra mediante scrub de scroll.
- **Bento Grid de Habilidades**: Entrada escalonada (*stagger*), marquesina infinita horizontal continua y efecto de resplandor radial guiado por las coordenadas del cursor (`--mouse-x`, `--mouse-y`).
- **Google Analytics 2026**: Tarjeta de credencial con rotación 3D tilt al pasar el ratón, metadatos oficiales y gráfico de barras abstracto animado secuencialmente.
- **Proyectos**: Tarjetas apiladas con scroll fijado, marco de navegador con vista previa en vivo mediante `iframe` perezoso y fallback gráfico estático para dominios protegidos.
- **CTA Final**: Bloque *"Hay mucho más que contar"* con botones magnéticos (LinkedIn, Descargar CV, GitHub).
- **Elementos Globales**: Cursor personalizado interactivo (exclusivo para desktop no táctil), barra de progreso de lectura y cabecera con auto-ocultamiento al bajar y reaparición al subir.

### 3. Accesibilidad & Rendimiento
- **`prefers-reduced-motion`**: Desactiva automáticamente pins, zooms y transformaciones intensivas para usuarios con sensibilidad al movimiento.
- **Contraste AA**: Paleta cromática optimizada para legibilidad en entornos oscuros.
- **GPU Accelerated**: Animaciones circunscritas a `transform` y `opacity` con `will-change` estratégico.

---

## 🛠️ Pila Tecnológica

| Capa | Tecnología |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router, Turbopack) |
| **Biblioteca UI** | [React 19](https://react.dev/) |
| **Lenguaje** | [TypeScript](https://www.typescriptlang.org/) |
| **Estilos** | [Tailwind CSS v4](https://tailwindcss.com/) + Variables CSS nativas |
| **Animación Core** | [GSAP 3](https://greensock.com/) + [ScrollTrigger](https://greensock.com/scrolltrigger/) |
| **Scroll Suave** | [Lenis](https://lenis.darkroom.engineering/) |
| **Microinteracciones** | [Framer Motion](https://www.framer.com/motion/) |
| **Tipografía** | `Syne`, `Inter`, `JetBrains Mono` vía `next/font/google` |
| **Iconografía** | [Lucide React](https://lucide.dev/) |

---

## 📁 Estructura del Proyecto

```
abid.com/
├── public/
│   ├── img/
│   │   └── foto-perfil.png        # Fotografía de perfil verificada
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── globals.css            # Tokens de Obsidian Precision y temas CSS
│   │   ├── icon.svg               # Favicon SVG vectorial con monograma OZ
│   │   ├── layout.tsx             # Root layout con Google Fonts y JSON-LD Person
│   │   └── page.tsx               # Ensamblado modular de las secciones
│   ├── components/
│   │   ├── AboutSection.tsx       # Sección Sobre Mí con foto parallax y scrub
│   │   ├── AnalyticsSection.tsx   # Credencial Google Analytics y gráfico abstracto
│   │   ├── ContactSection.tsx     # CTA final con botones magnéticos
│   │   ├── CustomCursor.tsx       # Cursor interactivo para desktop
│   │   ├── Footer.tsx             # Pie de página semántico con © 2026 Oussama Zazou
│   │   ├── GithubSection.tsx      # Grid con 3 repositorios reales de zaos22
│   │   ├── Header.tsx             # Navbar dinámico con menú móvil accesible
│   │   ├── HeroSection.tsx        # Hero cinemático con zoom pin
│   │   ├── Preloader.tsx          # Animación inicial con monograma OZ
│   │   ├── ProjectsSection.tsx    # Stacked cards con lazy iframe preview
│   │   ├── ScrollProgressBar.tsx  # Barra de progreso de lectura
│   │   ├── SkillsSection.tsx      # Bento grid y marquee infinito
│   │   └── SmoothScroll.tsx       # Proveedor Lenis + GSAP ScrollTrigger
│   ├── data/
│   │   └── content.ts             # Fuente única de verdad tipada
│   └── lib/
│       └── utils.ts               # Utilidad cn (clsx + tailwind-merge)
├── tailwind.config.ts             # Mapeo de tokens de diseño Obsidian Precision
├── tsconfig.json                  # Configuración estricta de TypeScript
├── package.json                   # Dependencias y scripts
└── README.md
```

---

## 🚀 Inicio Rápido en Local

### Requisitos Previos
- **Node.js**: v18.18+ (recomendado v20.x o v24.x)
- **npm**: v9.x o superior

### 1. Clonar el repositorio
```bash
git clone https://github.com/zaos22/abid.com.git
cd abid.com
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Iniciar el servidor de desarrollo
```bash
npm run dev
```
La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

---

## 🧪 Scripts Disponibles

| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo en local con Hot Reloading. |
| `npm run lint` | Ejecuta el análisis estático de código con ESLint para validar buenas prácticas. |
| `npm run build` | Genera la compilación estática y optimizada para producción con Turbopack. |
| `npm start` | Inicia el servidor local sirviendo la versión optimizada de producción. |

---

## ☁️ Guía de Despliegue en Vercel

### Opción A: Despliegue con Vercel CLI
```bash
# Iniciar sesión e inicializar despliegue
npx vercel

# Desplegar directamente al entorno de producción
npx vercel --prod
```

### Opción B: Integración Continua con GitHub
1. Realiza el push de tu código a tu repositorio de GitHub:
   ```bash
   git add .
   git commit -m "feat: obsidian precision portfolio ready for production"
   git push origin main
   ```
2. Entra en tu panel de control de [Vercel](https://vercel.com).
3. Selecciona **"Add New Project"** e importa el repositorio de GitHub.
4. El preset del framework se detectará automáticamente como **Next.js**.
5. Haz clic en **Deploy**. Cada nuevo commit en `main` desplegará automáticamente.

---

## 📝 Actualización de Contenidos

Para modificar cualquier información, edita directamente [`src/data/content.ts`](src/data/content.ts):

- **Enlaces de contacto**: sustituye los placeholders `[URL_LINKEDIN]` y `[URL_CV]`.
- **Certificación**: actualiza el placeholder `[URL_VERIFICACIÓN_CERTIFICADO]`.
- **Proyecto Fisiomed**: cuando la web pública esté disponible, reemplaza `[URL_PÚBLICA_FISIOMED]` por la URL real y cambia `isPlaceholder: false`.
- **Chips de habilidades**: cuando dispongas de los datos verificados de Frontend, Backend, Full Stack o IA, rellena los arrays vacíos marcados con `// TODO`.

---

## 📄 Licencia

Este proyecto se distribuye bajo la licencia **MIT**. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

Desarrollado con dedicación técnica para **Oussama Zazou**.
