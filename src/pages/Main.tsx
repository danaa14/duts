import Aside from "../components/Aside";
import Search from "../components/Search";
import Button from "../components/ui/Button";
import { translate } from "../i18n";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Main = () => {
    const language = useSelector((state: RootState) => state.lang.language);

    return(
        <section className="md:flex md:justify-between md:py-[13vh] pt-[7vh] md:pt-[11vh] relative z-10">
            <Aside className="mb-[5vh] md:mb-0 md:mt-[5vh] md:ml-[8.5vw]" />
            <Search className="ml-[3vw] "/>
            <Button
                    className="rounded-[368px] md:hidden block mx-auto mt-[5vh] md:mt-0"
                    onClick={() => {
                        const section = document.getElementById("aboutus");
                        section?.scrollIntoView({ behavior: "smooth" });
                    }}
                    >
                    {translate("asidebutton", language)}
            </Button>
          </section>

    )
}

export default Main;