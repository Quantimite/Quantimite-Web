"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, MessageSquare, CheckCircle2 } from "lucide-react";
import Button from "@/components/ui/Button";
import { ScrollTextHeading, ScrollTextFade } from "@/components/ui/ScrollText";

function InteractiveFox() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(y, { stiffness: 120, damping: 20 });
  const ry = useSpring(x, { stiffness: 120, damping: 20 });

  return (
    <div
      className="relative mx-auto h-72 w-full max-w-[340px] sm:h-96 sm:max-w-[420px]"
      onPointerMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        x.set(((e.clientX - rect.left) / rect.width - 0.5) * 16);
        y.set(-((e.clientY - rect.top) / rect.height - 0.5) * 12);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <div
        aria-hidden
        className="absolute inset-[15%] rounded-full bg-brand opacity-35 blur-3xl"
      />
      <motion.div
        style={{
          rotateX: rx,
          rotateY: ry,
          transformPerspective: 800,
        }}
        className="relative h-full w-full"
      >
        <Image
          src="/assets/brand/mascot-code.png"
          alt="Quantimite Technical Specialist Mascot"
          fill
          sizes="(min-width: 1024px) 380px, 90vw"
          className="object-contain drop-shadow-2xl"
        />
      </motion.div>
    </div>
  );
}

export default function PortfolioCTA() {
  return (
    <section className="px-6 py-20 lg:py-28">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-plum px-8 py-14 text-white shadow-2xl shadow-plum/25 sm:px-14 sm:py-20 lg:grid lg:grid-cols-12 lg:items-center lg:gap-10">
        {/* Background ambient lighting */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-violet/25 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-azure/20 blur-3xl"
        />

        <div className="relative z-10 lg:col-span-7">
          <ScrollTextFade
            as="div"
            delay={0.05}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-semibold tracking-wide backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-violet" />
            <span>Ready for your production upgrade?</span>
          </ScrollTextFade>

          <ScrollTextHeading
            as="h2"
            delay={0.12}
            className="mt-5 text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            Have a similar project?
          </ScrollTextHeading>

          <ScrollTextFade
            as="p"
            delay={0.22}
            className="mt-5 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
          >
            Whether you need to architect a high-throughput SaaS platform, engineer a mobile
            fintech app, or transition legacy software to modern cloud infrastructure, our
            engineers will build it to scale.
          </ScrollTextFade>

          {/* Value Highlights */}
          <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {[
              "Fixed-scope or dedicated senior pods",
              "Production deployment with automated CI/CD",
              "Sub-millisecond performance guarantees",
              "100% intellectual property ownership",
            ].map((item, idx) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -16, filter: "blur(4px)" }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.25 + idx * 0.08 }}
                className="flex items-center gap-2 text-sm text-white/90"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-violet" />
                <span>{item}</span>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <ScrollTextFade
            as="div"
            delay={0.35}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button href="/contact">
              Start your project
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/15"
            >
              <MessageSquare className="h-4 w-4" />
              Book technical discovery call
            </Link>
          </ScrollTextFade>
        </div>

        <div className="relative mt-12 lg:col-span-5 lg:mt-0">
          <InteractiveFox />
        </div>
      </div>
    </section>
  );
}
