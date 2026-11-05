"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  X,
  Plus,
  Trash2,
  ShieldCheck,
  Sparkles,
  Copy,
  Check,
  GraduationCap,
} from "lucide-react";
import { JobPosting } from "@/types/careers";
import { validateUploadedFile } from "@/lib/careers/upload";

interface Props {
  job?: JobPosting; // undefined if general application
  referralCode?: string;
}

export default function ApplicationForm({ job, referralCode }: Props) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const isInternship = job?.isInternship || false;

  // Form State
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");

  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [portfolioUrls, setPortfolioUrls] = useState<string[]>([""]);
  const [referralSource, setReferralSource] = useState("");
  const [expectedSalary, setExpectedSalary] = useState("");
  const [noticePeriod, setNoticePeriod] = useState("Immediate");
  const [availabilityDate, setAvailabilityDate] = useState("");

  // Internship Fields
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [graduationYear, setGraduationYear] = useState("2026");

  // CV Upload State
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvFileName, setCvFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState("");
  const [coverLetterText, setCoverLetterText] = useState("");

  // Consent & Honeypot
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [talentPoolConsent, setTalentPoolConsent] = useState(true);
  const [honeypot, setHoneypot] = useState(""); // hidden spam trap

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const storageKey = `qm_app_draft_${job?.id || "general"}`;

  // 1. Load Draft from localStorage
  useEffect(() => {
    try {
      const draft = localStorage.getItem(storageKey);
      if (draft) {
        const parsed = JSON.parse(draft);
        if (parsed.fullName) setFullName(parsed.fullName);
        if (parsed.email) setEmail(parsed.email);
        if (parsed.phone) setPhone(parsed.phone);
        if (parsed.currentLocation) setCurrentLocation(parsed.currentLocation);
        if (parsed.linkedInUrl) setLinkedInUrl(parsed.linkedInUrl);
        if (parsed.portfolioUrls) setPortfolioUrls(parsed.portfolioUrls);
        if (parsed.expectedSalary) setExpectedSalary(parsed.expectedSalary);
        if (parsed.coverLetterText) setCoverLetterText(parsed.coverLetterText);
        if (parsed.university) setUniversity(parsed.university);
        if (parsed.degree) setDegree(parsed.degree);
      }
    } catch (e) {}
  }, [storageKey]);

  // 2. Autosave Draft to localStorage
  useEffect(() => {
    try {
      const draftData = {
        fullName,
        email,
        phone,
        currentLocation,
        linkedInUrl,
        portfolioUrls,
        expectedSalary,
        coverLetterText,
        university,
        degree,
      };
      localStorage.setItem(storageKey, JSON.stringify(draftData));
    } catch (e) {}
  }, [
    fullName,
    email,
    phone,
    currentLocation,
    linkedInUrl,
    portfolioUrls,
    expectedSalary,
    coverLetterText,
    university,
    degree,
    storageKey,
  ]);

  // Portfolio URL helpers
  const handleAddPortfolioUrl = () => {
    setPortfolioUrls([...portfolioUrls, ""]);
  };

  const handleUpdatePortfolioUrl = (idx: number, val: string) => {
    const next = [...portfolioUrls];
    next[idx] = val;
    setPortfolioUrls(next);
  };

  const handleRemovePortfolioUrl = (idx: number) => {
    if (portfolioUrls.length === 1) {
      setPortfolioUrls([""]);
    } else {
      setPortfolioUrls(portfolioUrls.filter((_, i) => i !== idx));
    }
  };

  // CV File Selection & Validation
  const handleFileSelect = async (file: File) => {
    setUploadError("");
    setUploadProgress(10);

    const validation = await validateUploadedFile(file, false);
    if (!validation.valid) {
      setUploadError(validation.error || "Invalid file format");
      setCvFile(null);
      setCvFileName("");
      setUploadProgress(0);
      return;
    }

    // Simulate progressive upload animation
    let current = 20;
    const timer = setInterval(() => {
      current += 25;
      if (current >= 100) {
        clearInterval(timer);
        setUploadProgress(100);
        setCvFile(file);
        setCvFileName(file.name);
      } else {
        setUploadProgress(current);
      }
    }, 80);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  // Step Validation Checkers
  const canProceedStep1 = fullName.trim().length >= 2 && email.includes("@") && phone.trim().length >= 7 && currentLocation.trim().length >= 2;
  const canProceedStep2 = isInternship ? university.trim().length > 0 && degree.trim().length > 0 : true;
  const canProceedStep3 = cvFile !== null;
  const canSubmit = privacyConsent && !isSubmitting;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    // Honeypot check
    if (honeypot.trim().length > 0) {
      setSubmitError("Spam detection triggered.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        jobId: job ? job.id : "general",
        jobSlug: job ? job.slug : "general-talent-pool",
        jobTitle: job ? job.title : "General Talent Pool",
        fullName,
        email,
        phone,
        currentLocation,
        linkedInUrl,
        portfolioUrls: portfolioUrls.filter((u) => u.trim().length > 0),
        coverLetterText,
        referralSource,
        referralCode: referralCode || "",
        expectedSalary,
        noticePeriod,
        availabilityDate,
        internshipDetails: isInternship
          ? { university, degree, graduationYear }
          : undefined,
        privacyConsent,
        talentPoolConsent,
        fileName: cvFileName,
        fileSize: cvFile?.size || 1024000,
        fileType: cvFile?.type || "application/pdf",
      };

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed. Please try again.");
      }

      setSubmittedRefId(data.referenceId || "QM-APP-" + Math.floor(10000 + Math.random() * 90000));
      // clear draft from storage
      localStorage.removeItem(storageKey);
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyRefToClipboard = () => {
    if (submittedRefId) {
      navigator.clipboard.writeText(submittedRefId);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  // SUCCESS SCREEN
  if (submittedRefId) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16 text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="rounded-3xl border border-plum/10 bg-white p-8 sm:p-14 shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <span className="mt-6 inline-block font-mono text-xs font-bold uppercase tracking-widest text-violet">
            APPLICATION RECEIVED // 2026
          </span>

          <h2 className="mt-2 text-3xl font-black text-plum">
            You&apos;re in the pipeline, {fullName.split(" ")[0]}!
          </h2>

          <p className="mt-3 text-sm text-plum/70 leading-relaxed max-w-md mx-auto">
            We have received your application for{" "}
            <strong>{job ? job.title : "Quantimite General Talent Pool"}</strong>. A confirmation email has been dispatched to <strong>{email}</strong>.
          </p>

          {/* Reference ID Card */}
          <div className="mt-8 rounded-2xl border border-plum/10 bg-mist p-5 flex items-center justify-between max-w-md mx-auto">
            <div className="text-left">
              <span className="block font-mono text-[10px] text-plum/50 uppercase">
                APPLICATION REFERENCE ID
              </span>
              <span className="font-mono text-base font-extrabold text-plum">
                {submittedRefId}
              </span>
            </div>

            <button
              onClick={copyRefToClipboard}
              className="inline-flex items-center gap-1.5 rounded-full border border-plum/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-plum hover:bg-mist cursor-pointer"
            >
              {copiedRef ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5 text-violet" />}
              <span>{copiedRef ? "Copied" : "Copy"}</span>
            </button>
          </div>

          {/* Next Steps Timeline */}
          <div className="mt-8 text-left border-t border-plum/10 pt-6 space-y-3 max-w-md mx-auto text-xs text-plum/75">
            <h4 className="font-bold uppercase tracking-wider text-plum/60 text-[11px]">
              What happens next
            </h4>
            <div className="flex items-start gap-2.5">
              <span className="h-2 w-2 rounded-full bg-violet mt-1.5 shrink-0" />
              <span>Our engineering leadership will review your profile within <strong>24–48 hours</strong>.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="h-2 w-2 rounded-full bg-azure mt-1.5 shrink-0" />
              <span>You can track your real-time stage anytime using your Reference ID.</span>
            </div>
          </div>

          {/* Navigation CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/careers/track"
              className="btn-fill rounded-full px-6 py-3 text-xs font-bold"
            >
              <span>Track Application Status</span>
            </Link>
            <Link
              href="/careers"
              className="btn-outline rounded-full px-6 py-3 text-xs font-semibold text-plum"
            >
              <span>Return to Careers</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10 sm:py-16">
      {/* Back button */}
      <div className="mb-6">
        <Link
          href={job ? `/careers/${job.slug}` : "/careers"}
          className="inline-flex items-center gap-2 text-xs font-semibold text-plum/60 hover:text-plum transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>{job ? `Back to ${job.title}` : "Back to all positions"}</span>
        </Link>
      </div>

      <div className="rounded-3xl border border-plum/10 bg-white p-6 sm:p-12 shadow-md">
        {/* Header */}
        <div className="border-b border-plum/10 pb-6">
          <div className="flex items-center justify-between text-xs text-plum/60">
            <span className="badge badge-primary font-bold">
              {job ? job.department : "Talent Network"}
            </span>
            <span className="font-mono font-semibold">
              STEP {currentStep} OF {totalSteps}
            </span>
          </div>

          <h1 className="mt-3 text-2xl sm:text-3xl font-black text-plum">
            {job ? `Apply: ${job.title}` : "Join Quantimite Talent Pool"}
          </h1>

          <p className="mt-1.5 text-xs sm:text-sm text-plum/70 font-light">
            Fill in your credentials. Drafts are automatically saved in your browser.
          </p>

          {/* Progress Indicator */}
          <div className="mt-6 flex items-center gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  currentStep >= step
                    ? "bg-gradient-to-r from-violet to-azure"
                    : "bg-plum/10"
                }`}
              />
            ))}
          </div>
        </div>

        {submitError && (
          <div className="mt-6 rounded-2xl border border-danger/20 bg-danger/10 p-4 text-xs font-semibold text-danger flex items-center gap-2">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-8">
          {/* Honeypot hidden input */}
          <input
            type="text"
            name="website_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          {/* STEP 1: PERSONAL DETAILS */}
          {currentStep === 1 && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-plum border-b border-plum/5 pb-2">
                1. Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-plum mb-1.5">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Maya Chen"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum mb-1.5">
                    Phone Number (with Country Code) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+94 77 123 4567"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum mb-1.5">
                    Current Location (City, Country) *
                  </label>
                  <input
                    type="text"
                    required
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    placeholder="e.g. Colombo, Sri Lanka / Remote"
                    className="input"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: EXPERIENCE, LINKS & INTERNSHIP SPECIFICS */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-plum border-b border-plum/5 pb-2">
                2. Experience & Digital Presence
              </h3>

              {isInternship && (
                <div className="rounded-2xl border border-azure/20 bg-azure/5 p-5 space-y-4">
                  <div className="flex items-center gap-2 text-azure text-xs font-bold uppercase">
                    <GraduationCap className="h-4 w-4" />
                    <span>Student / Academic Details</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-plum mb-1">
                        University / Institution *
                      </label>
                      <input
                        type="text"
                        required
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder="e.g. University of Moratuwa / IIT"
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-plum mb-1">
                        Graduation Year *
                      </label>
                      <select
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        className="select"
                      >
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028+">2028+</option>
                      </select>
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-xs font-bold text-plum mb-1">
                        Degree Programme *
                      </label>
                      <input
                        type="text"
                        required
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                        placeholder="e.g. BSc (Hons) in Computer Science"
                        className="input"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-plum mb-1.5">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum mb-1.5">
                    Portfolio / GitHub / Personal Website Links
                  </label>
                  {portfolioUrls.map((url, idx) => (
                    <div key={idx} className="flex items-center gap-2 mb-2">
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => handleUpdatePortfolioUrl(idx, e.target.value)}
                        placeholder="https://github.com/your-username or portfolio.com"
                        className="input"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePortfolioUrl(idx)}
                        className="p-2 text-plum/40 hover:text-danger transition"
                        title="Remove link"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={handleAddPortfolioUrl}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-violet hover:underline pt-1 cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add another link</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-plum mb-1">
                      Expected Salary (USD / mo)
                    </label>
                    <input
                      type="text"
                      value={expectedSalary}
                      onChange={(e) => setExpectedSalary(e.target.value)}
                      placeholder="e.g. $6,000 / mo"
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-plum mb-1">
                      Notice Period
                    </label>
                    <select
                      value={noticePeriod}
                      onChange={(e) => setNoticePeriod(e.target.value)}
                      className="select"
                    >
                      <option value="Immediate">Immediate</option>
                      <option value="2 Weeks">2 Weeks</option>
                      <option value="1 Month">1 Month</option>
                      <option value="2 Months+">2 Months+</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-plum mb-1">
                      Earliest Availability Date
                    </label>
                    <input
                      type="date"
                      value={availabilityDate}
                      onChange={(e) => setAvailabilityDate(e.target.value)}
                      className="input"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum mb-1">
                    How did you hear about Quantimite?
                  </label>
                  <select
                    value={referralSource}
                    onChange={(e) => setReferralSource(e.target.value)}
                    className="select"
                  >
                    <option value="">Select source...</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Twitter/X">Twitter / X</option>
                    <option value="University Career Fair">University Career Fair</option>
                    <option value="Colleague / Referral">Colleague / Friend Referral</option>
                    <option value="GitHub">GitHub / Open Source</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: CV UPLOAD & COVER LETTER */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-plum border-b border-plum/5 pb-2">
                3. Resume / CV Upload & Cover Letter
              </h3>

              {/* Upload Drag & Drop Area */}
              <div>
                <label className="block text-xs font-bold text-plum mb-2">
                  Attach CV / Resume (PDF or DOCX, Max 5MB) *
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`group relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 text-center cursor-pointer transition-all ${
                    cvFile
                      ? "border-emerald-500/40 bg-emerald-50/50"
                      : uploadError
                      ? "border-danger/40 bg-danger/5"
                      : "border-plum/20 bg-mist/40 hover:border-violet/40 hover:bg-mist"
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                    className="hidden"
                  />

                  {cvFile ? (
                    <div className="flex items-center gap-3 text-left">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-600">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-plum">{cvFileName}</p>
                        <p className="text-xs text-emerald-700 font-semibold">
                          Validated & Scanned Safe ({(cvFile.size / (1024 * 1024)).toFixed(2)} MB)
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet/10 text-violet transition-transform group-hover:scale-110">
                        <Upload className="h-6 w-6" />
                      </div>
                      <p className="mt-3 text-sm font-bold text-plum">
                        Drag and drop your resume here, or{" "}
                        <span className="text-violet underline">browse files</span>
                      </p>
                      <p className="mt-1 text-xs text-plum/50">
                        PDF or DOCX only. Strict security & magic byte validation enforced.
                      </p>
                    </>
                  )}

                  {/* Progress bar */}
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="w-full max-w-xs mt-4">
                      <div className="h-1.5 w-full bg-plum/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-violet transition-all duration-100"
                          style={{ width: `${uploadProgress}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-plum/60 mt-1 block">Uploading {uploadProgress}%</span>
                    </div>
                  )}
                </div>

                {uploadError && (
                  <p className="mt-2 text-xs font-semibold text-danger flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{uploadError}</span>
                  </p>
                )}
              </div>

              {/* Cover Letter Text Area */}
              <div>
                <label className="block text-xs font-bold text-plum mb-1.5">
                  Cover Letter / Note to Engineering Leadership (Optional)
                </label>
                <textarea
                  value={coverLetterText}
                  onChange={(e) => setCoverLetterText(e.target.value)}
                  placeholder="Tell us about the problems you love solving, the hardest technical challenges you overcame, or why Quantimite resonates with you..."
                  className="textarea"
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* STEP 4: CONSENT, PRIVACY & SUBMIT */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-plum border-b border-plum/5 pb-2">
                4. Privacy Notice & Review
              </h3>

              {/* Summary Review Card */}
              <div className="rounded-2xl border border-plum/10 bg-mist/50 p-5 space-y-3 text-xs text-plum/80">
                <div className="flex justify-between border-b border-plum/5 pb-2">
                  <span className="text-plum/50">Applicant:</span>
                  <span className="font-bold text-plum">{fullName} ({email})</span>
                </div>
                <div className="flex justify-between border-b border-plum/5 pb-2">
                  <span className="text-plum/50">Target Position:</span>
                  <span className="font-bold text-plum">{job ? job.title : "General Talent Pool"}</span>
                </div>
                <div className="flex justify-between border-b border-plum/5 pb-2">
                  <span className="text-plum/50">Attached Document:</span>
                  <span className="font-bold text-emerald-700">{cvFileName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-plum/50">Location:</span>
                  <span className="font-semibold text-plum">{currentLocation}</span>
                </div>
              </div>

              {/* Mandatory Consent Checkbox */}
              <div className="rounded-2xl border border-plum/10 bg-white p-5 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={privacyConsent}
                    onChange={(e) => setPrivacyConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-plum/20 text-violet focus:ring-violet cursor-pointer"
                  />
                  <span className="text-xs text-plum/80 leading-relaxed">
                    <strong>I agree to the Quantimite Privacy Notice *</strong>. I consent to the storage and processing of my application data for recruitment purposes. My submission timestamp, policy version (2026.1), and cryptographic IP hash will be recorded.
                  </span>
                </label>

                {/* Optional Talent Pool 12-month Consent */}
                <label className="flex items-start gap-3 cursor-pointer pt-2 border-t border-plum/5">
                  <input
                    type="checkbox"
                    checked={talentPoolConsent}
                    onChange={(e) => setTalentPoolConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-plum/20 text-violet focus:ring-violet cursor-pointer"
                  />
                  <span className="text-xs text-plum/70 leading-relaxed">
                    Keep my profile and portfolio in the Quantimite Talent Network for <strong>12 months</strong> so leadership can reach out when relevant pods or senior roles open.
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-2 text-xs text-plum/60 font-medium">
                <ShieldCheck className="h-4 w-4 text-violet" />
                <span>All uploaded resumes are scanned for malware and encrypted at rest.</span>
              </div>
            </div>
          )}

          {/* Form Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-plum/10">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="btn-outline flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-semibold text-plum cursor-pointer"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Previous</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < totalSteps ? (
              <button
                type="button"
                disabled={
                  (currentStep === 1 && !canProceedStep1) ||
                  (currentStep === 2 && !canProceedStep2) ||
                  (currentStep === 3 && !canProceedStep3)
                }
                onClick={() => setCurrentStep(currentStep + 1)}
                className="btn-fill flex items-center gap-1.5 rounded-full px-6 py-2.5 text-xs font-bold cursor-pointer disabled:opacity-40"
              >
                <span>Continue</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canSubmit}
                className="btn-fill flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-wider cursor-pointer shadow-lg shadow-violet/25 disabled:opacity-40"
              >
                {isSubmitting ? (
                  <span>Encrypting & Submitting...</span>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <CheckCircle2 className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
