import { translate } from "../i18n";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Button from "./Button";

interface AsideProps {
  className?: string;
}

const Aside = ({ className = "" }: AsideProps) => {
    const language = useSelector((state: RootState) => state.lang.language);

    return(
        <aside className={className}>
            <h1 className="text-[3.125vw] font-bold font-onest text-justify tracking-[-0.07em] leading-[120%]">{translate("asideheading", language)}</h1>
            <p className="text-justify w-[17vw] text-[1.1vw] font-normal font-onest mt-[3vh] tracking-[-0.07em]">{translate("asidesubheading", language)}</p>
            <div className="flex">
                <Button
                    className="rounded-[368px]"
                    onClick={() => {
                        const section = document.getElementById("aboutus");
                        section?.scrollIntoView({ behavior: "smooth" });
                    }}
                    >
                    {translate("asidebutton", language)}
                </Button>
                <p className="w-[10vw] py-[4vh] text-justify font-onest text-[#9A9A9A] text-[0.8vw] ml-[2vw]">{translate("asidetext", language)}</p>
            </div>
        </aside>
    )
}

export default Aside;
