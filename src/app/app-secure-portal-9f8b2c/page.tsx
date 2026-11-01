// If your session helper is named differently, update the import below 
// (e.g., check src/lib/cmp.ts to see what function name is exported)
import { cookies } from "next/headers";

export default async function CmpDashboard() {
  // Directly read cookie or session token securely on the server
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get("quantimite_admin_session")?.value;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-plum">
            Welcome back, Admin
          </h1>
          <p className="text-sm text-plum/60">
            Here is what is happening across Quantimite today.
          </p>
        </div>
      </div>
    </div>
  );
}