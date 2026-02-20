import GlassUI from "../components/GlassUI";
import Button from "../components/Button";
import { useSelector } from "react-redux";
import { translate } from "../i18n";
import type { RootState } from "../store";
import type { Language } from "../store/langSlice";

const YourProjectStepsStyles: Record<
  Language,
  {
    headingWidth: string;
  }
> = {
  EN: {
    headingWidth: "w-[21.8vw]",
  },
  RO: {
    headingWidth: "w-[21.8vw]",
  },
  RU: {
    headingWidth: "w-[19.8vw]",
  },
  FR: {
    headingWidth: "w-[16.8vw]",
  },
};

const YourProjectSteps = () => {
    const language = useSelector((state: RootState) => state.lang.language);
    const styles = YourProjectStepsStyles[language];

    return(
        <GlassUI className="glass w-[69.53vw] h-[53.24vh] flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center ">
                <div className="w-[61.56vw] h-[40.46vh] grid grid-cols-[1fr_55%] grid-rows-[auto_1fr_auto] border-2 border-black rounded-[15px] overflow-hidden">
                    
                    <h2 className={`${styles.headingWidth} font-onest font-medium text-[1.6vw] pt-[3vw] text-justify pl-[3vw]`}>
                        {translate("yourprojectstepsheading", language)}
                    </h2>

                    <div className="row-span-3">
                        <img
                            src="/team2.png"
                            alt="Team Photo"
                            className="w-full h-full object-cover rounded-r-[12px] border-l-2 border-black"
                        />
                    </div>

                    <p className="w-[22vw] font-onest font-normal text-[1vw] pl-[3vw]">
                        {translate("yourprojectstepstext", language)} 
                    </p>

                    <div className="py-[1.4vw] pl-[3vw]">
                        <Button className="rounded-[368px] block my-[2vh]">
                            {translate("yourprojectstepsbutton", language)}
                        </Button>
                    </div>
                </div>
            </div>
        </GlassUI>
    )
}

export default YourProjectSteps;