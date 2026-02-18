import Layout from "../layouts/Layout";
import Aside from "../components/Aside";
import Search from "../components/Search";
import AboutUs from "./AboutUs";
import Services from "./Services";
import YourProjectSteps from "./YourProjectSteps";
import OurProjects from "./OurProjects";

const Home = () => {
  return (
    <>    
      <Layout>
        <main className="relative bg-dark min-h-screen overflow-hidden">

          <section className="flex justify-between py-[13vh] pt-[11vh] relative z-10">
            <Aside className="mt-[5vh] w-[29vw] ml-[8.5vw]" />
            <Search />
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
