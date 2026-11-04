import {
  Publication,
  RDPrototype,
  ResearcherSlot,
  ResearchFocusArea,
  ResearchTopic,
} from "@/types/research";

export const RESEARCH_TOPICS: ResearchTopic[] = [
  "AI in Business",
  "Cybersecurity",
  "Mobile and Web Technologies",
  "Marketing Analytics",
];

export const RESEARCH_FOCUS_AREAS: ResearchFocusArea[] = [
  {
    id: "ai-in-business",
    topic: "AI in Business",
    title: "Autonomous Agents & Enterprise Neural Architectures",
    tagline:
      "Bridging probabilistic language models with deterministic enterprise execution pipelines.",
    summary:
      "We investigate how autonomous LLM agents can be safely deployed inside complex enterprise workflows, prioritizing strict verification, verifiable audit trails, and sub-100ms inference economics.",
    keyPillars: [
      "Agentic State Machines & Deterministic Tool Orchestration",
      "Model Distillation & Edge Fine-Tuning for Private Enclaves",
      "Hallucination Mitigation via Formal Logic Provers",
      "Cost-optimized hybrid routing between SLMs and frontier models",
    ],
    metrics: [
      { label: "Target Precision", value: "99.8%" },
      { label: "Token Efficiency", value: "72% Lift" },
      { label: "Execution Sandbox", value: "Formal Gate" },
    ],
    iconName: "Cpu",
  },
  {
    id: "cybersecurity",
    topic: "Cybersecurity",
    title: "Zero-Trust & Post-Quantum Cryptographic Protocols",
    tagline:
      "Preparing modern digital systems for the impending post-quantum threat landscape.",
    summary:
      "Our security research laboratory explores post-quantum cryptographic primitives, zero-knowledge verification proofs for distributed edge networks, and automated runtime kernel vulnerability interception.",
    keyPillars: [
      "Lattice-based Post-Quantum Key Exchange Algorithms",
      "eBPF-driven Runtime Kernel Threat Telemetry",
      "Zero-Knowledge (ZK) Proof Verification for Identity Vaults",
      "Automated Binary Decompilation & Static Taint Analysis",
    ],
    metrics: [
      { label: "Handshake Target", value: "<1.2ms" },
      { label: "Security Level", value: "NIST L5" },
      { label: "Interception", value: "eBPF Core" },
    ],
    iconName: "ShieldCheck",
  },
  {
    id: "mobile-web",
    topic: "Mobile and Web Technologies",
    title: "Liquid Interfaces & High-Throughput Edge Runtimes",
    tagline:
      "Pushing the technical boundary of client-side execution, WebAssembly, and 120 FPS interfaces.",
    summary:
      "We explore the frontier of modern distributed browser runtimes, headless WebAssembly compilation, decentralized state synchronization (CRDTs), and physics-driven spatial UI interaction.",
    keyPillars: [
      "WebAssembly (WASM) Parallel Micro-Kernels",
      "Conflict-Free Replicated Data Types (CRDTs) for Edge State",
      "Sub-millisecond Fluid Spring Physics for Dynamic Interfaces",
      "Adaptive Streaming & Offline-First Local-First Architectures",
    ],
    metrics: [
      { label: "Frame Pacing", value: "120 FPS" },
      { label: "Compute Speedup", value: "8.4x" },
      { label: "Network State", value: "CRDT Sync" },
    ],
    iconName: "Globe",
  },
  {
    id: "marketing-analytics",
    topic: "Marketing Analytics",
    title: "Privacy-Preserving Causal Inference & Synthetic Cohorts",
    tagline:
      "Attribution and customer trajectory forecasting in an era of zero third-party tracking.",
    summary:
      "We conduct research into differential privacy, Markovian multi-touch attribution, and synthetic cohort generation to enable hyper-accurate marketing lift measurement without invasive tracking.",
    keyPillars: [
      "Shapley-Value Causal Lift Attribution Engines",
      "Differentially Private Aggregated Ad Measurement",
      "Generative Synthetic Customer Cohort Modeling",
      "Real-Time Churn Forecasting using Recurrent Survival Models",
    ],
    metrics: [
      { label: "Attribution Lift", value: "96.4%" },
      { label: "Privacy Boundary", value: "ε ≤ 0.5" },
      { label: "Data Model", value: "Markovian" },
    ],
    iconName: "BarChart3",
  },
];

