// CMP core: secret route slug, roles, modules, and signed-cookie sessions (Web Crypto, works in middleware)
export const SLUG = "app-secure-portal-9f8b2c"; // keep identical to the folder name under src/app/
export type Role = "super_admin" | "sales" | "hr" | "content";

export const MODULES = [
  { slug: "overview", group: "Overview", label: "Dashboard", roles: ["sales", "hr", "content"], desc: "Traffic, leads, hiring, and chatbot analytics." },
  { slug: "crm", group: "Sales & growth", label: "CRM & Inquiries", roles: ["sales"], table: "leads", desc: "Inbound project briefs, budgets, timelines, and consultation bookings." },
  { slug: "seo-audits", group: "Sales & growth", label: "SEO Audit Desk", roles: ["sales"], table: "leads", desc: "Requests from the SEO Health Audit tool, with domain and contact data." },
  { slug: "partnerships", group: "Sales & growth", label: "Partnerships", roles: ["sales"], table: "leads", desc: "Social collaboration pitches: Pending, Approved, Active, Declined." },
  { slug: "chat-logs", group: "Sales & growth", label: "Chatbot Logs", roles: ["sales"], table: "chat_logs", desc: "Searchable history of chat sessions, prompts, replies, and timestamps." },
  { slug: "careers", group: "Recruitment", label: "Job Postings", roles: ["hr"], table: "posts", desc: "Create, edit, and close open positions." },
  { slug: "ats", group: "Recruitment", label: "Applicant Tracking", roles: ["hr"], table: "applications", desc: "New, Reviewed, Interview, Hired, Rejected, with PDF/DOCX resume views." },
  { slug: "blog", group: "Content", label: "Blog & Insights", roles: ["content"], table: "posts", desc: "Rich-text publishing with SEO metadata and categories." },
  { slug: "portfolio", group: "Content", label: "Portfolio", roles: ["content"], table: "portfolio_items", desc: "Projects, filter tags, challenge and solution write-ups, galleries." },
  { slug: "research", group: "Content", label: "Research Hub", roles: ["content"], table: "posts", desc: "Whitepaper uploads, R&D prototypes, and GitHub links." },
  { slug: "users", group: "System", label: "Admin Users", roles: [], table: "system_admins", desc: "Create sub-admins, assign roles, and revoke access (Super Admin only)." },
  { slug: "settings", group: "System", label: "Settings", roles: [], desc: "System settings (Super Admin only)." },
] as const;
export const ROLE_LABEL: Record<Role, string> = { super_admin: "Super Admin", sales: "Sales / Growth Lead", hr: "HR / Recruitment Lead", content: "Content Manager" };
export const modulesFor = (role: Role) => MODULES.filter((m) => role === "super_admin" || (m.roles as readonly string[]).includes(role));

const enc = new TextEncoder();
const b64 = (u: Uint8Array) => btoa(String.fromCharCode(...u)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
async function sign(data: string) {
  const secret = process.env.CMP_SESSION_SECRET;
  if (!secret && process.env.NODE_ENV === "production") throw new Error("CMP_SESSION_SECRET is not set");
  const key = await crypto.subtle.importKey("raw", enc.encode(secret || "dev-only-secret"), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64(new Uint8Array(await crypto.subtle.sign("HMAC", key, enc.encode(data))));
}
export async function createSession(user: string, role: Role) {
  const payload = b64(enc.encode(JSON.stringify({ user, role, exp: Date.now() + 8 * 3600e3 })));
  return `${payload}.${await sign(payload)}`;
}
export async function readSession(token?: string): Promise<{ user: string; role: Role } | null> {
  const [payload, sig] = (token || "").split(".");
  if (!payload || !sig || sig !== (await sign(payload))) return null;
  try {
    const j = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return j.exp > Date.now() ? { user: j.user, role: j.role } : null;
  } catch { return null; }
}
