"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { motion, useMotionValue, useSpring, useInView } from "framer-motion";
import { ChevronRight, Zap, Gem, Rocket, Radar as RadarIcon, Briefcase, Sparkles } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Vacancy data — add objects here to populate the open positions     */
/* ------------------------------------------------------------------ */
const vacancies: Array<{ title: string; dept: string; location: string }> = [];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function lerp(t: number, pts: [number, number][]): number {
  if (t <= pts[0][0]) return pts[0][1];
  if (t >= pts[pts.length - 1][0]) return pts[pts.length - 1][1];
  for (let i = 0; i < pts.length - 1; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[i + 1];
    if (t <= x1) return y0 + ((t - x0) / (x1 - x0)) * (y1 - y0);
  }
  return pts[pts.length - 1][1];
}

function smoothstep(x: number): number {
  const c = Math.max(0, Math.min(1, x));
  return c * c * (3 - 2 * c);
}

function charStyle(
  t: number,
  ghost: string,
  accent: string,
  final: string
): { opacity: number; filter: string; color: string } {
  let opacity: number;
  let blur: number;
  let color: string;

  if (t <= 0) {
    opacity = 0;
    blur = 8;
    color = ghost;
  } else if (t <= 0.35) {
    const p = t / 0.35;
    opacity = p;
    blur = 8 - p * 6.5;
    color = ghost;
  } else if (t <= 0.7) {
    const p = (t - 0.35) / 0.35;
    opacity = 1;
    blur = 1.5 * (1 - p);
    color = lerpColor(ghost, accent, p);
  } else {
    const p = (t - 0.7) / 0.3;
    opacity = 1;
    blur = 0;
    color = lerpColor(accent, final, p);
  }
  return { opacity, filter: `blur(${blur}px)`, color };
}

