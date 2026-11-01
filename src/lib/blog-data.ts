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
    title: "The Architecture of Permanence: Engineering Distributed Systems for the Next Decade",
    folio: "FOLIO NO. 01 • THE COVER ESSAY",
    excerpt:
      "In an era of disposable frameworks and ephemeral microservices, how do we engineer architectures that endure? A deep monograph into deterministic state machines, fault boundaries, and zero-compromise resilience.",
    category: "Software",
    tags: ["Distributed Systems", "Architecture", "High Availability", "Event-Driven"],
    difficulty: "Staff+",
    author: {
      name: "Julian Vance",
      role: "Principal Systems Architect",
      avatar: "/assets/brand/logo-icon.png",
      bio: "Leading distributed systems research and core cloud engineering at Quantimite.",
      twitter: "https://twitter.com/quantimite",
      linkedin: "https://linkedin.com/company/quantimite",
    },
    publishedAt: "Nov 01, 2026",
    publishedDateISO: "2026-11-01",
    readTime: "12 min read",
    featured: true,
    coverGradient: "from-purple-900/60 via-slate-900 to-black",
    coverImage: "/assets/images/insights/hero-monolith.jpg",
    audioDuration: "16 min audio",
    featured: true,
    coverGradient: "from-purple-900/60 via-slate-900 to-black",
    coverImage: "/assets/images/insights/hero-monolith.jpg",
    figureCaption:
      "FIG. 01 — Optical refraction through precision titanium and borosilicate prism on limestone slab. Photography by Quantimite Art Direction Studio.",
    editorNote:
      "Selected as Lead Monograph for Volume 04. Includes architectural blueprints, formal verification patterns, and latency degradation profiles under partition.",
    seo: {
      metaTitle: "The Architecture of Permanence | Quantimite Insights",
      metaDescription:
        "Designing deterministic, fault-tolerant distributed systems built to endure the next decade of computational scale.",
      keywords: ["Distributed Systems", "Software Architecture", "High Availability", "Systems Engineering"],
    },
    content: `
## The Fallacy of Disposable Code

Over the past decade, our industry succumbed to a dangerous seduction: the premise that software architecture is transient, that microservices can simply be rewritten every eighteen months, and that rapid technical debt accumulation is merely the price of velocity.

At Quantimite, our client engagements have repeatedly proven the opposite. Software that powers mission-critical logistics, high-throughput financial clearance, and deep operational intelligence cannot be treated as ephemeral scaffolding. When an enterprise system scales from 10,000 transactions per second to half a million, architectural flaws do not degrade gracefully—they fracture catastrophically.

> "A system that cannot be reasoned about under complete network partition is not a distributed system; it is merely an accident waiting for latency."

### The Three Pillars of Architectural Permanence

To build platforms capable of operating reliably across a ten-year horizon, our engineering teams adhere to three foundational axioms:

1. **Deterministic State Invariants:** Every transaction must yield verifiable, reproducible states regardless of retry count or delivery order. Idempotency is not an afterthought; it is baked into the storage primitives.
2. **Strict Physical Fault Boundaries:** Services must fail in isolation without cascading brownouts. Circuit breakers and bulkhead isolators are wired directly to backpressure telemetry.
3. **Mechanical Sympathy with Underlying Compute:** Abstracting the hardware layer is valuable, but ignorance of kernel I/O, cache line alignment, and memory bus saturations leads to compounding latency tails.

### Mathematical Determinism in Event Logs

Consider the traditional relational transaction versus append-only immutable event streams. When state mutations are stored as discrete, replayable events, system recovery ceases to be a heuristic prayer:

\`\`\`typescript
interface StateTransition<TState, TEvent> {
  readonly sequence: bigint;
  readonly timestamp: number;
  readonly payload: TEvent;
  apply(current: TState): TState;
}

export class DeterministicLedger<TState> {
  private state: TState;
  private sequence: bigint = 0n;

  constructor(initial: TState) {
    this.state = initial;
  }

  public commit(event: StateTransition<TState, any>): TState {
    if (event.sequence !== this.sequence + 1n) {
      throw new SequenceAnomalyException(this.sequence, event.sequence);
    }
    this.state = Object.freeze(event.apply(this.state));
    this.sequence++;
    return this.state;
  }
}
\`\`\`

By enforcing immutability and continuous causal verification, systems designed under this paradigm withstand unforeseen network topologies and prolonged outages with verifiable consistency.
    `,
  },
  {
    slug: "analog-intuition-neural-cores",
    title: "Analog Intuition, Autonomous Cores: Bridging Symbolic Reasoning with Neural Architectures",
    folio: "FOLIO NO. 02 • COMPUTATIONAL CRAFT",
    excerpt:
      "Why the next paradigm of enterprise intelligence mirrors tactile analog synthesis more than brute-force parametric scaling. Exploring neuro-symbolic execution and localized reasoning.",
    category: "Software",
    tags: ["Artificial Intelligence", "Neural Runtimes", "Symbolic Logic", "LLM Systems"],
    difficulty: "Advanced",
    author: {
      name: "Dr. Elena Vance",
      role: "Director of Computational Intelligence",
      avatar: "/assets/brand/logo-icon.png",
      bio: "Researching hybrid neuro-symbolic reasoning and low-latency inference pipelines.",
      twitter: "https://twitter.com/quantimite",
    },
    publishedAt: "Oct 28, 2026",
    publishedDateISO: "2026-10-28",
    readTime: "9 min read",
    coverGradient: "from-violet-950 via-slate-900 to-black",
    coverImage: "/assets/images/insights/tactile-crystal.jpg",
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
        "Bridging symbolic reasoning with neural architectures to build reliable, auditable enterprise AI pipelines.",
      keywords: ["Artificial Intelligence", "Neuro-symbolic AI", "LLM Engineering", "Systems Design"],
    },
    content: `
## Beyond the Stochastic Mirage

The modern AI boom has delivered unprecedented fluency. Large language models can synthesize prose, draft boilerplates, and generate plausible arguments in milliseconds. Yet in high-stakes domain applications—algorithmic trading, medical telemetry, precision logistics—probabilistic hallucinations remain an unacceptable liability.

The answer is neither larger weights nor blind parameter expansion. The breakthrough lies in **neuro-symbolic duality**: wedding the intuitive pattern recognition of neural transformers with the uncompromising formal correctness of deterministic logic engines.

### Reintroducing Physical Metaphors

Analog audio synthesizers do not generate sound through discrete tables; they continuously shape voltage across physical components. In much the same way, the next generation of enterprise AI pipelines treats neural models not as final answer engines, but as intuitive harmonic modulators that feed formal verification matrices.

When an AI agent proposes a multi-step financial transaction or code refactoring, a deterministic AST validator immediately asserts structural invariants before any side-effect can execute.
    `,
  },
  {
    slug: "tactile-interfaces-frictionless-world",
    title: "Tactile Interfaces in a Frictionless World: The Ergonomics of Modern Spatial & Liquid UI",
    folio: "FOLIO NO. 03 • PRODUCT CRAFT",
    excerpt:
      "As digital interfaces become completely ambient, physical affordances, kinetic damping, and tangible weight have never been more vital. How physical materiality shapes digital ergonomics.",
    category: "Design",
    tags: ["Design Systems", "Liquid UI", "Spatial Computing", "Interaction Craft"],
    difficulty: "Foundational",
    author: {
      name: "Cheshani Dananjana",
      role: "Head of Product Experience",
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
    coverGradient: "from-indigo-950 via-slate-900 to-black",
    coverImage: "/assets/images/insights/spatial-materials.jpg",
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
        "The art and physics of digital craftsmanship: applying real-world materiality, mass, and damping to interactive software.",
      keywords: ["Product Design", "Design Systems", "Micro-interactions", "Tactile UI"],
    },
    content: `
## The Hunger for Weight

For twenty years, digital design steadily stripped away texture. We traded skeuomorphic leather and bevels for pristine flat rectangles, and then flat rectangles for translucent glass cards. In doing so, we gained clarity, but we surrendered something fundamental: **kinetic resistance**.

When human hands interact with physical tools—a Leica rangefinder focus ring, a heavy brass volume dial, an architect's drafting compass—the resistance of the material provides real-time subconscious calibration. Digital interfaces that lack spring physics, inertial mass, and spatial friction leave users feeling detached and fatigued.

### The Physics of Digital Weight

In our liquid interface systems, every button, drawer, and draggable viewport possesses simulated mass ($m$), spring stiffness ($k$), and damping ratio ($\zeta$):

\`\`\`css
/* Spring simulation curves derived from physical harmonic oscillators */
--spring-snappy: cubic-bezier(0.175, 0.885, 0.32, 1.275);
--spring-damped: cubic-bezier(0.16, 1, 0.3, 1);
--surface-tactile-shadow: 
  0 1px 2px rgba(42, 19, 64, 0.04),
  0 4px 12px rgba(42, 19, 64, 0.08),
  inset 0 1px 0 rgba(255, 255, 255, 0.6);
\`\`\`

When a user triggers an action, the feedback is neither abrupt nor floaty; it responds with the authoritative dampening of milled aluminum.
    `,
  },
  {
    slug: "zero-downtime-migration-field-report",
    title: "Zero-Downtime Migration of 100 Million Records: An Architectural Field Post-Mortem",
    folio: "FOLIO NO. 04 • INFRASTRUCTURE DISPATCH",
    excerpt:
      "A transparent breakdown of how our team executed a high-concurrency database transition without dropping a single active websocket session or losing a byte of customer transaction data.",
    category: "Software",
    tags: ["Database", "Event Streaming", "Post-Mortem", "Zero Downtime"],
    difficulty: "Staff+",
    author: {
      name: "Kavindu Perera",
      role: "Staff Infrastructure Engineer",
      avatar: "/assets/brand/logo-icon.png",
      bio: "Architecting high-throughput data pipelines and mission-critical cloud infrastructure.",
    },
    publishedAt: "Oct 19, 2026",
    publishedDateISO: "2026-10-19",
    readTime: "11 min read",
    coverGradient: "from-zinc-900 via-neutral-900 to-black",
    coverImage: "/assets/images/insights/system-monolith.jpg",
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
        "How Quantimite orchestrated an zero-downtime database overhaul across 100M active records with real-time replication.",
      keywords: ["Database Migration", "Kafka", "Zero Downtime", "Systems Architecture"],
    },
    content: `
## The Crucible: Migrating Live Engines

At 02:00 UTC on a Tuesday, our infrastructure team commenced the final phase of a complete relational schema overhaul across 100 million active entity records. The system supported over 40,000 continuous concurrent WebSocket streams servicing financial institutions.

Traditional maintenance windows—shutting down the portal for four hours with a static maintenance page—were contractually out of the question.

### The Strategy: Change Data Capture (CDC) & Dual-Write Fencing

We deployed a four-stage pipeline:
1. **Shadow Dual-Writing:** New mutations written synchronously to primary, asynchronously mirrored to the new target engine.
2. **Backfill Snapshot Replay:** Bulk streaming historical chunks while reconciliation workers tagged watermarked offsets.
3. **Continuous Diff Verification:** Dynamic hash comparison identifying drift rates down to 0.0001%.
4. **Instantaneous DNS Cutover:** Re-pointing internal gateways within 3ms with zero dropped TCP sockets.
    `,
  },
  {
    slug: "capital-efficient-modern-stack",
    title: "The Capital-Efficient Modern Tech Stack: Building $10M ARR Engines with Lean Engineering",
    folio: "FOLIO NO. 05 • VENTURE VELOCITY",
    excerpt:
      "How world-class software teams eliminate bloat, double ship velocity, and build resilient, revenue-generating software foundations with small, lethal engineering squads.",
    category: "Startup Tips",
    tags: ["Startup Strategy", "Lean Engineering", "Capital Efficiency", "SaaS Scale"],
    difficulty: "Advanced",
    author: {
      name: "Marcus Thorne",
      role: "Partner & Growth Strategist",
      avatar: "/assets/brand/logo-icon.png",
      bio: "Advising high-growth tech companies on sustainable scaling and engineering efficiency.",
    },
    publishedAt: "Oct 14, 2026",
    publishedDateISO: "2026-10-14",
    readTime: "7 min read",
    coverGradient: "from-amber-950/60 via-slate-900 to-black",
    coverImage: "/assets/images/insights/velocity-chronometer.jpg",
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
        "Building scalable, high-leverage software architectures without bloated headcount or cloud invoice spiral.",
      keywords: ["Startup Tips", "Tech Stack Selection", "Engineering Velocity", "SaaS Architecture"],
    },
    content: `
## The Myth of the Fifty-Person Engineering Floor

The venture capital era of 2020–2022 normalized bloated headcount as a vanity metric. Startups with $2M in annual revenue routinely hired sixty engineers, instituted five layers of management, and wondered why shipping a login button required three quarters.

The most lethal tech businesses of the modern era operate on the exact inverse principle: **hyper-leverage**. A team of six world-class engineers equipped with Next.js, TypeScript, PostgreSQL, and modern serverless primitives regularly outships companies ten times their size.

### The Lean Architectural Checklist

- **One Language Across the Stack:** TypeScript end-to-end eliminates context switching and duplicate validation schemas.
- **Boring Databases, Brilliant Queries:** PostgreSQL with pgvector handles relational data, JSON documents, and vector embeddings in a single audited cluster.
- **Serverless Edge Routing:** Offload caching, image optimization, and static distribution to edge networks, keeping core servers pristine.
    `,
  },
];

export function getAllPosts(): BlogPost[] {
  return BLOG_POSTS;
}

export function getFeaturedPost(): BlogPost | null {
  const featured = BLOG_POSTS.find((p) => p.featured);
  return featured || (BLOG_POSTS.length > 0 ? BLOG_POSTS[0] : null);
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
