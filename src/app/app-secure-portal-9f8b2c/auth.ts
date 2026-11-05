"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAdmin(password: string) {
    if (password === "qmite#1dra") {
        const cookieStore = await cookies();

        cookieStore.set("cmp_session", "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/",
            // Session cookie: clears automatically when the browser tab closes
        });

        return { success: true };
    }
    return { success: false, error: "Invalid credentials" };
}

export async function logoutAdmin() {
    const cookieStore = await cookies();
    cookieStore.delete("cmp_session");

    redirect("/app-secure-portal-9f8b2c");
}