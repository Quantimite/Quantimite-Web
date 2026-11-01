import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { readSession } from "@/lib/cmp";

export default async function CmpLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await readSession((await cookies()).get("cmp_session")?.value);
  if (session) {
    redirect("/app-secure-portal-9f8b2c/dashboard");
  }

  const resolvedSearchParams = await searchParams;
  const hasError = resolvedSearchParams?.error === "1";

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-white via-violet-50/60 to-purple-100/50 px-4 relative overflow-hidden">

      {/* Soft Light Ambient Glows matching the service pages */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-violet-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Login Card */}
      <div className="w-full max-w-md rounded-[28px] bg-white/90 backdrop-blur-2xl p-8 shadow-[0_20px_50px_rgba(46,16,101,0.08)] border border-[#2e1065]/10 relative z-10">

        {/* Top Gradient Accent Line */}
        <div className="absolute top-0 left-8 right-8 h-[3px] bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-600 rounded-full" />

        {/* Brand Header with Security Icon */}
        <div className="flex items-center space-x-3.5 mb-3 mt-1">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-violet-600/25">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-[#2e1065] tracking-tight flex items-center gap-2">
              Quantimite <span className="text-[10px] uppercase tracking-wider bg-violet-100 text-violet-700 font-extrabold px-2 py-0.5 rounded-full">CMP</span>
            </h1>
            <p className="text-xs font-medium text-gray-400 mt-0.5">We Engineer Your Next Move.</p>
          </div>
        </div>

        <div className="h-px w-full bg-gray-100 my-5" />

        {/* Login Form */}
        <form action="/api/cmp/login" method="POST" className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Username</label>
            <input
              name="username"
              type="text"
              required
              className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:border-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-600/10 transition-all bg-gray-50/80 font-medium"
              placeholder="Enter admin handle"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full rounded-2xl border border-gray-200 px-4 py-3.5 text-sm text-gray-900 placeholder-gray-400 focus:border-violet-600 focus:outline-none focus:ring-4 focus:ring-violet-600/10 transition-all bg-gray-50/80 font-medium"
              placeholder="••••••••••••"
            />
          </div>

          {/* Conditional Error Banner */}
          {hasError && (
            <div className="rounded-2xl bg-red-50 p-3.5 border border-red-100 text-center animate-shake">
              <p className="text-xs font-bold text-red-600">Invalid username or password. Please try again.</p>
            </div>
          )}

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full mt-3 rounded-2xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 py-4 text-sm font-bold text-white shadow-xl shadow-violet-600/25 hover:opacity-[0.98] active:scale-[0.99] transition-all cursor-pointer"
          >
            Sign in to Portal
          </button>
        </form>

        {/* Footer info inside card */}
        <p className="text-[11px] text-center text-gray-400 mt-6 font-medium">
          Authorized personnel only · Quantimite Studio Management
        </p>
      </div>

      {/* Script to hide global chat widget on this login page view */}
      <script dangerouslySetInnerHTML={{
        __html: `
        if (typeof window !== 'undefined') {
          const checkChat = setInterval(() => {
            const chatBtn = document.querySelector('button');
            // Hide any fixed bottom right chat widgets
            document.querySelectorAll('div').forEach(el => {
              if (el.innerText && el.innerText.includes('Let\\'s Chat')) {
                el.style.display = 'none';
              }
            });
          }, 100);
          setTimeout(() => clearInterval(checkChat), 3000);
        }
      `}} />
    </div>
  );
}