import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email format." },
        { status: 400 }
      );
    }

    // In production, sync with your CMS, Mailchimp, Loops, or Resend here.
    // For now, accept and log subscription:
    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing! You are now on the Quantimite Insights list.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while processing your subscription." },
      { status: 500 }
    );
  }
}
