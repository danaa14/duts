import { useEffect, useRef, useState } from "react";
import WinsText from "../components/WinsText";
import OrbitCarousel from "../components/OrbitCarousel";

const items = [
  { id: "1", title: "DEEPTECH", title2:" GIGAHACK", subtitle: "Winners", year: "2025", color: "#00FF11", subcolor: "#FFF700" },
  { id: "2", title: "DEEPTECH ACADEMY", subtitle: "Graduated", year: "2026", color: "#00D9FF", subcolor: "#DADADA" },
  { id: "3", title: "COLLABORATION WITH", subtitle: "Moldova's ", subtitle2:"Police System", year: "2025", color: "#FFFFFF", subcolor: "#FFA600", subcolor2:"#0059FF", size:"1.8vw", subsize:"1.6vw" },
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
  const [progress, setProgress] = useState(0);

  const progressRef = useRef(0);
  const frozenRef = useRef(false);
  const lockedRef = useRef(false); 

  const SCRUB_PX = 900;


  useEffect(() => {
    const root = scrollerRef.current;
    const el = sectionRef.current;
    if (!root || !el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);

          if (!lockedRef.current && !frozenRef.current) {
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

    const applyDelta = (dy: number) => {
      if (!active || frozenRef.current) return;

      const next = clamp01(progressRef.current + dy / SCRUB_PX);
      progressRef.current = next;
      setProgress(next);

      if (next >= 0.999 && !frozenRef.current) {
        frozenRef.current = true;
        progressRef.current = 1;
        setProgress(1);

        onUnlock();
      }
    };

    const onWheel = (e: WheelEvent) => {
      if (!active || frozenRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      applyDelta(e.deltaY);
    };

    let lastTouchY: number | null = null;

    const onTouchStart = (e: TouchEvent) => {
      lastTouchY = e.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!active || frozenRef.current) return;
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
      className="w-full h-screen flex items-center justify-between relative z-10"
    >
      <WinsText className="py-[15vh] mb-[5vh] md:ml-[8.5vw]" progress={progress} />
      <OrbitCarousel
        items={items}
        progress={progress}
        orbitRx={500}
        orbitRy={320}
        centerOffsetX={350}
        centerOffsetY={0}
        />
    </section>
  );
};

export default WinsSection;