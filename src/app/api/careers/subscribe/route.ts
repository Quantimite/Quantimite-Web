import { NextResponse } from "next/server";
import { CareersStore } from "@/lib/careers/store";
import { validateEmail } from "@/lib/careers/validation";

export async function POST(req: Request) {
  try {
    const { email, department, jobType } = await req.json();

    if (!email || !validateEmail(email)) {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const sub = CareersStore.addSubscriber(email, department, jobType);

    return NextResponse.json({
      success: true,
      subscriber: sub,
      message: "Subscribed to job alerts successfully.",
    });
  } catch (err) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
