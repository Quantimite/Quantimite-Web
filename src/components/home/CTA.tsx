import Link from "next/link";

export default function CTA() {
  return (
    <section className="px-6 pb-24">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-brand px-8 py-16 text-center text-white shadow-2xl shadow-violet/30 sm:px-16">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Let’s build what’s next.</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/85">Starting with an idea, improving a platform, or growing your presence: we’ll help you take the next step.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="rounded-full bg-white px-7 py-3.5 font-semibold text-plum transition hover:-translate-y-0.5">Book a free consultation</Link>
          <Link href="/contact" className="rounded-full border border-white/50 px-7 py-3.5 font-semibold transition hover:bg-white/10">Start a project</Link>
        </div>
      </div>
    </section>
  );
}
