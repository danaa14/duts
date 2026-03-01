import { translate } from "../i18n";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

interface MemberProps{
  name: string;
  title: string;
  imageSrc?: string;
}

const Member = ({name, title, imageSrc}: MemberProps) => {
    return(
        <article className="w-[14vw] mr-[2vw]">
            <img src={imageSrc}/>
            <p className="uppercase font-onest font-normal text-center tracking-[-0.08em] text-[1vw] ">NAME: {name}</p>
            <p className="uppercase font-onest font-normal text-center tracking-[-0.08em] text-[1vw] ">TITLE: {title}</p>
        </article>
    )
}

export default Member;