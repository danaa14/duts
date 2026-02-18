import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { translate } from "../i18n";
import type { Language } from "../store/langSlice";
import GlassUI from "../components/GlassUI";
import "./Home.css";

const ourProjectsStyles: Record<
  Language,
  {
    headingWidth: string;
  }
> = {
  EN: { headingWidth: "w-[30vw]" },
  FR: { headingWidth: "w-[35vw]" },
  RO: { headingWidth: "w-[36vw]" },
  RU: { headingWidth: "w-[28vw]" },
};

const OurProjects = () => {
  const language = useSelector((state: RootState) => state.lang.language);
  const styles = ourProjectsStyles[language];

  return (
    <>
      <h1
        className={`font-onest font-medium text-[3.33vw] ${styles.headingWidth} mx-auto text-justify tracking-[-0.08em] mb-[6vh]`}
      >
        {translate("ourprojectsheading", language)}
        <span className="ml-[3vw]">{translate("ourprojectsheadingspan", language)}</span>
      </h1>
      <section className="flex justify-center items-center mx-auto">
        <GlassUI className="glass w-[69.53vw] h-[65.83vh] ">
          <article className="w-full h-full flex justify-center items-center">
            <img src="/corespond.png" alt="exemplu" className="w-[29.4vw] h-auto"/>
            <div className="flex flex-col justify-center items-center ml-[3vw] h-[49vh]">
              <GlassUI className="bg-black/65 w-[21vw] h-[47vh] font-onest">
                <div className="px-[2vw] py-[4vh]">
                  <img src="#" alt="pfp" className="w-[7.3vw] h-[7.3vw] bg-[#0059FF] rounded-[33px]"/>
                  <h3 className="text-[1.8vw] font-medium pt-[2vh]">Borea Tigan</h3>
                  <h4 className="text-[#BDBEFF] text-[1vw]">CEO Musarka</h4>
                  <p className="text-[1vw] pt-[2vh]">
                    <span className="ml-[1vw]">No</span> fluff, no bullshit — just bold,     unforgettable branding that makes people give a damn.
                  </p>
                  <span className="text-[#BDBEFF] text-[2.5vw]">”</span>  
                </div>
              </GlassUI>
              <hr className="bg-[#F4F2FF] w-[21vw] h-[4px] my-[2.8vh] rounded-[10px] overflow-hidden"/>
              <hr className="relative  bg-[#0059FF] h-[4px]"/>
            </div>
          </article>
        </GlassUI>
      </section>
    </>
  );
};

export default OurProjects;
