"use client";

import { motion, useMotionValue, useSpring, Variants } from "framer-motion";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import {
    ArrowRight,
    CheckCircle2,
    Sparkles,
    Activity
} from "lucide-react";

// Explicitly typed Framer Motion variants
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
    },
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const serviceCategories = [
    {
        id: "software-engineering",
        title: "Software Engineering & Architecture",
        categoryLabel: "Core Systems & Scale",
        description:
            "Engineered for high performance, reliability, and extreme scale. We build cloud-native applications, robust backend microservices, and secure enterprise APIs designed to handle complex business logic effortlessly.",
        tags: ["Next.js", "ASP.NET Core", "Spring Boot", "PostgreSQL", "Cloud Native"],
        features: [
            "Microservice & Monolithic Architecture",
            "High-throughput RESTful & GraphQL APIs",
            "Zero-downtime CI/CD deployment pipelines"
        ],
        accentBorder: "hover:border-blue-500/80",
        glowColor: "group-hover:bg-blue-600/15",
        badgeBg: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        href: "/services/software-engineering",
    },
    {
        id: "ui-ux-design",
        title: "UI/UX & Brand Identity Design",
        categoryLabel: "Immersive Experiences",
        description:
            "Crafting intuitive, high-converting interfaces that users love. From futuristic dark-mode aesthetics to comprehensive design systems, we turn complex user requirements into seamless digital journeys.",
        tags: ["Figma Prototyping", "Design Systems", "Motion Graphics", "User Research"],
        features: [
            "Custom Design Systems & Component Libraries",
            "Interactive Prototyping & Micro-animations",
            "User Journey Mapping & Usability Testing"
        ],
        accentBorder: "hover:border-indigo-500/80",
        glowColor: "group-hover:bg-indigo-600/15",
        badgeBg: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
        href: "/services/ui-ux-design",
    },
    {
        id: "digital-growth",
        title: "Digital Growth & Performance",
        categoryLabel: "Data-Driven Scale",
        description:
            "Data-backed strategies designed to accelerate your market presence. We combine deep technical SEO audits, high-performance conversion funnels, and targeted content engines to maximize ROI.",
        tags: ["Growth Marketing", "Technical SEO", "Conversion Funnels", "Analytics"],
        features: [
            "Advanced Technical & On-Page SEO",
            "Conversion Rate Optimization (CRO)",
            "Multi-channel Growth Analytics"
        ],
        accentBorder: "hover:border-sky-500/80",
        glowColor: "group-hover:bg-sky-600/15",
        badgeBg: "bg-sky-500/10 text-sky-400 border-sky-500/20",
        href: "/services/digital-growth",
    },
    {
        id: "ai-solutions",
        title: "AI & Intelligent Automation",
        categoryLabel: "Smart Workflow Systems",
        description:
            "Integrating cutting-edge AI models directly into your custom software ecosystem. We build automated data pipelines, custom LLM toolsets, and predictive analytics platforms giving you a definitive edge.",
        tags: ["Custom AI Workflows", "LLM Integration", "Automation Pipelines", "PyTorch"],
        features: [
            "Custom LLM & Agentic Workflow Integration",
            "Automated Data Extraction & Processing",
            "Predictive Intelligence Dashboards"
        ],
        accentBorder: "hover:border-cyan-500/80",
        glowColor: "group-hover:bg-cyan-600/15",
        badgeBg: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
        href: "/services/ai-solutions",
    },
];

const capabilities = [
    {
        number: "01",
        title: "Full-Stack Precision",
        desc: "Seamless execution from low-level database indexing to buttery-smooth UI animation states.",
    },
    {
        number: "02",
        title: "Enterprise Quality",
        desc: "Rigorous testing protocols, robust code standards, and secure, maintainable cloud infrastructure.",
    },
    {
        number: "03",
        title: "Modern Aesthetics",
        desc: "High-contrast neon-accented dark themes and pristine typography-driven interfaces.",
    },
];

