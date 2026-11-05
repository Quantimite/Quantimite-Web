import {
  JobPosting,
  ApplicationSubmission,
  JobAlertSubscriber,
  EmailTemplate,
  AuditLogEntry,
  ApplicationStatus,
} from "@/types/careers";

export const INITIAL_JOBS: JobPosting[] = [
  {
    id: "job-01",
    slug: "senior-fullstack-engineer",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote (Global / EMEA / APAC)",
    workMode: "Remote",
    salaryRange: "$95,000 – $135,000 USD",
    shortSummary:
      "Architect high-throughput web apps, type-safe Next.js platforms, and real-time distributed edge runtimes.",
    description: `
      <p>Quantimite is seeking a Senior Full-Stack Engineer to lead the architecture of client-facing platforms, enterprise micro-frontends, and mission-critical cloud pipelines. You will collaborate directly with our founding engineering pod, defining type-safe architectures that scale under heavy concurrency.</p>
    `,
    responsibilities: [
      "Architect and implement modern, highly accessible web applications using Next.js 15, React 19, TypeScript, and Tailwind CSS.",
      "Design resilient backend edge APIs, GraphQL/REST endpoints, and distributed microservices with PostgreSQL and Redis.",
      "Champion automated end-to-end testing, Playwright pipelines, and sub-100ms P99 latency guarantees.",
      "Mentor junior and mid-level engineers, conduct architectural design teardowns, and drive engineering excellence.",
    ],
    requirements: [
      "5+ years of production experience with TypeScript, React, and modern web architectures.",
      "Proven track record building and shipping high-traffic SaaS or consumer platforms with high concurrency.",
      "Deep understanding of state management, SSR/SSG caching strategies, and performance telemetry.",
      "Strong experience with relational databases (PostgreSQL), schema migrations, and indexing strategies.",
    ],
    niceToHave: [
      "Experience with WebAssembly (Wasm), Three.js / React Three Fiber, or Rust edge workers.",
      "Familiarity with Cloudflare Workers / AWS CDK and containerized deployment with Docker.",
      "Contributions to open-source software libraries or engineering publications.",
    ],
    benefits: [
      "100% remote flexibility with home office stipend ($1,500).",
      "Competitive equity options and performance bonuses.",
      "Unlimited paid time off (minimum 25 days recommended).",
      "Annual $2,000 learning, conference, and book budget.",
      "Top-tier MacBook Pro M4 Max / hardware setup of your choice.",
      "Comprehensive global healthcare coverage & wellness stipend.",
    ],
    hiringProcess: [
      { step: "01", title: "Application Review", description: "Our engineering leads review your background and code samples.", expectedTimeline: "24 – 48 Hours" },
      { step: "02", title: "Technical Screen", description: "45-minute discussion on architecture, real-world systems, and past technical challenges.", expectedTimeline: "3 – 4 Days" },
      { step: "03", title: "System Design & Pairing", description: "Collaborative 90-minute hands-on architecture session solving a realistic Quantimite engineering problem.", expectedTimeline: "5 – 7 Days" },
      { step: "04", title: "Founders & Culture Chat", description: "Informal conversation about values, growth ambitions, and expectations.", expectedTimeline: "2 Days" },
      { step: "05", title: "Offer Extended", description: "Written offer with transparent equity, compensation, and onboarding roadmap.", expectedTimeline: "24 Hours" },
    ],
    datePosted: "2026-03-01",
    validThrough: "2026-06-30",
    status: "Closed",
    featured: true,
    applicationCount: 14,
  },
  {
    id: "job-02",
    slug: "ai-distributed-systems-architect",
    title: "AI & Distributed Systems Architect",
    department: "Engineering",
    type: "Full-time",
    location: "Remote or Hybrid (Colombo / London)",
    workMode: "Hybrid",
    salaryRange: "$110,000 – $155,000 USD",
    shortSummary:
      "Scale our generative AI streaming backends, agentic orchestration layers, and low-latency vector databases.",
    description: `
      <p>As an AI & Distributed Systems Architect at Quantimite, you will spearhead our machine learning orchestration layers, real-time Gemini API integrations, retrieval-augmented generation pipelines, and high-throughput streaming inference engines.</p>
    `,
    responsibilities: [
      "Build high-speed inference proxies, streaming WebSockets, and asynchronous task runners for LLM agent workflows.",
      "Optimize vector search architectures (Qdrant, pgvector) for sub-20ms semantic retrieval over multi-gigabyte corpora.",
      "Ensure robust guardrails, token rate-limiting, and cost-efficient caching at the network boundary.",
      "Partner with product teams to translate state-of-the-art AI research into production-grade features.",
    ],
    requirements: [
      "Experience deploying LLMs, vector search, and agentic workflows in production environments.",
      "Deep expertise in Python, Go, or Rust coupled with TypeScript microservices.",
      "Strong background in distributed streaming systems (Kafka, RabbitMQ, or Redis Streams).",
      "Familiarity with LLM evaluation frameworks, prompt caching, and fine-tuning techniques.",
    ],
    niceToHave: [
      "Experience with multimodal audio/video streaming via WebRTC or Gemini Live API.",
      "Knowledge of post-quantum cryptography or sovereign edge AI deployments.",
    ],
    benefits: [
      "Flexible hybrid or remote schedule.",
      "Substantial compute budget for model experimentation and R&D.",
      "Comprehensive health & wellness coverage.",
      "International conference attendance sponsorship.",
    ],
    hiringProcess: [
      { step: "01", title: "Application Review", description: "Engineering review of past research, repos, or systems deployed.", expectedTimeline: "24 – 48 Hours" },
      { step: "02", title: "Deep Dive Architecture", description: "Discussing distributed throughput, latency bottlenecks, and AI reliability.", expectedTimeline: "3 Days" },
      { step: "03", title: "Pairing Session", description: "Hands-on streaming API or vector pipeline exercise.", expectedTimeline: "5 Days" },
      { step: "04", title: "Executive Chat & Offer", description: "Culture alignment and offer presentation.", expectedTimeline: "48 Hours" },
    ],
    datePosted: "2026-03-05",
    validThrough: "2026-07-15",
    status: "Closed",
    featured: true,
    applicationCount: 8,
  },
  {
    id: "job-03",
    slug: "staff-cloud-devops-architect",
    title: "Staff Cloud Infrastructure & DevOps Architect",
    department: "Cloud & DevOps",
    type: "Full-time",
    location: "Remote (Global)",
    workMode: "Remote",
    salaryRange: "$100,000 – $140,000 USD",
    shortSummary:
      "Design multi-cloud Kubernetes clusters, automated zero-downtime CI/CD pipelines, and sovereign security boundaries.",
    description: `
      <p>We are seeking a Staff Cloud Infrastructure Architect to own Quantimite's multi-region cloud topology. You will configure high-availability clusters, automated blue-green deployments, and cryptographic network boundaries for enterprise clients.</p>
    `,
    responsibilities: [
      "Maintain and automate infrastructure-as-code using Terraform, Pulumi, and AWS/GCP CDK.",
      "Build self-healing Kubernetes clusters, ingress controllers, and observability stacks (Prometheus, Grafana, OpenTelemetry).",
      "Implement SOC2 / ISO-27001 compliant zero-trust access controls, SAML/SSO pipelines, and secrets management.",
      "Lead incident response protocols and disaster recovery testing.",
    ],
    requirements: [
      "5+ years operating production Kubernetes and cloud networks at scale.",
      "Expert-level knowledge of Terraform, CI/CD automation (GitHub Actions), and Linux internals.",
      "Proven track record ensuring 99.99% uptime for high-traffic platforms.",
    ],
    niceToHave: [
      "Experience with Cloudflare Enterprise Edge Workers and zero-trust tunnels.",
      "Certifications: AWS Solutions Architect Professional or CKA (Certified Kubernetes Administrator).",
    ],
    benefits: [
      "Competitive base salary + equity grants.",
      "Generous hardware and home-office allowance.",
      "Flexible asynchronous working culture across time zones.",
    ],
    hiringProcess: [
      { step: "01", title: "Resume & Portfolio Review", description: "Review of IaC experience and architecture philosophy.", expectedTimeline: "24 Hours" },
      { step: "02", title: "Technical Conversation", description: "Cloud topology teardown and security philosophy.", expectedTimeline: "3 Days" },
      { step: "03", title: "Live Architecture Scenario", description: "Designing a fault-tolerant multi-region deployment.", expectedTimeline: "4 Days" },
      { step: "04", title: "Offer", description: "Direct offer and onboarding schedule.", expectedTimeline: "24 Hours" },
    ],
    datePosted: "2026-03-08",
    validThrough: "2026-06-15",
    status: "Closed",
    featured: false,
    applicationCount: 6,
  },
  {
    id: "job-04",
    slug: "lead-product-designer",
    title: "Lead Product Designer (Design Systems & WebGL)",
    department: "Design",
    type: "Full-time",
    location: "Hybrid (Colombo / Remote)",
    workMode: "Hybrid",
    salaryRange: "$80,000 – $115,000 USD",
    shortSummary:
      "Craft mathematical token languages, tactile 3D interactions, and world-class digital product experiences.",
    description: `
      <p>Quantimite is looking for a visionary Lead Product Designer who bridges the boundary between haute design, micro-interactions, and code. You will shape our flagship design systems and interactive 3D client interfaces.</p>
    `,
    responsibilities: [
      "Define and expand our mathematical token system, component primitives, and Figma-to-code synchronisation.",
      "Design cinematic micro-interactions, spring-based gesture physics, and fluid typography tokens.",
      "Conduct user research, design critique sessions, and collaborate seamlessly with senior engineers.",
      "Prototype interactive 3D concepts and spatial interfaces.",
    ],
    requirements: [
      "A stunning portfolio showcasing rigorous typography, layout systems, and tactile motion design.",
      "Deep expertise in Figma, design systems architecture, and WCAG AAA accessibility standards.",
      "Basic fluency with front-end code (CSS/Tailwind/HTML) to understand implementation constraints.",
    ],
    niceToHave: [
      "Familiarity with Spline, Blender, Three.js, or Framer Motion.",
      "Experience designing for developer tools or fintech platforms.",
    ],
    benefits: [
      "Top-tier hardware (Apple Studio Display + MacBook Pro M4).",
      "Annual design retreat and conference budget.",
      "Complete health insurance and wellness perks.",
    ],
    hiringProcess: [
      { step: "01", title: "Portfolio Walkthrough", description: "Deep-dive into 2 flagship case studies you engineered.", expectedTimeline: "48 Hours" },
      { step: "02", title: "Design Systems & Process", description: "Discussion with lead designers and engineers.", expectedTimeline: "4 Days" },
      { step: "03", title: "Founders Chat", description: "Product philosophy and future vision.", expectedTimeline: "3 Days" },
      { step: "04", title: "Offer", description: "Formal package and welcome.", expectedTimeline: "24 Hours" },
    ],
    datePosted: "2026-03-10",
    validThrough: "2026-07-01",
    status: "Closed",
    featured: true,
    applicationCount: 19,
  },
  {
    id: "job-05",
    slug: "technical-product-manager",
    title: "Technical Product Manager (B2B SaaS)",
    department: "Product",
    type: "Full-time",
    location: "Remote (Global)",
    workMode: "Remote",
    salaryRange: "$85,000 – $120,000 USD",
    shortSummary:
      "Drive roadmap execution, technical specifications, and client discovery for mission-critical digital products.",
    description: `
      <p>Join our product pod to guide multi-tenant SaaS features from discovery through deployment. You will translate complex client needs into actionable PRDs, user stories, and measurable performance telemetry.</p>
    `,
    responsibilities: [
      "Lead sprint planning, roadmap grooming, and backlog prioritization with engineering pods.",
      "Run customer discovery interviews, synthesise quantitative usage analytics, and prioritize high-ROI initiatives.",
      "Define acceptance criteria and collaborate with QA to ensure bug-free releases.",
    ],
    requirements: [
      "3+ years managing software products in an agile engineering environment.",
      "Ability to read and discuss technical architecture, API schemas, and database entity models.",
      "Exceptional written communication and documentation clarity.",
    ],
    niceToHave: [
      "Past software engineering or technical background.",
      "Experience with Linear, Notion, GitHub Projects, and PostHog/Mixpanel analytics.",
    ],
    benefits: [
      "100% remote flexibility and flexible hours.",
      "Comprehensive healthcare and wellness allowance.",
      "Equity ownership package.",
    ],
    hiringProcess: [
      { step: "01", title: "Resume Review", description: "Evaluating product track record and written samples.", expectedTimeline: "48 Hours" },
      { step: "02", title: "Product Sense Interview", description: "Discussing prioritization, metrics, and technical trade-offs.", expectedTimeline: "4 Days" },
      { step: "03", title: "Execution Case", description: "Walking through a real-world B2B feature rollout.", expectedTimeline: "5 Days" },
      { step: "04", title: "Offer", description: "Offer rollout and team onboarding.", expectedTimeline: "24 Hours" },
    ],
    datePosted: "2026-03-12",
    validThrough: "2026-06-20",
    status: "Closed",
    featured: false,
    applicationCount: 11,
  },
  {
    id: "job-06",
    slug: "digital-growth-attribution-specialist",
    title: "Digital Growth & Attribution Specialist",
    department: "Growth & Marketing",
    type: "Full-time",
    location: "Remote (Global)",
    workMode: "Remote",
    salaryRange: "$70,000 – $95,000 USD",
    shortSummary:
      "Scale algorithmic conversion funnels, privacy-first server-side attribution, and quantitative client acquisition.",
    description: `
      <p>Quantimite is looking for a technical growth marketer to optimize customer acquisition, build programmatic SEO pipelines, and orchestrate server-side Conversions API tracking for our clients and studio ventures.</p>
    `,
    responsibilities: [
      "Architect first-party tracking funnels complying with GDPR/CCPA and cookie deprecation.",
      "Run data-driven A/B experiments across landing pages, onboarding funnels, and email automation.",
      "Monitor ROAS, LTV/CAC ratios, and deliver transparent reporting dashboards.",
    ],
    requirements: [
      "Strong background in technical SEO, Google Tag Manager Server-side, and Meta Conversions API.",
      "Proficiency with SQL and data visualization tools.",
      "Proven track record scaling B2B or SaaS acquisition funnels.",
    ],
    niceToHave: [
      "Basic JavaScript/TypeScript scripting skills for edge marketing triggers.",
    ],
    benefits: [
      "Remote work culture and quarterly growth bonuses.",
      "Education budget and conference passes.",
    ],
    hiringProcess: [
      { step: "01", title: "Application Review", description: "Review of past campaign data and attribution frameworks.", expectedTimeline: "48 Hours" },
      { step: "02", title: "Growth Strategy Chat", description: "Experimentation framework and methodology discussion.", expectedTimeline: "3 Days" },
      { step: "03", title: "Offer Extended", description: "Prompt offer delivery.", expectedTimeline: "24 Hours" },
    ],
    datePosted: "2026-03-15",
    validThrough: "2026-07-30",
    status: "Closed",
    featured: false,
    applicationCount: 7,
  },
  {
    id: "job-07",
    slug: "software-engineering-intern-2026",
    title: "Software Engineering Intern (Summer/Autumn 2026)",
    department: "Engineering",
    type: "Internship",
    location: "Hybrid (Colombo / Remote)",
    workMode: "Hybrid",
    salaryRange: "$1,200 – $1,800 USD / month stipend",
    shortSummary:
      "3-6 month intensive engineering programme with 1:1 senior mentorship, shipping real production code.",
    description: `
      <p>Are you a passionate computer science student or recent graduate looking to work on production architectures? The Quantimite Internship Programme immerses you in real-world Next.js, TypeScript, cloud databases, and AI tooling alongside seasoned engineering mentors.</p>
    `,
    responsibilities: [
      "Pair with senior engineers on active client projects, writing clean, tested TypeScript code.",
      "Contribute to our internal component libraries, developer tooling, and automated testing suites.",
      "Participate in daily standups, code reviews, and architecture teardowns.",
      "Deliver a capstone project presented to the engineering leadership team.",
    ],
    requirements: [
      "Currently enrolled in or recently graduated from a Computer Science, Software Engineering, or related degree program.",
      "Solid foundations in data structures, algorithms, and web technologies (HTML, CSS, JavaScript/TypeScript).",
      "Hunger to learn, ask thoughtful questions, and receive constructive code review feedback.",
    ],
    niceToHave: [
      "Personal coding projects or open-source contributions on GitHub.",
      "Familiarity with React, Git, or relational databases.",
    ],
    benefits: [
      "Competitive monthly stipend.",
      "1:1 dedicated Senior Engineer mentor for the entire duration.",
      "Fast-track consideration for a full-time Associate Engineer role upon completion.",
      "High-spec MacBook setup provided.",
    ],
    hiringProcess: [
      { step: "01", title: "Application & Code Portfolio", description: "Review of your projects, GitHub repositories, and academic background.", expectedTimeline: "48 Hours" },
      { step: "02", title: "Foundational Coding Chat", description: "45-minute friendly discussion on coding concepts and your favorite projects.", expectedTimeline: "3 Days" },
      { step: "03", title: "Pair Programming Exercise", description: "Building a small interactive component together with your future mentor.", expectedTimeline: "4 Days" },
      { step: "04", title: "Offer", description: "Internship cohort confirmation.", expectedTimeline: "24 Hours" },
    ],
    datePosted: "2026-03-20",
    validThrough: "2026-05-31",
    status: "Closed",
    featured: true,
    isInternship: true,
    applicationCount: 31,
  },
];

