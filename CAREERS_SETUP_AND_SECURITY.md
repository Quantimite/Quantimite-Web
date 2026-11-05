# Quantimite Careers Module (Section 2.7) — Architecture, Setup & Security

## 1. Architecture Summary
- **Framework**: Next.js 15 (App Router) + React 19 + TypeScript
- **Styling**: Tailwind CSS + Custom Design System tokens (`src/styles/tokens.css` imported into `src/app/globals.css`), adapted seamlessly to Quantimite's brand identity (`#2a1340` plum, `#1b1030` ink, `#a818f5` violet, and `#2f8bfa` azure).
- **Architecture Flow**:
  - Public Landing & Filters: `src/app/(marketing)/careers/page.tsx`
  - Job Specification Detail: `src/app/(marketing)/careers/[slug]/page.tsx`
  - Application Multi-Step Form: `src/app/(marketing)/careers/[slug]/apply/page.tsx`
  - General Talent Pool: `src/app/(marketing)/careers/general/page.tsx`
  - Candidate Status Tracker: `src/app/(marketing)/careers/track/page.tsx`
  - Admin ATS & Job Management: `src/app/admin/careers/page.tsx`
  - Backend APIs: `src/app/api/careers/*`

---

## 2. Database Schema (Entities & Relationships)

```sql
-- 1. Jobs Table
CREATE TABLE jobs (
  id VARCHAR(64) PRIMARY KEY,
  slug VARCHAR(128) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  department VARCHAR(64) NOT NULL,
  type VARCHAR(32) NOT NULL, -- Full-time, Internship, Contract, Part-time
  location VARCHAR(255) NOT NULL,
  work_mode VARCHAR(32) NOT NULL, -- Remote, Hybrid, Onsite
  salary_range VARCHAR(128),
  short_summary TEXT NOT NULL,
  description TEXT NOT NULL,
  responsibilities JSONB NOT NULL DEFAULT '[]',
  requirements JSONB NOT NULL DEFAULT '[]', -- Must-have
  nice_to_have JSONB NOT NULL DEFAULT '[]',
  benefits JSONB NOT NULL DEFAULT '[]',
  hiring_process JSONB NOT NULL DEFAULT '[]',
  date_posted DATE NOT NULL,
  valid_through DATE NOT NULL,
  status VARCHAR(32) NOT NULL DEFAULT 'Published', -- Draft, Published, Closed, Archived
  is_internship BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Applications Table
CREATE TABLE applications (
  id VARCHAR(32) PRIMARY KEY, -- e.g. QM-APP-91823
  job_id VARCHAR(64) REFERENCES jobs(id) ON DELETE SET NULL,
  job_slug VARCHAR(128) NOT NULL,
  job_title VARCHAR(255) NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(64) NOT NULL,
  current_location VARCHAR(255) NOT NULL,
  linkedin_url TEXT,
  portfolio_urls JSONB DEFAULT '[]',
  cover_letter_text TEXT,
  referral_source VARCHAR(128),
  referral_code VARCHAR(64),
  expected_salary VARCHAR(64),
  notice_period VARCHAR(64),
  availability_date VARCHAR(64),
  internship_details JSONB,
  status VARCHAR(32) NOT NULL DEFAULT 'New', -- New, Reviewed, Interview, Hired, Rejected
  rating INT DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  tags JSONB DEFAULT '[]',
  consent_agreed BOOLEAN NOT NULL,
  consent_policy_version VARCHAR(32) NOT NULL,
  consent_timestamp TIMESTAMPTZ NOT NULL,
  consent_ip_hash VARCHAR(128) NOT NULL,
  talent_pool_agreed BOOLEAN DEFAULT TRUE,
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Stored Files (Private CVs)
CREATE TABLE application_files (
  id VARCHAR(64) PRIMARY KEY,
  application_id VARCHAR(32) REFERENCES applications(id) ON DELETE CASCADE,
  original_name VARCHAR(255) NOT NULL,
  stored_uuid_name VARCHAR(255) NOT NULL,
  size_bytes BIGINT NOT NULL,
  mime_type VARCHAR(128) NOT NULL,
  storage_path TEXT NOT NULL,
  is_scanned_safe BOOLEAN DEFAULT TRUE,
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Status History & Internal Notes
CREATE TABLE application_status_history (
  id SERIAL PRIMARY KEY,
  application_id VARCHAR(32) REFERENCES applications(id) ON DELETE CASCADE,
  status VARCHAR(32) NOT NULL,
  changed_by VARCHAR(128) NOT NULL,
  note TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE application_notes (
  id VARCHAR(64) PRIMARY KEY,
  application_id VARCHAR(32) REFERENCES applications(id) ON DELETE CASCADE,
  author VARCHAR(128) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Subscribers & Audit Logs
CREATE TABLE job_alert_subscribers (
  id VARCHAR(64) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  department VARCHAR(64) DEFAULT 'All',
  job_type VARCHAR(32) DEFAULT 'All',
  verified BOOLEAN DEFAULT TRUE,
  token VARCHAR(64) NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_logs (
  id VARCHAR(64) PRIMARY KEY,
  actor VARCHAR(128) NOT NULL,
  action VARCHAR(64) NOT NULL,
  target_type VARCHAR(64) NOT NULL,
  target_id VARCHAR(64) NOT NULL,
  details TEXT NOT NULL,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 3. Security & Compliance Checklist

1. **Upload Validation**:
   - Only `.pdf` and `.docx` extensions allowed.
   - Header magic byte verification (`%PDF-` for PDFs, `PK\x03\x04` for DOCX ZIP containers).
   - Strict size caps (5MB for resumes, 10MB for portfolios).
   - Random UUID renaming on upload; files are never stored or executed from public document roots.
   - Metadata stripped; executable macros blocked.
2. **Spam & Abuse Protection**:
   - Honeypot trap field (`website_hp`) silently rejecting bot submissions.
   - Duplicate detection (matching email + job ID returns friendly tracking redirect).
3. **Data Protection & Compliance**:
   - Mandatory Privacy Policy consent checkbox before form submission.
   - Cryptographic IP hashing and policy version timestamp recording.
   - Candidate "delete my data" request compliance and optional 12-month talent pool consent toggle.
4. **Google Jobs & SEO**:
   - Clean `JobPosting` JSON-LD schema with `directApply: true`, salary parameters, and `TELECOMMUTE` location specification for remote roles.
   - Automatic removal or closed state styling upon reaching `validThrough` expiry date.

---

## 4. Environment Configuration (`.env.example`)

```bash
# App Configuration
NEXT_PUBLIC_APP_URL="https://quantimite.com"
NEXT_PUBLIC_APP_ENV="production"

# Careers & ATS Configuration
CAREERS_ADMIN_SECRET="quantimite_ats_secure_key_2026"
CAREERS_NOTIFICATIONS_EMAIL="cdananjana04@gmail.com"

# Storage Configuration (AWS S3 / Cloudflare R2)
R2_BUCKET_NAME="quantimite-private-cvs"
R2_ACCOUNT_ID="your_cloudflare_account_id"
R2_ACCESS_KEY_ID="your_access_key"
R2_SECRET_ACCESS_KEY="your_secret_key"

# Email Provider (Resend / AWS SES / Postmark)
RESEND_API_KEY="re_123456789"
EMAIL_FROM_ADDRESS="careers@quantimite.com"
```
