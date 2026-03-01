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
  text?: string;
};

type Props = {
  items: OrbitItem[];
  pauseMs?: number; 
  moveMs?: number;
  progress?: number;
  mode?: "timed" | "scrub";
  orbitRx?: number;
  orbitRy?: number;
  centerOffsetX?: number;
  centerOffsetY?: number;
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function normDeg(deg: number) {
  return ((deg + 180) % 360 + 360) % 360 - 180;
}

const OrbitCarousel: React.FC<Props> = ({
  items,
  pauseMs = 15000,
  moveMs = 1200,
  progress,
  mode = "timed",
  orbitRx = 520,
  orbitRy = 220,
  centerOffsetX = 140,
  centerOffsetY = 0,
}) => {
  const count = Math.max(1, items.length);
  const step = 360 / count;

  const scrubMode = mode === "scrub";

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const timersRef = useRef<number[]>([]);
  const clearTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
  };


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
    clearTimers();

    if (scrubMode) return;
    if (items.length <= 1) return;

    const loop = () => {

      setIsMoving(false);

      const pauseTimer = window.setTimeout(() => {

        setIsMoving(true);

        setActiveIndex((i) => (i + 1) % items.length);

        const moveTimer = window.setTimeout(() => {
          loop();
        }, moveMs);

        timersRef.current.push(moveTimer);
      }, pauseMs);

      timersRef.current.push(pauseTimer);
    };

    loop();
    return () => clearTimers();
  }, [scrubMode, items.length, pauseMs, moveMs]);

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <img
          src="/planet.png"
          alt=""
          className="
            pointer-events-none select-none
            md:w-[14.1vw] h-auto
            relative left-[90%]
            motion-safe:animate-[spin_12s_linear_infinite]
            [transform-origin:center]
            [backface-visibility:hidden]
            [transform:translateZ(0)]
          "
        />
        <img src="/inner-disc.png" className="pointer-events-none select-none" alt="" />
        <img
          src="/outer-disc.png"
          className="pointer-events-none select-none absolute inset-0 m-auto max-w-[2000px] left-[25%]"
          alt=""
        />
      </div>

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

            const isActiveTimed = !scrubMode && i === activeIndex;

            const isActiveScrub = scrubMode && closeness > 0.98;

            const isActive = scrubMode ? isActiveScrub : isActiveTimed;

            const opacity = 0.25 + 0.75 * closeness;
            const scale = 0.7 + 0.45 * closeness;

            const yearActiveColor = "#C3C3C3";

            return (
              <div
                key={it.id}
                className="absolute left-1/2 top-1/2 transition-transform"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                  transitionDuration: scrubMode ? "0ms" : isMoving ? `${moveMs}ms` : "0ms",
                  transitionTimingFunction: "linear",
                }}
              >
                <div
                  className="transition-[transform,opacity] duration-200 ease-out"
                  style={{ opacity, transform: `scale(${scale})` }}
                >
                  <div className="relative">
                    <div
                      className={[
                        "absolute -right-[1.2vw] -translate-y-[2vh] z-[9999]",
                        "transition-all duration-300 ease-out",
                        isActive ? "opacity-100 scale-100" : "opacity-0 scale-90 pointer-events-none",
                      ].join(" ")}
                    >
                      <div className="bg-[#FFFFFF] w-[3vw] h-[3vw] rounded-full flex items-center justify-center">
                        <img src="/arrow.png" className="w-[1.4vw] h-[1.4vw]" alt="" />
                      </div>
                    </div>

                    {/* Main card */}
                    <GlassUI radius={33} className="w-[24vw] h-[16vh] bg-black/30">
                      <div className="flex items-center w-full h-full flex-col justify-between py-[2vh]">
                        <p
                          className="text-[1.5vw] text-center font-medium md:tracking-[-0.07em] leading-[120%] font-onest"
                          style={{ color: isActive ? yearActiveColor : "#525252" }}
                        >
                          {it.year}
                        </p>

                        <p
                          className="font-onest uppercase text-center font-medium md:tracking-[-0.07em] leading-[120%]"
                          style={{ color: it.color ?? "#FFFFFF", fontSize: it.size ?? "2.2vw" }}
                        >
                          {it.title}{" "}
                          {it.title2 ? <span className="text-[#FFFFFF]">{it.title2}</span> : null}
                        </p>

                        <p
                          className="font-onest uppercase text-center font-medium md:tracking-[-0.07em] leading-[120%]"
                          style={{ color: it.subcolor ?? "#DADADA", fontSize: it.subsize ?? "1.8vw" }}
                        >
                          {it.subtitle}{" "}
                          {it.subtitle2 ? (
                            <span style={{ color: it.subcolor2 ?? "#FFFFFF" }}>{it.subtitle2}</span>
                          ) : null}
                        </p>
                      </div>
                    </GlassUI>

                    {it.text?.trim() ? (
                      <GlassUI
                        radius={14}
                        borderWidth={1}
                        className="w-[11vw] h-[6vh] bg-black/40 absolute -right-[17vw] -translate-y-[3.5vh] z-[9999]"
                      >
                        <p className="font-onest uppercase font-medium leading-[120%] text-[#FFFFFF] px-[1vw] py-[1.2vh] text-[0.8vw] text-center">
                          {it.text}
                        </p>
                      </GlassUI>
                    ) : null}
                  </div>
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