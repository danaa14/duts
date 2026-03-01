import Members from "../components/Members";
import OurTeamText from "../components/OurTeamText";

const OurTeam = () => {
    return(
        <section className="w-full flex relative z-10 justify-between py-[15vh] max-w-[83.125vw] mx-[8.5vw]">
            <OurTeamText/>
            <Members/>
        </section>
    )
}

export default OurTeam;