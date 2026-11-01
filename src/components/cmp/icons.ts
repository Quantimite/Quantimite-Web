import { ClipboardList, FileText, FlaskConical, FolderOpen, Inbox, LayoutDashboard, MessagesSquare, Briefcase, Search, Settings, Share2, UserCog, type LucideIcon } from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  overview: LayoutDashboard, crm: Inbox, "seo-audits": Search, partnerships: Share2, "chat-logs": MessagesSquare,
  careers: Briefcase, ats: ClipboardList, blog: FileText, portfolio: FolderOpen, research: FlaskConical, users: UserCog, settings: Settings,
};
