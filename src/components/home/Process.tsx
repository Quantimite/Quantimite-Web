const steps = [
  { t: "Understand", d: "Learn about your business, audience, and the problem to solve." },
  { t: "Plan", d: "Define priorities, requirements, and a practical direction." },
  { t: "Create", d: "Design and build with care for usability and quality." },
  { t: "Improve", d: "Test, refine, and support ongoing performance and growth." },
];

export default function Process() {
  return (
    <section className="bg-plum text-white">
      <div className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="max-w-xl text-3xl font-extrabold tracking-tight sm:text-4xl">How we work</h2>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-4">
          <div aria-hidden className="absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-violet via-azure to-transparent md:block" />
          {steps.map((s, i) => (
            <li key={s.t} className="relative">
              <span className="relative grid h-10 w-10 place-items-center rounded-full bg-brand text-sm font-bold">{i + 1}</span>
              <h3 className="mt-5 text-xl font-bold">{s.t}</h3>
              <p className="mt-2 text-white/65">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
