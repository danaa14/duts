import GlassSurface from "./GlassSurface";
import type { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../store/langSlice";
import { translate } from "../i18n";
import type { AppDispatch } from "../store";
import type { Language } from "../store/langSlice";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
  const [buttonPosition, setButtonPosition] = useState({ top: 0, left: 0, width: 0, height: 0 });

  const updateButtonPosition = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
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
    <div className="bg-glass-radial w-[83.125vw] h-[10vh] rounded-[59px] mx-auto">
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
      width={"83.125vw"}
      height={"10vh"}
      borderRadius={59}
      borderWidth={0.07}
    >
      <header className="w-full h-full flex justify-between items-center">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img className="ml-[4.68vw]" src="/logo.png" alt="DUTS logo" />
        </a>

        <nav className="w-[44.55vw]">
            <ul className="flex justify-between items-center list-none font-onest text-[1vw]">
                
                <li>
                <button
                    onClick={() =>
                    document.getElementById("aboutus")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-white bg-transparent"
                >
                    {translate("aboutus", language)}
                </button>
                </li>

                <li>
                <button
                    onClick={() =>
                    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-white bg-transparent"
                >
                    {translate("services", language)}
                </button>
                </li>

                <li>
                <button
                    onClick={() =>
                    document.getElementById("ourprojects")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-white bg-transparent"
                >
                    {translate("ourprojects", language)}
                </button>
                </li>

                <li>
                <button
                    onClick={() =>
                    document.getElementById("yourprojectsteps")?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="text-white bg-transparent"
                >
                    {translate("yourprojectsteps", language)}
                </button>
                </li>

            </ul>
            </nav>

        <div className="relative mr-[4.68vw] font-onest z-50">
          <button
            ref={buttonRef}
            onClick={toggleDropdown}
            className="flex items-center justify-between w-[3.75vw] px-[0.8vw] py-[0.4vw] text-[1.1vw] text-white font-normal bg-transparent outline-none border-none"
          >
            {language}
            <img
              src="/arrowdown.png"
              alt=""
              className={`ml-[0.4vw] w-[0.8vw] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            />
          </button>

          {open &&
            createPortal(
              <div
                ref={dropdownRef}
                style={{
                  position: "fixed",
                  top: buttonPosition.top + buttonPosition.height ,
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
      </header>
    </GlassSurface>
    </div>
  );
};

export default Header;