import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import Sidebar from "@/components/cmp/Sidebar";
import { ROLE_LABEL, SLUG, modulesFor, readSession } from "@/lib/cmp";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await readSession((await cookies()).get("cmp_session")?.value);
  if (!session) notFound(); // second line of defence behind the middleware
  const items = modulesFor(session.role).map(({ slug, label, group }) => ({ slug, label, group }));

  return (
    <div className="min-h-screen lg:pl-72 relative">
      {/* Permanently hide the floating chat widget in the CMP portal */}
      <style dangerouslySetInnerHTML={{
        __html: `
        /* Hide any fixed element in the bottom right corner of the viewport */
        div.fixed.bottom-4.right-4, 
        div.fixed.bottom-6.right-6, 
        div.fixed.bottom-8.right-8,
        aside ~ div.fixed,
        body > div.fixed:has(button) {
          display: none !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }
      `}} />

      <Sidebar slug={SLUG} items={items} user={session.user} role={ROLE_LABEL[session.role]} />
      <div className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">{children}</div>
    </div>
  );
}