export const PUBLICATIONS: Publication[] = [
  {
    slug: "deterministic-orchestration-enterprise-agents",
    title:
      "Deterministic Orchestration of Autonomous LLM Agents in Mission-Critical Systems",
    summary:
      "A technical paper detailing finite state machines and formal verification gates to prevent nondeterministic failure modes in multi-agent autonomous enterprise deployments.",
    abstract:
      "Large language model (LLM) agents possess remarkable heuristic problem-solving capabilities, but their inherent stochasticity introduces severe risks in enterprise environments requiring deterministic reliability. This paper introduces the Quantimite Verifiable Agent Pipeline (QVAP), a hybrid paradigm coupling probabilistic generative reasoning with deterministic directed acyclic graph (DAG) execution gates.",
    topic: "AI in Business",
    year: 2026,
    date: "January 2026",
    readTime: "18 min read",
    doi: "10.48550/arXiv.2601.09412",
    tags: ["LLM Agents", "Formal Verification", "System Architecture", "Safety"],
    authors: [
      {
        name: "[ Lead AI Author - Reserved ]",
        role: "Principal AI Scientist",
        affiliation: "Quantimite Research Labs",
      },
    ],
    pdfUrl: "/assets/videos/portfolio-hero.webm",
    fileSize: "2.4 MB",
    isGated: true,
    citationBibtex: `@article{quantimite2026agents,
  title={Deterministic Orchestration of Autonomous LLM Agents in Mission-Critical Systems},
  author={Quantimite Research Labs},
  year={2026}
}`,
  },
  {
    slug: "post-quantum-lattice-handshakes-edge-networks",
    title:
      "Lattice-Based Post-Quantum Handshakes for High-Throughput Edge Nodes",
    summary:
      "Benchmarking ML-KEM and stateless hash-based signatures across resource-constrained ARM and WASM edge runtimes under heavy concurrent traffic.",
    abstract:
      "With the impending standardization of post-quantum cryptography (PQC) by NIST, enterprise edge architectures must transition from classical RSA toward lattice-based key encapsulation mechanisms. This paper presents an empirical analysis of ML-KEM (Kyber) compiled to WebAssembly.",
    topic: "Cybersecurity",
    year: 2025,
    date: "November 2025",
    readTime: "24 min read",
    doi: "10.48550/arXiv.2511.08201",
    tags: ["Post-Quantum", "Cryptography", "WebAssembly", "Edge Security"],
    authors: [
      {
        name: "[ Security Fellow - Reserved ]",
        role: "Security Architect",
        affiliation: "Quantimite Labs",
      },
    ],
    pdfUrl: "/assets/videos/portfolio-hero.webm",
    fileSize: "3.1 MB",
    isGated: true,
  },
  {
    slug: "crdt-vector-tessellation-web-runtimes",
    title:
      "Sub-Millisecond Vector Tessellation and Conflict-Free Synchronization in Modern Browsers",
    summary:
      "Engineering a unified mathematical model combining Yjs state vectors with GPU shader tessellation for zero-latency collaborative canvas environments.",
    abstract:
      "Real-time collaborative applications struggle to balance complex document conflict resolution with 120Hz interface rendering. In this work, we propose a bifurcated memory architecture separating algebraic CRDT state machines from a virtualized WebGL rendering tree.",
    topic: "Mobile and Web Technologies",
    year: 2025,
    date: "August 2025",
    readTime: "15 min read",
    doi: "10.48550/arXiv.2508.04118",
    tags: ["WebAssembly", "WebGL", "CRDTs", "Computer Graphics"],
    authors: [
      {
        name: "[ Systems Engineer - Reserved ]",
        role: "Systems Lead",
        affiliation: "Quantimite Labs",
      },
    ],
    pdfUrl: "/assets/videos/portfolio-hero.webm",
    fileSize: "1.9 MB",
    isGated: false,
  },
  {
    slug: "differential-privacy-attribution-markov-chains",
    title:
      "Privacy-Preserving Multi-Touch Attribution Using Continuous-Time Markov Jump Processes",
    summary:
      "A mathematical framework for calculating multi-touch marketing attribution under epsilon-differential privacy constraints without individual persistent IDs.",
    abstract:
      "The degradation of cross-site cookies has rendered heuristic attribution invalid. We demonstrate that customer touchpoints can be modeled as continuous-time Markov jump processes over aggregated cohort probability vectors.",
    topic: "Marketing Analytics",
    year: 2024,
    date: "October 2024",
    readTime: "21 min read",
    doi: "10.48550/arXiv.2410.01945",
    tags: ["Differential Privacy", "Attribution", "Markov Chains", "Statistics"],
    authors: [
      {
        name: "[ Quantitative Fellow - Reserved ]",
        role: "Quantitative Analyst",
        affiliation: "Quantimite Labs",
      },
    ],
    pdfUrl: "/assets/videos/portfolio-hero.webm",
    fileSize: "2.8 MB",
    isGated: true,
  },
];

