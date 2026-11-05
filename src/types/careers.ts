export type Department =
  | "Engineering"
  | "Design"
  | "Product"
  | "Cloud & DevOps"
  | "Growth & Marketing"
  | "Operations";

export type JobType = "Full-time" | "Part-time" | "Contract" | "Internship";

export type WorkMode = "Remote" | "Hybrid" | "Onsite";

export type JobStatus = "Draft" | "Published" | "Closed" | "Archived";

export interface HiringProcessStep {
  step: string;
  title: string;
  description: string;
  expectedTimeline: string;
}

export interface JobPosting {
  id: string;
  slug: string;
  title: string;
  department: Department;
  type: JobType;
  location: string;
  workMode: WorkMode;
  salaryRange?: string;
  shortSummary: string;
  description: string;
  responsibilities: string[];
  requirements: string[]; // Must-have
  niceToHave: string[];
  benefits: string[];
  hiringProcess: HiringProcessStep[];
  datePosted: string;
  validThrough: string;
  status: JobStatus;
  featured?: boolean;
  isInternship?: boolean;
  applicationCount?: number;
}

export type ApplicationStatus =
  | "New"
  | "Reviewed"
  | "Interview"
  | "Hired"
  | "Rejected";

export interface StatusHistoryItem {
  status: ApplicationStatus;
  changedBy: string;
  timestamp: string;
  note?: string;
}

export interface InternalNote {
  id: string;
  author: string;
  content: string;
  createdAt: string;
  mentions?: string[];
}

export interface StoredFile {
  id: string;
  name: string;
  originalName: string;
  size: number;
  mimeType: string;
  storagePath: string;
  downloadUrl: string;
  uploadedAt: string;
  isScannedSafe: boolean;
}

export interface CandidateConsent {
  privacyPolicyAgreed: boolean;
  policyVersion: string;
  timestamp: string;
  ipHash: string;
  talentPoolAgreed?: boolean;
}

export interface InternshipDetails {
  university: string;
  degree: string;
  graduationYear: string;
}

export interface ApplicationSubmission {
  id: string; // Reference ID (e.g. QM-APP-82194)
  jobId: string;
  jobSlug: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  currentLocation: string;
  linkedInUrl?: string;
  portfolioUrls?: string[];
  cvFile: StoredFile;
  coverLetterText?: string;
  referralSource?: string;
  referralCode?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  availabilityDate?: string;
  internshipDetails?: InternshipDetails;
  status: ApplicationStatus;
  statusHistory: StatusHistoryItem[];
  rating?: number; // 1 - 5 stars
  tags: string[];
  notes: InternalNote[];
  consent: CandidateConsent;
  submittedAt: string;
}

export interface JobAlertSubscriber {
  id: string;
  email: string;
  department?: Department | "All";
  jobType?: JobType | "All";
  verified: boolean;
  subscribedAt: string;
  token: string;
}

export interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  bodyHtml: string;
  bodyText: string;
  triggerStatus?: ApplicationStatus;
}

export interface AuditLogEntry {
  id: string;
  actor: string;
  action: string;
  targetType: "job" | "application" | "subscriber" | "template";
  targetId: string;
  details: string;
  timestamp: string;
}

export interface CareersAnalytics {
  views: number;
  starts: number;
  submissions: number;
  byDepartment: Record<string, number>;
  bySource: Record<string, number>;
}
