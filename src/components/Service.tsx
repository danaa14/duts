import { translate } from "../i18n";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import GlassUI from "../components/GlassUI";
import "../pages/Home.css";

interface ServiceProps{
  title: string;
  rightTexts: string[];
  imageSrc?: string;
  color?: string;
}

const Service = ({ title, rightTexts, color, imageSrc}: ServiceProps) => {
    const language = useSelector((state: RootState) => state.lang.language);

    return(
        <GlassUI className="glass w-[26vw] h-[40.4vh] transition-transform duration-300 ease-out hover:scale-[1.1]">
            <div className="w-full h-full ">
                <section className=" text-left mx-[2.4vw]">
                    <h2 className="font-onest font-semibold text-[2vw] my-[4vh]">{title}</h2>
                    <article className="flex ">
                        <div className="w-full">
                            <p className="font-medium text-justify text-[0.8vw] w-[9vw]" style={{ color: color }}>{translate("servicetexttop", language)}</p>
                            <p className="font-medium text-justify text-[0.8vw] mt-[12.5vh] w-[7.5vw]" style={{ color: color }}>{translate("servicetextbottom", language)}</p>
                        </div>
                        <div className="ml-[3.5vw]">                                <p className="font-medium text-justify text-[0.8vw] w-[8.75vw]" style={{ color: color }}>{rightTexts}</p>
                            <img className="mt-[12.5vh] w-[2.5vw] my-auto ml-[6vw]" src={imageSrc} alt="arrow" />
                        </div>
                    </article>
                </section>
            </div>
        </GlassUI>
    )
}

export default Service;