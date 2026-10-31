"use client";

import { useEffect, useState, useRef } from "react";

const steps = [
  {
    number: "1",
    title: "Understand",
    description: "Learn about your business, audience, and the problem to solve.",
  },
  {
    number: "2",
    title: "Plan",
    description: "Define priorities, requirements, and a practical direction.",
  },
  {
    number: "3",
    title: "Create",
    description: "Design and build with care for usability and quality.",
  },
  {
    number: "4",
    title: "Improve",
    description: "Test, refine, and support ongoing performance and growth.",
  },
];

export default function Process() {
  const [activeStep, setActiveStep] = useState(0);
  const [pulseKey, setPulseKey] = useState(0);
  const [lineStyles, setLineStyles] = useState({ left: 0, width: 0, bgWidth: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Automatically animate from step to step sequentially
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = (prev + 1) % steps.length;
        setPulseKey(next);
        return next;
      });
    }, 2500); // Changes active step every 2.5 seconds

    return () => clearInterval(interval);
  }, []);

  // Calculate exact center coordinates relative to the parent track container
  useEffect(() => {
    const updateLineDimensions = () => {
      if (!containerRef.current || circleRefs.current.length === 0) return;

      const containerLeft = containerRef.current.getBoundingClientRect().left;
      const firstCircle = circleRefs.current[0];
      const lastCircle = circleRefs.current[circleRefs.current.length - 1];
      const targetCircle = circleRefs.current[activeStep];

      if (firstCircle && lastCircle && targetCircle) {
        const firstCenter = firstCircle.getBoundingClientRect().left + firstCircle.offsetWidth / 2 - containerLeft;
        const lastCenter = lastCircle.getBoundingClientRect().left + lastCircle.offsetWidth / 2 - containerLeft;
        const targetCenter = targetCircle.getBoundingClientRect().left + targetCircle.offsetWidth / 2 - containerLeft;

        setLineStyles({
          left: firstCenter,
          bgWidth: lastCenter - firstCenter,
          width: targetCenter - firstCenter,
        });
      }
    };

    updateLineDimensions();
    const timer = setTimeout(updateLineDimensions, 50);

    window.addEventListener("resize", updateLineDimensions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateLineDimensions);
    };
  }, [activeStep]);

  return (
    <section className="py-24 bg-[#120B22] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            How we work
          </h2>
        </div>

        {/* Process Timeline Container */}
        <div ref={containerRef} className="relative">

          {/* Background Gray/Muted Tube starting and ending precisely at circle 1 and circle 4 centers */}
          <div
            className="hidden md:block absolute top-6 h-[3px] bg-white/10 z-0 rounded-full"
            style={{
              left: `${lineStyles.left}px`,
              width: `${lineStyles.bgWidth}px`
            }}
          />

          {/* Filling Tube Line starting at circle 1 center and stopping dead-center at active circle */}
          <div
            className="hidden md:block absolute top-6 h-[3px] bg-gradient-to-r from-purple-500 to-blue-500 z-0 transition-all duration-700 ease-in-out rounded-full"
            style={{
              left: `${lineStyles.left}px`,
              width: `${lineStyles.width}px`
            }}
          />

          {/* Steps Flex Container with Center Alignment */}
          <div className="flex flex-col md:flex-row justify-between items-start gap-10 relative z-10">
            {steps.map((step, index) => {
              const isPassed = index <= activeStep;
              const isJustReached = index === activeStep && pulseKey === index;

              return (
                <div key={step.number} className="flex flex-col items-center text-center relative md:w-1/4">

                  {/* Expanding Gradient Ring Popup when line reaches the step */}
                  {isJustReached && (
                    <div className="absolute -top-1 w-14 h-14 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-75 animate-ping pointer-events-none" />
                  )}

                  {/* Step Indicator Circle with Ref Tracking */}
                  <div
                    ref={(el) => { circleRefs.current[index] = el; }}
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 shadow-lg relative z-10 ${isPassed
                      ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-purple-500/30 scale-105 ring-4 ring-purple-500/20"
                      : "bg-[#1a103c] text-white/40 border border-white/10"
                      }`}
                  >
                    {step.number}
                  </div>

                  {/* Centered Step Content */}
                  <div className="mt-6 px-4">
                    <h3 className={`text-xl font-semibold transition-colors duration-300 ${isPassed ? "text-white" : "text-white/40"}`}>
                      {step.title}
                    </h3>
                    <p className={`mt-2 text-sm leading-relaxed transition-colors duration-300 ${isPassed ? "text-white/80" : "text-white/30"}`}>
                      {step.description}
                    </p>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}