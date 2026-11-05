import { NextResponse } from "next/server";
import { CareersStore } from "@/lib/careers/store";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const refId = searchParams.get("ref")?.trim();
  const email = searchParams.get("email")?.trim().toLowerCase();

  if (!refId || !email) {
    return NextResponse.json(
      { error: "Both Reference ID and Email are required to track an application." },
      { status: 400 }
    );
  }

  const app = CareersStore.getAllApplications().find(
    (a) => a.id.toLowerCase() === refId.toLowerCase() && a.email.toLowerCase() === email
  );

  if (!app) {
    return NextResponse.json(
      { error: "No matching application found. Please check your reference ID and email." },
      { status: 404 }
    );
  }

  // Return public tracking safe representation (omit internal evaluation notes & rating)
  return NextResponse.json({
    success: true,
    application: {
      id: app.id,
      jobTitle: app.jobTitle,
      fullName: app.fullName,
      status: app.status,
      submittedAt: app.submittedAt,
      timeline: app.statusHistory.map((s) => ({
        status: s.status,
        timestamp: s.timestamp,
      })),
    },
  });
}