export const INITIAL_APPLICATIONS: ApplicationSubmission[] = [
  {
    id: "QM-APP-91823",
    jobId: "job-01",
    jobSlug: "senior-fullstack-engineer",
    jobTitle: "Senior Full-Stack Engineer",
    fullName: "Kavindu Perera",
    email: "kavindu.p@example.com",
    phone: "+94 77 123 4567",
    currentLocation: "Colombo, Sri Lanka",
    linkedInUrl: "https://linkedin.com/in/kavindu-perera-demo",
    portfolioUrls: ["https://github.com/kavindu-demo", "https://kavindu.dev"],
    cvFile: {
      id: "file-01",
      name: "kavindu-perera-cv.pdf",
      originalName: "Kavindu_Perera_Resume_2026.pdf",
      size: 1420500,
      mimeType: "application/pdf",
      storagePath: "cvs/qm-app-91823/resume.pdf",
      downloadUrl: "#",
      uploadedAt: "2026-03-22T08:30:00Z",
      isScannedSafe: true,
    },
    coverLetterText:
      "I have spent the past 6 years building distributed React and TypeScript applications. I admire Quantimite's commitment to high-throughput systems and spatial design.",
    referralSource: "LinkedIn",
    expectedSalary: "$105,000 USD",
    noticePeriod: "1 Month",
    availabilityDate: "2026-05-01",
    status: "Interview",
    statusHistory: [
      { status: "New", changedBy: "System", timestamp: "2026-03-22T08:30:00Z", note: "Application submitted" },
      { status: "Reviewed", changedBy: "Lead Recruiter", timestamp: "2026-03-23T10:15:00Z", note: "Strong frontend + backend portfolio" },
      { status: "Interview", changedBy: "Head of Engineering", timestamp: "2026-03-25T14:00:00Z", note: "Scheduled system design technical round" },
    ],
    rating: 5,
    tags: ["Full-Stack", "High Concurrency", "TypeScript Specialist"],
    notes: [
      {
        id: "note-01",
        author: "Head of Engineering",
        content: "Very impressive GitHub repos with custom streaming WebSocket implementations. Recommended for fast-track interview.",
        createdAt: "2026-03-24T16:20:00Z",
      },
    ],
    consent: {
      privacyPolicyAgreed: true,
      policyVersion: "2026.1",
      timestamp: "2026-03-22T08:30:00Z",
      ipHash: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      talentPoolAgreed: true,
    },
    submittedAt: "2026-03-22T08:30:00Z",
  },
  {
    id: "QM-APP-83742",
    jobId: "job-04",
    jobSlug: "lead-product-designer",
    jobTitle: "Lead Product Designer (Design Systems & WebGL)",
    fullName: "Elena Rostova",
    email: "elena.design@example.com",
    phone: "+44 20 7946 0912",
    currentLocation: "London, UK",
    linkedInUrl: "https://linkedin.com/in/elena-rostova-design",
    portfolioUrls: ["https://elena-portfolio.design", "https://dribbble.com/elena-demo"],
    cvFile: {
      id: "file-02",
      name: "elena-rostova-cv.pdf",
      originalName: "Elena_Rostova_Design_Lead.pdf",
      size: 2840000,
      mimeType: "application/pdf",
      storagePath: "cvs/qm-app-83742/resume.pdf",
      downloadUrl: "#",
      uploadedAt: "2026-03-24T11:45:00Z",
      isScannedSafe: true,
    },
    coverLetterText:
      "Passionate about tokenised design systems that bridge the gap between Figma variables and production Tailwind CSS.",
    referralSource: "Twitter / X",
    expectedSalary: "$95,000 USD",
    noticePeriod: "2 Weeks",
    availabilityDate: "2026-04-15",
    status: "Reviewed",
    statusHistory: [
      { status: "New", changedBy: "System", timestamp: "2026-03-24T11:45:00Z", note: "Application submitted" },
      { status: "Reviewed", changedBy: "Design Partner", timestamp: "2026-03-26T09:00:00Z", note: "Portfolio has world-class interaction tokens" },
    ],
    rating: 4,
    tags: ["Design Systems", "Figma Expert", "Micro-Interactions"],
    notes: [
      {
        id: "note-02",
        author: "Design Partner",
        content: "Strong design systems portfolio with live Storybook examples. Ready for first round call.",
        createdAt: "2026-03-26T09:05:00Z",
      },
    ],
    consent: {
      privacyPolicyAgreed: true,
      policyVersion: "2026.1",
      timestamp: "2026-03-24T11:45:00Z",
      ipHash: "4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a",
      talentPoolAgreed: true,
    },
    submittedAt: "2026-03-24T11:45:00Z",
  },
  {
    id: "QM-APP-65201",
    jobId: "job-07",
    jobSlug: "software-engineering-intern-2026",
    jobTitle: "Software Engineering Intern (Summer/Autumn 2026)",
    fullName: "Dineth Mendis",
    email: "dineth.mendis@campus.edu",
    phone: "+94 71 987 6543",
    currentLocation: "Moratuwa, Sri Lanka",
    linkedInUrl: "https://linkedin.com/in/dineth-mendis",
    portfolioUrls: ["https://github.com/dineth-dev"],
    internshipDetails: {
      university: "University of Moratuwa",
      degree: "BSc (Hons) in Computer Science & Engineering",
      graduationYear: "2027",
    },
    cvFile: {
      id: "file-03",
      name: "dineth-mendis-cv.pdf",
      originalName: "Dineth_Mendis_CV.pdf",
      size: 890000,
      mimeType: "application/pdf",
      storagePath: "cvs/qm-app-65201/resume.pdf",
      downloadUrl: "#",
      uploadedAt: "2026-03-28T14:10:00Z",
      isScannedSafe: true,
    },
    coverLetterText:
      "I built a real-time collaborative code editor in Next.js and WebSockets. Eager to learn high-throughput cloud engineering at Quantimite.",
    referralSource: "University Career Fair",
    expectedSalary: "$1,500 USD / mo",
    noticePeriod: "Immediate",
    availabilityDate: "2026-06-01",
    status: "New",
    statusHistory: [
      { status: "New", changedBy: "System", timestamp: "2026-03-28T14:10:00Z", note: "Application submitted" },
    ],
    rating: 4,
    tags: ["Internship", "UoM Student", "Next.js"],
    notes: [],
    consent: {
      privacyPolicyAgreed: true,
      policyVersion: "2026.1",
      timestamp: "2026-03-28T14:10:00Z",
      ipHash: "ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d",
      talentPoolAgreed: true,
    },
    submittedAt: "2026-03-28T14:10:00Z",
  },
];

