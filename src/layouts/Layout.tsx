import Header from "../components/Header"
import Footer from "../components/Footer";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const lineRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!lineRef.current) return;

            const scrollY = window.scrollY;

            const parallaxAmount = Math.min(scrollY * -1, 150); 
            lineRef.current.style.transform = `translateY(${parallaxAmount}px)`;

            const fadeStart = 50;
            const fadeEnd = 400;

            let opacity = 0;

            if (scrollY > fadeStart) {
            opacity = Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1);
            }

            lineRef.current.style.opacity = opacity.toString();
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    return (
        <> 
            <img
                ref={lineRef}
                src="/gradientline.png"
                alt=""
                className="fixed top-[-200px] left-0 w-full pointer-events-none"
                style={{
                    zIndex: 0,
                    opacity: 0,
                    transition: "opacity 0.3s ease-out",
                    maskImage: "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
                    WebkitMaskImage:
                        "linear-gradient(to bottom, transparent 0%, black 20%, black 100%)",
                    willChange: "transform, opacity",
                    }}
            />

            <div className="pt-[3vh] top-0 z-50 sticky flex justify-center">
                <Header className = "mx-auto w-full h-full flex justify-between items-center "/>  
            </div>
                {children}
            <Footer />
        </>
    )
}

export default Layout;