function lerpColor(a: string, b: string, t: number): string {
  const pa = hexToRgb(a);
  const pb = hexToRgb(b);
  const r = Math.round(pa[0] + (pb[0] - pa[0]) * t);
  const g = Math.round(pa[1] + (pb[1] - pa[1]) * t);
  const bl = Math.round(pa[2] + (pb[2] - pa[2]) * t);
  return `rgb(${r},${g},${bl})`;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

const TIP_PTS: [number, number][] = [[0, 0.3], [0.4, 0.95], [0.66, 1.05], [1.43, 1.3]];
const HALF_PTS: [number, number][] = [[0, 0.34], [0.4, 0.38], [0.66, 0.46], [1.43, 1.6]];
const SOFT_PTS: [number, number][] = [[0, 0.22], [0.4, 0.19], [0.66, 0.16], [1.43, 0.1]];

const PILLARS = [
  {
    icon: Zap,
    title: "Autonomy & Impact",
    body: "High ownership from day one. Ship features, lead projects, and make real decisions — zero bureaucracy, maximum velocity.",
    span: "lg:col-span-2 lg:row-span-1",
  },
  {
    icon: Gem,
    title: "Craftsmanship",
    body: "We build scalable platforms with Next.js, React, Flutter, and Python. Clean code isn't optional — it's how we think.",
    span: "lg:col-span-1 lg:row-span-2",
  },
  {
    icon: Rocket,
    title: "Continuous Growth",
    body: "Mentorship, exploration time, and a cutting-edge stack. We invest in your skills so you can push boundaries.",
    span: "lg:col-span-2 lg:row-span-1",
  },
] as const;

function BentoCard({
  icon: Icon,
  title,
  body,
  span,
  index,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  body: string;
  span: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 250, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 250, damping: 20 });

  const [spotlightCoords, setSpotlightCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setSpotlightCoords({ x, y });

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      mouseX.set(dx);
      mouseY.set(dy);
      rotateY.set(dx * 10);
      rotateX.set(-dy * 10);
    },
    [mouseX, mouseY, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    rotateX.set(0);
    rotateY.set(0);
  }, [mouseX, mouseY, rotateX, rotateY]);

  return (
    <motion.div
      ref={ref}
      className={`group relative overflow-hidden rounded-3xl border border-white/50 p-8 backdrop-blur-2xl ${span}`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.75) 0%, rgba(240,230,255,0.5) 100%)",
        boxShadow: "0 12px 40px -10px rgba(91,124,240,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
      }}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.02,
        boxShadow:
          "0 20px 60px -12px rgba(168,85,247,0.3), 0 0 0 2px rgba(168,85,247,0.4), inset 0 1px 0 rgba(255,255,255,1)",
      }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${spotlightCoords.x}px ${spotlightCoords.y}px, rgba(168,85,247,0.18), rgba(59,130,246,0.12), transparent 70%)`,
        }}
      />

      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br from-[#a855f7]/20 to-[#3b82f6]/20 blur-2xl transition-transform duration-500 group-hover:scale-150" />

      <motion.div
        className="relative z-10 mb-5 inline-flex rounded-2xl bg-gradient-to-br from-[#a855f7]/15 to-[#3b82f6]/15 p-3.5 border border-white/40 shadow-sm"
        whileHover={{ rotate: 12, scale: 1.15 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <Icon size={26} className="text-[#7c3aed]" />
      </motion.div>

      <h3 className="relative z-10 mb-3 text-xl font-extrabold tracking-tight text-[#0b1d3a]">
        {title}
      </h3>
      <p className="relative z-10 text-[15px] leading-relaxed text-[#1d2f4f]/80">
        {body}
      </p>
    </motion.div>
  );
}

function RevealChar({
  char,
  progress,
  ghost,
  accent,
  final,
}: {
  char: string;
  progress: number;
  ghost: string;
  accent: string;
  final: string;
}) {
  const style = charStyle(progress, ghost, accent, final);
  return (
    <span
      className="inline-block transition-none"
      style={{
        opacity: style.opacity,
        filter: style.filter,
        color: style.color,
        willChange: "opacity, filter, color",
      }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  );
}

export default function CareersPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const vacanciesRef = useRef<HTMLElement>(null);

  const [heroReveal, setHeroReveal] = useState(0);

  const heroText = "JOIN OUR TEAM";
  const heroChars = useMemo(() => heroText.split(""), []);
  const trustLine = "Engineer your next move.";

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 96;
    const H = 60;
    const aspect = W / H;
    const buf = new Uint8ClampedArray(W * H * 4);

    let raf: number;

    const draw = () => {
      const q = window.scrollY / (window.innerHeight || 1);
      const now = performance.now();
      const tipBase = lerp(q, TIP_PTS);
      const half = lerp(q, HALF_PTS);
      const soft = lerp(q, SOFT_PTS);
      const tip = tipBase + Math.sin(now * 0.00033 + 1.3) * 0.02;

      for (let py = 0; py < H; py++) {
        const yy = py / H;
        const denom = tip > 0 ? tip : 0.001;
        const ratio = Math.max(0, 1 - yy / denom);
        const CX = half * aspect * Math.pow(ratio, 0.72);

        for (let px = 0; px < W; px++) {
          const xx = px / W;
          const dx = Math.abs(xx - 0.5);
          const sd = dx - CX - 0.25;
          const raw = (sd + soft) / (2 * soft);
          const g = 1 - smoothstep(raw);

          let r: number, gv: number, b: number;
          if (g < 0.38) {
            const t = g / 0.38;
            r = 255 + (210 - 255) * t;
            gv = 255 + (218 - 255) * t;
            b = 255 + (255 - 255) * t;
          } else {
            const t = (g - 0.38) / (1 - 0.38);
            r = 210 + (143 - 210) * t;
            gv = 218 + (213 - 218) * t;
            b = 255 + (241 - 255) * t;
          }
          const idx = (py * W + px) * 4;
          buf[idx] = r;
          buf[idx + 1] = gv;
          buf[idx + 2] = b;
          buf[idx + 3] = 255;
        }
      }

      const imgData = new ImageData(buf, W, H);
      ctx.putImageData(imgData, 0, 0);
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const start = performance.now();
    const duration = 1200;
    let raf: number;
    const tick = () => {
      const elapsed = performance.now() - start;
      setHeroReveal(Math.min(1, elapsed / duration));
      if (elapsed < duration) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        width={96}
        height={60}
        className="pointer-events-none fixed inset-0 z-0 h-full w-full"
        style={{ imageRendering: "auto" }}
      />

      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6"
      >
        <h1 className="mb-4 text-center text-5xl font-extrabold tracking-tight sm:text-7xl lg:text-8xl">
          {heroChars.map((c, i) => {
            const total = heroChars.length;
            const charStart = i / total;
            const charEnd = (i + 1) / total;
            const p = Math.max(0, Math.min(1, (heroReveal - charStart) / (charEnd - charStart)));
            return (
              <RevealChar
                key={i}
                char={c}
                progress={p}
                ghost="#ffffff"
                accent="#3f7cff"
                final="#0b1d3a"
              />
            );
          })}
        </h1>

        <p
          className="mb-10 text-lg font-medium tracking-wide sm:text-xl"
          style={{
            color: "#1d2f4f",
            opacity: Math.min(1, Math.max(0, (heroReveal - 0.6) / 0.4)),
          }}
        >
          {trustLine}
        </p>

        <a
          href="#vacancies-section"
          className="group relative inline-flex items-center gap-3 rounded-full border border-[#0b1d3a]/10 bg-white/70 px-7 py-3.5 text-sm font-semibold tracking-wide text-[#0b1d3a] backdrop-blur-md transition-all duration-300 hover:border-[#2fe0d0]/40 hover:bg-white/90 hover:shadow-lg"
          style={{
            opacity: Math.min(1, Math.max(0, (heroReveal - 0.75) / 0.25)),
          }}
        >
          Explore Vacancies
          <span className="relative flex items-center justify-center">
            <span
              className="block rounded-full bg-[#2fe0d0] transition-all duration-300 group-hover:h-8 group-hover:w-8"
              style={{ width: 10, height: 10 }}
            />
            <ChevronRight
              size={16}
              className="absolute text-[#0e1f3d] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </span>
        </a>
      </section>

      {/* WHY JOIN US SECTION */}
      <section className="relative z-10 px-6 py-28 sm:px-12 lg:px-24 lg:py-36 overflow-hidden">
        <motion.div
          className="pointer-events-none absolute left-10 top-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-[#a855f7]/20 to-[#3b82f6]/20 blur-3xl"
          animate={{ x: [0, 30, 0], y: [0, -30, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="pointer-events-none absolute right-10 bottom-1/4 h-80 w-80 rounded-full bg-gradient-to-br from-[#3b82f6]/20 to-[#ec4899]/15 blur-3xl"
          animate={{ x: [0, -30, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="relative z-10 mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.p
            className="mb-3 text-sm font-bold uppercase tracking-widest text-[#7c3aed]"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Why join us
          </motion.p>
          <h2 className="text-3xl font-extrabold tracking-tight text-[#0b1d3a] sm:text-4xl lg:text-5xl">
            Build what matters.
          </h2>
        </motion.div>

        <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3 lg:grid-rows-2">
          {PILLARS.map((pillar, i) => (
            <BentoCard key={pillar.title} index={i} {...pillar} />
          ))}
        </div>
      </section>

      {/* FULL-WIDTH DARK RADAR CONSOLE (VACANCIES SECTION) */}
      <section
        id="vacancies-section"
        ref={vacanciesRef}
        className="relative z-10 px-4 pb-32 pt-12 sm:px-8 lg:px-12 w-full"
      >
        <div className="w-full">
          <motion.div
            className="relative overflow-hidden rounded-3xl border border-purple-500/30 p-8 sm:p-14 lg:p-20 backdrop-blur-3xl w-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(26, 11, 46, 0.92) 0%, rgba(44, 18, 79, 0.90) 50%, rgba(18, 28, 66, 0.92) 100%)",
              boxShadow:
                "0 25px 60px -15px rgba(107, 33, 168, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
            }}
            initial={{ opacity: 0, y: 50, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{
              boxShadow: "0 35px 80px -15px rgba(168, 85, 247, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.35)",
              borderColor: "rgba(192, 132, 252, 0.5)"
            }}
          >
            {/* Tactical grid background pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

            {/* Glowing moving background orbs */}
            <motion.div
              className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 blur-3xl"
              animate={{ x: [0, 20, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-gradient-to-br from-pink-600/20 to-purple-600/30 blur-3xl"
              animate={{ x: [0, -20, 0], y: [0, 20, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative z-10">
              {/* Centered Header */}
              <div className="mb-12 flex flex-col items-center justify-center text-center">
                <motion.div
                  className="relative mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-purple-300 border border-purple-500/30 shadow-inner"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <Briefcase size={26} className="text-purple-400" />
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-purple-400/50"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <span className="text-xs font-semibold uppercase tracking-widest text-purple-300/80 mb-1">
                  Live Recruitment Console
                </span>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
                  Open Positions
                </h2>
              </div>

              {vacancies.length === 0 ? (
                /* High-Tech Radar Scanning State */
                <motion.div
                  className="relative flex flex-col items-center justify-center overflow-hidden rounded-3xl border border-purple-500/20 bg-purple-950/20 px-6 py-20 text-center backdrop-blur-md shadow-inner"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* Concentric Radar Circles */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                    <div className="h-64 w-64 rounded-full border border-purple-400/30 absolute" />
                    <div className="h-44 w-44 rounded-full border border-purple-400/40 absolute" />
                    <div className="h-24 w-24 rounded-full border border-purple-400/50 absolute" />
                    <div className="h-full w-[1px] bg-purple-400/20 absolute" />
                    <div className="h-[1px] w-full bg-purple-400/20 absolute" />
                  </div>

                  {/* Rotating Radar Sweep Beam */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                    <motion.div
                      className="absolute h-64 w-64 rounded-full"
                      style={{
                        background: "conic-gradient(from 0deg at 50% 50%, rgba(168,85,247,0.3) 0deg, transparent 60deg, transparent 360deg)"
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                  </div>

                  {/* Center Icon & Pulse */}
                  <div className="relative z-10 mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-purple-600/30 to-blue-600/30 text-purple-300 border border-purple-400/40 shadow-lg shadow-purple-900/50">
                    <RadarIcon size={38} className="text-purple-300 animate-pulse" />
                    <motion.div
                      className="absolute inset-0 rounded-full border-2 border-purple-400/60"
                      animate={{ scale: [1, 1.6, 1], opacity: [0.8, 0, 0.8] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>

                  <h3 className="relative z-10 mb-2 text-xl font-bold text-white tracking-wide">
                    Scanning for talent... Currently no open roles.
                  </h3>
                  <p className="relative z-10 max-w-md text-sm leading-relaxed text-purple-200/70">
                    Our sensors are always active for exceptional engineering talent. Submit your application to our direct talent pool.
                  </p>

                  <motion.a
                    href="mailto:cdananjana04@gmail.com"
                    className="relative z-10 mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-8 py-4 text-xs font-bold tracking-widest text-white uppercase shadow-xl shadow-purple-900/60 border border-purple-400/40"
                    whileHover={{ scale: 1.06, boxShadow: "0 15px 35px -5px rgba(168,85,247,0.6)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Sparkles size={15} /> Send Open Application
                  </motion.a>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {vacancies.map((v, i) => (
                    <div
                      key={i}
                      className="group flex flex-col justify-between gap-4 rounded-2xl border border-purple-500/20 bg-purple-950/20 p-6 backdrop-blur-md transition-all sm:flex-row sm:items-center hover:border-purple-400 hover:bg-purple-900/30 hover:shadow-xl"
                    >
                      <div>
                        <h3 className="text-lg font-bold text-white">{v.title}</h3>
                        <p className="mt-1 text-sm font-medium text-purple-300">
                          {v.dept} · {v.location}
                        </p>
                      </div>
                      <button className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 text-xs font-semibold text-white transition-all hover:scale-105 shadow-md">
                        Apply Now <ChevronRight size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}