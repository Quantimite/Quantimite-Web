import { ProjectCaseStudy, ProjectCategory } from "@/types/portfolio";

export const PORTFOLIO_PROJECTS: ProjectCaseStudy[] = [
  {
    slug: "apexflow-distributed-cloud",
    title: "ApexFlow Cloud Infrastructure Suite",
    tagline: "Ultra low-latency orchestration for global Kubernetes workloads and edge routing.",
    category: "Web",
    client: "ApexFlow Systems Inc.",
    concept: "Enterprise Global Cloud Management Console",
    year: "2025",
    duration: "6 Months",
    featured: true,
    coverImage: "/assets/blog/software-architecture.jpg",
    heroVideo: "/assets/videos/services-hero.mp4",
    overview:
      "ApexFlow needed an ultra-responsive web platform capable of monitoring over 40,000 distributed Kubernetes pods simultaneously with zero-latency telemetry stream visualisations.",
    challenge: {
      summary:
        "The legacy dashboard suffered from catastrophic memory leaks, rendering stalls during high-traffic failover events, and lacked real-time edge telemetry synchronization.",
      points: [
        "Rendering over 100,000 WebSocket events/second locked the browser main thread.",
        "Disconnected multi-region telemetry caused critical 90-second incident detection delays.",
        "Non-standardized styling led to inconsistent operator incident triage workflows.",
      ],
    },
    solution: {
      summary:
        "We engineered a custom WebAssembly ingestion pipeline paired with Next.js App Router and virtualized canvas charts, reducing CPU overhead by 82%.",
      points: [
        "Implemented WebAssembly-based telemetry stream decoder to run packet decompression off-thread.",
        "Crafted a low-latency WebGL canvas rendering engine for 60fps real-time topological graphs.",
        "Built resilient SSE and WebSocket fallbacks with automated backpressure handling.",
      ],
      architectureHighlights: [
        "Zero-copy ArrayBuffer decoding in dedicated Web Workers",
        "Edge-cached global state with sub-15ms worldwide routing",
        "Strict WCAG 2.1 AAA high-contrast terminal mode",
      ],
    },
    techUsed: [
      { name: "Next.js 15", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "WebAssembly", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "Go / gRPC", category: "Backend" },
      { name: "PostgreSQL", category: "Backend" },
      { name: "Redis Streams", category: "Backend" },
      { name: "Kubernetes & ArgoCD", category: "Cloud & DevOps" },
      { name: "AWS Edge Locations", category: "Cloud & DevOps" },
    ],
    results: {
      summary:
        "ApexFlow reduced enterprise MTTR (Mean Time to Resolution) by 64% and supported 4x the user concurrency with zero UI degradation.",
      metrics: [
        { label: "P99 UI Latency", value: "<18ms", change: "-82%" },
        { label: "Active Concurrency", value: "120k", change: "+310%" },
        { label: "Incident Resolution", value: "3.2m", change: "-64%" },
        { label: "Cost Savings", value: "$420k/yr", change: "Annualized" },
      ],
      testimonial: {
        quote:
          "Quantimite engineered an interface that handles extreme telemetry volumes with balletic fluidity. It completely changed how our SRE team monitors global operations.",
        author: "Devon Miller",
        role: "VP of Infrastructure",
        company: "ApexFlow Systems",
      },
    },
    gallery: [
      {
        url: "/assets/blog/software-architecture.jpg",
        title: "Topological Cluster Visualizer",
        caption: "High-density WebGL cluster map showing instantaneous failover telemetry.",
      },
      {
        url: "/assets/images/insights/hero-monolith.jpg",
        title: "Telemetry Stream Dashboard",
        caption: "Dark-mode optimized operator interface featuring sub-millisecond graph updates.",
      },
      {
        url: "/assets/images/insights/system-monolith.jpg",
        title: "Incident Mitigation Control Room",
        caption: "Automated remediation playbook panel with real-time audit logs.",
      },
    ],
    liveDemoUrl: "https://quantimite.com/demo/apexflow",
    githubUrl: "https://github.com/quantimite/apexflow-wasm-stream",
  },
  {
    slug: "novapay-quantum-fintech",
    title: "NovaPay Mobile Banking & Quantum Security",
    tagline: "Next-generation biometric mobile banking app with post-quantum encrypted transactions.",
    category: "Mobile",
    client: "Nova Financial Corp",
    concept: "Cross-Platform Mobile Neo-Banking Application",
    year: "2025",
    duration: "8 Months",
    featured: true,
    coverImage: "/assets/blog/startup-velocity.jpg",
    overview:
      "NovaPay needed a fluid, consumer-first mobile banking application capable of instant cross-border settlement, biometric KYC, and quantum-resistant cryptographic key generation.",
    challenge: {
      summary:
        "Existing mobile fintech apps felt sluggish, experienced frequent authentication drop-offs during identity verification, and faced compliance roadblocks in multi-region deployments.",
      points: [
        "Biometric verification drop-off rate was hovering above 28% on Android devices.",
        "Cold boot launch time averaged 4.6 seconds, failing top-tier consumer expectations.",
        "Stringent ISO 27001 and PCI-DSS compliance mandated cryptographic hardware security modules.",
      ],
    },
    solution: {
      summary:
        "We built a native-feel mobile architecture with offline-first state synchronization, instant sub-second facial recognition verification, and custom micro-animations.",
      points: [
        "Implemented reactive local SQLite caching with background optimistic reconciliations.",
        "Optimized native biometric authentication bridging with 99.4% first-time success rate.",
        "Created an intuitive zero-friction gesture navigation system with haptic feedback.",
      ],
      architectureHighlights: [
        "End-to-end zero-knowledge proof payload encryption",
        "Sub-800ms cold boot via aggressive bundle tree-shaking",
        "Dynamic theme engine adapting to battery saver and ambient light conditions",
      ],
    },
    techUsed: [
      { name: "React Native", category: "Frontend" },
      { name: "TypeScript", category: "Frontend" },
      { name: "Reanimated 3", category: "Frontend" },
      { name: "Node.js Microservices", category: "Backend" },
      { name: "Rust Cryptographic Core", category: "Backend" },
      { name: "HashiCorp Vault", category: "Cloud & DevOps" },
      { name: "Figma Design System", category: "Design" },
    ],
    results: {
      summary:
        "NovaPay scaled to 1.8 million active cardholders within 90 days of release, earning an App Store rating of 4.9/5.",
      metrics: [
        { label: "App Store Rating", value: "4.9 / 5", change: "24k reviews" },
        { label: "Cold Boot Time", value: "0.78s", change: "-83%" },
        { label: "KYC Onboarding", value: "98.2%", change: "+34%" },
        { label: "Monthly Volume", value: "$180M", change: "Transacted" },
      ],
      testimonial: {
        quote:
          "The tactile smoothness of NovaPay is unmatched. Quantimite delivered an app that feels like magic in users' hands while locking down enterprise security.",
        author: "Camila Reyes",
        role: "Chief Product Officer",
        company: "Nova Financial",
      },
    },
    gallery: [
      {
        url: "/assets/blog/startup-velocity.jpg",
        title: "Biometric Cardholder Screen",
        caption: "Intuitive account balance card with dynamic spatial card tilting.",
      },
      {
        url: "/assets/images/insights/tactile-crystal.jpg",
        title: "Quantum Transaction Vault",
        caption: "Zero-knowledge authentication and instant cross-border routing interface.",
      },
      {
        url: "/assets/brand/mascot-code.png",
        title: "Interactive Transfer Experience",
        caption: "Delightful micro-interactions reinforcing verified transaction success.",
      },
    ],
    liveDemoUrl: "https://quantimite.com/demo/novapay",
    githubUrl: "https://github.com/quantimite/novapay-crypto-mobile",
  },
  {
    slug: "aegiscore-observability-saas",
    title: "AegisCore Intelligent Observability SaaS",
    tagline: "Multi-tenant anomaly detection platform analyzing billions of daily server events.",
    category: "SaaS",
    client: "AegisCore Technologies",
    concept: "Enterprise Cloud Security & Observability SaaS",
    year: "2024",
    duration: "7 Months",
    featured: true,
    coverImage: "/assets/images/insights/velocity-chronometer.jpg",
    overview:
      "AegisCore serves Fortune 500 cybersecurity teams with automated heuristic threat modeling, log anomaly correlation, and multi-cloud billing optimization.",
    challenge: {
      summary:
        "The client was processing over 5 terabytes of unstructured server logs per hour, but clients were overwhelmed by noisy alert fatigue and opaque billing tiers.",
      points: [
        "Security analysts received over 1,400 false-positive alerts daily, leading to alert burnout.",
        "Complex pricing structures resulted in unexpected cloud egress bills and user churn.",
        "Multi-tenant isolation required strict cryptographic data boundary verification.",
      ],
    },
    solution: {
      summary:
        "Engineered an automated neural clustering pipeline that compresses alerts into prioritized incident graphs, wrapped in a frictionless B2B SaaS dashboard.",
      points: [
        "Implemented real-time Bayesian outlier detection reducing false alerts by 88%.",
        "Built transparent live usage metering and automated team seat provisioning.",
        "Delivered interactive timeline replays allowing security teams to scrub through incidents.",
      ],
      architectureHighlights: [
        "ClickHouse columnar database for sub-100ms analytics over 50B rows",
        "Tenant-level encryption keys managed via KMS",
        "Granular RBAC with SAML 2.0 and Okta SCIM integration",
      ],
    },
    techUsed: [
      { name: "Next.js", category: "Frontend" },
      { name: "Tailwind CSS", category: "Frontend" },
      { name: "ClickHouse", category: "Backend" },
      { name: "Apache Kafka", category: "Backend" },
      { name: "Python / PyTorch", category: "AI / Data" },
      { name: "Terraform", category: "Cloud & DevOps" },
      { name: "Stripe Billing API", category: "Backend" },
    ],
    results: {
      summary:
        "AegisCore grew from $800k to $4.2M ARR in 12 months, earning praise for its noise-free threat detection engine.",
      metrics: [
        { label: "Annual Run Rate", value: "$4.2M", change: "+425%" },
        { label: "False Alerts", value: "-88%", change: "Noise Reduction" },
        { label: "Log Query Speed", value: "84ms", change: "Over 50B Logs" },
        { label: "Customer Retention", value: "98.4%", change: "Net Retention 138%" },
      ],
      testimonial: {
        quote:
          "Quantimite turned a convoluted data firehose into an elegant SaaS product that our enterprise customers genuinely enjoy using every single day.",
        author: "Julian Thorne",
        role: "Co-Founder & CEO",
        company: "AegisCore",
      },
    },
    gallery: [
      {
        url: "/assets/images/insights/velocity-chronometer.jpg",
        title: "Anomaly Incident Radar",
        caption: "Hierarchical graph clustering correlated network threats in real time.",
      },
      {
        url: "/assets/images/insights/spatial-materials.jpg",
        title: "Multi-Cloud Cost Telemetry",
        caption: "Granular cost attribution broken down by microservice and cluster.",
      },
      {
        url: "/assets/blog/software-architecture.jpg",
        title: "Time-Scrubbing Incident Replay",
        caption: "Interactive video-like playback of DNS exfiltration events.",
      },
    ],
    liveDemoUrl: "https://quantimite.com/demo/aegiscore",
    githubUrl: "https://github.com/quantimite/aegiscore-heuristics",
  },
  {
    slug: "aether-spatial-design-system",
    title: "Aether Spatial Design System & UI Kit",
    tagline: "Comprehensive multi-brand design system with accessible components and fluid motion tokens.",
    category: "Design",
    client: "Aether Labs",
    concept: "Cross-Platform Enterprise Design System & Guidelines",
    year: "2025",
    duration: "4 Months",
    featured: false,
    coverImage: "/assets/blog/design-craft.jpg",
    overview:
      "Aether Labs needed a unified design language to align 14 distinct internal product teams, harmonizing typography, accessibility, dark/light contrast, and motion curves.",
    challenge: {
      summary:
        "Disparate product teams were duplicating effort, introducing visual regressions, and failing basic WCAG accessibility audits across global properties.",
      points: [
        "Inconsistent button hierarchies and color values spanned 30+ repositories.",
        "Zero tokenized motion resulted in jarring transition states between desktop and mobile.",
        "Accessibility compliance was failing 18 critical screen-reader criteria.",
      ],
    },
    solution: {
      summary:
        "Designed a token-first design system with over 200 accessible React components, automated Figma-to-code sync, and mathematically derived harmonic spatial scales.",
      points: [
        "Formulated modular design tokens for color, spacing, typography, and elevation.",
        "Created an interactive live documentation portal with copy-paste code snippets.",
        "Engineered physics-based fluid spring animations for hover and modal states.",
      ],
      architectureHighlights: [
        "Style Dictionary automation translating Figma variables to CSS variables and TS tokens",
        "Automated visual regression testing via Playwright in GitHub Actions",
        "100% WCAG 2.1 AAA contrast and keyboard focus adherence",
      ],
    },
    techUsed: [
      { name: "Figma & FigJam", category: "Design" },
      { name: "React 19", category: "Frontend" },
      { name: "Tailwind CSS v4", category: "Frontend" },
      { name: "Radix Primitives", category: "Frontend" },
      { name: "Storybook 8", category: "Frontend" },
      { name: "Framer Motion", category: "Frontend" },
    ],
    results: {
      summary:
        "Reduced engineering UI implementation time by 52% and brought organization-wide accessibility compliance to 100%.",
      metrics: [
        { label: "Frontend Velocity", value: "+52%", change: "Time to Ship" },
        { label: "WCAG Compliance", value: "100%", change: "AAA Standard" },
        { label: "Components Created", value: "220+", change: "Zero Regressions" },
        { label: "Adoption Rate", value: "14 / 14", change: "Product Teams" },
      ],
      testimonial: {
        quote:
          "Aether is the most cohesive, beautifully documented design system our engineering teams have ever touched. It paid for itself in less than two quarters.",
        author: "Sarah Lindqvist",
        role: "Head of Design",
        company: "Aether Labs",
      },
    },
    gallery: [
      {
        url: "/assets/blog/design-craft.jpg",
        title: "Harmonic Color System",
        caption: "Mathematically calibrated chromatic scales for dark and light surfaces.",
      },
      {
        url: "/assets/images/insights/tactile-crystal.jpg",
        title: "Micro-Interaction Geometry",
        caption: "Spring-loaded motion curves that feel physically tangible to users.",
      },
      {
        url: "/assets/brand/mascot.png",
        title: "Design System Guidelines",
        caption: "Interactive developer documentation with live interactive props.",
      },
    ],
    liveDemoUrl: "https://quantimite.com/demo/aether-design",
    githubUrl: "https://github.com/quantimite/aether-design-system",
  },
  {
    slug: "hypermetric-neural-growth-engine",
    title: "HyperMetric Omnichannel Attribution Engine",
    tagline: "AI-driven marketing analytics platform decoding user purchase journeys across touchpoints.",
    category: "Marketing",
    client: "HyperMetric Global Media",
    concept: "Predictive Marketing Analytics & Attribution Engine",
    year: "2024",
    duration: "5 Months",
    featured: false,
    coverImage: "/assets/blog/technical-growth.jpg",
    overview:
      "HyperMetric provides DTC brands and venture-backed retailers with privacy-compliant multi-touch attribution, ROAS forecasting, and automated ad-spend optimization.",
    challenge: {
      summary:
        "With Apple iOS 14.5 ATT and third-party cookie deprecation, advertisers lost clear visibility into which marketing channels were truly driving incremental revenue.",
      points: [
        "Last-click attribution misled marketing teams to cut high-performing top-of-funnel campaigns.",
        "Data fragmentation across TikTok, Meta, Google, and Amazon created blind spots.",
        "Manual reporting took marketing analysts over 15 hours each week.",
      ],
    },
    solution: {
      summary:
        "Engineered a Markov-chain and Shapley-value neural attribution engine that models true channel lift with first-party server-side tracking.",
      points: [
        "Implemented first-party edge tracking server bypassing browser ad-blockers securely.",
        "Built predictive LTV (Lifetime Value) models forecasting 90-day retention on day 3.",
        "Automated continuous Google and Meta campaign budget reallocations via Webhooks.",
      ],
      architectureHighlights: [
        "Server-side Conversions API (CAPI) for Meta, TikTok, and Google Ads",
        "Deterministic probabilistic hybrid identity graph",
        "Automated Slack alert triggers for anomalous ad fatigue",
      ],
    },
    techUsed: [
      { name: "Next.js", category: "Frontend" },
      { name: "DuckDB & Parquet", category: "AI / Data" },
      { name: "Python / scikit-learn", category: "AI / Data" },
      { name: "Cloudflare Workers", category: "Cloud & DevOps" },
      { name: "BigQuery", category: "Backend" },
      { name: "Tailwind CSS", category: "Frontend" },
    ],
    results: {
      summary:
        "Clients achieved an average 38% increase in blended ROAS while reducing wasted ad spend by $1.8M aggregate in year one.",
      metrics: [
        { label: "Blended ROAS Lift", value: "+38%", change: "Within 45 Days" },
        { label: "Wasted Spend Saved", value: "$1.8M", change: "Aggregated" },
        { label: "Reporting Speed", value: "Realtime", change: "From 15 hrs/wk" },
        { label: "Conversion Lift", value: "+26%", change: "Measured Incrementality" },
      ],
      testimonial: {
        quote:
          "HyperMetric gave us back the clarity we lost when cookies died. Quantimite delivered an attribution system that outsmarts the competition's tools.",
        author: "Marcus Sterling",
        role: "Chief Growth Officer",
        company: "Direct Brand Holdings",
      },
    },
    gallery: [
      {
        url: "/assets/blog/technical-growth.jpg",
        title: "Cross-Channel Attribution Funnel",
        caption: "Shapley value distribution revealing hidden incremental drivers.",
      },
      {
        url: "/assets/images/insights/velocity-chronometer.jpg",
        title: "Predictive LTV Cohort Matrix",
        caption: "Early customer value prediction curves powered by neural regressions.",
      },
      {
        url: "/assets/images/insights/hero-monolith.jpg",
        title: "Automated Budget Optimizer",
        caption: "Dynamic allocation sliders with live expected ROI simulations.",
      },
    ],
    liveDemoUrl: "https://quantimite.com/demo/hypermetric",
    githubUrl: "https://github.com/quantimite/hypermetric-attribution",
  },
  {
    slug: "synthetix-realtime-collaboration",
    title: "Synthetix Realtime Infinite Canvas",
    tagline: "Collaborative whiteboard and architectural modeling tool powered by WebRTC and CRDTs.",
    category: "Web",
    client: "Synthetix Software",
    concept: "High-Performance Vector Collaborative Canvas",
    year: "2025",
    duration: "6 Months",
    featured: false,
    coverImage: "/assets/images/insights/system-monolith.jpg",
    overview:
      "Synthetix is an infinite-canvas architectural planning tool enabling thousands of distributed hardware and software engineers to collaborate in real-time.",
    challenge: {
      summary:
        "Building a smooth infinite canvas with zoom levels from 1% to 6400% with concurrent multi-user editing without merge conflicts or jitter.",
      points: [
        "Traditional DOM node trees bottlenecked when rendering more than 10,000 vector shapes.",
        "Peer-to-peer latency over long geographic distances caused desynchronization.",
        "Complex undo/redo histories frequently corrupted documents during network drops.",
      ],
    },
    solution: {
      summary:
        "Implemented a Yjs Conflict-Free Replicated Data Type (CRDT) engine rendered via WebGL shaders, keeping memory usage flat even with 50,000 shapes.",
      points: [
        "Built WebGL vector tessellator running at constant 120 FPS.",
        "Deployed low-latency WebSocket signaling mesh with peer-to-peer WebRTC data channels.",
        "Implemented presence cursor smoothing with polynomial cubic splines.",
      ],
      architectureHighlights: [
        "Yjs CRDT synchronization with binary state vector encoding",
        "B-Tree spatial indexing for instantaneous frustum culling",
        "Full offline persistence with automatic mesh sync on reconnection",
      ],
    },
    techUsed: [
      { name: "React 19", category: "Frontend" },
      { name: "WebGL / Three.js", category: "Frontend" },
      { name: "Yjs (CRDTs)", category: "Frontend" },
      { name: "WebRTC", category: "Frontend" },
      { name: "Rust / Axum", category: "Backend" },
      { name: "Redis", category: "Backend" },
    ],
    results: {
      summary:
        "Maintained rock-solid 120 FPS canvas interactions with 200 concurrent editors per canvas, processing over 10M vector changes daily.",
      metrics: [
        { label: "Canvas Frame Rate", value: "120 FPS", change: "Constant" },
        { label: "Concurrent Editors", value: "200+", change: "Per Canvas" },
        { label: "Sync Latency", value: "<25ms", change: "Global Average" },
        { label: "Conflict Rate", value: "0.00%", change: "Mathematical Guarantees" },
      ],
      testimonial: {
        quote:
          "Quantimite pulled off an engineering feat that our in-house team struggled with for a year. The responsiveness of the canvas is staggering.",
        author: "Arjun Patel",
        role: "Chief Technology Officer",
        company: "Synthetix Labs",
      },
    },
    gallery: [
      {
        url: "/assets/images/insights/system-monolith.jpg",
        title: "Infinite Vector Canvas",
        caption: "Smooth hardware-accelerated rendering with thousands of simultaneous entities.",
      },
      {
        url: "/assets/images/insights/spatial-materials.jpg",
        title: "Multi-User Presence & Cursors",
        caption: "Silky smooth remote cursors and live collaborative drawing.",
      },
      {
        url: "/assets/blog/software-architecture.jpg",
        title: "CRDT State Inspector",
        caption: "Deep-level conflict resolution diagnostics and live history tree.",
      },
    ],
    liveDemoUrl: "https://quantimite.com/demo/synthetix",
    githubUrl: "https://github.com/quantimite/synthetix-crdt-canvas",
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
