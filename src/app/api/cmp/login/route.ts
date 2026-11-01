import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createSession } from "@/lib/cmp";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const username = formData.get("username")?.toString();
        const password = formData.get("password")?.toString();

        // Authenticate with your exact credentials
        if (username === "dinuja_admin" && password === "qmite#1dra") {

            // Generate the session token using your library's exact function signature
            const sessionToken = await createSession(username, "super_admin");

            // Set the cmp_session cookie securely
            (await cookies()).set({
                name: "cmp_session",
                value: sessionToken,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                path: "/",
                maxAge: 60 * 60 * 8, // 8 hours (matching your session expiry)
            });

            // Redirect straight to your secure dashboard
            return NextResponse.redirect(new URL("/app-secure-portal-9f8b2c/dashboard", request.url), {
                status: 303,
            });
        }

        // If credentials fail, redirect back to login with error flag
        return NextResponse.redirect(new URL("/app-secure-portal-9f8b2c?error=1", request.url), {
            status: 303,
        });
    } catch (error) {
        return NextResponse.redirect(new URL("/app-secure-portal-9f8b2c?error=1", request.url), {
            status: 303,
        });
    }
}