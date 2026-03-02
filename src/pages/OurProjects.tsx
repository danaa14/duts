import { useSelector } from "react-redux";
import type { RootState } from "../store";
import { translate } from "../i18n";
import type { Language } from "../store/langSlice";
import GlassUI from "../components/ui/GlassUI";

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
    <section className="mx-[8.5vw]">
      <h1
        className={`font-onest font-medium text-[3.33vw] ${styles.headingWidth} tracking-[-0.08em] mb-[6vh]`}
      >
        CASE STUDIES
      </h1>
      <div>
        
      </div>
    </section>
  );
};

export default OurProjects;
