import { useEffect, useRef, useState } from "react";
import WinsText from "../components/WinsText";
import OrbitCarousel from "../components/OrbitCarousel";

const items = [
  { id: "1", title: "DEEPTECH", title2:" GIGAHACK", subtitle: "Winners", year: "2025", color: "#00FF11", subcolor: "#FFF700", text: "BIGGEST HACKATHON IN MOLDOVA🇲🇩" },
  { id: "2", title: "DEEPTECH ACADEMY", subtitle: "Graduated", year: "2026", color: "#00D9FF", subcolor: "#DADADA", text: "FIRST DEEPTECH ACADEMY 🚀" },
  { id: "3", title: "COLLABORATION WITH", subtitle: "Moldova's ", subtitle2:"Police System", year: "2025", color: "#FFFFFF", subcolor: "#FFA600", subcolor2:"#0059FF", size:"1.8vw", subsize:"1.6vw", text: "DIGITIZING THE GOVERNMENT 🚀" },
  { id: "4", title: "DIGI", title2:" EDUHACK", subtitle: "2nd place", year: "2025", color: "#FF60E2", subcolor: "#DADADA" },
];

type Props = {
  scrollerRef: React.RefObject<HTMLElement | null>;
  onLock: () => void;
  onUnlock: () => void;
};

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const WinsSection = ({ scrollerRef, onLock, onUnlock }: Props) => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [active, setActive] = useState(false);

  const [textProgress, setTextProgress] = useState(0);   
  const [orbitProgress, setOrbitProgress] = useState(0);

  const textRef = useRef(0);
  const orbitRef = useRef(0);

  const finishedOrbitRef = useRef(false);
  const lockedRef = useRef(false);

  const TEXT_SCRUB_PX = 900;   
  const ORBIT_SCRUB_PX = 1100; 

  const HOLD_MS = 1200;      
  const HOLD_EPS = 0.02;     

  const itemsCount = Math.max(1, items.length);
  const checkpoints = Array.from({ length: itemsCount }, (_, i) => i / itemsCount);
  const holdIndexRef = useRef(0);
  const holdingRef = useRef(false);
  const holdUntilRef = useRef(0);

  useEffect(() => {
    const root = scrollerRef.current;
    const el = sectionRef.current;
    if (!root || !el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          if (!lockedRef.current && !finishedOrbitRef.current) {
            lockedRef.current = true;
            onLock();
          }
        } else {
          setActive(false);
        }
      },
      { root, threshold: 0.65 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [scrollerRef, onLock]);

  useEffect(() => {
    const root = scrollerRef.current;
    if (!root) return;

    const maybeHoldOrbit = (nextOrbit: number) => {
      if (finishedOrbitRef.current) return nextOrbit;

      const now = Date.now();
      if (holdingRef.current) {
        if (now < holdUntilRef.current) {
          return orbitRef.current; 
        } else {
          holdingRef.current = false;
        }
      }

      const idx = holdIndexRef.current % checkpoints.length;
      const cp = checkpoints[idx];

      if (nextOrbit > orbitRef.current && Math.abs(nextOrbit - cp) < HOLD_EPS) {
        holdingRef.current = true;
        holdUntilRef.current = now + HOLD_MS;
        holdIndexRef.current = idx + 1;
        return cp;
      }

      return nextOrbit;
    };

    const applyDelta = (dy: number) => {
      if (!active) return;

      const nextText = clamp01(textRef.current + dy / TEXT_SCRUB_PX);
      textRef.current = nextText;
      setTextProgress(nextText);

      let nextOrbit = clamp01(orbitRef.current + dy / ORBIT_SCRUB_PX);
      nextOrbit = maybeHoldOrbit(nextOrbit);

      orbitRef.current = nextOrbit;
      setOrbitProgress(nextOrbit);

      if (nextOrbit >= 0.999 && !finishedOrbitRef.current) {
        finishedOrbitRef.current = true;
        orbitRef.current = 1;
        setOrbitProgress(1);

        onUnlock();

        requestAnimationFrame(() => {
          root.scrollBy({ top: 2, behavior: "auto" });
        });
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!active) return;

      if (finishedOrbitRef.current) return;

      e.preventDefault();
      e.stopPropagation();
      applyDelta(e.deltaY);
    };

    let lastTouchY: number | null = null;

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!active) return;
      if (finishedOrbitRef.current) return;
      if (lastTouchY == null) return;

      e.preventDefault();
      e.stopPropagation();

      const y = e.touches[0]?.clientY ?? lastTouchY;
      const dy = lastTouchY - y;
      lastTouchY = y;

      applyDelta(dy);
    };

    root.addEventListener("wheel", onWheel, { passive: false });
    root.addEventListener("touchstart", onTouchStart, { passive: true });
    root.addEventListener("touchmove", onTouchMove, { passive: false });

    return () => {
      root.removeEventListener("wheel", onWheel as any);
      root.removeEventListener("touchstart", onTouchStart as any);
      root.removeEventListener("touchmove", onTouchMove as any);
    };
  }, [active, scrollerRef, onUnlock]);

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen flex items-center justify-between relative z-10">
      <WinsText className="py-[15vh] mb-[5vh] md:ml-[8.5vw]" progress={textProgress} />

      <OrbitCarousel
        items={items}
        progress={orbitProgress}
        orbitRx={500}
        orbitRy={320}
        centerOffsetX={350}
        centerOffsetY={0}
        mode="scrub"
      />
    </section>
  );
};

export default WinsSection;