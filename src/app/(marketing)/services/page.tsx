"use client";

import { motion, MotionConfig, useMotionValue, useSpring } from "framer-motion";
import { Anton, IBM_Plex_Mono } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import type { PointerEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import Button from "@/components/ui/Button";

const anton = Anton({ weight: "400", subsets: ["latin"] });
const mono = IBM_Plex_Mono({ weight: ["400", "500"], subsets: ["latin"] });

const VIDEO = "/assets/videos/services-hero.mp4"; // public/assets/videos/
const FADE_Y = "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,.08) 5%, rgba(0,0,0,.25) 10%, rgba(0,0,0,.5) 16%, rgba(0,0,0,.78) 23%, #000 32%, #000 66%, rgba(0,0,0,.78) 75%, rgba(0,0,0,.5) 83%, rgba(0,0,0,.25) 90%, rgba(0,0,0,.08) 95%, transparent 100%)";
const FEATHER = FADE_Y; // top and bottom only
const EASE = [0.22, 1, 0.36, 1] as const;

const services = [
    {
        href: "/services/software-engineering", label: "Core systems", title: "Software Engineering & Architecture",
        text: "Cloud-native applications, robust backend services, and secure APIs built to handle complex business logic at scale.",
        features: ["Microservice and monolith architecture", "High-throughput REST and GraphQL APIs", "Zero-downtime CI/CD pipelines"],
        tags: ["Next.js", "ASP.NET Core", "Spring Boot", "PostgreSQL"]
    },
    {
        href: "/services/ui-ux-design", label: "Experiences", title: "UI/UX & Brand Identity Design",
        text: "Intuitive, high-converting interfaces and design systems that turn complex requirements into seamless journeys.",
        features: ["Design systems and component libraries", "Interactive prototyping and micro-animations", "User journey mapping and usability testing"],
        tags: ["Figma", "Design Systems", "Motion", "User Research"]
    },
    {
        href: "/services/digital-growth", label: "Growth", title: "Digital Growth & Performance",
        text: "Data-backed strategy that grows your market presence: technical SEO, conversion funnels, and content that pays back.",
        features: ["Technical and on-page SEO", "Conversion rate optimisation", "Multi-channel growth analytics"],
        tags: ["Growth Marketing", "SEO", "Funnels", "Analytics"]
    },
    {
        href: "/services/ai-solutions", label: "Automation", title: "AI & Intelligent Automation",
        text: "AI models built into your software: automated data pipelines, custom LLM tools, and predictive dashboards.",
        features: ["Custom LLM and agent workflows", "Automated data extraction and processing", "Predictive intelligence dashboards"],
        tags: ["LLM Integration", "Automation", "PyTorch", "Pipelines"]
    },
];
const stack = Array.from(new Set(services.flatMap((s) => s.tags)));
const standards = [
    { n: "01", t: "Full-stack precision", d: "From database indexing to smooth interface states, one team owns the whole path." },
    { n: "02", t: "Enterprise quality", d: "Rigorous testing, clean code standards, and secure, maintainable cloud infrastructure." },
    { n: "03", t: "Designed to feel premium", d: "Clear typography, considered motion, and interfaces your customers trust." },
];

// each line slides up out of a mask
function Line({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
    return (
        <span className="block overflow-hidden pb-[0.12em]">
            <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, ease: EASE, delay }}>
                {children}
            </motion.span>
        </span>
    );
}

function Card({ s, i }: { s: (typeof services)[number]; i: number }) {
    const move = (e: PointerEvent<HTMLElement>) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    return (
        <motion.article
            onPointerMove={move}
            initial={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EASE, delay: (i % 2) * 0.12 }}
            className="group relative overflow-hidden rounded-3xl border border-plum/10 bg-white/80 p-8 shadow-sm backdrop-blur transition hover:border-violet/40 hover:shadow-2xl hover:shadow-violet/15 sm:p-10"
        >
            <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(320px_circle_at_var(--mx,50%)_var(--my,50%),rgba(168,24,245,0.12),rgba(47,139,250,0.06)_45%,transparent_70%)]" />
            <div className="relative">
                <div className="flex items-center justify-between">
                    <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">{s.label}</span>
                    <span className={`${mono.className} text-sm text-plum/40`}>0{i + 1}</span>
                </div>
                <h3 className="mt-6 text-2xl font-extrabold tracking-tight text-plum sm:text-3xl">{s.title}</h3>
                <p className="mt-3 text-plum/70">{s.text}</p>
                <ul className="mt-6 space-y-2.5">
                    {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-sm font-medium text-plum/80">
                            <Check className="h-4 w-4 shrink-0 text-violet" />{f}
                        </li>
                    ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-2">
                    {s.tags.map((t) => (<span key={t} className="rounded-full border border-plum/10 bg-mist px-3 py-1 text-xs font-medium text-plum/70">{t}</span>))}
                </div>
                <Link href={s.href} className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-violet">
                    Explore service<ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </Link>
            </div>
        </motion.article>
    );
}

