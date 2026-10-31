const steps = [
  {
    step: "01",
    phase: "Understand",
    badge: "Discovery & Alignment",
    summary: "Deep dive into your business, domain complexities, and user needs to establish clarity.",
    details:
      "We begin by unpacking the core problem. Through collaborative discovery sessions, user persona mapping, and technical audits of existing systems, we define exactly what needs to be built, who it serves, and how success will be measured.",
    deliverables: ["Technical Audit", "User Journey Maps", "Product Strategy", "Defined Success Metrics"],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
      </svg>
    ),
  },
  {
    step: "02",
    phase: "Plan",
    badge: "Architecture & Strategy",
    summary: "Architecting the technical foundation and establishing a phased, de-risked delivery roadmap.",
    details:
      "Before writing production code, we architect the system. We select modern, future-proof frameworks, design modular data models, specify APIs, and construct interactive wireframes to ensure every stakeholder is aligned.",
    deliverables: ["System Architecture", "Interactive Wireframes", "Tech Stack Blueprint", "Milestone Sprint Plan"],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    step: "03",
    phase: "Create",
    badge: "Design & Development",
    summary: "Crafting polished UI/UX and engineering robust, type-safe full-stack software.",
    details:
      "Our engineers and designers work in close unison. We translate prototypes into production-grade applications, implementing clean design systems, responsive mobile layouts, and comprehensive test suites with weekly live reviews.",
    deliverables: ["Tailwind & React 19 UI", "Type-Safe Backend & APIs", "Design System Tokens", "Automated Test Suites"],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>
    ),
  },
  {
    step: "04",
    phase: "Improve",
    badge: "Telemetry & Scaling",
    summary: "Continuous observability, conversion optimization, and sustainable growth.",
    details:
      "Software launch is just the beginning. We configure end-to-end telemetry, benchmark Core Web Vitals, gather real-world behavioral analytics, and release iterative refinements to maximize product velocity and user conversion.",
    deliverables: ["Observability Pipelines", "Performance & SEO Tuning", "A/B Optimization", "Scaling & SLA Support"],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
];

export default function ApproachSection() {
  return (
    <section className="relative overflow-hidden bg-plum py-24 text-white sm:py-32">
      {/* Decorative gradient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet/20 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-azure/20 blur-[120px]"
      />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-brand" />
              <span>Proven Methodology</span>
            </div>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl">
              Our approach
            </h2>
            <p className="mt-4 max-w-2xl text-base text-white/70 sm:text-lg">
              A four-phase framework engineered to transform complex technical visions into high-performing,
              production-grade software with minimal friction.
            </p>
          </div>
          <div className="hidden rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-medium text-white/60 lg:block">
            Understand → Plan → Create → Improve
          </div>
        </div>

        {/* Approach Cards Grid */}
        <div className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Subtle connecting line for desktop */}
          <div
            aria-hidden
            className="absolute top-12 left-8 right-8 -z-0 hidden h-0.5 bg-gradient-to-r from-violet via-azure to-violet/40 lg:block"
          />

          {steps.map((s) => (
            <div
              key={s.step}
              className="group relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-violet/50 hover:bg-white/[0.08]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-white shadow-lg shadow-violet/30 transition-transform duration-300 group-hover:scale-105">
                    {s.icon}
                  </div>
                  <span className="text-3xl font-black tracking-tight text-white/30 group-hover:text-white/60 transition-colors">
                    {s.step}
                  </span>
                </div>

                <div className="mt-6">
                  <span className="inline-block rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold tracking-wide text-azure uppercase">
                    {s.badge}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold tracking-tight text-white group-hover:text-azure transition-colors">
                    {s.phase}
                  </h3>
                  <p className="mt-2 text-sm font-semibold text-white/90">
                    {s.summary}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-white/60">
                    {s.details}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-5">
                <span className="text-[11px] font-semibold tracking-wider text-white/40 uppercase">
                  Key Deliverables
                </span>
                <ul className="mt-2.5 space-y-1.5 text-xs text-white/75">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
