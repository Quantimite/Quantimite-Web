import Link from "next/link";
import Button from "@/components/ui/Button";

const stats = [
  { value: "40+", label: "Products Launched", sub: "Enterprise & startup platforms" },
  { value: "99.98%", label: "System Reliability", sub: "Production-grade uptime" },
  { value: "100%", label: "In-House Team", sub: "Senior engineers & designers" },
  { value: "14+", label: "Global Industries", sub: "Fintech, health, AI & commerce" },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-28">
      {/* Decorative ambient gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[500px] w-full max-w-7xl -translate-x-1/2 opacity-60 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse 600px 300px at 50% 20%, rgba(168, 24, 245, 0.18), rgba(47, 139, 250, 0.15), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-7xl px-6">
        {/* Hero Top Content */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-white/80 px-4 py-1.5 text-xs font-semibold tracking-wide text-plum uppercase backdrop-blur-md shadow-xs">
            <span className="h-2 w-2 rounded-full bg-brand animate-pulse" />
            <span>About Quantimite</span>
          </div>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-plum sm:text-6xl sm:leading-[1.1]">
            We engineer the digital platforms that{" "}
            <span className="text-brand">shape tomorrow</span>.
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-plum/75 sm:text-xl">
            Quantimite was founded with a singular conviction: ambitious businesses shouldn&apos;t have
            to choose between deep engineering rigor and intuitive, human-centered design. We bridge
            that divide to build software that scales effortlessly.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button href="/contact">Start a project</Button>
            <Button href="#values" variant="outline">Explore our beliefs</Button>
          </div>
        </div>

        {/* Company Story & Mission Cards */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Story Card */}
          <div className="relative overflow-hidden rounded-3xl border border-plum/10 bg-white/80 p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-violet/30 hover:shadow-lg sm:p-10">
            <div
              aria-hidden
              className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-gradient-to-br from-violet/10 to-azure/10 blur-xl"
            />
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-violet/25">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="mt-5 text-2xl font-bold tracking-tight text-plum sm:text-3xl">Our Story</h2>
            <div className="mt-4 space-y-4 text-plum/75 leading-relaxed">
              <p>
                What began as a close-knit group of senior systems architects and product designers has
                grown into a modern engineering agency. We noticed that companies were too often forced to
                choose: agencies that build visually dazzling concepts that crumble under production load, or
                traditional shops that build dependable systems with stale user experiences.
              </p>
              <p>
                We built Quantimite to eliminate that compromise. By combining architectural precision,
                modern frontend craftsmanship, and growth-oriented product strategy, we help forward-thinking
                brands transform complex ideas into reliable, high-velocity digital realities.
              </p>
            </div>
          </div>

          {/* Mission & Vision Card */}
          <div className="flex flex-col justify-between space-y-8 rounded-3xl border border-plum/10 bg-white/80 p-8 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-azure/30 hover:shadow-lg sm:p-10">
            <div>
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand text-white shadow-md shadow-azure/25">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="mt-5 text-2xl font-bold tracking-tight text-plum sm:text-3xl">Our Mission</h2>
              <p className="mt-4 text-plum/75 leading-relaxed">
                To engineer high-impact software, scalable infrastructure, and intuitive digital
                experiences that solve real business problems and give ambitious organizations a durable
                competitive edge.
              </p>
            </div>

            <div className="border-t border-plum/10 pt-6">
              <span className="text-xs font-bold tracking-wider text-violet uppercase">Our Vision</span>
              <h3 className="mt-2 text-xl font-bold text-plum">Crafting the benchmark of modern software</h3>
              <p className="mt-2 text-sm leading-relaxed text-plum/70">
                A world where software is remarkably dependable, accessible, and delighting to interact with—where
                engineering velocity never outpaces quality, security, or human consideration.
              </p>
            </div>
          </div>
        </div>

        {/* Impact Numbers Grid */}
        <div className="mt-12 grid grid-cols-2 gap-4 rounded-3xl border border-plum/10 bg-white/50 p-6 backdrop-blur-md sm:grid-cols-4 sm:p-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center sm:text-left">
              <div className="text-3xl font-extrabold tracking-tight text-brand sm:text-4xl">{stat.value}</div>
              <div className="mt-1 text-sm font-bold text-plum">{stat.label}</div>
              <div className="mt-0.5 text-xs text-plum/60">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
