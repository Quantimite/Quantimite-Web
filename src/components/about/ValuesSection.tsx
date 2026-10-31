const values = [
  {
    number: "01",
    title: "Quality by design",
    subtitle: "Engineering Precision",
    description:
      "We believe high-grade software is no accident—it is the result of disciplined architecture, clean code, and zero compromises on reliability. We build systems that perform under peak pressure and remain maintainable years down the road.",
    points: [
      "Type-safe, test-driven development",
      "Sub-second load times & Core Vitals excellence",
      "Architectures designed to resist technical debt",
    ],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Built around people",
    subtitle: "Radical Transparency & Empathy",
    description:
      "Great software serves humans, not the other way around. We design for clarity, intuitive navigation, and universal accessibility. Internally and with our partners, we practice radical honesty, transparent roadmaps, and authentic collaboration.",
    points: [
      "Direct engineer-to-partner collaboration",
      "WCAG-compliant and accessible by default",
      "No hidden surprises or vanity metrics",
    ],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.999-3.199a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Made to grow",
    subtitle: "Velocity With Purpose",
    description:
      "Rapid shipping means nothing without directional clarity and future scalability. We construct modular codebases and agile release cadences that allow ambitious products to evolve smoothly alongside shifting markets and customer demands.",
    points: [
      "Modular components & decoupled architectures",
      "Fast feedback loops and iterative delivery",
      "Cloud-native scalability from day one",
    ],
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m1-3l1 3m5-3l1 3m-1-3l-1 3m-9-6h12" />
      </svg>
    ),
  },
];

export default function ValuesSection() {
  return (
    <section id="values" className="scroll-mt-20 bg-mist/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-plum uppercase backdrop-blur-md shadow-xs">
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span>Our Foundation</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-plum sm:text-5xl">
            What we believe
          </h2>
          <p className="mt-4 text-lg text-plum/70">
            Three core principles guide every line of code we write, every interface we craft, and every
            client partnership we forge.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {values.map((v) => (
            <div
              key={v.number}
              className="group relative flex flex-col justify-between rounded-3xl border border-plum/10 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet/30 hover:shadow-xl sm:p-10"
            >
              {/* Subtle top gradient accent */}
              <div
                aria-hidden
                className="absolute inset-x-8 top-0 h-1 rounded-t-3xl bg-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />

              <div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-brand tracking-tight">{v.number}</span>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-plum/5 text-violet transition-colors group-hover:bg-brand group-hover:text-white">
                    {v.icon}
                  </div>
                </div>

                <div className="mt-6">
                  <span className="text-xs font-bold tracking-wider text-azure uppercase">{v.subtitle}</span>
                  <h3 className="mt-1 text-2xl font-bold tracking-tight text-plum group-hover:text-violet transition-colors">
                    {v.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-plum/70">
                    {v.description}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-plum/5 pt-6">
                <h4 className="text-xs font-semibold tracking-wider text-plum/60 uppercase">Key Tenets</h4>
                <ul className="mt-3 space-y-2 text-xs font-medium text-plum/80">
                  {v.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5">
                      <svg className="h-4 w-4 shrink-0 text-violet" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      <span>{p}</span>
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
