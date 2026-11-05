import { NextResponse } from "next/server";
import { CareersStore } from "@/lib/careers/store";
import { validateApplicationForm } from "@/lib/careers/validation";
import { ApplicationSubmission } from "@/types/careers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Validation
    const validation = validateApplicationForm(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: "Validation failed", details: validation.errors },
        { status: 400 }
      );
    }

    const {
      jobId,
      jobSlug,
      jobTitle,
      fullName,
      email,
      phone,
      currentLocation,
      linkedInUrl,
      portfolioUrls,
      coverLetterText,
      referralSource,
      referralCode,
      expectedSalary,
      noticePeriod,
      availabilityDate,
      internshipDetails,
      privacyConsent,
      talentPoolConsent,
      fileName,
      fileSize,
      fileType,
    } = body;

    // 2. Duplicate Detection
    const existing = CareersStore.getAllApplications().find(
      (a) => a.email.toLowerCase() === email.toLowerCase() && a.jobId === jobId
    );

    if (existing) {
      return NextResponse.json(
        {
          error:
            "You have already submitted an active application for this role. Your current reference ID is " +
            existing.id +
            ". You can check its stage on our tracking page.",
          existingRefId: existing.id,
        },
        { status: 409 }
      );
    }

    // 3. Generate Reference ID
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const referenceId = `QM-APP-${randomDigits}`;
    const timestamp = new Date().toISOString();

    // 4. Construct Application Record
    const newSubmission: ApplicationSubmission = {
      id: referenceId,
      jobId: jobId || "general",
      jobSlug: jobSlug || "general",
      jobTitle: jobTitle || "General Talent Pool",
      fullName,
      email: email.toLowerCase(),
      phone,
      currentLocation,
      linkedInUrl,
      portfolioUrls: portfolioUrls || [],
      coverLetterText,
      referralSource,
      referralCode,
      expectedSalary,
      noticePeriod,
      availabilityDate,
      internshipDetails,
      status: "New",
      statusHistory: [
        {
          status: "New",
          changedBy: "System",
          timestamp,
          note: "Application submitted via online portal",
        },
      ],
      rating: 0,
      tags: [jobTitle ? jobTitle.split(" ")[0] : "General"],
      notes: [],
      cvFile: {
        id: "file-" + Math.random().toString(36).substring(2, 9),
        name: fileName || "resume.pdf",
        originalName: fileName || "resume.pdf",
        size: fileSize || 1024000,
        mimeType: fileType || "application/pdf",
        storagePath: `cvs/${referenceId}/${fileName || "resume.pdf"}`,
        downloadUrl: "#",
        uploadedAt: timestamp,
        isScannedSafe: true,
      },
      consent: {
        privacyPolicyAgreed: privacyConsent,
        policyVersion: "2026.1",
        timestamp,
        ipHash: Math.random().toString(36).substring(2, 15),
        talentPoolAgreed: talentPoolConsent,
      },
      submittedAt: timestamp,
    };

    CareersStore.submitApplication(newSubmission);

    return NextResponse.json({
      success: true,
      referenceId,
      message: "Application successfully submitted and confirmed.",
    });
  } catch (error: any) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Internal server error processing application." },
      { status: 500 }
    );
  }
}
