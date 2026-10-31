const milestones = [
  {
    year: " ",
    tag: " ",
    title: "",
    description:
      " "
  },
  {
    year: "",
    tag: "",
    title: "",
    description:
      "",
  },
  {
    year: "",
    tag: "",
    title: "",
    description:
      "",
  },
  {
    year: "",
    tag: "",
    title: "",
    description:
      "",
  },
  {
    year: "",
    tag: "",
    title: "",
    description:
      "",
  },
  {
    year: "",
    tag: "",
    title: "",
    description:
      "",
  },
];

export default function TimelineSection() {
  return (
    <section className="bg-mist/60 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-plum uppercase backdrop-blur-md shadow-xs">
            <span className="h-2 w-2 rounded-full bg-brand" />
            <span>Our Journey</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-plum sm:text-5xl">
            Company milestones
          </h2>
          <p className="mt-4 text-lg text-plum/70">
            A track record of continuous learning, architectural evolution, and ambitious product launches.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative mt-20">
          {/* Central Stem Line (Visible on mobile on the left, centered on desktop) */}
          <div
            aria-hidden
            className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet via-azure to-violet/30 md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-12">
            {milestones.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={index}
                  className="relative flex flex-col items-start md:flex-row md:items-center"
                >
                  {/* Pulse Dot */}
                  <div
                    aria-hidden
                    className="absolute left-6 top-6 flex -translate-x-1/2 items-center justify-center md:left-1/2"
                  >
                    <div className="h-4 w-4 rounded-full bg-white ring-4 ring-azure shadow-md shadow-violet/30" />
                    <div className="absolute h-6 w-6 rounded-full bg-violet/20 animate-ping" />
                  </div>

                  {/* Card wrapper */}
                  <div
                    className={`ml-14 w-[calc(100%-3.5rem)] md:ml-0 md:w-1/2 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:ml-auto"
                      }`}
                  >
                    <div className="group relative rounded-3xl border border-plum/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet/30 hover:shadow-lg">
                      <div
                        className={`flex flex-wrap items-center gap-3 ${isEven ? "md:justify-end" : "justify-start"
                          }`}
                      >
                        <span className="rounded-full bg-brand px-3 py-1 text-xs font-extrabold text-white shadow-xs">
                          {item.year}
                        </span>
                        <span className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-plum/70 border border-plum/5">
                          {item.tag}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-bold tracking-tight text-plum group-hover:text-violet transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-plum/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
