import { BlogPost, BlogCategory } from "@/types/blog";

export const BLOG_CATEGORIES: BlogCategory[] = [
  "Software",
  "Design",
  "Marketing",
  "Startup Tips",
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "architecture-of-permanence",
    title: "The Architecture of Permanence: Designing Mission-Critical Software That Outlives Framework Churn",
    folio: "FOLIO NO. 01 • MONOLITHIC SYSTEMS",
    excerpt:
      "Modern development incentives obsess over velocity at the expense of structural durability. An exploration into zero-entropy software architectures, immutable interfaces, and deterministic reliability.",
    category: "Software",
    tags: ["Systems Architecture", "Resilience", "Zero-Entropy", "TypeScript", "Engineering Discipline"],
    difficulty: "Staff+",
    author: {
      name: "Prabath Rathnayake",
      role: "Principal Systems Architect",
      avatar: "/assets/brand/logo-icon.png",
      bio: "Focuses on deterministic computing, distributed consensus, and mission-critical system design at Quantimite.",
      linkedin: "https://linkedin.com/company/quantimite",
    },
    publishedAt: "Nov 01, 2026",
    publishedDateISO: "2026-11-01",
    readTime: "12 min read",
    audioDuration: "16 min audio",
    featured: true,
    coverGradient: "from-purple-900/60 via-slate-900 to-black",
    coverImage: "/assets/images/insights/hero-monolith.jpg",
    figureCaption:
      "FIG. 01 — Optical refraction through precision titanium and borosilicate prism on limestone slab. Photography by Quantimite Art Direction Studio.",
    editorNote:
      "This treatise lays out Quantimite's core architectural thesis on building software infrastructure engineered to endure 10+ year operational lifespans without architectural rot.",
    seo: {
      metaTitle: "The Architecture of Permanence | Quantimite Insights",
      metaDescription:
        "Designing mission-critical software that outlives framework churn. Deep dive into zero-entropy software architectures and deterministic durability.",
      keywords: ["Software Architecture", "Permanence", "Zero-Entropy", "Quantimite", "Mission Critical"],
    },
    content: `
## The Entropy of Transient Frameworks

Software engineering currently suffers from an acute condition: transient obsolescence. Teams rewrite production frontends every eighteen months and swap database ORMs with every hype cycle, celebrating transient speed while accruing devastating structural debt.

At Quantimite, our architectural thesis rejects this endless churning. When we build infrastructure for high-throughput enterprises, we demand an **operational half-life measured in decades**, not quarters.

\`\`\`typescript
// The Quantimite Invariant Contract Pattern
export interface CoreEntity<TState, TEvent> {
  readonly id: UUID;
  readonly schemaVersion: InvariantVersion;
  readonly createdAt: Timestamp;
  transition(event: TEvent): Result<CoreEntity<TState, TEvent>, DomainError>;
  serialize(): Readonly<Uint8Array>;
}
\`\`\`

### 1. Hexagonal Boundaries and Strict Decoupling

The quickest route to architectural decay is allowing transport layers, UI presentation libraries, and database drivers to bleed into business kernels. By enforcing strict ports-and-adapters architecture:

- **Core domain models** have zero third-party dependencies.
- **Side effects** are isolated to the system boundary using functional algebraic effects or typed monads.
- **Data schemas** are versioned and backwards-compatible with backward-forward protocol buffers or strict Zod schemas.

### 2. Determinism Over Cleverness

Clever code is an operational hazard. Deterministic systems exhibit identical behavior under identical inputs regardless of environment, network latency, or runtime thread scheduling.

> "A system that is merely fast today but impossible to reason about tomorrow is already deprecated."

By enforcing immutability and continuous formal verification, systems remain resilient against catastrophic regressions.
    `,
  },
  {
    slug: "analog-intuition-neural-cores",
    title: "Analog Intuition, Autonomous Cores: Bridging Symbolic Reasoning with Generative Models",
    folio: "FOLIO NO. 02 • APPLIED INTELLIGENCE",
    excerpt:
      "Generative LLMs are probabilistic, creative, and volatile. Real production infrastructure demands strict determinism. How we combine symbolic theorem provers with neural cores to create trustworthy AI systems.",
    category: "Software",
    tags: ["Machine Learning", "Symbolic AI", "Constraint Solvers", "Neural Architecture", "Safety"],
    difficulty: "Advanced",
    author: {
      name: "Dr. Kaelen Voss",
      role: "Lead AI Research Scientist",
      avatar: "/assets/brand/logo-icon.png",
      bio: "Investigating hybrid neuro-symbolic systems and verifiable agentic runtime loops.",
      linkedin: "https://linkedin.com/company/quantimite",
    },
    publishedAt: "Oct 28, 2026",
    publishedDateISO: "2026-10-28",
    readTime: "9 min read",
    audioDuration: "12 min audio",
    coverGradient: "from-violet-950 via-slate-900 to-black",
    coverImage: "/assets/images/insights/tactile-crystal.jpg",
    figureCaption:
      "FIG. 02 — High-vacuum triode valve and unrefined quartz on slate. Analog signal purity meets computational intelligence.",
    editorNote:
      "A technical investigation into deterministic constraint satisfaction solvers layered on top of transformer attention heads.",
    seo: {
      metaTitle: "Analog Intuition, Autonomous Cores | Quantimite Insights",
      metaDescription:
        "Bridging symbolic reasoning with generative neural models for provably correct enterprise autonomy.",
      keywords: ["Neuro-symbolic AI", "Machine Learning", "Deterministic AI", "Quantimite"],
    },
    content: `
## The Hallucination Liability in Mission-Critical Systems

When an AI agent proposes a multi-step financial transaction or code refactoring patch, a 98% accuracy rate is not a triumph—it is an unacceptable operational failure. In safety-critical contexts, probabilistic outputs must be bound by deterministic invariant guarantees.

### The Neuro-Symbolic Verification Loop

Instead of letting models act directly upon environments, Quantimite implements a dual-kernel runtime:

1. **The Neural Generator:** Evaluates context, forms semantic associations, and hypothesizes plans.
2. **The Symbolic Arbiter:** Formally verifies the plan against constraint matrices using SAT/SMT solvers before execution.

If any invariant is breached, the symbolic engine rejects the branch with a formal proof counterexample, allowing the neural model to replan with mathematical precision.
    `,
  },
  {
    slug: "tactile-interfaces-frictionless-world",
    title: "Tactile Interfaces in a Frictionless World: The Ergonomics of Modern Spatial & Liquid UI",
    folio: "FOLIO NO. 03 • PRODUCT CRAFT",
    excerpt:
      "As digital interfaces become completely ambient, physical affordances, kinetic damping, and tangible weight have never been more vital. How physical materiality shapes digital ergonomics.",
    category: "Design",
    tags: ["Spatial UI", "Tactile Ergonomics", "Sensory Design", "Micro-Interactions", "Liquid UI"],
    difficulty: "Foundational",
    author: {
      name: "Cheshani Dananjana",
      role: "Head of Product Experience & Art Direction",
      avatar: "/assets/brand/logo-icon.png",
      bio: "Crafting boundary-pushing sensory design systems and tactile interfaces at Quantimite.",
      linkedin: "https://linkedin.com/company/quantimite",
    },
    publishedAt: "Oct 24, 2026",
    publishedDateISO: "2026-10-24",
    readTime: "8 min read",
    audioDuration: "10 min audio",
    coverGradient: "from-indigo-950 via-slate-900 to-black",
    coverImage: "/assets/images/insights/spatial-materials.jpg",
    figureCaption:
      "FIG. 03 — Anodized aluminum rod, fluted reeded glass, and slip-cast ceramic sphere on white oak.",
    editorNote:
      "Featured in the International Product Architecture Review. Includes kinetic damping curves and spring velocity formulas.",
    seo: {
      metaTitle: "Tactile Interfaces in a Frictionless World | Quantimite Insights",
      metaDescription:
        "Why physical affordances, kinetic damping, and sensory weight are crucial for modern spatial and web experiences.",
      keywords: ["UI Design", "Haptics", "Spatial Computing", "Tactile Interfaces", "Design Systems"],
    },
    content: `
## The Seduction and Failure of Frictionless Design

For a decade, digital designers strove to eliminate all friction. Buttons became flat, borders dissolved, and surfaces turned into homogeneous panes of glowing glass. The consequence was disorienting: users lost touch with physical affordance and spatial orientation.

### Kinetic Weight and Inertial Damping

At Quantimite, we model interactions with realistic Newtonian physical laws:

- **Mass & Inertia:** Elements carry calculated simulated mass. Dragging an enterprise data table requires subtle initial force.
- **Surface Friction:** Different UI domains feel distinct through tailored spring tensions and damping ratios.
- **Acoustic & Haptic Echoes:** When a user triggers an action, the feedback is neither abrupt nor floaty; it responds with the authoritative dampening of milled aluminum.
    `,
  },
  {
    slug: "zero-downtime-migration-field-report",
    title: "Zero-Downtime Migration of 100 Million Records: An Architectural Field Post-Mortem",
    folio: "FOLIO NO. 04 • INFRASTRUCTURE DISPATCH",
    excerpt:
      "A transparent breakdown of how our team executed a high-concurrency database transition without dropping a single active websocket session or losing a byte of customer transaction data.",
    category: "Software",
    tags: ["Database Migration", "Postgres", "High Concurrency", "Distributed Systems", "Post-Mortem"],
    difficulty: "Staff+",
    author: {
      name: "Prabath Rathnayake",
      role: "Principal Systems Architect",
      avatar: "/assets/brand/logo-icon.png",
      bio: "Focuses on deterministic computing, distributed consensus, and mission-critical system design at Quantimite.",
      linkedin: "https://linkedin.com/company/quantimite",
    },
    publishedAt: "Oct 19, 2026",
    publishedDateISO: "2026-10-19",
    readTime: "11 min read",
    audioDuration: "15 min audio",
    coverGradient: "from-zinc-900 via-neutral-900 to-black",
    coverImage: "/assets/images/insights/system-monolith.jpg",
    figureCaption:
      "FIG. 04 — CNC-machined obsidian heat spreader and optical resin block in morning daylight.",
    editorNote:
      "Complete post-mortem including CDC pipeline diagrams, dual-write consistency verifiers, and recovery runbooks.",
    seo: {
      metaTitle: "Zero-Downtime Migration Field Post-Mortem | Quantimite Insights",
      metaDescription:
        "Technical breakdown of zero-downtime data migration under 45,000 req/sec live enterprise workload.",
      keywords: ["Database Migration", "PostgreSQL", "Zero Downtime", "High Concurrency"],
    },
    content: `
## Context & The Constraint Matrix

The challenge: migrate 100M+ financial transaction events from a legacy monolithic datastore to an event-sourced distributed schema under continuous live write throughput (45,000 queries per second peak). Maintenance windows were strictly prohibited by SLA agreements.

### Four-Phase Pipeline

We deployed a four-stage pipeline:

1. **Dual Write Proxy:** Intercepting write calls and dispatching asynchronously to both legacy and new shards via transactional outbox.
2. **Backfill with Change Data Capture (CDC):** Streaming historic rows alongside real-time Kafka logs.
3. **Reconciliation & Hash-Tree Verification:** Continuously calculating Merkle trees across partitions to catch any data drift.
4. **Zero-Flap Atomic Cutover:** Swapping DNS routing with instant rollback capabilities.
    `,
  },
  {
    slug: "capital-efficient-modern-stack",
    title: "The Capital-Efficient Modern Tech Stack: Building $10M ARR Engines with Lean Engineering",
    folio: "FOLIO NO. 05 • VENTURE VELOCITY",
    excerpt:
      "How world-class software teams eliminate bloat, double ship velocity, and build resilient, revenue-generating software foundations with small, lethal engineering squads.",
    category: "Startup Tips",
    tags: ["Lean Engineering", "Capital Efficiency", "Tech Stack", "Product Velocity", "Startups"],
    difficulty: "Foundational",
    author: {
      name: "Cheshani Dananjana",
      role: "Head of Product Experience & Art Direction",
      avatar: "/assets/brand/logo-icon.png",
      bio: "Crafting boundary-pushing sensory design systems and tactile interfaces at Quantimite.",
      linkedin: "https://linkedin.com/company/quantimite",
    },
    publishedAt: "Oct 14, 2026",
    publishedDateISO: "2026-10-14",
    readTime: "7 min read",
    audioDuration: "9 min audio",
    coverGradient: "from-amber-950/60 via-slate-900 to-black",
    coverImage: "/assets/images/insights/velocity-chronometer.jpg",
    figureCaption:
      "FIG. 05 — Precision split-second mechanical chronometer and brass drafting instruments.",
    editorNote:
      "The definitive manual for seed and Series A founders on lean technical stack selection and burn reduction.",
    seo: {
      metaTitle: "The Capital-Efficient Modern Tech Stack | Quantimite Insights",
      metaDescription:
        "Building resilient, revenue-generating software with small, high-velocity engineering squads.",
      keywords: ["Startup Tech Stack", "Capital Efficiency", "Lean Engineering", "SaaS Growth"],
    },
    content: `
## The High Cost of Over-Engineering

Many early-stage companies prematurely implement complex microservices, Kubernetes clusters, and bespoke distributed caching before validating product-market fit. This results in exorbitant cloud bills and crippled engineering velocity.

### The Lean Foundation Stack

A compact, highly capable stack:

- **Monolith First:** A modular TypeScript monolith provides sub-millisecond in-process communication and frictionless refactoring.
- **Managed Compute & Serverless Edge:** Offloading operational overhead to robust platforms.
- **Single Source of Truth:** Relational databases with typed schemas rather than fractured polyglot persistence.

A small team of disciplined engineers using this stack consistently out-ships organizations five times their size.
    `,
  },
];

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getFeaturedPost(): BlogPost | undefined {
  const featured = BLOG_POSTS.find((p) => p.featured);
  return featured || BLOG_POSTS[0];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(currentSlug: string, category: BlogCategory, limit = 3): BlogPost[] {
  return BLOG_POSTS
    .filter((p) => p.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === category && b.category !== category) return -1;
      if (b.category === category && a.category !== category) return 1;
      return 0;
    })
    .slice(0, limit);
}

export function getAllTags(): string[] {
  const tagsSet = new Set<string>();
  BLOG_POSTS.forEach((p) => p.tags.forEach((t) => tagsSet.add(t)));
  return Array.from(tagsSet);
}

export function getCategories(): string[] {
  const categories = new Set(BLOG_POSTS.map((p) => p.category));
  return Array.from(categories);
}

export function getPostsByCategory(category: string): BlogPost[] {
  if (category === "All") return BLOG_POSTS;
  return BLOG_POSTS.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}
