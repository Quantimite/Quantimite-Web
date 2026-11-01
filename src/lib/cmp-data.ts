// SAMPLE DATA. Replace each export with a Supabase query (tables: leads, applications, chat_logs, ...)
const rnd = (i: number) => { const x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); };
const days = 30;
export const visitors = Array.from({ length: days }, (_, i) => Math.round(900 + i * 18 + rnd(i) * 260 - (i % 7 > 4 ? 160 : 0)));
export const leadsDaily = Array.from({ length: days }, (_, i) => Math.round(6 + rnd(i + 50) * 10 + i * 0.15));
export const chatsDaily = Array.from({ length: days }, (_, i) => Math.round(20 + rnd(i + 90) * 30 + i * 0.8));
export const leadSources = [
  { label: "Organic search", value: 148 }, { label: "Direct", value: 96 }, { label: "Referral", value: 71 },
  { label: "Social", value: 54 }, { label: "Paid ads", value: 38 },
];
export const pipeline = [
  { label: "New", value: 64, color: "#a818f5" }, { label: "Qualified", value: 41, color: "#7c5cfa" },
  { label: "Proposal", value: 23, color: "#2f8bfa" }, { label: "Won", value: 12, color: "#22c55e" }, { label: "Lost", value: 9, color: "#cbd5e1" },
];
export const hiring = [
  { label: "New", value: 58 }, { label: "Reviewed", value: 34 }, { label: "Interview", value: 12 }, { label: "Hired", value: 3 },
];
export const topPages = [
  { path: "/", views: 12840, time: "1m 48s" }, { path: "/services", views: 5210, time: "2m 31s" },
  { path: "/portfolio", views: 3980, time: "2m 05s" }, { path: "/blog", views: 2764, time: "3m 12s" }, { path: "/careers", views: 1530, time: "1m 22s" },
];
export const topQuestions = ["What does a SaaS MVP cost?", "Do you build mobile apps?", "How long does an SEO audit take?", "Can I book a consultation?", "Do you offer maintenance plans?"];
export const recentLeads = [
  { name: "Nimal Perera", company: "Lanka Retail Co.", service: "Custom web app", budget: "$8k–15k", status: "New" },
  { name: "Aisha Rahman", company: "Brightpath Edu", service: "UI/UX design", budget: "$3k–6k", status: "Qualified" },
  { name: "Daniel Fox", company: "Northwind Labs", service: "SEO audit", budget: "$1k–2k", status: "Proposal" },
  { name: "Sara Fernando", company: "Orbit Pay", service: "API integration", budget: "$10k+", status: "New" },
];
export const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);
