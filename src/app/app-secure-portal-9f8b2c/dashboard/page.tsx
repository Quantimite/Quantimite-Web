import Link from "next/link";
import { cookies } from "next/headers";
import { ICONS } from "@/components/cmp/icons";
import { SLUG, modulesFor, readSession } from "@/lib/cmp";
import { AreaChart, Donut, HBars, MiniBars, Spark } from "@/components/cmp/charts";
import { chatsDaily, hiring, leadSources, leadsDaily, pipeline, recentLeads, sum, topPages, topQuestions, visitors } from "@/lib/cmp-data";

const card = "rounded-2xl border border-plum/10 bg-white p-5 shadow-sm";
const title = "text-sm font-bold text-plum";
const labels = Array.from({ length: 30 }, (_, i) => { const d = new Date(Date.now() - (29 - i) * 864e5); return `${d.getDate()}/${d.getMonth() + 1}`; });
const statusColor: Record<string, string> = { New: "bg-violet/10 text-violet", Qualified: "bg-azure/10 text-azure", Proposal: "bg-amber-100 text-amber-700", Won: "bg-green-100 text-green-700" };

export default async function Overview() {
  const session = await readSession((await cookies()).get("cmp_session")?.value);
  const quick = session ? modulesFor(session.role).filter((m) => m.slug !== "overview") : [];
  const v = sum(visitors), l = sum(leadsDaily), c = sum(chatsDaily);
  const kpis = [
    { label: "Visitors (30d)", value: v.toLocaleString(), delta: "+12.4%", data: visitors },
    { label: "Leads", value: l, delta: "+8.1%", data: leadsDaily },
    { label: "Conversion", value: `${((l / v) * 100).toFixed(1)}%`, delta: "+0.3pt", data: leadsDaily },
    { label: "SEO audits", value: 64, delta: "+21%", data: chatsDaily.slice(0, 12) },
    { label: "Applications", value: 107, delta: "+5%", data: visitors.slice(8, 20) },
    { label: "Chat sessions", value: c, delta: "+17%", data: chatsDaily },
  ];
  return (
    <div className="space-y-6">
      <header>
        <p className="text-sm font-semibold text-plum/55">{new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-plum sm:text-3xl">Welcome back{session ? `, ${session.user}` : ""}</h1>
        <p className="text-sm text-plum/60">Here is how Quantimite is performing over the last 30 days. Sample data until Supabase is connected.</p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
        {kpis.map((k) => (
          <div key={k.label} className={card}>
            <p className="text-xs font-semibold text-plum/55">{k.label}</p>
            <div className="mt-2 flex items-end justify-between"><p className="text-2xl font-extrabold text-plum">{k.value}</p><Spark data={k.data} /></div>
            <p className="mt-1 text-xs font-semibold text-green-600">{k.delta} <span className="font-medium text-plum/40">vs previous 30d</span></p>
          </div>
        ))}
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className={`${card} xl:col-span-2`}><h2 className={title}>Website visitors</h2><div className="mt-3"><AreaChart data={visitors} labels={labels} /></div></div>
        <div className={card}><h2 className={title}>Leads by source</h2><div className="mt-4"><HBars items={leadSources} /></div></div>
      </section>

      <section className="grid gap-4 xl:grid-cols-3">
        <div className={card}><h2 className={title}>Lead pipeline</h2><div className="mt-4"><Donut segments={pipeline} /></div></div>
        <div className={card}><h2 className={title}>Hiring funnel (ATS)</h2><div className="mt-4"><HBars items={hiring} /></div></div>
        <div className={card}><h2 className={title}>Chatbot sessions per day</h2><div className="mt-4"><MiniBars data={chatsDaily} /></div>
          <h3 className="mt-5 text-xs font-bold text-plum/60">Top questions</h3><ul className="mt-2 space-y-1.5 text-sm text-plum/80">{topQuestions.map((q) => <li key={q}>• {q}</li>)}</ul></div>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <div className={card}><h2 className={title}>Top pages</h2>
          <table className="mt-3 w-full text-left text-sm"><thead className="text-xs text-plum/50"><tr><th className="pb-2">Page</th><th className="pb-2">Views</th><th className="pb-2">Avg. time</th></tr></thead>
            <tbody>{topPages.map((p) => <tr key={p.path} className="border-t border-plum/5"><td className="py-2.5 font-medium text-plum">{p.path}</td><td>{p.views.toLocaleString()}</td><td>{p.time}</td></tr>)}</tbody></table></div>
        <div className={card}><h2 className={title}>Recent leads</h2>
          <ul className="mt-3 divide-y divide-plum/5">{recentLeads.map((r) => (
            <li key={r.name} className="flex items-center justify-between gap-3 py-2.5 text-sm">
              <div className="min-w-0"><p className="truncate font-semibold text-plum">{r.name} <span className="font-normal text-plum/50">· {r.company}</span></p><p className="truncate text-xs text-plum/55">{r.service} · {r.budget}</p></div>
              <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${statusColor[r.status]}`}>{r.status}</span>
            </li>))}</ul></div>
      </section>
    </div>
  );
}