// map-holding fox tilts in 3D toward the cursor
function TiltFox() {
    const x = useMotionValue(0), y = useMotionValue(0);
    const ry = useSpring(x, { stiffness: 120, damping: 18 }), rx = useSpring(y, { stiffness: 120, damping: 18 });
    return (
        <div
            className="relative h-72 sm:h-96"
            onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                x.set(((e.clientX - r.left) / r.width - 0.5) * 18);
                y.set(-((e.clientY - r.top) / r.height - 0.5) * 12);
            }}
            onPointerLeave={() => { x.set(0); y.set(0); }}
        >
            <div aria-hidden className="absolute inset-[10%] rounded-full bg-brand opacity-30 blur-3xl" />
            <motion.div style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }} className="relative h-full w-full">
                <Image src="/assets/brand/mascot-map.png" alt="Quantimite fox holding a holographic map" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-contain" />
            </motion.div>
        </div>
    );
}

export default function ServicesPage() {
    return (
        <MotionConfig reducedMotion="user">
            <div className="bg-white">
                {/* TOP: centred headline with the paragraph under it */}
                <section className="mx-auto max-w-[1600px] px-6 pb-4 pt-6 text-center sm:pt-10">
                    <h1 className="whitespace-nowrap text-[clamp(1.75rem,6.2vw,6.5rem)] font-extrabold leading-[1.04] tracking-tight text-plum">
                        <Line>Architecting the</Line>
                        <Line delay={0.12}><span className="text-brand">digital frontier.</span></Line>
                    </h1>
                    <motion.p
                        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
                        className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-plum/70 sm:text-base"
                    >
                        We eliminate technical debt and bridge high-performance software engineering with world-class digital design. Explore our core service pillars crafted for extreme scale.
                    </motion.p>
                </section>

                {/* VIDEO: shown in full (never cropped), feathered into the white page */}
                <section className="w-full bg-white">
                    <video
                        autoPlay loop muted playsInline
                        style={{ maskImage: FEATHER, WebkitMaskImage: FEATHER }}
                        className="block h-auto w-full"
                    >
                        <source src={VIDEO} type="video/mp4" />
                    </video>
                </section>

                {/* SERVICES */}
                <section className="mx-auto max-w-7xl px-6 pb-24 pt-8">
                    <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE }} className="text-center text-[clamp(1.875rem,5vw,4rem)] font-extrabold leading-[1.1] tracking-tight text-plum">
                        Four pillars. One team that ships.
                    </motion.h2>
                    <div className="mt-14 grid gap-8 lg:grid-cols-2">{services.map((s, i) => <Card key={s.href} s={s} i={i} />)}</div>
                </section>

                {/* STACK MARQUEE */}
                <div className="overflow-hidden border-y border-plum/10 bg-white/60 py-4">
                    <motion.div className="flex w-max gap-12 whitespace-nowrap text-sm font-semibold text-plum/55" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 32, ease: "linear", repeat: Infinity }}>
                        {[...stack, ...stack].map((t, i) => (<span key={i}>{t}</span>))}
                    </motion.div>
                </div>

                {/* STANDARDS */}
                <section className="mx-auto max-w-7xl px-6 py-24">
                    <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-plum sm:text-4xl">Why partner with Quantimite</h2>
                    <div className="mt-12 grid gap-10 md:grid-cols-3">
                        {standards.map((s, i) => (
                            <motion.div key={s.n} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, ease: EASE, delay: i * 0.1 }}>
                                <span className={`${anton.className} text-6xl text-brand`}>{s.n}</span>
                                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 0.9, ease: EASE, delay: 0.2 + i * 0.1 }} className="my-4 h-px origin-left bg-gradient-to-r from-violet to-azure" />
                                <h3 className="text-xl font-bold text-plum">{s.t}</h3>
                                <p className="mt-2 text-plum/70">{s.d}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* CTA with the map-holding fox */}
                <section className="px-6 pb-24">
                    <div className="mx-auto grid max-w-7xl items-center gap-6 overflow-hidden rounded-[2rem] bg-plum px-8 py-12 text-white shadow-2xl shadow-violet/20 sm:px-14 lg:grid-cols-2">
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight sm:text-5xl">Not sure where to start? Let&apos;s map it out.</h2>
                            <p className="mt-4 max-w-md text-white/75">Tell us the idea, the platform, or the goal. We&apos;ll point you to the shortest route to your next move.</p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <Button href="/contact">Book a free consultation</Button>
                                <Link href="/portfolio" className="inline-flex items-center rounded-full border border-white/30 px-7 py-3.5 font-semibold transition hover:bg-white/10">See our work</Link>
                            </div>
                        </div>
                        <TiltFox />
                    </div>
                </section>
            </div>
        </MotionConfig>
    );
}