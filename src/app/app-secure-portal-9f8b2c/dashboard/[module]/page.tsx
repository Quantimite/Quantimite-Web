import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ICONS } from "@/components/cmp/icons";
import { SLUG, MODULES, modulesFor, readSession } from "@/lib/cmp";

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params;
  const session = await readSession((await cookies()).get("cmp_session")?.value);
  const m = MODULES.find((x) => x.slug === module);
  if (!session || !m || !modulesFor(session.role).some((x) => x.slug === m.slug)) notFound(); // role check
  return (
    <div className="space-y-4">
      <Link href={`/${SLUG}/dashboard`} className="text-sm font-semibold text-violet hover:underline">← Back to dashboard</Link>
      <h1 className="text-2xl font-extrabold tracking-tight text-plum sm:text-3xl">{m.label}</h1>
      <p className="text-plum/65">{m.desc}</p>
      <div className="rounded-2xl border border-dashed border-violet/30 bg-white p-10 text-center">
        <p className="font-semibold text-plum">Next on the build list</p>
        <p className="mt-1 text-sm text-plum/60">{"table" in m && m.table ? <>Connects to the <code className="rounded bg-mist px-1.5 py-0.5">{m.table}</code> table in Supabase.</> : "Settings screen."}</p>
      </div>
    </div>
  );
}
