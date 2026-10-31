import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-brand px-8 py-16 text-white shadow-2xl shadow-violet/30 sm:px-16 sm:py-20">
        {/* Ambient radial glows inside the card */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/20 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-azure/40 blur-3xl"
        />

        <div className="relative z-10 mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-md">
            <span>Shape The Next Move</span>
          </div>

          <h2 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl sm:leading-[1.15]">
            Ready to engineer what comes next?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-base text-white/90 sm:text-lg">
            Whether you have a breakthrough product idea or are an ambitious builder looking to join a
            craft-driven team, we would love to connect.
          </p>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/contact"
              className="w-full rounded-full bg-white px-8 py-4 text-center font-bold text-plum shadow-lg transition-all duration-200 hover:-translate-y-0.5 hover:bg-mist hover:shadow-xl sm:w-auto"
            >
              Start a project with us
            </Link>
            <Link
              href="/careers"
              className="w-full rounded-full border border-white/60 bg-white/10 px-8 py-4 text-center font-bold text-white backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/20 sm:w-auto"
            >
              Join the team & view open roles
            </Link>
          </div>

          {/* Feature Highlights Footer */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/15 pt-8 text-xs font-semibold text-white/80">
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Modern Next.js & React 19 Stack
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              Transparent Pricing & Milestones
            </span>
            <span className="flex items-center gap-2">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
              High-Velocity Collaboration
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
