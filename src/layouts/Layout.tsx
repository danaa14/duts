import Header from "../components/Header";
import Footer from "../components/Footer";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const handleScroll = () => {
    if (!lineRef.current) return;

        const scrollY = window.scrollY;

        const parallaxAmount = scrollY * -0.5;
        lineRef.current.style.backgroundPositionY = `${parallaxAmount}px`;

        const isMobile = window.innerWidth < 768;

        const fadeStart = isMobile ? 50 : 100;
        const fadeEnd = isMobile ? 120 : 400;

        const opacity =
        scrollY <= fadeStart
            ? 0
            : Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1);

        lineRef.current.style.opacity = opacity.toString();
    };

    handleScroll(); 

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
    const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
    }, []);

  return (
    <div className="relative min-h-screen">
       <div
            ref={lineRef}
            className="
                fixed
                top-0
                left-0
                w-[200%] md:w-full
                h-full
                pointer-events-none
                bg-repeat-y
            "
            style={{
                backgroundImage: isMobile
                ? "url('/gradientlinemobile.png')"
                : "url('/gradientline.png')",
                backgroundSize: isMobile
                ? "120vw 300vh"
                : "150vw auto",
                zIndex: 0,
                opacity: 0,
                maskImage:
                "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
                WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
                willChange: "transform, opacity",
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
