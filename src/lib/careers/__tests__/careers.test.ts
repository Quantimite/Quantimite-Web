import { verifyMagicBytes } from "../upload";
import { validateApplicationForm, validateEmail, validatePhone } from "../validation";
import { CareersStore } from "../store";

describe("Careers Module Verification Suite", () => {
  // Test 1: Upload security & Magic Bytes
  test("verifyMagicBytes detects valid PDF header", () => {
    // '%PDF-' => 0x25, 0x50, 0x44, 0x46, 0x2d
    const pdfBytes = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37]);
    const result = verifyMagicBytes(pdfBytes);
    expect(result.valid).toBe(true);
    expect(result.detectedType).toBe("application/pdf");
  });

  test("verifyMagicBytes detects valid DOCX (ZIP) header", () => {
    // 'PK\x03\x04' => 0x50, 0x4b, 0x03, 0x04
    const docxBytes = new Uint8Array([0x50, 0x4b, 0x03, 0x04, 0x14, 0x00, 0x06, 0x00]);
    const result = verifyMagicBytes(docxBytes);
    expect(result.valid).toBe(true);
    expect(result.detectedType).toBe("application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  });

  test("verifyMagicBytes rejects fake executable or random script", () => {
    const maliciousBytes = new Uint8Array([0x4d, 0x5a, 0x90, 0x00, 0x03]); // MZ DOS header
    const result = verifyMagicBytes(maliciousBytes);
    expect(result.valid).toBe(false);
  });

  // Test 2: Input & Form validation
  test("validateEmail correctly handles valid and invalid emails", () => {
    expect(validateEmail("engineer@quantimite.com")).toBe(true);
    expect(validateEmail("invalid-email")).toBe(false);
    expect(validateEmail("missing@domain")).toBe(false);
  });

  test("validateApplicationForm enforces required privacy consent", () => {
    const invalidForm = {
      jobId: "job-01",
      fullName: "Nadeesha Fernando",
      email: "nadeesha@example.com",
      phone: "+94 77 123 4567",
      currentLocation: "Colombo",
      privacyConsent: false, // Not agreed
    };

    const res = validateApplicationForm(invalidForm as any);
    expect(res.success).toBe(false);
    expect(res.errors?.privacyConsent).toBeDefined();
  });

  test("validateApplicationForm catches honeypot spam bot", () => {
    const spamForm = {
      jobId: "job-01",
      fullName: "Spam Bot",
      email: "bot@spam.com",
      phone: "+1 555 123 4567",
      currentLocation: "Nowhere",
      privacyConsent: true,
      honeypot: "http://spam-link.ru", // Bot filled hidden honeypot
    };

    const res = validateApplicationForm(spamForm as any);
    expect(res.success).toBe(false);
    expect(res.errors?.honeypot).toBe("Spam detected");
  });

  // Test 3: Status transitions and audit logging
  test("CareersStore transitions applicant status and records audit log", () => {
    const apps = CareersStore.getAllApplications();
    const candidate = apps[0];
    expect(candidate).toBeDefined();

    const previousStatus = candidate.status;
    CareersStore.updateApplicationStatus(candidate.id, "Interview", "Test Recruiter", "Scheduled technical chat");

    const updated = CareersStore.getApplicationById(candidate.id);
    expect(updated?.status).toBe("Interview");
    expect(updated?.statusHistory[0].status).toBe("Interview");
    expect(updated?.statusHistory[0].changedBy).toBe("Test Recruiter");

    // Verify audit log entry
    const auditLogs = CareersStore.getAuditLogs();
    const recentLog = auditLogs.find((l) => l.targetId === candidate.id && l.action === "STATUS_CHANGE");
    expect(recentLog).toBeDefined();
    expect(recentLog?.actor).toBe("Test Recruiter");
  });
});
