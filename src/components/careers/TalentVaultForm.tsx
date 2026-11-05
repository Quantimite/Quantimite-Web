"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  ShieldCheck,
  GraduationCap,
  Briefcase,
  Terminal,
  ArrowRight,
} from "lucide-react";

const TRACKS = [
  { id: "fullstack", label: "Full-Stack & Edge", icon: Terminal },
  { id: "ai-systems", label: "AI & Distributed Systems", icon: Sparkles },
  { id: "creative-3d", label: "Creative 3D & Interfaces", icon: Briefcase },
  { id: "internship", label: "Student & Intern Fellowship", icon: GraduationCap },
];

export default function TalentVaultForm() {
  const [selectedTrack, setSelectedTrack] = useState("fullstack");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [linkedInUrl, setLinkedInUrl] = useState("");
  const [pitchText, setPitchText] = useState("");

  // Student specific
  const [university, setUniversity] = useState("");
  const [degree, setDegree] = useState("");
  const [graduationYear, setGraduationYear] = useState("2026");

  const [privacyConsent, setPrivacyConsent] = useState(true);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submittedRefId, setSubmittedRefId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const isStudent = selectedTrack === "internship";

  const handleCopy = () => {
    if (submittedRefId) {
      navigator.clipboard.writeText(submittedRefId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!fullName.trim() || !email.trim() || !phone.trim() || !currentLocation.trim()) {
      setErrorMessage("Please complete all required fields (Name, Email, Phone, and Location).");
      return;
    }

    if (!privacyConsent) {
      setErrorMessage("Please agree to the privacy policy to submit your profile.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        jobId: isStudent ? "internship-fellowship-radar" : `talent-vault-${selectedTrack}`,
        jobSlug: isStudent ? "internship-fellowship-radar" : `talent-vault-${selectedTrack}`,
        jobTitle: isStudent
          ? "Student & Intern Fellowship (Speculative Radar)"
          : `Speculative Application: ${TRACKS.find((t) => t.id === selectedTrack)?.label || "Engineering"}`,
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        currentLocation: currentLocation.trim(),
        linkedInUrl: linkedInUrl.trim() || undefined,
        portfolioUrls: portfolioUrl.trim() ? [portfolioUrl.trim()] : [],
        coverLetterText: pitchText.trim(),
        expectedSalary: "Open / Market Rate",
        noticePeriod: isStudent ? "Next Semester / Immediate" : "Standard",
        privacyConsent: true,
        talentPoolConsent: true,
        internshipDetails: isStudent
          ? {
              university: university.trim() || "University",
              degree: degree.trim() || "Software Engineering / CS",
              graduationYear,
            }
          : undefined,
      };

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit profile. Please try again.");
      }

      setSubmittedRefId(data.referenceId || "QM-APP-TALENT");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="talent-vault" className="py-20 sm:py-28 bg-[#fbfaff] relative">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet">
            <Sparkles className="h-3.5 w-3.5" />
            <span>JOIN OUR TALENT VAULT</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-5xl font-black tracking-tight text-plum">
            Fast-Track Your Profile for Future Seats.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-plum/70 font-light max-w-xl mx-auto leading-relaxed">
            Even when active openings are closed, our founding partners review every submission in our Talent Vault. When a pod expands or an internship opens, candidates here are reached first.
          </p>
        </div>

        {/* Form Container */}
        <div className="mt-12 rounded-3xl border border-plum/10 bg-white p-7 sm:p-12 shadow-sm">
          {submittedRefId ? (
            /* Success State */
            <div className="text-center py-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="mt-5 text-2xl font-black text-plum">
                You’re in the Quantimite Talent Vault!
              </h3>
              <p className="mt-2 text-sm text-plum/70 max-w-md mx-auto leading-relaxed">
                Your profile has been securely indexed. Our engineering team will review your portfolio. If an opportunity matches your skill set, we will reach out directly.
              </p>

              {/* Reference ID Pill */}
              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-plum/10 bg-mist px-5 py-3 text-sm font-mono text-plum">
                <span className="text-xs text-plum/60 font-sans">Reference:</span>
                <span className="font-bold text-brand">{submittedRefId}</span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-lg p-1 text-plum/60 hover:text-plum hover:bg-white transition-colors"
                  title="Copy reference code"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href={`/careers/track?ref=${submittedRefId}`}
                  className="btn-fill rounded-full px-6 py-3 text-xs font-bold"
                >
                  Track Application Status
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedRefId(null);
                    setFullName("");
                    setEmail("");
                    setPhone("");
                    setPitchText("");
                  }}
                  className="btn-outline rounded-full px-6 py-3 text-xs font-semibold text-plum cursor-pointer"
                >
                  Submit Another Profile
                </button>
              </div>
            </div>
          ) : (
            /* Main Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Track Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-plum/80 mb-3">
                  Select Discipline / Track
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {TRACKS.map((track) => {
                    const Icon = track.icon;
                    const active = selectedTrack === track.id;
                    return (
                      <button
                        key={track.id}
                        type="button"
                        onClick={() => setSelectedTrack(track.id)}
                        className={`flex flex-col items-center justify-center gap-2 rounded-2xl p-3.5 text-xs font-semibold border transition-all cursor-pointer ${
                          active
                            ? "border-violet bg-violet/5 text-violet shadow-xs ring-1 ring-violet"
                            : "border-plum/10 bg-mist/50 text-plum/70 hover:border-plum/20 hover:text-plum"
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-center">{track.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Personal Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold text-plum/80 mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ada Lovelace"
                    className="w-full rounded-2xl border border-plum/15 bg-white px-4 py-3 text-sm text-plum focus:border-violet focus:ring-1 focus:ring-violet outline-hidden transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum/80 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ada@domain.com"
                    className="w-full rounded-2xl border border-plum/15 bg-white px-4 py-3 text-sm text-plum focus:border-violet focus:ring-1 focus:ring-violet outline-hidden transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-plum/80 mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+94 77 123 4567"
                    className="w-full rounded-2xl border border-plum/15 bg-white px-4 py-3 text-sm text-plum focus:border-violet focus:ring-1 focus:ring-violet outline-hidden transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum/80 mb-1.5">
                    Current Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                    placeholder="Colombo, Sri Lanka / Remote"
                    className="w-full rounded-2xl border border-plum/15 bg-white px-4 py-3 text-sm text-plum focus:border-violet focus:ring-1 focus:ring-violet outline-hidden transition-all"
                  />
                </div>
              </div>

              {/* Student Fields if Internship is selected */}
              {isStudent && (
                <div className="rounded-2xl border border-azure/20 bg-azure/5 p-4 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-azure uppercase tracking-wider">
                    <GraduationCap className="h-4 w-4" />
                    <span>Student & Academic Profile</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-plum/80 mb-1">
                        University or Institute
                      </label>
                      <input
                        type="text"
                        value={university}
                        onChange={(e) => setUniversity(e.target.value)}
                        placeholder="University of Moratuwa / IIT / SLIIT / etc."
                        className="w-full rounded-xl border border-plum/15 bg-white px-3.5 py-2.5 text-xs text-plum focus:border-azure outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-plum/80 mb-1">
                        Graduation Year
                      </label>
                      <select
                        value={graduationYear}
                        onChange={(e) => setGraduationYear(e.target.value)}
                        className="w-full rounded-xl border border-plum/15 bg-white px-3 py-2.5 text-xs text-plum focus:border-azure outline-hidden"
                      >
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="Graduated">Already Graduated</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-plum/80 mb-1.5">
                    GitHub or Portfolio URL
                  </label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://github.com/username"
                    className="w-full rounded-2xl border border-plum/15 bg-white px-4 py-3 text-sm text-plum focus:border-violet focus:ring-1 focus:ring-violet outline-hidden transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-plum/80 mb-1.5">
                    LinkedIn Profile URL
                  </label>
                  <input
                    type="url"
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                    className="w-full rounded-2xl border border-plum/15 bg-white px-4 py-3 text-sm text-plum focus:border-violet focus:ring-1 focus:ring-violet outline-hidden transition-all"
                  />
                </div>
              </div>

              {/* Pitch */}
              <div>
                <label className="block text-xs font-bold text-plum/80 mb-1.5">
                  Tell us about something remarkable you built or learned
                </label>
                <textarea
                  rows={3}
                  value={pitchText}
                  onChange={(e) => setPitchText(e.target.value)}
                  placeholder="Share a project link, an architecture problem you solved, or what drives your curiosity..."
                  className="w-full rounded-2xl border border-plum/15 bg-white px-4 py-3 text-sm text-plum focus:border-violet focus:ring-1 focus:ring-violet outline-hidden transition-all resize-none"
                />
              </div>

              {/* Privacy Consent */}
              <div className="flex items-start gap-3 pt-2">
                <input
                  type="checkbox"
                  id="consent"
                  checked={privacyConsent}
                  onChange={(e) => setPrivacyConsent(e.target.checked)}
                  className="mt-1 h-4 w-4 rounded-md border-plum/20 text-violet focus:ring-violet cursor-pointer"
                />
                <label htmlFor="consent" className="text-xs text-plum/70 cursor-pointer">
                  I agree that Quantimite may retain my profile in their Talent Vault to contact me when relevant positions or internship cohorts open. (Protected under our Privacy Policy).
                </label>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <div className="flex items-center gap-2 rounded-2xl bg-red-50 border border-red-200 p-3.5 text-xs text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-600" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-plum/50">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>Encrypted & Confidential</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-fill flex items-center gap-2 rounded-full px-8 py-3.5 text-xs font-bold tracking-wide disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Submitting to Vault...</span>
                  ) : (
                    <>
                      <span>Submit Profile</span>
                      <Send className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
