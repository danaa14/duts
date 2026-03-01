import React, { useEffect, useMemo, useRef, useState } from "react";
import GlassUI from "./ui/GlassUI";

type OrbitItem = {
  id: string;
  title: string;
  subtitle?: string;
  year?: string;
  color?: string;
  subcolor?: string;
  size?: string;
  subsize?: string;
  subcolor2?: string;
  title2?: string;
  subtitle2?: string;
};

type Props = {
  items: OrbitItem[];
  pauseMs?: number;
  moveMs?: number;
  progress?: number;
  orbitRx?: number;
  orbitRy?: number; 
  centerOffsetX?: number; 
  centerOffsetY?: number; 
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function normDeg(deg: number) {
  let d = ((deg + 180) % 360 + 360) % 360 - 180;
  return d;
}

const OrbitCarousel: React.FC<Props> = ({
  items,
  pauseMs = 15000,
  moveMs = 1200,
  progress,
  orbitRx = 520,    
  orbitRy = 220,      
  centerOffsetX = 140, 
  centerOffsetY = 0,   
}) => {
  const step = 360 / Math.max(1, items.length);

  const [activeIndex, setActiveIndex] = useState(0);
  const timers = useRef<number[]>([]);

  const scrubMode = typeof progress === "number";

  const timedRotation = useMemo(() => {
    const angleOfActive = activeIndex * step;
    return 180 - angleOfActive;
  }, [activeIndex, step]);

  const turns = 1;
  const scrubRotation = useMemo(() => {
    const p = clamp01(progress ?? 0);
    return 180 - p * 360 * turns;
  }, [progress]);

  const rotation = scrubMode ? scrubRotation : timedRotation;

  useEffect(() => {
    if (scrubMode) return; 
    if (items.length <= 1) return;

    const schedule = () => {
      timers.current.push(
        window.setTimeout(() => {
          setActiveIndex((i) => (i + 1) % items.length);
          timers.current.push(window.setTimeout(schedule, moveMs));
        }, pauseMs)
      );
    };

    schedule();
    return () => {
      timers.current.forEach(clearTimeout);
      timers.current = [];
    };
  }, [items.length, pauseMs, moveMs, scrubMode]);

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <img
          src="/planet.png"
          className="pointer-events-none select-none max-w-[272px] relative left-[90%]"
          alt=""
        />
        <img
          src="/inner-disc.png"
          className="pointer-events-none select-none"
          alt=""
        />
        <img
          src="/outer-disc.png"
          className="pointer-events-none select-none absolute inset-0 m-auto max-w-[2000px] left-[25%]"
          alt=""
        />
      </div>

      {/* Orbit layer */}
      <div
        className="absolute"
        style={{
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) translate(${centerOffsetX}px, ${centerOffsetY}px)`,
        }}
      >
        <div className="relative" style={{ width: orbitRx * 2, height: orbitRy * 2 }}>
            {items.map((it, i) => {
              const aDeg = i * step + rotation; 
              const a = (aDeg * Math.PI) / 180;

              const x = Math.cos(a) * orbitRx;
              const y = Math.sin(a) * orbitRy;

              const relative = normDeg(aDeg - 180);
              const closeness = 1 - clamp01(Math.abs(relative) / step);

              const yearcolor = "#C3C3C3";
              const isActive = closeness > 0.7;

              const opacity = 0.25 + 0.75 * closeness;
              const scale = 0.7 + 0.45 * closeness;

              return (
                <div
                  key={it.id}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  }}
                >
                  <div
                    className="transition-[transform,opacity] duration-200 ease-out"
                    style={{
                      opacity,
                      transform: `scale(${scale})`,
                    }}
                  >
                    <GlassUI radius={33} className=" w-[24vw] h-[16vh] bg-black/30">
                      <div className="flex items-center w-full h-full flex-col justify-between py-[2vh]">
                        <p
                          className="text-[1.5vw] text-center font-medium md:tracking-[-0.07em] leading-[120%] font-onest"
                          style={{ color: isActive ? yearcolor : "#525252" }}
                        >
                          {it.year}
                        </p>

                        <p
                          className="font-onest uppercase text-center font-medium md:tracking-[-0.07em] leading-[120%]"
                          style={{ color: it.color ?? "#FFFFFF", fontSize: it.size ?? "2.2vw" }}
                        >
                          {it.title} <span className="text-[#FFFFFF]">{it.title2}</span>
                        </p>

                        <p
                          className="font-onest uppercase text-[1.8vw] text-center font-medium md:tracking-[-0.07em] leading-[120%]"
                          style={{ color: it.subcolor ?? "#DADADA", fontSize: it.subsize ?? "1.8vw" }}
                        >
                          {it.subtitle} <span style={{ color: it.subcolor2 ?? "#FFFFFF"}}>{it.subtitle2}</span>
                        </p>
                      </div>
                    </GlassUI>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default OrbitCarousel;