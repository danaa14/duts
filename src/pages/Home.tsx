import { useEffect, useRef, useState } from "react";
import Layout from "../layouts/Layout";
import Main from "./Main";
import WinsSection from "./WinsSection";
import OurTeam from "./OurTeam";
import Services from "./Services";
import OurProjects from "./OurProjects";

const Home = () => {
  const scrollerRef = useRef<HTMLElement | null>(null);
  const [winsLocked, setWinsLocked] = useState(false);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  return (
    <Layout scrollerRef={scrollerRef}>
      <main
        ref={scrollerRef}
        className={[
          "relative bg-dark h-screen overflow-y-scroll overflow-x-hidden scroll-smooth",
          winsLocked ? "" : "snap-y snap-mandatory",
        ].join(" ")}
      >
        <section className="snap-start h-screen">
          <Main />
        </section>

        <section id="wins" className="snap-start h-screen">
          <WinsSection
            scrollerRef={scrollerRef}
            onLock={() => setWinsLocked(true)}
            onUnlock={() => setWinsLocked(false)}
          />
        </section>

        <section className="snap-start h-screen">
          <OurTeam />
        </section>

        <section
          id="services"
          className="snap-start min-h-screen py-[15vh] w-full mx-auto relative z-10"
        >
          <Services />
        </section>

        <section
          id="ourprojects"
          className="snap-start min-h-screen py-[15vh] relative z-10"
        >
          <OurProjects />
        </section>
      </main>
    </Layout>
  );
};

export default Home;