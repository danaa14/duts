import Header from "../components/Header";
import Footer from "../components/Footer";
import type { ReactNode, RefObject } from "react";
import { useEffect, useRef, useState } from "react";

interface LayoutProps {
  children: ReactNode;
  scrollerRef?: RefObject<HTMLElement | null>;
}

const Layout = ({ children, scrollerRef }: LayoutProps) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    let raf = 0;

    const getScrollY = () => {
      const scroller = scrollerRef?.current;
      const y = scroller ? scroller.scrollTop : window.scrollY;
      return Math.max(0, y);
    };

    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = lineRef.current;
        if (!el) return;

        const scrollY = getScrollY();

        el.style.backgroundPositionY = `${Math.round(scrollY * -0.5)}px`;

        const mobile = window.innerWidth < 768;
        const fadeStart = mobile ? 50 : 100;
        const fadeEnd = mobile ? 120 : 400;

        const p =
          scrollY <= fadeStart
            ? 0
            : Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1);

        el.style.opacity = String(p * 0.8);
      });
    };

    const scroller = scrollerRef?.current;

    if (scroller) {
      scroller.style.overscrollBehavior = "none";
      scroller.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => {
        cancelAnimationFrame(raf);
        scroller.removeEventListener("scroll", handleScroll as any);
      };
    } else {
      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
      return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", handleScroll as any);
      };
    }
  }, [scrollerRef]);

  return (
    <div className="relative min-h-screen">
      <div
        ref={lineRef}
        className="fixed inset-0 pointer-events-none bg-repeat-y -z-10"
        style={{
          backgroundImage: isMobile
            ? "url('/gradientlinemobile.png')"
            : "url('/gradientline.png')",
          backgroundSize: isMobile ? "120vw 300vh" : "150vw auto",
          opacity: 0,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
          willChange: "background-position, opacity",
        }}
      />

      <div className="sticky top-0 z-50 pt-[5vh] md:pt-[3vh] w-full flex justify-center">
        <Header className="mx-auto w-full h-full flex justify-between items-center" />
      </div>
      
      <div className="relative z-10 ">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;