import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const QUANTIMITE_SYSTEM_PROMPT = `
You are the assistant for Quantimite.
Quantimite is a technology and digital growth partner offering software engineering, product design, and digital marketing.
Tagline: "We engineer your next move."
Approach: Understand → Plan → Create → Improve.

FORMATTING RULES:
1. Keep responses short, clean, and easy to read in a compact chat window (3-5 lines max unless asked for detail).
2. Use simple markdown bullet points (- **Title**: Brief description) when listing items.
3. Avoid excessive emojis or filler text.
4. End with a brief, polite question or call to action (e.g., "Would you like to book a consultation or discuss your project?").

Services:
- **Software Engineering**: Custom web & mobile apps (Next.js, React, Node.js, TypeScript), SaaS, APIs, cloud & DevOps.
- **UI/UX Design**: Product design, wireframing, prototypes, and design systems.
- **Digital Growth**: SEO, performance marketing, brand identity, and analytics.

Contact:
- Direct inquiries to contact@quantimite.com or the site's consultation form.
`;

function getSmartFallbackReply(userMessage: string): string {
  const query = userMessage.toLowerCase();

  if (query.includes("service") || query.includes("what do you do") || query.includes("offer")) {
    return `We help businesses grow across two core areas:

- **Software Engineering**: Custom web & mobile apps, SaaS platforms, APIs, and cloud infrastructure.
- **Digital Growth & Design**: UI/UX product design, SEO, and performance marketing.

Which area are you looking to explore?`;
  }

  if (query.includes("price") || query.includes("cost") || query.includes("quote") || query.includes("estimate") || query.includes("rate")) {
    return `Our pricing is tailored to your project's scope and timeline:

- **Project-Based**: Fixed scope for MVPs, web apps, or redesigns.
- **Dedicated Team**: Ongoing engineering and growth support.

Email us at **contact@quantimite.com** for a free estimate.`;
  }

  if (query.includes("consult") || query.includes("contact") || query.includes("call") || query.includes("email") || query.includes("hire") || query.includes("start")) {
    return `You can reach our team directly:

- **Email**: [contact@quantimite.com](mailto:contact@quantimite.com)
- **Consultation**: Click **Start a project** on our website to schedule a free discovery call.

Tell us a bit about your project here if you'd like to start!`;
  }

  if (query.includes("tech") || query.includes("stack") || query.includes("framework")) {
    return `Our core technology stack includes:

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Python, PostgreSQL, GraphQL, REST APIs
- **Cloud**: AWS, Google Cloud, Docker, Vercel

Do you have a specific stack in mind for your project?`;
  }

  return `Hi! Quantimite builds custom software, product designs, and digital growth strategies.

Ask me about our **services**, **tech stack**, **pricing**, or how to **start a project**.`;
}

function withTimeout<T>(promise: Promise<T>, ms: number = 8000): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`Request timed out after ${ms}ms`)), ms)
    ),
  ]);
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Invalid request: messages array is required." },
        { status: 400 }
      );
    }

    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey.trim() === "" || apiKey === "paste_your_AIzaSy_key_here") {
      const fallbackReply = getSmartFallbackReply(lastUserMessage);
      return NextResponse.json({ reply: fallbackReply, source: "local-knowledge-base" });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });

      const contents = messages
        .filter((_, idx) => idx > 0 || messages[0].role === "user")
        .map((m: { role: string; content: string }) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        }));

      const response = await withTimeout(
        ai.models.generateContent({
          model: "gemini-3.5-flash-lite",
          contents,
          config: {
            systemInstruction: QUANTIMITE_SYSTEM_PROMPT,
          },
        }),
        8000
      );

      const replyText = response.text || "";

      if (replyText) {
        return NextResponse.json({ reply: replyText, source: "gemini-ai" });
      }
    } catch (apiErr: any) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const fallbackResponse = await withTimeout(
          ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: [{ role: "user", parts: [{ text: lastUserMessage }] }],
            config: {
              systemInstruction: QUANTIMITE_SYSTEM_PROMPT,
            },
          }),
          8000
        );
        if (fallbackResponse.text) {
          return NextResponse.json({ reply: fallbackResponse.text, source: "gemini-ai" });
        }
      } catch {
        // Fallback below
      }
    }

    return NextResponse.json({ reply: getSmartFallbackReply(lastUserMessage), source: "fallback" });
  } catch {
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
