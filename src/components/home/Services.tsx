import Link from "next/link";

const pillars = [
  { href: "/services/software-engineering", title: "Software development and engineering",
    text: "Digital products that solve problems, simplify workflows, and give your business a strong base to grow on.",
    items: ["Custom web and mobile apps", "Enterprise software and SaaS", "UI/UX and product design", "API development and integration", "Cloud, DevOps, and maintenance"] },
  { href: "/services/digital-growth", title: "Digital marketing and growth",
    text: "Visibility for great products: reach the right people and improve the journey from first click to customer.",
    items: ["Performance marketing and paid media", "Search engine optimisation", "Brand identity and creative", "Social media strategy", "Marketing automation and email"] },
];

export default function Services() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-plum sm:text-4xl">One team for the product and the people who need to find it.</h2>
      <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-plum/10 md:grid-cols-2">
        {pillars.map((p) => (
          <Link key={p.href} href={p.href} className="group bg-white/90 p-8 transition hover:bg-white sm:p-10">
            <h3 className="text-2xl font-bold text-plum group-hover:text-violet">{p.title}</h3>
            <p className="mt-3 text-plum/70">{p.text}</p>
            <ul className="mt-6 space-y-2.5 text-sm font-medium text-plum/80">
              {p.items.map((i) => (
                <li key={i} className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-brand" />{i}</li>
              ))}
            </ul>
          </Link>
        ))}
      </div>
    </section>
  );
}
