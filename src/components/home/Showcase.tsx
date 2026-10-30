import Link from "next/link";

const work = [
  { slug: "project-one", title: "Project one", tag: "Web app", from: "#a818f5", to: "#6d7cff" },
  { slug: "project-two", title: "Project two", tag: "Mobile app", from: "#6d7cff", to: "#2f8bfa" },
  { slug: "project-three", title: "Project three", tag: "Brand and growth", from: "#2f8bfa", to: "#5ee0ff" },
];
const values = [
  { t: "Quality by design", d: "Thoughtful engineering, careful execution, and dependable work." },
  { t: "Built around people", d: "Usability, clarity, and real customer needs, not just appearance." },
  { t: "Made to grow", d: "Maintainability, performance, and room for future improvements." },
];

export default function Showcase() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="flex items-end justify-between gap-6">
        <h2 className="text-3xl font-extrabold tracking-tight text-plum sm:text-4xl">Selected work</h2>
        <Link href="/portfolio" className="text-sm font-semibold text-violet hover:underline">See all case studies</Link>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {work.map((w) => (
          <Link key={w.slug} href={`/portfolio/${w.slug}`} className="group">
            <div className="aspect-[4/3] rounded-2xl transition group-hover:scale-[1.02]" style={{ backgroundImage: `linear-gradient(135deg, ${w.from}, ${w.to})` }} />
            <h3 className="mt-4 font-bold text-plum">{w.title}</h3>
            <p className="text-sm text-plum/60">{w.tag}</p>
          </Link>
        ))}
      </div>
      <div className="mt-24 grid gap-10 border-t border-plum/10 pt-12 md:grid-cols-3">
        {values.map((v) => (
          <div key={v.t}><h3 className="text-lg font-bold text-plum">{v.t}</h3><p className="mt-2 text-plum/70">{v.d}</p></div>
        ))}
      </div>
    </section>
  );
}
