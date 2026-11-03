"use client";

import { useEffect, useRef } from "react";
import { logout } from "@/app/app-secure-portal-9f8b2c/actions";

export default function IdleTimeout() {
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes

    const handleLogout = async () => {
        await logout();
    };

    const resetTimer = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(handleLogout, INACTIVITY_LIMIT);
    };

    useEffect(() => {
        const events = ["mousemove", "keydown", "scroll", "click"];
        events.forEach((event) => window.addEventListener(event, resetTimer));
        resetTimer();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            events.forEach((event) => window.removeEventListener(event, resetTimer));
        };
    }, []);

    return null;
}