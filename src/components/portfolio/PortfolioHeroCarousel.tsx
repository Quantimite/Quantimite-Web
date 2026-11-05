"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowDown,
  Sparkles,
  Play,
  Pause,
  Layers,
  Code2,
  Cpu,
} from "lucide-react";
import Button from "@/components/ui/Button";

interface CarouselSlide {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  videoSrc: string;
  videoType: string;
  tag: string;
  metric: string;
  metricLabel: string;
  icon: typeof Layers;
}

const CAROUSEL_SLIDES: CarouselSlide[] = [
  {
    id: "systems",
    badge: "Quantimite Digital Engineering",
    title: "Pioneering the next era of digital architecture.",
    subtitle:
      "From high-throughput cloud networks to responsive web platforms, we engineer software that handles extreme concurrency with fluid elegance.",
    videoSrc: "/assets/videos/services-hero.mp4",
    videoType: "video/mp4",
    tag: "Systems & Infrastructure",
    metric: "99.99% Target",
    metricLabel: "System Reliability",
    icon: Layers,
  },
  {
    id: "deeptech",
    badge: "Hardware & Quantum Horizons",
    title: "Supercomputing power meets modern edge runtimes.",
    subtitle:
      "Pushing client-side WebAssembly, distributed telemetry streams, and post-quantum encryption into production environments.",
    videoSrc: "/assets/videos/portfolio-hero.webm",
    videoType: "video/webm",
    tag: "Deep Tech & Runtimes",
    metric: "< 18ms P99",
    metricLabel: "Global Latency",
    icon: Cpu,
  },
  {
    id: "craft",
    badge: "Hands-on Software Craft",
    title: "Real code. Pure precision. Production velocity.",
    subtitle:
      "We build resilient digital products with clean type-safe code, physics-based motion tokens, and accessible user experiences.",
    videoSrc: "/assets/videos/developer-typing.webm",
    videoType: "video/webm",
    tag: "Full-Stack Development",
    metric: "120 FPS",
    metricLabel: "Interface Motion",
    icon: Code2,
  },
];

const AUTOPLAY_DURATION = 6500; // ms per slide
const EASE = [0.22, 1, 0.36, 1] as const;

export default function PortfolioHeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) =>
      prev === 0 ? CAROUSEL_SLIDES.length - 1 : prev - 1
    );
    setProgress(0);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setProgress(0);
  };

  // Autoplay timer with progress bar
  useEffect(() => {
    if (!isPlaying) return;

    const interval = 50; // update progress every 50ms
    const step = (interval / AUTOPLAY_DURATION) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [isPlaying, nextSlide]);

  // Ensure current slide video plays
  useEffect(() => {
    const activeVideo = videoRefs.current[CAROUSEL_SLIDES[currentIndex].id];
    if (activeVideo) {
      activeVideo.currentTime = 0;
      activeVideo.play().catch(() => {});
    }
  }, [currentIndex]);

  const scrollToGrid = () => {
    const el = document.getElementById("project-slots");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const activeSlide = CAROUSEL_SLIDES[currentIndex];
  const Icon = activeSlide.icon;

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative overflow-hidden pt-6 pb-14 sm:pt-10 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6">
          {/* Main Cinematic Video Carousel Frame */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-plum/15 bg-plum text-white shadow-2xl shadow-plum/30">
            {/* Background Ambient Glow */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-10 rounded-full bg-gradient-to-r from-violet/25 via-azure/20 to-violet/25 opacity-70 blur-3xl"
            />

            {/* Video Slides with Crossfade */}
            <div className="relative aspect-[16/10] min-h-[480px] w-full overflow-hidden sm:aspect-[21/9] sm:min-h-[540px]">
              {CAROUSEL_SLIDES.map((slide, idx) => (
                <div
                  key={slide.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === currentIndex
                      ? "opacity-100 pointer-events-auto"
                      : "opacity-0 pointer-events-none"
                  }`}
                >
                  <video
                    ref={(el) => {
                      videoRefs.current[slide.id] = el;
                    }}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover object-center brightness-90 contrast-105"
                  >
                    <source src={slide.videoSrc} type={slide.videoType} />
                  </video>
                  {/* Subtle dark gradient overlay to guarantee text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-plum via-plum/60 to-plum/40" />
                </div>
              ))}

              {/* Slide Content Layer */}
              <div className="relative z-10 flex h-full flex-col justify-between p-6 sm:p-10 lg:p-14">
                {/* Top Bar: Live Carousel Status & Play/Pause */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-violet" />
                    </span>
                    <span>{activeSlide.badge}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/30 text-white/80 backdrop-blur-md transition hover:bg-black/50 hover:text-white"
                      title={isPlaying ? "Pause Carousel" : "Play Carousel"}
                    >
                      {isPlaying ? (
                        <Pause className="h-3.5 w-3.5" />
                      ) : (
                        <Play className="h-3.5 w-3.5 ml-0.5" />
                      )}
                    </button>
                    <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 font-mono text-xs font-bold backdrop-blur-md">
                      0{currentIndex + 1} / 0{CAROUSEL_SLIDES.length}
                    </span>
                  </div>
                </div>

                {/* Center Content: Animated Headline and Tagline */}
                <div className="max-w-3xl py-4 sm:py-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSlide.id}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-violet">
                        <Icon className="h-4 w-4" />
                        <span>{activeSlide.tag}</span>
                      </div>

                      <h1 className="mt-3 text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                        {activeSlide.title}
                      </h1>

                      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-lg">
                        {activeSlide.subtitle}
                      </p>

                      <div className="mt-8 flex flex-wrap items-center gap-4">
                        <Button href="/contact">Start your project</Button>
                        <button
                          onClick={scrollToGrid}
                          className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/20"
                        >
                          <span>Explore Project Slots</span>
                          <ArrowDown className="h-4 w-4 animate-bounce text-violet" />
                        </button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Bottom Bar: Telemetry Callout & Navigation Controls */}
                <div className="flex flex-wrap items-end justify-between gap-4 border-t border-white/15 pt-5">
                  {/* Left Callout */}
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-md">
                      <p className="text-[11px] font-semibold text-white/70">
                        {activeSlide.metricLabel}
                      </p>
                      <p className="text-base font-black text-white sm:text-lg">
                        {activeSlide.metric}
                      </p>
                    </div>
                  </div>

                  {/* Right Navigation Arrows & Dot Indicators */}
                  <div className="flex items-center gap-3">
                    {/* Dots */}
                    <div className="flex items-center gap-1.5">
                      {CAROUSEL_SLIDES.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => goToSlide(idx)}
                          className={`relative h-2 rounded-full transition-all duration-300 ${
                            idx === currentIndex
                              ? "w-8 bg-violet"
                              : "w-2 bg-white/30 hover:bg-white/60"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Left/Right Chevrons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={prevSlide}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/25"
                        aria-label="Previous Slide"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition hover:bg-white/25"
                        aria-label="Next Slide"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide Autoplay Progress Line */}
            <div className="relative h-1 w-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-violet to-azure transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
