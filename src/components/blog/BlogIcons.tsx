import React from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

// 1. Core Systems & Distributed Architecture Icon
export function ArchitectureIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="archGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a818f5" />
          <stop offset="1" stopColor="#2f8bfa" />
        </linearGradient>
        <linearGradient id="archFill" x1="4" y1="4" x2="20" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a818f5" stopOpacity="0.15" />
          <stop offset="1" stopColor="#2f8bfa" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Isometric layered floating nodes */}
      <path
        d="M12 2L2 7L12 12L22 7L12 2Z"
        fill="url(#archFill)"
        stroke="url(#archGrad)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 17L12 22L22 17"
        stroke="url(#archGrad)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 12L12 17L22 12"
        stroke="url(#archGrad)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Center optical core dot */}
      <circle cx="12" cy="7" r="1.5" fill="#a818f5" />
      <circle cx="12" cy="12" r="1.2" fill="#2f8bfa" />
    </svg>
  );
}

// 2. Liquid Glass Interface & Spatial Design Icon
export function DesignPrismIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="prismGrad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d946ef" />
          <stop offset="0.5" stopColor="#a818f5" />
          <stop offset="1" stopColor="#38bdf8" />
        </linearGradient>
        <linearGradient id="prismFill" x1="6" y1="4" x2="18" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#d946ef" stopOpacity="0.2" />
          <stop offset="1" stopColor="#a818f5" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      {/* Refractive hexagonal prism */}
      <path
        d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z"
        fill="url(#prismFill)"
        stroke="url(#prismGrad)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 3V12M12 12L20 7.5M12 12L4 7.5M12 12V21"
        stroke="url(#prismGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2" fill="url(#prismGrad)" />
    </svg>
  );
}

// 3. Technical SEO & Telemetry Graph Icon
export function TelemetryIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="teleGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2f8bfa" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      {/* Ascending telemetry graph with pulse circles */}
      <path
        d="M3 20H21"
        stroke="url(#teleGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M4 16L9 11L14 14L20 5"
        stroke="url(#teleGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 5H20V9"
        stroke="url(#teleGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="11" r="2" fill="#2f8bfa" />
      <circle cx="14" cy="14" r="2" fill="#06b6d4" />
      <circle cx="20" cy="5" r="2" fill="#38bdf8" />
    </svg>
  );
}

// 4. Startup Velocity & Scale Propulsion Icon
export function VelocityIcon({ size = 24, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="velGrad" x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f59e0b" />
          <stop offset="0.6" stopColor="#f43f5e" />
          <stop offset="1" stopColor="#a818f5" />
        </linearGradient>
      </defs>
      {/* Aerodynamic warp propulsion */}
      <path
        d="M12 2C12 2 17 5 17 12C17 16 14.5 19 12 21C9.5 19 7 16 7 12C7 5 12 2 12 2Z"
        fill="rgba(245, 158, 11, 0.1)"
        stroke="url(#velGrad)"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 6V11"
        stroke="url(#velGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 14L2 17L5 18"
        stroke="url(#velGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 14L22 17L19 18"
        stroke="url(#velGrad)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="15" r="1.5" fill="#f43f5e" />
    </svg>
  );
}

// 5. Compass Explorer Icon
export function RadarCompassIcon({ size = 20, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="radarGrad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a818f5" />
          <stop offset="1" stopColor="#2f8bfa" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <polygon points="12,7 15,12 12,17 9,12" fill="url(#radarGrad)" />
      <circle cx="12" cy="12" r="1.5" fill="#fff" />
    </svg>
  );
}

// 6. Verified Blueprint Chip Icon
export function BlueprintChipIcon({ size = 18, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="1.75" />
      <path d="M7 8H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7 12H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="14" r="2" fill="#10b981" />
    </svg>
  );
}

// 7. Sleek Modern Hairline Arrow
export function ModernArrowRight({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M2.5 8H13.5M13.5 8L9 3.5M13.5 8L9 12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// 8. Custom Chronometer Read-Time Dial
export function ChronoDialIcon({ size = 14, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.25" opacity="0.4" />
      <path d="M8 4.5V8L10.5 9.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="8" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

// 9. Custom Optical Search Glass
export function OpticalSearchIcon({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="5.5" cy="5.5" r="1" fill="currentColor" opacity="0.3" />
    </svg>
  );
}

// 10. Custom Secure Dispatch Shield
export function DispatchShieldIcon({ size = 16, className = "", ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path
        d="M8 2L13.5 4.5V9C13.5 12 8 14.5 8 14.5C8 14.5 2.5 12 2.5 9V4.5L8 2Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 8L7.5 9.5L10.5 6.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
