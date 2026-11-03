"use client";

import styles from "./careers.module.css";

import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent, ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  Code2,
  Compass,
  Orbit,
  Radar,
  ScanLine,
  Zap,
} from "lucide-react";

const APPLICATION_EMAIL = "cdananjana04@gmail.com";

const vacancies: Array<{
  title: string;
  dept: string;
  location: string;
}> = [];

const pillars = [
  {
    number: "01",
    icon: Compass,
    title: "Autonomy & Impact",
    body: "Take ownership, make decisions, and see your work make a difference.",
  },
  {
    number: "02",
    icon: Code2,
    title: "Craftsmanship",
    body: "Build thoughtful, reliable products with modern technology.",
  },
  {
    number: "03",
    icon: Orbit,
    title: "Continuous Growth",
    body: "Learn, experiment, and grow with a team that supports you.",
  },
] as const;

const ease = [0.22, 1, 0.36, 1] as const;

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className={styles.eyebrow}>
      <span className={styles.eyebrowDot} />
      {children}
    </div>
  );
}

function MagneticLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 260, damping: 18 });
  const springY = useSpring(y, { stiffness: 260, damping: 18 });

  return (
    <motion.a
      href={href}
      className={styles.primaryButton}
      style={{
        x: reduceMotion ? 0 : springX,
        y: reduceMotion ? 0 : springY,
      }}
      onPointerMove={(event) => {
        if (reduceMotion || event.pointerType !== "mouse") return;

        const rect = event.currentTarget.getBoundingClientRect();
        x.set((event.clientX - rect.left - rect.width / 2) * 0.13);
        y.set((event.clientY - rect.top - rect.height / 2) * 0.18);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      whileTap={reduceMotion ? undefined : { scale: 0.97 }}
    >
      <span>{children}</span>
      <span className={styles.buttonIcon}>
        <ArrowUpRight size={17} />
      </span>
    </motion.a>
  );
}

/* HERO SECTION */

function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);

  const smoothX = useSpring(pointerX, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 90,
    damping: 24,
    mass: 0.5,
  });

  const visualX = useTransform(smoothX, [0, 1], [-15, 15]);
  const visualY = useTransform(smoothY, [0, 1], [-12, 12]);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduceMotion) return;

    const handlePointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      const bounds = section.getBoundingClientRect();

      pointerX.set(
        Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width))
      );
      pointerY.set(
        Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height))
      );
    };

    const reset = () => {
      pointerX.set(0.5);
      pointerY.set(0.5);
    };

    section.addEventListener("pointermove", handlePointer, { passive: true });
    section.addEventListener("pointerleave", reset, { passive: true });

    return () => {
      section.removeEventListener("pointermove", handlePointer);
      section.removeEventListener("pointerleave", reset);
    };
  }, [pointerX, pointerY, reduceMotion]);

  return (
    <section
      ref={sectionRef}
      className={styles.hero}
      aria-labelledby="careers-title"
    >
      <div className={styles.heroGrid} aria-hidden="true" />
      <motion.div
        className={styles.heroGlow}
        aria-hidden="true"
        style={reduceMotion ? undefined : { x: visualX, y: visualY }}
      />
      <div className={styles.heroNoise} aria-hidden="true" />

      <div className={styles.heroInner}>
        <motion.div
          className={styles.heroCopy}
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
        >
          <Eyebrow>
            Careers at Quantimite{" "}
            <span className={styles.eyebrowDivider}>/</span> 2026
          </Eyebrow>

          <h1 id="careers-title" className={styles.heroTitle}>
            <span className={styles.titleLine}>MAKE YOUR</span>
            <span className={`${styles.titleLine} ${styles.titleAccent}`}>
              NEXT MOVE<span className={styles.titlePeriod}>.</span>
            </span>
          </h1>

          <motion.p
            className={styles.heroLead}
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.24, ease }}
          >
            Build meaningful products with people who care about great work.
          </motion.p>

          <motion.div
            className={styles.heroActions}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.38, ease }}
          >
            <MagneticLink href="#vacancies-section">
              Explore vacancies
            </MagneticLink>
            <a className={styles.textLink} href="#why-quantimite">
              Discover the culture
              <ArrowDownRight size={16} />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className={styles.heroArtwork}
          aria-hidden="true"
          style={reduceMotion ? undefined : { x: visualX, y: visualY }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.88, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.18, ease }}
        >
          <div className={styles.artworkHalo} />
          <div className={styles.artworkOrbitOne} />
          <div className={styles.artworkOrbitTwo} />
          <div className={styles.artworkOrbitThree} />

          <div className={styles.artworkCore}>
            <div className={styles.coreInner}>
              <span className={styles.coreMark}>
                Q<span>.</span>
              </span>
              <span className={styles.coreCaption}>BUILD / EVOLVE</span>
            </div>
          </div>

          <span className={`${styles.orbitNode} ${styles.nodeOne}`} />
          <span className={`${styles.orbitNode} ${styles.nodeTwo}`} />
          <span className={`${styles.orbitNode} ${styles.nodeThree}`} />

          <span className={styles.artworkLabel}>
            FIG. 01 <span>— THE NEXT FRONTIER</span>
          </span>
          <span className={styles.artworkCoordinate}>
            06° 55&apos; N
            <br />
            79° 51&apos; E
          </span>
        </motion.div>
      </div>

      <div className={styles.heroFooter}>
        <span>INDEPENDENT THINKERS. SHARED MOMENTUM.</span>
        <span>Q / CAREERS</span>
      </div>
    </section>
  );
}

