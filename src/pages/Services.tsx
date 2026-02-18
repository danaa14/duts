import Service from "../components/Service";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import { translate } from "../i18n";

const Services = () => {
  const language = useSelector((state: RootState) => state.lang.language);

  const services = [
    {
      title: translate("brandingtitle", language),
      rightTexts: [translate("brandingtext", language)],
      imageSrc: "/arrow.svg",
      color: "#FF85E9",
    },
    {
      title: translate("webpacktitle", language),
      rightTexts: [translate("webpacktext", language)],
      imageSrc: "/arrow1.svg",
      color: "#93B9FF",
    },
    {
      title: translate("videoprodtitle", language),
      rightTexts: [translate("videoprodtext", language)],
      imageSrc: "/arrow2.svg",
      color: "#FF8FA2",
    },
  ];

  return (
    <>
      <h1 className="font-onest font-medium text-[3.33vw] text-center mb-[6vh] tracking-[-0.08em]">
        {translate("servicesheading", language)}
      </h1>

      <section className="w-[83.125vw] mx-[8.5vw] grid grid-cols-3 gap-[2.5vw]">
        {services.map((service, index) => (
          <Service
            key={index}
            title={service.title}
            rightTexts={service.rightTexts}
            imageSrc={service.imageSrc}
            color={service.color}
          />
        ))}
      </section>
    </>
  );
};

export default Services;
