export interface ValidationResult<T> {
  success: boolean;
  data?: T;
  errors?: Record<string, string>;
}

export function sanitizeText(input: unknown): string {
  if (typeof input !== "string") return "";
  return input
    .replace(/\0/g, "") // remove null bytes
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "") // strip scripts
    .trim();
}

export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return re.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  // basic check for length and valid international phone chars
  const cleaned = phone.replace(/[\s\-\(\)\+]/g, "");
  return cleaned.length >= 7 && cleaned.length <= 15 && /^\d+$/.test(cleaned);
}

export function validateUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export interface ApplicationInput {
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  currentLocation: string;
  linkedInUrl?: string;
  portfolioUrls?: string[];
  coverLetterText?: string;
  referralSource?: string;
  referralCode?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  availabilityDate?: string;
  internshipDetails?: {
    university: string;
    degree: string;
    graduationYear: string;
  };
  privacyConsent: boolean;
  talentPoolConsent?: boolean;
  honeypot?: string;
}

export function validateApplicationForm(input: ApplicationInput): ValidationResult<ApplicationInput> {
  const errors: Record<string, string> = {};

  // Honeypot spam trap
  if (input.honeypot && input.honeypot.trim().length > 0) {
    errors.honeypot = "Spam detected";
    return { success: false, errors };
  }

  const fullName = sanitizeText(input.fullName);
  if (!fullName || fullName.length < 2) {
    errors.fullName = "Full name must be at least 2 characters";
  }

  const email = sanitizeText(input.email);
  if (!email || !validateEmail(email)) {
    errors.email = "Please provide a valid email address";
  }

  const phone = sanitizeText(input.phone);
  if (!phone || !validatePhone(phone)) {
    errors.phone = "Please provide a valid phone number (e.g. +1 555 123 4567)";
  }

  const location = sanitizeText(input.currentLocation);
  if (!location) {
    errors.currentLocation = "Current location is required";
  }

  if (input.linkedInUrl && input.linkedInUrl.trim()) {
    if (!validateUrl(input.linkedInUrl.trim())) {
      errors.linkedInUrl = "Invalid LinkedIn URL format";
    }
  }

  if (input.portfolioUrls && input.portfolioUrls.length > 0) {
    for (const url of input.portfolioUrls) {
      if (url.trim() && !validateUrl(url.trim())) {
        errors.portfolioUrls = "One or more portfolio links have an invalid URL format";
        break;
      }
    }
  }

  // Required Privacy Policy Consent
  if (!input.privacyConsent) {
    errors.privacyConsent = "You must review and agree to our Privacy Notice to submit your application";
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      ...input,
      fullName,
      email: email.toLowerCase(),
      phone,
      currentLocation: location,
      coverLetterText: sanitizeText(input.coverLetterText),
      expectedSalary: sanitizeText(input.expectedSalary),
      noticePeriod: sanitizeText(input.noticePeriod),
      availabilityDate: sanitizeText(input.availabilityDate),
      referralSource: sanitizeText(input.referralSource),
      referralCode: sanitizeText(input.referralCode),
    },
  };
}
