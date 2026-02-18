import Button from "../components/Button";
import { translate } from "../i18n";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import GlassUI from "../components/GlassUI";
import "./Home.css";

interface AboutUsProps {
  className?: string;
}

const AboutUs = ({ className = "" }: AboutUsProps) => {
  const language = useSelector((state: RootState) => state.lang.language);

  return (
    <section className={className}>
      <GlassUI className="glass w-[83.125vw] h-[64vh]">
         <div className="w-full h-full flex items-center justify-center ">
                <div className="w-[74vw] h-[49vh] grid grid-cols-[1fr_30%] grid-rows-[auto_1fr_auto] border-2 border-black rounded-[15px] overflow-hidden">
                    
                    <h2 className="font-onest font-semibold text-[1.6vw] border-b-2 border-r-2 border-black py-[1vw] pl-[3vw]">
                        {translate("aboutusheading", language)}
                    </h2>

                    <div className="row-span-3 border-l-2 border-black ">
                        <img
                            src="/team.png"
                            alt="Team Photo"
                            className="w-full h-full object-cover rounded-r-[12px]"
                        />
                    </div>

                    <p className="w-[29.5vw] text-justify font-onest font-normal text-[1vw] border-black border-b-0 my-auto pl-[3vw]">
                        <span className="text-[#7DABFF]">{translate("aboutustextspan", language)}</span> {translate("aboutustext", language)}
                    </p>

                    <div className="py-[1.4vw] pl-[3vw] border-black border-t-2">
                        <span className="font-onest font-medium text-[1.25vw]">
                            {translate("aboutusspan", language)}
                        </span>

                        <Button
                            className="rounded-[368px] block mt-[1.5vh] mb-[1vh] color-white"
                            onClick={() => {
                                const section = document.getElementById("ourprojects");
                                section?.scrollIntoView({ behavior: "smooth" });
                            }}
                            >
                            {translate("aboutusbutton", language)}
                        </Button>
                    </div>
                </div>
            </div>
      </GlassUI>
    </section>
  );
};

export default AboutUs;