// Ultra-Dense 3D Particle Sphere with 1,200 Particles & Magnetic Repulsion
function MassiveParticleSphere() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isHovered, setIsHovered] = useState(false);

    const springConfig = { damping: 25, stiffness: 120 };
    const rotateX = useSpring(mouseY, springConfig);
    const rotateY = useSpring(mouseX, springConfig);

    // Generate 1,200 particles for an ultra-dense, glowing nebula sphere
    const particles = useMemo(() => {
        const pts = [];
        const count = 1200;
        const radius = 170;

        for (let i = 0; i < count; i++) {
            const phi = Math.acos(-1 + (2 * i) / count);
            const theta = Math.sqrt(count * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            pts.push({
                id: i,
                x,
                y,
                z,
                size: Math.random() * 2.2 + 1.0,
                color: i % 4 === 0 ? "#22d3ee" : i % 2 === 0 ? "#3b82f6" : "#6366f1",
            });
        }
        return pts;
    }, []);

    function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x * 0.5);
        mouseY.set(-y * 0.5);
    }

    function handleMouseLeave() {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    }

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            className="relative w-full h-[460px] flex items-center justify-center cursor-crosshair perspective-[1000px] overflow-visible"
        >
            {/* Ambient Volumetric Glow */}
            <div className="absolute w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-blue-500/25 via-indigo-500/20 to-cyan-400/25 blur-3xl pointer-events-none" />

            {/* Rotating 3D Particle Sphere with Magnetic Repulsion Scale */}
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                animate={{
                    rotateZ: 360,
                    scale: isHovered ? 1.2 : 1
                }}
                transition={{
                    rotateZ: { repeat: Infinity, duration: 55, ease: "linear" },
                    scale: { duration: 0.4, ease: "easeOut" }
                }}
                className="relative w-80 h-80 flex items-center justify-center"
            >
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        style={{
                            x: p.x,
                            y: p.y,
                            z: p.z,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            backgroundColor: p.color,
                            boxShadow: `0 0 8px ${p.color}`,
                        }}
                        className="absolute rounded-full pointer-events-none"
                    />
                ))}

                {/* Inner Core Bright Nebula Glow */}
                <div className="absolute w-60 h-60 rounded-full bg-blue-600/40 blur-3xl pointer-events-none" />
            </motion.div>
        </div>
    );
}

