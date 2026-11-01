"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SLUG, createSession } from "@/lib/cmp";

export async function login(fd: FormData) {
  const username = String(fd.get("username") || "").trim().toLowerCase();
  const password = String(fd.get("password") || "");
  const ok = !!process.env.CMP_ADMIN_PASSWORD && username === (process.env.CMP_ADMIN_USERNAME || "").trim().toLowerCase() && password === process.env.CMP_ADMIN_PASSWORD;
  if (!ok) redirect(`/${SLUG}?error=1`);
  (await cookies()).set("cmp_session", await createSession(username, "super_admin"), {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "strict", path: "/", maxAge: 60 * 60 * 8,
  });
  redirect(`/${SLUG}/dashboard`);
}
export async function logout() {
  (await cookies()).delete("cmp_session");
  redirect(`/${SLUG}`);
}
