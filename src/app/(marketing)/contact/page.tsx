"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send, Sparkles, CheckCircle2 } from "lucide-react";
import React, { useState } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function RedesignedGlassContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitted(true);
        }, 1200);
    };

    return (
        <div className="relative flex h-[calc(100vh-5rem)] w-full items-center justify-center overflow-hidden bg-white px-8 font-sans text-plum">

            {/* 
        ========================================
        LIQUID BUBBLE ANIMATION (Behind Glass)
        ========================================
      */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <motion.div
                    animate={{
                        x: [0, 70, -60, 0],
                        y: [0, 50, -40, 0],
                        scale: [1, 1.2, 0.95, 1],
                    }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[35%] left-[10%] h-[400px] w-[400px] rounded-full bg-violet/20 blur-[100px]"
                />

                <motion.div
                    animate={{
                        x: [0, -80, 60, 0],
                        y: [0, -60, 50, 0],
                        scale: [1, 0.9, 1.15, 1],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[10%] right-[10%] h-[450px] w-[450px] rounded-full bg-azure/20 blur-[110px]"
                />
            </div>

            {/* Main Container Grid */}
            <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-12 lg:gap-20">

                {/* Left Column: Animated Text & Details */}
                <div className="lg:col-span-5 space-y-7">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE }}
                        className="inline-flex items-center gap-2 rounded-full border border-plum/10 bg-white/70 px-4 py-2 text-xs font-semibold text-plum/75 shadow-xs backdrop-blur-xl"
                    >
                        <Sparkles className="h-4 w-4 text-violet" />
                        <span>Available for new partnerships</span>
                    </motion.div>

                    <div className="space-y-2">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
                            className="text-4xl font-extrabold tracking-tight text-plum sm:text-6xl leading-[1.1]"
                        >
                            Let&apos;s build your <br />
                            <motion.span
                                initial={{ backgroundPosition: "0% 50%" }}
                                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                className="bg-gradient-to-r from-violet via-azure to-violet bg-[length:200%_auto] bg-clip-text text-transparent"
                            >
                                next milestone.
                            </motion.span>
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
                        className="text-base text-plum/75 sm:text-lg leading-relaxed max-w-lg"
                    >
                        Bridge high-performance engineering with exquisite design. Drop your specifications to start our workflow.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                        className="flex items-center gap-8 pt-3 text-sm text-plum/75 font-medium"
                    >
                        <div className="flex items-center gap-2.5">
                            <Mail className="h-4 w-4 text-violet" />
                            <span>hello@quantimite.com</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <MapPin className="h-4 w-4 text-azure" />
                            <span>Sri Lanka</span>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Enhanced Glassmorphism Form Card */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
                    className="lg:col-span-7"
                >
                    {/* Frosted Glass Container with backdrop-blur-2xl and translucent white */}
                    <div className="rounded-[2rem] border border-white/80 bg-white/60 p-8 sm:p-10 shadow-2xl shadow-violet/15 backdrop-blur-2xl relative overflow-hidden">

                        {/* Top specular highlight edge */}
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white to-transparent" />

                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="py-16 text-center space-y-4"
                            >
                                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-xs">
                                    <CheckCircle2 className="h-7 w-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-plum">Transmission Successful</h3>
                                <p className="text-sm text-plum/75 max-w-sm mx-auto leading-relaxed">
                                    Your project specifications have been logged. Our core engineering team will connect shortly.
                                </p>
                                <button
                                    onClick={() => setSubmitted(false)}
                                    className="mt-4 text-xs font-bold text-violet hover:text-violet/80 transition-colors uppercase tracking-wider cursor-pointer"
                                >
                                    Send another inquiry
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-xs font-bold text-plum/80 uppercase tracking-wider">Your Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            required
                                            placeholder="John Doe"
                                            className="w-full rounded-xl border border-plum/15 bg-white/70 px-4 py-3 text-sm text-plum placeholder-plum/35 transition-all focus:border-violet focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet/25 backdrop-blur-md shadow-xs"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-xs font-bold text-plum/80 uppercase tracking-wider">Email Address</label>
                                        <input
                                            type="email"
                                            id="email"
                                            required
                                            placeholder="john@company.com"
                                            className="w-full rounded-xl border border-plum/15 bg-white/70 px-4 py-3 text-sm text-plum placeholder-plum/35 transition-all focus:border-violet focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet/25 backdrop-blur-md shadow-xs"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="subject" className="text-xs font-bold text-plum/80 uppercase tracking-wider">Project Type</label>
                                    <select
                                        id="subject"
                                        required
                                        className="w-full rounded-xl border border-plum/15 bg-white/70 px-4 py-3 text-sm text-plum transition-all focus:border-violet focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet/25 backdrop-blur-md shadow-xs"
                                    >
                                        <option value="" disabled selected>Select an area</option>
                                        <option value="software">Software Engineering & Architecture</option>
                                        <option value="design">UI/UX & Brand Design</option>
                                        <option value="growth">Digital Growth & SEO</option>
                                        <option value="ai">AI & Intelligent Automation</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-xs font-bold text-plum/80 uppercase tracking-wider">Message</label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={4}
                                        placeholder="Tell us about your project goals and timeline..."
                                        className="w-full resize-none rounded-xl border border-plum/15 bg-white/70 px-4 py-3 text-sm text-plum placeholder-plum/35 transition-all focus:border-violet focus:bg-white focus:outline-none focus:ring-2 focus:ring-violet/25 backdrop-blur-md shadow-xs"
                                    ></textarea>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet to-azure py-4 text-sm font-bold text-white shadow-lg shadow-violet/30 transition-all disabled:opacity-70 cursor-pointer"
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Transmitting...
                                        </span>
                                    ) : (
                                        <>
                                            <span>Send Message</span>
                                            <Send className="h-4 w-4" />
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        )}

                    </div>
                </motion.div>

            </div>
        </div>
    );
}