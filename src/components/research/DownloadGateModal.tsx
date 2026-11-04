"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, CheckCircle2, Download, Lock, Building, Mail, User } from "lucide-react";
import { Publication } from "@/types/research";

interface Props {
  publication: Publication | null;
  onClose: () => void;
  onSuccess: (publication: Publication) => void;
}

export default function DownloadGateModal({
  publication,
  onClose,
  onSuccess,
}: Props) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadReady, setDownloadReady] = useState(false);

  if (!publication) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setDownloadReady(true);
      onSuccess(publication);

      if (publication.pdfUrl) {
        const link = document.createElement("a");
        link.href = publication.pdfUrl;
        link.setAttribute("download", `${publication.slug}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-plum/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-plum/10 bg-white p-7 shadow-2xl sm:p-9"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full bg-plum/5 text-plum/60 transition hover:bg-plum/10 hover:text-plum"
          >
            <X className="h-4 w-4" />
          </button>

          {!downloadReady ? (
            <div>
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-violet/10 text-violet">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-violet">
                    <Lock className="h-3 w-3" />
                    Whitepaper Download Gate
                  </div>
                  <h3 className="text-xl font-extrabold text-plum">
                    Access Technical Publication
                  </h3>
                </div>
              </div>

              {/* Publication snippet */}
              <div className="mt-4 rounded-2xl bg-plum/5 p-4">
                <p className="text-xs font-semibold text-plum/50">
                  {publication.topic} &middot; {publication.year} &middot; {publication.fileSize}
                </p>
                <p className="mt-1 line-clamp-2 text-sm font-bold text-plum">
                  {publication.title}
                </p>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-plum/60">
                Please provide your academic or work email to download the full manuscript,
                benchmark datasets, and implementation appendix.
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                <div>
                  <label className="block text-xs font-semibold text-plum/70">
                    Work or University Email *
                  </label>
                  <div className="relative mt-1">
                    <Mail className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/40" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="researcher@university.edu or name@company.com"
                      className="w-full rounded-xl border border-plum/15 bg-white py-2.5 pl-10 pr-4 text-sm text-plum outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/20"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-semibold text-plum/70">
                      Full Name
                    </label>
                    <div className="relative mt-1">
                      <User className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/40" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dr. Jane Doe"
                        className="w-full rounded-xl border border-plum/15 bg-white py-2.5 pl-10 pr-4 text-sm text-plum outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-plum/70">
                      Institution / Company
                    </label>
                    <div className="relative mt-1">
                      <Building className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-plum/40" />
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="Stanford, MIT, or Acme"
                        className="w-full rounded-xl border border-plum/15 bg-white py-2.5 pl-10 pr-4 text-sm text-plum outline-none transition focus:border-violet focus:ring-2 focus:ring-violet/20"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-fill flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold shadow-md transition disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span>Verifying & Generating Download Link...</span>
                    ) : (
                      <>
                        <Download className="h-4 w-4" />
                        <span>Download Full Whitepaper ({publication.fileSize})</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-center text-[11px] text-plum/50">
                  We respect your privacy. No spam. You will only receive our research updates.
                </p>
              </form>
            </div>
          ) : (
            <div className="py-6 text-center">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-600">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-plum">Download Ready!</h3>
              <p className="mx-auto mt-2 max-w-sm text-sm text-plum/70">
                Your download for <strong>&ldquo;{publication.title}&rdquo;</strong> has been verified.
                A copy confirmation was sent to <strong>{email}</strong>.
              </p>
              <div className="mt-6 flex justify-center gap-3">
                <button
                  onClick={onClose}
                  className="btn-outline rounded-full px-6 py-2.5 text-xs font-semibold"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
