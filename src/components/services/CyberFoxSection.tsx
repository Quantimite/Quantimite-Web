import React from 'react';

export default function CyberFoxSection() {
    const mascotPromptText =
        "Full-body 3D character design of a cute cybernetic fox mascot, Pixar and DreamWorks animation style, extremely joyful and enthusiastic. CHARACTER & FUR: Animal: Small futuristic fox with soft, dense, fluffy fur. Fur Colors: Pastel lavender and violet body fur, fluffy pure-white chest, white muzzle, and white inner ear fluff. Ears & Cybernetics: Large pointed ears with integrated glowing pink neon LED light strips inside, subtle glowing cyan tech-panel lines along the forearms and bushy tail. EXPRESSION & POSE: Facial Expression: Pure joy and happiness, wide open beaming smile, blushing cheeks, brightly lit glossy dark-purple eyes, cheerful raised eyebrows, energetic expression. Pose: Standing on two feet, excitedly holding up a semi-translucent glowing blue holographic map with cyan grid lines and a bright red 'X' target marker. LIGHTING & RENDERING: Style: 8k resolution, Octane render style, ray-traced subsurface scattering on fur, smooth studio key light with soft violet rim lighting. Background: Isolated on a solid pitch-black background (#000000) for easy PNG extraction.";

    return (
        <section className="relative overflow-hidden min-h-screen">
            {/* Background video */}
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source
                    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260331_151551_992053d1-3d3e-4b8c-abac-45f22158f411.mp4"
                    type="video/mp4"
                />
            </video>

            {/* Content wrapper */}
            <div className="relative max-w-[1831px] mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-20 md:py-24 z-10">

                {/* ROW 1 (top) */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-12 mb-12 sm:mb-16 md:mb-20">

                    {/* Child A -- The heading */}
                    <h2 className="font-grotesk text-[32px] sm:text-[48px] md:text-[60px] font-normal uppercase leading-[1.05] sm:leading-[1] md:leading-[1] text-cream relative">
                        Hello!<br />
                        I'm orbis
                        <span className="font-condiment text-[36px] sm:text-[52px] md:text-[68px] font-normal normal-case text-neon mix-blend-exclusion leading-[0.79] tracking-[0.03em] absolute right-[-8px] bottom-[-20px] sm:bottom-[-30px] md:bottom-[-40px] -rotate-1 opacity-90">
                            Orbis
                        </span>
                    </h2>

                    {/* Child B -- The character description */}
                    <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase text-cream max-w-[266px] leading-relaxed">
                        {mascotPromptText}
                    </p>
                </div>

                {/* ROW 2 (bottom) */}
                <div className="flex justify-between items-start">

                    {/* Child A -- Left text column (always visible) */}
                    <div className="flex flex-col gap-5 max-w-[335px]">
                        <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
                            {mascotPromptText}
                        </p>
                        <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
                            {mascotPromptText}
                        </p>
                    </div>

                    {/* Child B -- Right text column (desktop only) */}
                    <div className="hidden lg:flex flex-col gap-5 max-w-[335px]">
                        <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
                            {mascotPromptText}
                        </p>
                        <p className="font-mono text-[14px] sm:text-[15px] md:text-[16px] uppercase lg:text-cream text-[#010828] opacity-10 leading-relaxed">
                            {mascotPromptText}
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}