import GlassSurface from "./ui/GlassSurface";
import type { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/langSlice";
import { translate } from "../i18n";
import type { AppDispatch } from "../store";
import type { Language } from "../store/langSlice";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import GlassUI from "./ui/GlassUI";

const allLanguages: Language[] = ["EN", "RO", "RU", "FR"];

interface HeaderProps {
  className?: string;
}

const Header = ({ className = "" }: HeaderProps) => {
  const language = useSelector((state: RootState) => state.lang.language);
  const dispatch = useDispatch<AppDispatch>();

  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [buttonPosition, setButtonPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });

  const updateButtonPosition = () => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setButtonPosition({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });
  };

  const toggleDropdown = () => {
    updateButtonPosition();
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", updateButtonPosition);
    return () => window.removeEventListener("resize", updateButtonPosition);
  }, []);

  return (
    <div className="relative overflow-visible bg-glass-radial w-[90%] md:w-[83.125vw] h-auto md:h-[10vh] rounded-[40px] md:rounded-[59px] mx-auto">
      <GlassSurface
        displace={0.5}
        distortionScale={-180}
        redOffset={0}
        greenOffset={10}
        blueOffset={20}
        brightness={50}
        opacity={0.93}
        mixBlendMode="screen"
        className={className}
        width="100%"
        height="100%"
        borderRadius={59}
        borderWidth={0.07}
      >
        <header className="relative w-full h-full flex justify-between items-center px-4 md:px-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              const scroller = document.querySelector("main");
              if (scroller && "scrollTo" in scroller) {
                (scroller as HTMLElement).scrollTo({ top: 0, behavior: "smooth" });
              } else {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <img
              className="max-h-[6vh] md:h-auto ml-[4.68vw]"
              src="/logo.png"
              alt="DUTS logo"
            />
          </a>

          <nav className="hidden md:block w-[44.55vw]">
            <ul className="flex justify-between items-center list-none font-onest text-sm md:text-[1vw]">
              {["aboutus", "services", "ourprojects", "yourprojectsteps"].map((id) => (
                <li key={id}>
                  <button
                    onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                    className="font-normal text-white bg-transparent"
                  >
                    {translate(id, language)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4 md:mr-[4.68vw]">
            {/* Language (Desktop Only) */}
            <div className="relative hidden md:block font-onest z-50">
              <button
                ref={buttonRef}
                onClick={toggleDropdown}
                className="flex items-center justify-between w-[3.75vw] px-[0.8vw] py-[0.4vw] text-[1.1vw] text-white font-normal bg-transparent outline-none border-none"
              >
                {language}
                <img
                  src="/arrowdown.png"
                  alt=""
                  className={`ml-[0.4vw] w-[0.8vw] transition-transform duration-300 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open &&
                createPortal(
                  <div
                    ref={dropdownRef}
                    style={{
                      position: "fixed",
                      top: buttonPosition.top + buttonPosition.height,
                      left: buttonPosition.left,
                      width: buttonPosition.width,
                      borderRadius: 12,
                      backdropFilter: "blur(12px) saturate(1.8)",
                      backgroundColor: "rgba(15,15,16,0.1)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                      overflow: "hidden",
                      zIndex: 9999,
                    }}
                  >
                    {allLanguages
                      .filter((lang) => lang !== language)
                      .map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            dispatch(setLanguage(lang));
                            setOpen(false);
                          }}
                          className="w-full flex justify-center items-center py-2 text-white font-normal bg-transparent hover:bg-white/20 transition-colors rounded-none"
                        >
                          {lang}
                        </button>
                      ))}
                  </div>,
                  document.body
                )}
            </div>

            {/* Hamburger (Mobile Only) */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden flex flex-col justify-center mr-[3vw] bg-transparent items-center w-10 h-12 space-y-2"
            >
              <span
                className={`block h-0.5 w-8 bg-white transition-all rounded-[20px] ${
                  mobileMenuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-8 bg-white transition-all rounded-[20px] ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-8 bg-white transition-all rounded-[20px] ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              />
            </button>
          </div>
        </header>
      </GlassSurface>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 w-full z-50 transition-all duration-300 ${
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <GlassUI className="bg-black">
          <div className="glass flex flex-col gap-4 py-6 px-6">
            {["aboutus", "services", "ourprojects", "yourprojectsteps"].map((id) => (
              <button
                key={id}
                onClick={() => {
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                  setMobileMenuOpen(false);
                }}
                className="text-white text-lg text-center font-medium uppercase bg-transparent"
              >
                {translate(id, language)}
              </button>
            ))}
            <div className="pt-4 border-t border-white/20">
              <p className="text-white mb-2">Language</p>
              <div className="flex gap-4">
                {allLanguages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      dispatch(setLanguage(lang));
                      setMobileMenuOpen(false);
                    }}
                    className={`text-white ${lang === language ? "underline" : ""}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassUI>
      </div>
    </div>
  );
};

export default Header;