/* WHY JOIN US SECTION */

function Pillar({
  item,
  index,
}: {
  item: (typeof pillars)[number];
  index: number;
}) {
  const reduceMotion = useReducedMotion();
  const Icon = item.icon;

  const handlePointerMove = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();

    event.currentTarget.style.setProperty(
      "--spot-x",
      `${event.clientX - bounds.left}px`
    );
    event.currentTarget.style.setProperty(
      "--spot-y",
      `${event.clientY - bounds.top}px`
    );
  };

  return (
    <motion.article
      className={styles.pillar}
      onPointerMove={handlePointerMove}
      initial={reduceMotion ? false : { opacity: 0, y: 34 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      whileHover={
        reduceMotion
          ? undefined
          : { y: -8, scale: 1.015, transition: { duration: 0.25 } }
      }
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.7, delay: index * 0.12, ease }
      }
    >
      <div className={styles.pillarTop}>
        <span className={styles.pillarNumber}>{item.number}</span>
        <span className={styles.pillarIcon}>
          <Icon size={19} strokeWidth={1.6} />
        </span>
        <span className={styles.pillarArrow}>
          <ArrowUpRight size={19} />
        </span>
      </div>

      <div className={styles.pillarContent}>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    </motion.article>
  );
}

function WhyJoin() {
  return (
    <section id="why-quantimite" className={styles.whySection}>
      <div className={styles.sectionShell}>
        <div className={styles.sectionIntro}>
          <div>
            <Eyebrow>The way we work</Eyebrow>
            <h2>
              Good work needs
              <br />
              <span>good people.</span>
            </h2>
          </div>
        </div>

        <div className={styles.pillars}>
          {pillars.map((item, index) => (
            <Pillar key={item.number} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* OPEN POSITIONS / RADAR SECTION - PRESERVED */

function RadarDisplay() {
  const reduceMotion = useReducedMotion();

  return (
    <div className={styles.radarStage} aria-hidden="true">
      <div className={styles.radarTopline}>
        <span>QUANTIMITE / TALENT SCAN</span>
        <span>
          SYS.ACTIVE <i />
        </span>
      </div>

      <div className={styles.radarGraphic}>
        <div className={styles.radarRing} />
        <div className={styles.radarRing} />
        <div className={styles.radarRing} />
        <div className={styles.radarCrosshair} />
        <div className={styles.radarSweep} />
        <div className={styles.radarCenter}>
          <Radar size={27} strokeWidth={1.2} />
        </div>
        <span className={`${styles.radarBlip} ${styles.blipA}`} />
        <span className={`${styles.radarBlip} ${styles.blipB}`} />
        <span className={`${styles.radarBlip} ${styles.blipC}`} />
        <span className={styles.radarAxisTop}>N / 01</span>
        <span className={styles.radarAxisBottom}>RANGE 04.8</span>
      </div>

      <div className={styles.radarReadout}>
        <span>
          <i />
          SCANNING THE HORIZON
        </span>
        <span>{reduceMotion ? "READY" : "CONTINUOUS"}</span>
      </div>
    </div>
  );
}

function Vacancies() {
  return (
    <section id="vacancies-section" className={styles.vacanciesSection}>
      <div className={styles.vacancyShell}>
        <div className={styles.vacancyHeader}>
          <div>
            <Eyebrow>Find your place</Eyebrow>
            <h2>
              Open <span>positions.</span>
            </h2>
          </div>
          <p>
            We&apos;re always interested in meeting people who see possibility
            where others see problems.
          </p>
        </div>

        <div className={styles.recruitmentConsole}>
          <div className={styles.consoleTop}>
            <span>
              <ScanLine size={15} />
              RECRUITMENT / LIVE FEED
            </span>
            <span className={styles.consoleStatus}>
              <i />
              {vacancies.length
                ? `${vacancies.length} OPEN ROLES`
                : "MONITORING"}
            </span>
          </div>

          {vacancies.length === 0 ? (
            <div className={styles.emptyState}>
              <RadarDisplay />
              <div className={styles.emptyCopy}>
                <span className={styles.emptyIndex}>
                  NO ACTIVE SIGNALS / 000
                </span>
                <h3>
                  Scanning for talent...
                  <br />
                  <span>Currently no open roles.</span>
                </h3>
                <p>
                  Our sensors are always active for exceptional engineering
                  talent. Submit your application to our direct talent pool.
                </p>
                <a
                  className={styles.applicationLink}
                  href={`mailto:${APPLICATION_EMAIL}?subject=${encodeURIComponent(
                    "Open Application | Quantimite"
                  )}`}
                >
                  <span>Send open application</span>
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
          ) : (
            <div className={styles.roleList}>
              {vacancies.map((vacancy, index) => (
                <motion.article
                  key={`${vacancy.title}-${vacancy.dept}`}
                  className={styles.roleRow}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                    ease,
                  }}
                >
                  <span className={styles.roleNumber}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.roleInfo}>
                    <h3>{vacancy.title}</h3>
                    <p>
                      {vacancy.dept}
                      <i />
                      {vacancy.location}
                    </p>
                  </div>
                  <a
                    href={`mailto:${APPLICATION_EMAIL}?subject=${encodeURIComponent(
                      `Application | ${vacancy.title}`
                    )}`}
                    className={styles.roleApply}
                  >
                    Apply now
                    <ArrowUpRight size={17} />
                  </a>
                </motion.article>
              ))}
            </div>
          )}

          <div className={styles.consoleBottom}>
            <span>QUANTIMITE TALENT NETWORK</span>
            <span>
              ALWAYS OPEN TO EXCEPTIONAL PEOPLE
              <Zap size={13} />
            </span>
          </div>
        </div>

        <div className={styles.vacancyFootnote}>
          <span>DON&apos;T SEE YOUR ROLE?</span>
          <a
            href={`mailto:${APPLICATION_EMAIL}?subject=${encodeURIComponent(
              "Open Application | Quantimite"
            )}`}
          >
            Tell us what you could bring
            <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* MAIN CAREERS PAGE */

export default function CareersPage() {
  return (
    <div className={styles.page}>
      <Hero />
      <WhyJoin />
      <Vacancies />
    </div>
  );
}
