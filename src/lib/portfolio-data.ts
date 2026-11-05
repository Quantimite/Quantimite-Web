import { ProjectCaseStudy, ProjectCategory } from "@/types/portfolio";

export const PORTFOLIO_PROJECTS: ProjectCaseStudy[] = [
  {
    slug: "project-slot-01-web",
    title: "[ Project Slot #01: Web Architecture ]",
    tagline: "Reserved for upcoming full-stack web application deployment. Case study publishing soon.",
    category: "Web",
    client: "Confidential Partner",
    concept: "Full-Stack Web System",
    year: "2026",
    duration: "Coming Soon",
    featured: true,
    isPlaceholder: true,
    overview: "This project slot is reserved for an upcoming production deliverable currently undergoing client review.",
    challenge: {
      summary: "Case study documentation and technical architecture diagrams are currently being prepared.",
      points: [
        "System requirements and performance benchmarks in validation.",
        "Architecture metrics will be showcased upon public release.",
      ],
    },
    solution: {
      summary: "Engineered with modern cloud principles and high-throughput reliability.",
      points: [
        "Component architecture designed for extreme concurrency.",
        "End-to-end automated testing and zero-downtime deployment pipelines.",
      ],
    },
    techUsed: [
      { name: "Next.js", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Cloudflare", category: "Cloud & DevOps" },
    ],
    results: {
      summary: "Performance benchmarks and business ROI metrics will be revealed upon client sign-off.",
      metrics: [
        { label: "Target Availability", value: "99.99%", change: "SLA" },
        { label: "P99 Response", value: "<25ms", change: "Target" },
      ],
    },
    gallery: [],
  },
  {
    slug: "project-slot-02-mobile",
    title: "[ Project Slot #02: Mobile Application ]",
    tagline: "Reserved for native iOS & Android mobile ecosystem. Case study under confidentiality embargo.",
    category: "Mobile",
    client: "Confidential Partner",
    concept: "Cross-Platform Mobile App",
    year: "2026",
    duration: "Coming Soon",
    featured: true,
    isPlaceholder: true,
    overview: "Mobile client application delivering fluid haptics and offline-first state synchronization.",
    challenge: {
      summary: "Under NDA. Metrics and app store release data will be published upon launch.",
      points: [
        "Biometric verification integration and low-latency API handshakes.",
        "Sub-second cold boot and fluid 120Hz gesture physics.",
      ],
    },
    solution: {
      summary: "Cross-platform mobile architecture with native bridge optimizations.",
      points: [
        "Declarative state orchestration and reactive offline caching.",
        "WCAG compliant design system and accessible typography tokens.",
      ],
    },
    techUsed: [
      { name: "React Native", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "Native APIs", category: "Backend" },
    ],
    results: {
      summary: "Full deployment statistics will be updated here shortly.",
      metrics: [
        { label: "Target App Rating", value: "4.9+", change: "Goal" },
        { label: "Cold Boot", value: "<1.0s", change: "Benchmark" },
      ],
    },
    gallery: [],
  },
  {
    slug: "project-slot-03-saas",
    title: "[ Project Slot #03: Enterprise SaaS ]",
    tagline: "Reserved for multi-tenant B2B cloud SaaS platform. Architecture walkthrough coming soon.",
    category: "SaaS",
    client: "Enterprise Partner",
    concept: "Multi-Tenant SaaS Solution",
    year: "2026",
    duration: "Coming Soon",
    featured: true,
    isPlaceholder: true,
    overview: "Scalable B2B SaaS architecture supporting automated team provisioning and granular telemetry.",
    challenge: {
      summary: "Preparing technical whitepaper and case study teardown.",
      points: [
        "Multi-tenant database schema isolation with automated backups.",
        "High-volume event ingestion and live analytics streaming.",
      ],
    },
    solution: {
      summary: "Microservice cluster coupled with serverless edge functions.",
      points: [
        "Modern RBAC security model with SAML/SSO integration.",
        "Subscription lifecycle management with Stripe Billing.",
      ],
    },
    techUsed: [
      { name: "Next.js", category: "Frontend" },
      { name: "PostgreSQL", category: "Backend" },
      { name: "Docker & K8s", category: "Cloud & DevOps" },
    ],
    results: {
      summary: "Production telemetry and enterprise cost-reduction metrics will be published soon.",
      metrics: [
        { label: "Tenant Isolation", value: "100%", change: "Strict" },
        { label: "Query Speed", value: "<50ms", change: "Average" },
      ],
    },
    gallery: [],
  },
  {
    slug: "project-slot-04-design",
    title: "[ Project Slot #04: Design System ]",
    tagline: "Reserved for enterprise design system, component tokens, and fluid interactive guidelines.",
    category: "Design",
    client: "Design Lab Client",
    concept: "Harmonic Design Language",
    year: "2026",
    duration: "Coming Soon",
    featured: false,
    isPlaceholder: true,
    overview: "Comprehensive design system featuring 150+ accessible primitives and mathematical motion tokens.",
    challenge: {
      summary: "Harmonizing fragmented brand touchpoints and unifying multiple digital product teams.",
      points: [
        "Eliminating UI regressions across web and mobile surfaces.",
        "Automating token sync between Figma variables and CSS tokens.",
      ],
    },
    solution: {
      summary: "Tokenized design architecture with live Storybook documentation.",
      points: [
        "Spring-loaded interaction physics with Framer Motion.",
        "100% WCAG AAA contrast ratio compliance.",
      ],
    },
    techUsed: [
      { name: "Figma", category: "Design" },
      { name: "Storybook", category: "Frontend" },
      { name: "Design Tokens", category: "Design" },
    ],
    results: {
      summary: "Component adoption figures and developer velocity metrics to be shared soon.",
      metrics: [
        { label: "Components", value: "150+", change: "Planned" },
        { label: "Accessibility", value: "AAA", change: "Standard" },
      ],
    },
    gallery: [],
  },
  {
    slug: "project-slot-05-marketing",
    title: "[ Project Slot #05: Growth & Attribution ]",
    tagline: "Reserved for automated marketing analytics and algorithmic user conversion pipeline.",
    category: "Marketing",
    client: "Growth Partner",
    concept: "Conversion Funnel Engine",
    year: "2026",
    duration: "Coming Soon",
    featured: false,
    isPlaceholder: true,
    overview: "Algorithmic growth stack integrating server-side Conversions API, multi-touch attribution, and SEO.",
    challenge: {
      summary: "Transitioning tracking frameworks into first-party privacy-compliant environments.",
      points: [
        "Unifying fragmented user analytics across multi-channel campaigns.",
        "Mitigating signal loss from third-party cookie deprecation.",
      ],
    },
    solution: {
      summary: "Edge tracking pipeline routing conversions with cryptographic validation.",
      points: [
        "Server-side webhook triggers into Google and Meta APIs.",
        "Real-time customer lifetime value prediction dashboards.",
      ],
    },
    techUsed: [
      { name: "Analytics", category: "AI / Data" },
      { name: "Edge Workers", category: "Cloud & DevOps" },
      { name: "SEO Pipeline", category: "Frontend" },
    ],
    results: {
      summary: "Incrementality test findings and ROAS improvements will be showcased upon publication.",
      metrics: [
        { label: "Target ROAS Lift", value: "+30%", change: "Goal" },
        { label: "Signal Reliability", value: "99.9%", change: "Server-side" },
      ],
    },
    gallery: [],
  },
  {
    slug: "project-slot-06-web",
    title: "[ Project Slot #06: Next-Gen Web ]",
    tagline: "Reserved for high-performance interactive 3D web experience. Development in progress.",
    category: "Web",
    client: "Digital Innovation Partner",
    concept: "WebGL Interactive Canvas",
    year: "2026",
    duration: "In Development",
    featured: false,
    isPlaceholder: true,
    overview: "Immersive WebGL experience engineered with React Three Fiber, physics shaders, and smooth scroll.",
    challenge: {
      summary: "Delivering console-quality 60fps 3D graphics inside mobile and desktop web browsers.",
      points: [
        "Keeping asset bundles below 2MB with aggressive Draco mesh compression.",
        "Achieving consistent frame pacing on low-powered mobile devices.",
      ],
    },
    solution: {
      summary: "Procedural vertex shaders and virtualized scene graphs.",
      points: [
        "Hardware-accelerated rendering with fallbacks for legacy browsers.",
        "Fluid spring responsiveness with pointer interaction.",
      ],
    },
    techUsed: [
      { name: "Three.js", category: "Frontend" },
      { name: "R3F", category: "Frontend" },
      { name: "GLSL Shaders", category: "Frontend" },
    ],
    results: {
      summary: "Interactive showcase will be opened for live testing shortly.",
      metrics: [
        { label: "Frame Rate", value: "60 FPS", change: "Constant" },
        { label: "Bundle Size", value: "<1.8MB", change: "Optimized" },
      ],
    },
    gallery: [],
  },
];

export const PROJECT_CATEGORIES: (ProjectCategory | "All")[] = [
  "All",
  "Web",
  "Mobile",
  "SaaS",
  "Design",
  "Marketing",
];

export function getAllProjects(): ProjectCaseStudy[] {
  return PORTFOLIO_PROJECTS;
}

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return PORTFOLIO_PROJECTS.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): ProjectCaseStudy[] {
  return PORTFOLIO_PROJECTS.filter((p) => p.featured);
}

export function getRelatedProjects(currentSlug: string, count = 2): ProjectCaseStudy[] {
  return PORTFOLIO_PROJECTS.filter((p) => p.slug !== currentSlug).slice(0, count);
}