export const RD_PROTOTYPES: RDPrototype[] = [
  {
    id: "quant-llm-kernel",
    title: "Quant-LLM-Kernel",
    status: "Production Ready",
    tagline: "High-performance C++ & Rust engine for deterministic agent validation.",
    description:
      "A modular runtime kernel that intercepts LLM agent tool calls, validates JSON schemas against formal mathematical constraints, and provides rollback recovery.",
    topic: "AI in Business",
    githubUrl: "https://github.com/quantimite",
    liveDemoUrl: "https://quantimite.com/contact",
    stars: "1.4k",
    techStack: ["Rust", "C++20", "WebAssembly"],
    keyFeatures: [
      "Sub-millisecond schema constraint verification",
      "Memory-safe deterministic sandbox execution",
      "Zero-overhead transaction log replay",
    ],
  },
  {
    id: "cipherguard-wasm",
    title: "CipherGuard-WASM",
    status: "Active Alpha",
    tagline: "Post-quantum lattice cryptographic primitives for edge WebAssembly.",
    description:
      "An open-source cryptographic library implementing NIST ML-KEM-768 and ML-DSA algorithms compiled directly to WebAssembly with SIMD acceleration.",
    topic: "Cybersecurity",
    githubUrl: "https://github.com/quantimite",
    liveDemoUrl: "https://quantimite.com/contact",
    stars: "920",
    techStack: ["Rust", "WASM", "NIST ML-KEM"],
    keyFeatures: [
      "Zero dependencies beyond standard WASM runtime",
      "SIMD vectorization for 4x faster handshakes",
      "Audited side-channel resistance against cache-timing attacks",
    ],
  },
  {
    id: "edgepulse-telemetry",
    title: "EdgePulse-Telemetry",
    status: "Beta Testing",
    tagline: "Sub-millisecond distributed stream aggregator for edge workers.",
    description:
      "High-throughput edge observability agent capable of ingesting 250,000 events per second per worker node with sub-5MB memory footprint.",
    topic: "Mobile and Web Technologies",
    githubUrl: "https://github.com/quantimite",
    liveDemoUrl: "https://quantimite.com/contact",
    stars: "2.1k",
    techStack: ["Go", "eBPF", "Protobuf"],
    keyFeatures: [
      "Native eBPF socket monitoring without kernel recompilation",
      "Adaptive zstandard chunk compression",
      "Direct integration with Prometheus and OpenTelemetry",
    ],
  },
];

// RESERVED SLOTS & BLANK SPACES FOR RESEARCHERS & CONTRIBUTORS (Ready to be populated later!)
export const RESEARCHER_SLOTS: ResearcherSlot[] = [
  {
    id: "slot-01-lead-ai",
    role: "Lead AI Research Scientist",
    domain: "Autonomous Agents & Verification",
    status: "Recruiting / Open",
    department: "Quantimite Applied Intelligence Lab",
    description:
      "Reserved space for Lead AI Scientist. This role will spearhead agentic state machines, LLM evaluation pipelines, and fine-tuned edge models.",
    expectedQualifications: [
      "Ph.D. in Computer Science or Machine Learning",
      "Track record at NeurIPS, ICML, or ICLR",
      "Expertise in Rust / C++ model compilation",
    ],
    isPlaceholder: true,
  },
  {
    id: "slot-02-security-fellow",
    role: "Principal Cryptography Fellow",
    domain: "Post-Quantum Cryptography & Zero-Knowledge",
    status: "Nomination Pending",
    department: "Quantimite Security Institute",
    description:
      "Reserved space for Cryptographic Architect. Directing research into NIST lattice standards, eBPF security telemetry, and verifiable enclaves.",
    expectedQualifications: [
      "Deep experience with post-quantum key encapsulation",
      "Linux kernel eBPF driver development",
      "Audited cryptographic library releases",
    ],
    isPlaceholder: true,
  },
  {
    id: "slot-03-systems-architect",
    role: "Distributed Systems Lead",
    domain: "WebAssembly Runtimes & CRDTs",
    status: "Reserved Fellow Slot",
    department: "Quantimite Systems Architecture Lab",
    description:
      "Reserved space for Distributed Systems Lead. Leading our investigations into browser-based memory virtualization and 120 FPS edge graphics.",
    expectedQualifications: [
      "CRDT state synchronization experience",
      "WebAssembly SIMD & WebGL shaders",
      "High-concurrency Rust/Go distributed backends",
    ],
    isPlaceholder: true,
  },
  {
    id: "slot-04-quant-analyst",
    role: "Senior Quantitative Fellow",
    domain: "Privacy-Preserving Causal Attribution",
    status: "Recruiting / Open",
    department: "Quantimite Quantitative Sciences Lab",
    description:
      "Reserved space for Quantitative Research Fellow. Investigating continuous-time Markov chains, differential privacy bounds, and synthetic consumer cohorts.",
    expectedQualifications: [
      "Advanced degree in Statistics or Operations Research",
      "Expertise in differential privacy frameworks",
      "GPU-accelerated Monte Carlo simulations",
    ],
    isPlaceholder: true,
  },
];

export function getAllPublications(): Publication[] {
  return PUBLICATIONS;
}

export function getPublicationBySlug(slug: string): Publication | undefined {
  return PUBLICATIONS.find((p) => p.slug === slug);
}

export function getAllPrototypes(): RDPrototype[] {
  return RD_PROTOTYPES;
}

export function getAllResearcherSlots(): ResearcherSlot[] {
  return RESEARCHER_SLOTS;
}

export function getAllFocusAreas(): ResearchFocusArea[] {
  return RESEARCH_FOCUS_AREAS;
}
