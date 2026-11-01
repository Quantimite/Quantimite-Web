import { NextRequest, NextResponse } from "next/server";
import { SLUG, readSession } from "@/lib/cmp";

const notFound = (req: NextRequest) => NextResponse.rewrite(new URL("/404-not-found", req.url), { status: 404 });

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // everything inside the secret portal (except its login page) needs a valid session, otherwise a plain 404
  if (pathname.startsWith(`/${SLUG}/`)) {
    if (!(await readSession(req.cookies.get("cmp_session")?.value))) return notFound(req);
  }
  // guessable admin URLs simply do not exist
  if (/^\/(admin|wp-admin|wp-login|login|dashboard|cms)(\/|$)/.test(pathname)) return notFound(req);
  return NextResponse.next();
}
export const config = { matcher: ["/((?!_next|api|favicon.ico|assets|.*\\..*).*)"] };
