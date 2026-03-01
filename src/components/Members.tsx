import Member from "./Member";

const Members = () => {
    const members = [
        {
          name: "Vlad Morărescu",
          title: "PROJECT MANAGER / SENIOR DESIGNER",
          imageSrc: "/vlad.png",
        },
        {
          name: "Daniela Moldovanu",
          title: "FULLSTACK DEVELOPER",
          imageSrc: "/vlad.png",
        },
        {
          name: "Sandu Rotari",
          title: "COPYWRITER / MARKETER",
          imageSrc: "/vlad.png",
        },
      ];

    return(
        <section className="flex m-2">
            {members.map((member, index) => (
            <Member
                key={index}
                name={member.name}
                title={member.title}
                imageSrc={member.imageSrc}
            />
            ))}
        </section>
    )
}

export default Members;