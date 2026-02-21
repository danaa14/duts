import { TypeAnimation } from "react-type-animation";
import HighlightText from "./HighlightText";
import { useState, useRef} from "react";
import { motion } from "framer-motion";

interface SearchProps {
  className?: string;
}

const Search = ({ className = "" }: SearchProps) => {
  const [showHighlight, setShowHighlight] = useState(false);
  const leftRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden w-[97vw] h-[25vh] md:w-[57vw] md:h-[52vh] ${className}`}
    >
      <div className="relative h-full w-[100vw] md:w-[60vw] rounded-l-[500px] overflow-hidden border-[#404040] border-[2vw] md:border-[0.8vw]">
        <div className="w-full h-full rounded-l-[500px] bg-glass-radial flex justify-center items-center">
          <div className="relative flex items-center justify-center pl-[15%]">

            <div
              className={`absolute transition-opacity duration-300 ${
                showHighlight ? "opacity-0" : "opacity-100"
              }`}
            >
              <TypeAnimation
                className="font-onest font-normal text-[15vh] md:text-[35vh] leading-1"
                sequence={[
                  "prod",
                  700,
                  "web",
                  700,
                  "dev.",
                  700,
                  "duts",
                  900,
                  () => setShowHighlight(true),
                ]}
                wrapper="span"
                speed={20}
              />
            </div>

            <div
              className={`absolute transition-opacity duration-300 ${
                showHighlight ? "opacity-100" : "opacity-0"
              } flex items-center -translate-x-[6%] -translate-y-[3%] md:-translate-y-[2%]`}
            >
              <img
                src="/selectleft.png"
                alt="select left"
                ref={leftRef}
                className="h-[14.5vh] md:h-[33vh] absolute left-[-5%] bottom-[0%]"
              />

              <HighlightText
                text="duts"
                inView={showHighlight}
                className="font-onest font-normal text-[15vh] md:text-[35vh]"
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{ lineHeight: 0.7 }}
              />

              <motion.img
                src="/selectright.png"
                alt="select right"
                className="h-[14.5vh] md:h-[33vh] absolute top-0 left-0"
                initial={{ x: 0, opacity: 0 }}
                animate={{
                  x: showHighlight ? "960%" : 0,
                  opacity: showHighlight ? 1 : 0,
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
