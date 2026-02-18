import { TypeAnimation } from "react-type-animation";
import HighlightText from "./HighlightText";
import { useState } from "react";
import { motion } from "framer-motion";

const Search = () => {
  const [showHighlight, setShowHighlight] = useState(false);

  return (
    <div className="relative overflow-hidden w-[57vw] h-[52vh]">
      <div className="relative h-full w-[60vw] rounded-l-[500px] overflow-hidden border-[#404040] border-[0.8vw] bg-gradient-border">
          <div className="w-full h-full rounded-l-[500px] bg-glass-radial flex justify-center items-center pl-[7vw]">
            
            <div className="relative w-[57vw] h-[35vh] flex justify-center items-center">

              <div className={`absolute transition-opacity duration-300 ${showHighlight ? "opacity-0" : "opacity-100"}`}>
                <TypeAnimation
                  className="font-onest font-normal text-[35vh] leading-[1]"
                  sequence={["prod.", 700, "web", 700, "dev.", 700, "duts", 1000, () => setShowHighlight(true)]}
                  wrapper="span"
                  speed={20}
                />
              </div>

              <div className={`absolute transition-opacity duration-300 ${showHighlight ? "opacity-100" : "opacity-0"} flex items-center -translate-x-[4.3vw] -translate-y-[0.5vh]`}>
                <img
                  src="/selectleft.png"
                  alt="select left"
                  className="h-[33vh] relative bottom-[3.5vh] left-[2vw]"
                />

                <HighlightText
                  text="duts"
                  inView={showHighlight}
                  className="font-onest font-normal text-[35vh] h-[26vh] "
                  transition={{ duration: 2, ease: "easeInOut" }}
                  style={{
                    lineHeight: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                />
              </div>

              <motion.img
                src="/selectright.png"
                alt="select right"
                className="h-[33vh] absolute"
                initial={{ left: "2vw", opacity: 0 }}
                animate={{
                  left: showHighlight ? "calc(50% + 15vw)" : "2vw",
                  opacity: showHighlight ? 1 : 0
                }}
                transition={{ duration: 2, ease: "easeInOut" }}
                style={{ top: "4vh" }}
              />
            </div>
          </div>
      </div>
    </div>
  );
};

export default Search;
