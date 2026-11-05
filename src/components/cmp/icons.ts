import { ClipboardList, FileText, FlaskConical, FolderOpen, Inbox, LayoutDashboard, MessagesSquare, Briefcase, Search, Settings, Share2, UserCog, type LucideIcon } from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  overview: LayoutDashboard,
  crm: Inbox,
  seo: Search,
  "seo-audits": Search,
  partnerships: Share2,
  chatbot: MessagesSquare,
  "chat-logs": MessagesSquare,
  jobs: Briefcase,
  careers: Briefcase,
  applicants: ClipboardList,
  ats: ClipboardList,
  blog: FileText,
  portfolio: FolderOpen,
  research: FlaskConical,
  users: UserCog,
  settings: Settings,
};
