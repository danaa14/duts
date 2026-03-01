import type { ReactNode } from "react";
import { useId } from "react";

interface GlassUIProps {
  className?: string;
  children: ReactNode;
  radius?: number; // NEW
}

const GlassUI = ({
  children,
  className = "",
  radius = 59, // default same as before
}: GlassUIProps) => {
  const gradientId = useId();

  return (
    <div
      className={`relative ${className}`}
      style={{ borderRadius: radius }}
    >
      <div
        className="relative z-10 w-full h-full overflow-hidden"
        style={{ borderRadius: radius }}
      >
        {children}
      </div>

      <svg className="absolute inset-0 w-full h-full pointer-events-none z-30">
        <defs>
          <linearGradient id={gradientId} x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#98F9FF" />
            <stop offset="50%" stopColor="#8726B7" />
            <stop offset="100%" stopColor="#0059FF" />
          </linearGradient>
        </defs>

        <rect
          x="1"
          y="1"
          width="calc(100% - 2px)"
          height="calc(100% - 2px)"
          rx={radius}
          ry={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default GlassUI;