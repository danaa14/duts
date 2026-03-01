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
      return scroller ? scroller.scrollTop : window.scrollY;
    };

    const handleScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = lineRef.current;
        if (!el) return;

        const scrollY = getScrollY();

        // parallax
        el.style.backgroundPositionY = `${scrollY * -0.5}px`;

        const mobile = window.innerWidth < 768;
        const fadeStart = mobile ? 50 : 100;
        const fadeEnd = mobile ? 120 : 400;

        const progress =
        scrollY <= fadeStart
            ? 0
            : Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1);
        el.style.opacity = String(progress * 0.6);
      });
    };

    const attach = () => {
      const scroller = scrollerRef?.current;

      window.removeEventListener("scroll", handleScroll as any);
      scroller?.removeEventListener("scroll", handleScroll as any);

      if (scroller) {
        scroller.addEventListener("scroll", handleScroll, { passive: true });
      } else {
        window.addEventListener("scroll", handleScroll, { passive: true });
      }

      handleScroll();
    };

    attach();

    const t = window.setTimeout(attach, 0);

    return () => {
      window.clearTimeout(t);
      cancelAnimationFrame(raf);

      const scroller = scrollerRef?.current;
      window.removeEventListener("scroll", handleScroll as any);
      scroller?.removeEventListener("scroll", handleScroll as any);
    };
  }, [scrollerRef]);

  return (
    <div className="relative min-h-screen">
      <div
        ref={lineRef}
        className="
          fixed top-0 left-0
          w-[200%] md:w-full
          h-full
          pointer-events-none
          bg-repeat-y
        "
        style={{
          backgroundImage: isMobile
            ? "url('/gradientlinemobile.png')"
            : "url('/gradientline.png')",
          backgroundSize: isMobile ? "120vw 300vh" : "150vw auto",
          zIndex: 0,
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

      <div className="relative z-10">
        {children}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;