export const INITIAL_EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "tmpl-confirm",
    name: "Application Received Confirmation",
    subject: "We received your application for {{job_title}} | Quantimite",
    bodyHtml: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; color: #1B1030;">
        <h2 style="color: #A818F5;">Application Received</h2>
        <p>Hi {{full_name}},</p>
        <p>Thank you for applying to Quantimite for the <strong>{{job_title}}</strong> position.</p>
        <p>Your application reference ID is: <code style="background: #F6F4FF; padding: 4px 8px; border-radius: 4px; font-weight: bold;">{{reference_id}}</code>.</p>
        <p>Our team reviews every submission with care. You can expect to hear from our engineering leadership within <strong>24 to 48 hours</strong>.</p>
        <p>You can check your application stage at any time here: <a href="{{tracking_url}}" style="color: #2F8BFA;">Track Application</a>.</p>
        <hr style="border: 0; border-top: 1px solid #E6E8EC; margin: 24px 0;" />
        <p style="font-size: 12px; color: #5B6472;">Quantimite Technologies — We Engineer Your Next Move.</p>
      </div>
    `,
    bodyText: `Hi {{full_name}},\n\nThank you for applying to Quantimite for {{job_title}}.\n\nYour reference ID is: {{reference_id}}\n\nOur team will review your application within 24-48 hours.\nTrack status: {{tracking_url}}\n\nQuantimite Team`,
  },
  {
    id: "tmpl-interview",
    name: "Technical Interview Invitation",
    subject: "Interview Invitation: {{job_title}} | Quantimite",
    bodyHtml: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; color: #1B1030;">
        <h2 style="color: #A818F5;">Next Step: Technical Interview</h2>
        <p>Hi {{full_name}},</p>
        <p>We thoroughly enjoyed reviewing your application and projects for <strong>{{job_title}}</strong>. We would love to invite you to a 45-minute technical conversation.</p>
        <p>Please select a convenient time on our calendar: <a href="{{calendar_link}}" style="display: inline-block; background: #A818F5; color: white; padding: 10px 18px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 12px 0;">Schedule Your Interview</a></p>
        <p>Looking forward to speaking with you!</p>
        <p>Best regards,<br />The Quantimite Engineering Pod</p>
      </div>
    `,
    bodyText: `Hi {{full_name}},\n\nWe loved your profile for {{job_title}} and would like to invite you for an interview.\n\nSelect a time: {{calendar_link}}\n\nQuantimite Engineering Pod`,
    triggerStatus: "Interview",
  },
  {
    id: "tmpl-rejection",
    name: "Respectful Rejection with Feedback",
    subject: "Update on your application for {{job_title}} | Quantimite",
    bodyHtml: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; color: #1B1030;">
        <p>Hi {{full_name}},</p>
        <p>Thank you for taking the time to speak with us regarding the <strong>{{job_title}}</strong> position at Quantimite.</p>
        <p>While we were impressed with your background, we have chosen to move forward with another candidate whose current experience aligns slightly closer with the specific scope of this project.</p>
        <p>With your permission, we will keep your profile in our talent network for upcoming opportunities over the next 12 months.</p>
        <p>We wish you the very best in your search,<br />Quantimite People Team</p>
      </div>
    `,
    bodyText: `Hi {{full_name}},\n\nThank you for considering Quantimite for {{job_title}}. While impressed with your experience, we have chosen another candidate for this role. We would love to stay in touch for future opportunities.\n\nQuantimite People Team`,
    triggerStatus: "Rejected",
  },
  {
    id: "tmpl-offer",
    name: "Official Offer Letter",
    subject: "Offer of Employment: {{job_title}} | Quantimite",
    bodyHtml: `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; color: #1B1030;">
        <h2 style="color: #16A34A;">Welcome to Quantimite!</h2>
        <p>Dear {{full_name}},</p>
        <p>On behalf of the entire Quantimite leadership, we are thrilled to offer you the role of <strong>{{job_title}}</strong>.</p>
        <p>Please find your detailed offer terms and equity structure enclosed in the secure candidate portal.</p>
        <p>Welcome to the frontier of digital engineering!</p>
      </div>
    `,
    bodyText: `Dear {{full_name}},\n\nWe are thrilled to extend you an offer for {{job_title}} at Quantimite! Welcome to the team.\n\nQuantimite Leadership`,
    triggerStatus: "Hired",
  },
];

// In-Memory store singleton for runtime state
let jobsData = [...INITIAL_JOBS];
let applicationsData = [...INITIAL_APPLICATIONS];
let subscribersData: JobAlertSubscriber[] = [];
let auditLogs: AuditLogEntry[] = [
  {
    id: "log-01",
    actor: "System",
    action: "SEED_INITIALIZED",
    targetType: "job",
    targetId: "all",
    details: "Loaded initial jobs and sample applications",
    timestamp: "2026-03-01T00:00:00Z",
  },
];

export const CareersStore = {
  // Jobs
  getAllJobs: () => jobsData,
  getPublishedJobs: () => jobsData.filter((j) => j.status === "Published"),
  getJobBySlug: (slug: string) => jobsData.find((j) => j.slug === slug),
  getJobById: (id: string) => jobsData.find((j) => j.id === id),
  createJob: (job: JobPosting, actor = "Admin") => {
    jobsData.unshift(job);
    CareersStore.logAudit(actor, "CREATE_JOB", "job", job.id, `Created job: ${job.title}`);
    return job;
  },
  updateJob: (id: string, updates: Partial<JobPosting>, actor = "Admin") => {
    const idx = jobsData.findIndex((j) => j.id === id);
    if (idx !== -1) {
      jobsData[idx] = { ...jobsData[idx], ...updates };
      CareersStore.logAudit(actor, "UPDATE_JOB", "job", id, `Updated job fields: ${Object.keys(updates).join(", ")}`);
      return jobsData[idx];
    }
    return null;
  },
  deleteJob: (id: string, actor = "Admin") => {
    const job = jobsData.find((j) => j.id === id);
    jobsData = jobsData.filter((j) => j.id !== id);
    if (job) {
      CareersStore.logAudit(actor, "DELETE_JOB", "job", id, `Deleted job: ${job.title}`);
    }
  },

  // Applications
  getAllApplications: () => applicationsData,
  getApplicationById: (id: string) => applicationsData.find((a) => a.id === id),
  getApplicationsByJobId: (jobId: string) => applicationsData.filter((a) => a.jobId === jobId),
  submitApplication: (app: ApplicationSubmission) => {
    applicationsData.unshift(app);
    // increment job application count
    const job = jobsData.find((j) => j.id === app.jobId);
    if (job) {
      job.applicationCount = (job.applicationCount || 0) + 1;
    }
    CareersStore.logAudit("Applicant", "SUBMIT_APPLICATION", "application", app.id, `Submitted application for ${app.jobTitle}`);
    return app;
  },
  updateApplicationStatus: (
    id: string,
    newStatus: ApplicationStatus,
    changedBy = "Admin",
    note?: string
  ) => {
    const app = applicationsData.find((a) => a.id === id);
    if (!app) return null;

    app.status = newStatus;
    app.statusHistory.unshift({
      status: newStatus,
      changedBy,
      timestamp: new Date().toISOString(),
      note,
    });
    CareersStore.logAudit(changedBy, "STATUS_CHANGE", "application", id, `Changed status to ${newStatus}`);
    return app;
  },
  addApplicationNote: (id: string, content: string, author = "Admin") => {
    const app = applicationsData.find((a) => a.id === id);
    if (!app) return null;
    const newNote = {
      id: "note-" + Math.random().toString(36).substring(2, 9),
      author,
      content,
      createdAt: new Date().toISOString(),
    };
    app.notes.unshift(newNote);
    CareersStore.logAudit(author, "ADD_NOTE", "application", id, `Added internal evaluation note`);
    return newNote;
  },
  updateApplicationRating: (id: string, rating: number, actor = "Admin") => {
    const app = applicationsData.find((a) => a.id === id);
    if (!app) return null;
    app.rating = rating;
    CareersStore.logAudit(actor, "UPDATE_RATING", "application", id, `Updated rating to ${rating} stars`);
    return app;
  },
  updateApplicationTags: (id: string, tags: string[], actor = "Admin") => {
    const app = applicationsData.find((a) => a.id === id);
    if (!app) return null;
    app.tags = tags;
    CareersStore.logAudit(actor, "UPDATE_TAGS", "application", id, `Updated tags`);
    return app;
  },

  // Job Alerts Subscribers
  addSubscriber: (email: string, department?: any, jobType?: any) => {
    const existing = subscribersData.find((s) => s.email.toLowerCase() === email.toLowerCase());
    if (existing) return existing;
    const newSub: JobAlertSubscriber = {
      id: "sub-" + Math.random().toString(36).substring(2, 9),
      email,
      department: department || "All",
      jobType: jobType || "All",
      verified: true,
      subscribedAt: new Date().toISOString(),
      token: Math.random().toString(36).substring(2, 15),
    };
    subscribersData.push(newSub);
    CareersStore.logAudit("User", "SUBSCRIBE_ALERTS", "subscriber", newSub.id, `Subscribed to ${department || "All"} alerts`);
    return newSub;
  },
  getSubscribers: () => subscribersData,

  // Audit Logs
  logAudit: (
    actor: string,
    action: string,
    targetType: "job" | "application" | "subscriber" | "template",
    targetId: string,
    details: string
  ) => {
    const log: AuditLogEntry = {
      id: "log-" + Math.random().toString(36).substring(2, 9),
      actor,
      action,
      targetType,
      targetId,
      details,
      timestamp: new Date().toISOString(),
    };
    auditLogs.unshift(log);
    // keep max 500 logs in memory
    if (auditLogs.length > 500) auditLogs.pop();
    return log;
  },
  getAuditLogs: () => auditLogs,

  // Templates
  getEmailTemplates: () => INITIAL_EMAIL_TEMPLATES,
};