export default function ServicesPage() {
    return (
        <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-blue-600 selection:text-white">

            {/* 1. HERO SECTION (Reduced top space after navbar) */}
            <section className="relative pt-20 pb-28 px-6 lg:px-12 bg-white text-slate-900 border-b border-slate-200 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                    {/* Left Column: Title & Subtitle */}
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                        className="lg:col-span-7 space-y-6"
                    >
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs sm:text-sm font-mono font-semibold tracking-wider uppercase shadow-sm">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                            Quantimite Services & Capabilities
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] text-slate-900">
                            Architecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600">digital frontier</span>.
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-base sm:text-xl text-slate-600 leading-relaxed font-normal max-w-xl">
                            We eliminate technical debt and bridge high-performance software engineering with world-class digital design. Explore our core service pillars crafted for extreme scale.
                        </motion.p>
                    </motion.div>

                    {/* Right Column: 1,200 Particle Sphere Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-5"
                    >
                        <MassiveParticleSphere />
                    </motion.div>

                </div>
            </section>

            {/* 2. CORE SERVICES DARK GRID WITH ANIMATED CARDS */}
            <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto relative">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px),linear-gradient(to_bottom,#1e293b10_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none -z-10" />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {serviceCategories.map((service) => (
                        <motion.div
                            key={service.id}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            variants={fadeInUp}
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className={`group relative rounded-3xl bg-slate-900/90 backdrop-blur-2xl border border-slate-800 p-8 sm:p-12 shadow-2xl ${service.accentBorder} transition-all duration-500 flex flex-col justify-between overflow-hidden`}
                        >
                            <div className={`absolute -right-24 -top-24 w-72 h-72 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${service.glowColor}`} />

                            <div>
                                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80 relative z-10">
                                    <span className={`text-xs font-semibold tracking-wider px-3.5 py-1.5 rounded-lg border ${service.badgeBg}`}>
                                        {service.categoryLabel}
                                    </span>
                                    <span className="text-xs font-mono text-slate-500">
                                        Professional Service
                                    </span>
                                </div>

                                <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-4 group-hover:text-blue-400 transition-colors relative z-10">
                                    {service.title}
                                </h3>

                                <p className="text-sm sm:text-base text-slate-400 leading-relaxed mb-8 font-normal relative z-10">
                                    {service.description}
                                </p>

                                <div className="space-y-3 mb-8 bg-slate-950/60 p-6 rounded-2xl border border-slate-800/80 relative z-10 group-hover:border-blue-500/30 transition-colors">
                                    {service.features.map((feature, idx) => (
                                        <motion.div
                                            key={idx}
                                            initial={{ opacity: 0, x: -10 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="flex items-center gap-3 text-xs sm:text-sm text-slate-300 font-medium"
                                        >
                                            <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 group-hover:scale-125 transition-transform" />
                                            <span>{feature}</span>
                                        </motion.div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-2 mb-8 relative z-10">
                                    {service.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-medium tracking-wide"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-800/80 flex items-center justify-between relative z-10">
                                <Link
                                    href={service.href}
                                    className="inline-flex items-center gap-2.5 text-sm font-semibold text-blue-400 hover:text-blue-300 group/link transition-colors"
                                >
                                    <span>Explore service details</span>
                                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-2 transition-transform duration-300" />
                                </Link>
                                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 group-hover:scale-150 group-hover:bg-cyan-400 transition-all duration-300 shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3. WHY WORK WITH US (Clean White Background Section) */}
            <section className="py-24 px-6 lg:px-12 bg-white text-slate-900 border-t border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={staggerContainer}
                        className="space-y-12"
                    >
                        <div className="text-center max-w-2xl mx-auto space-y-3">
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                                Why Partner With Quantimite?
                            </h2>
                            <p className="text-sm sm:text-base text-slate-600">
                                We eliminate technical debt and fluff to deliver elite, high-performance digital solutions.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {capabilities.map((cap) => (
                                <motion.div
                                    key={cap.title}
                                    variants={fadeInUp}
                                    whileHover={{ y: -5 }}
                                    className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-blue-300 transition-all shadow-sm hover:shadow-md group relative overflow-hidden"
                                >
                                    <div className="absolute -right-4 -bottom-4 text-7xl font-extrabold font-mono text-slate-200/60 group-hover:text-blue-500/10 transition-colors pointer-events-none">
                                        {cap.number}
                                    </div>
                                    <div className="text-xs font-mono text-blue-600 font-semibold tracking-widest uppercase">
                                        Standard // {cap.number}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">{cap.title}</h3>
                                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed relative z-10">
                                        {cap.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 4. CALL TO ACTION BANNER (White Background Section) */}
            <section className="py-24 px-6 lg:px-12 bg-white text-slate-900 border-t border-slate-200">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        className="rounded-3xl bg-gradient-to-r from-blue-900/90 via-indigo-950 to-slate-900 border border-blue-500/30 text-white p-8 sm:p-16 text-center relative overflow-hidden shadow-2xl backdrop-blur-md"
                    >
                        <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
                                Ready to engineer your next move?
                            </h2>
                            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                                Whether you need a complete product architecture, UI rebrand, or growth strategy, our team is ready to collaborate.
                            </p>
                            <div className="pt-2">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/40 hover:scale-105 active:scale-95 transition-all"
                                >
                                    Let’s Chat →
                                </Link>
                            </div>
                        </div>

                        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
                    </motion.div>
                </div>
            </section>

        </div>
    );
}