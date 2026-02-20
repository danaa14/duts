import Layout from "../layouts/Layout";
import Aside from "../components/Aside";
import Search from "../components/Search";
import AboutUs from "./AboutUs";
import Services from "./Services";
import YourProjectSteps from "./YourProjectSteps";
import OurProjects from "./OurProjects";
import Button from "../components/Button";
import { translate } from "../i18n";
import { useSelector } from "react-redux";
import type { RootState } from "../store";


const Home = () => {
  const language = useSelector((state: RootState) => state.lang.language);

  return (
    <>    
      <Layout>
        <main className="relative bg-dark min-h-screen overflow-hidden">

          <section className="md:flex md:justify-between md:py-[13vh] pt-[7vh] md:pt-[11vh] relative z-10">
            <Aside className=" md:mt-[5vh] md:ml-[8.5vw]" />
            <Search />
            <Button
                    className="rounded-[368px] md:hidden"
                    onClick={() => {
                        const section = document.getElementById("aboutus");
                        section?.scrollIntoView({ behavior: "smooth" });
                    }}
                    >
                    {translate("asidebutton", language)}
            </Button>
          </section>

          <section id="aboutus" className="w-full flex justify-between relative z-10">
            <AboutUs className="py-[15vh] m-auto" />
          </section>

          <section id="services" className="py-[15vh] w-full mx-auto relative z-10">
            <Services />
          </section>

          <section id="ourprojects" className="py-[15vh] relative z-10">
            <OurProjects />
          </section>

          <section
            id="yourprojectsteps"
            className="flex justify-center items-center w-full mx-auto py-[15vh] relative z-10"
          >
            <YourProjectSteps />
          </section>
        </main>
      </Layout>
    </>
  );
};

export default Home;
