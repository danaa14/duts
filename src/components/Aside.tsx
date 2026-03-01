import { translate } from "../i18n";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Button from "./ui/Button";

interface AsideProps {
  className?: string;
}

const Aside = ({ className = "" }: AsideProps) => {
    const language = useSelector((state: RootState) => state.lang.language);

    return(
        <aside className={className}>
            <h1 className=" mx-auto md:w-[27.5vw] w-[78vw] text-[9vw] md:text-[3.125vw] font-normal uppercase font-onest text-center md:text-justify md:tracking-[-0.07em] leading-[120%]">{translate("asideheading", language)}</h1>
            <div className="hidden md:flex">
                <Button
                    className="rounded-[368px]"
                    onClick={() => {
                        const section = document.getElementById("aboutus");
                        section?.scrollIntoView({ behavior: "smooth" });
                    }}
                    >
                    {translate("asidebutton", language)}
                </Button>
                
            </div>
        </aside>
    )
}

export default Aside;
