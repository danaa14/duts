import { TextAnimate } from "@/components/ui/text-animate";

interface AboutUsProps {
  className?: string;
  progress: number; 
}

const clamp01 = (n: number) => Math.max(0, Math.min(1, n));

const WinsText = ({ className = "", progress }: AboutUsProps) => {

  const CHAR_SPEED = 0.035;
  const BASE = 0.25;
  const GAP = 0.18;

  const durFor = (s: string) => Math.max(0.45, BASE + s.length * CHAR_SPEED);
  const totalFor = (s: string) => durFor(s) + GAP;

  const L1 = "AWARDS-RECOGNIZED";
  const L2_LEFT = "DIGITAL";
  const L2_RIGHT_1 = "PARTNER";
  const L2_RIGHT_2 = "FOR";
  const L3 = "ENTERPRISE BRANDS.";

  const P1 = "We build strategic digital ecosystems that turn ";
  const P2 = "complex ideas into high-performance ";
  const P3 = "brands and ";
  const P4 = "growth-driven experiences.";

  const t1 = 0;
  const t2 = t1 + totalFor(L1);
  const t3 = t2 + totalFor(L2_LEFT);
  const t4 = t3 + totalFor(L2_RIGHT_1);
  const t5 = t4 + totalFor(L2_RIGHT_2);
  const t6 = t5 + totalFor(L3);

  const t7 = t6 + totalFor(P1);
  const t8 = t7 + totalFor(P2);
  const t9 = t8 + totalFor(P3);

  const END = t9 + durFor(P4);

  const time = clamp01(progress) * END;

  const blockP = (start: number, text: string) => {
    const d = durFor(text);
    return clamp01((time - start) / d);
  };

  const pL1 = blockP(t1, L1);
  const pL2L = blockP(t2, L2_LEFT);
  const pL2R1 = blockP(t3, L2_RIGHT_1);
  const pL2R2 = blockP(t4, L2_RIGHT_2);
  const pL3 = blockP(t5, L3);

  const pP1 = blockP(t6, P1);
  const pP2 = blockP(t7, P2);
  const pP3 = blockP(t8, P3);
  const pP4 = blockP(t9, P4);

  return (
    <section className={className}>
      <h1
        className="
          mx-auto md:w-[38vw] w-[78vw]
          text-[9vw] md:text-[3.125vw]
          font-normal uppercase font-onest
          text-left md:tracking-[-0.07em] leading-[120%]
        "
      >
        <div className="block">
          <TextAnimate
            animation="blurInUp"
            by="character"
            progress={pL1}
            className="inline"
            segmentClassName="inline-block"
          >
            {L1}
          </TextAnimate>
        </div>

        <div className="block w-full md:flex md:items-baseline md:justify-between">
          <TextAnimate
            animation="blurInUp"
            by="character"
            progress={pL2L}
            className="inline"
            segmentClassName="inline-block"
          >
            {L2_LEFT}
          </TextAnimate>

          <span className="mx-[1.6vw] md:mx-[2vw]" />

          <span className="text-[#2A2A2A] flex items-baseline">
            <TextAnimate
              animation="blurInUp"
              by="character"
              progress={pL2R1}
              className="inline"
              segmentClassName="inline-block"
            >
              {L2_RIGHT_1}
            </TextAnimate>

            <span className="mx-[1.6vw] md:mx-[2vw]" />

            <TextAnimate
              animation="blurInUp"
              by="character"
              progress={pL2R2}
              className="inline"
              segmentClassName="inline-block"
            >
              {L2_RIGHT_2}
            </TextAnimate>
          </span>
        </div>

        <div className="block text-[#2A2A2A]">
          <TextAnimate
            animation="blurInUp"
            by="character"
            progress={pL3}
            className="inline"
            segmentClassName="inline-block"
          >
            {L3}
          </TextAnimate>
        </div>
      </h1>

      <div
        className="
          font-onest md:w-[33.5vw]
          md:pt-[2vh]
          text-[1.5vw] font-normal text-[#848484]
          md:tracking-[-0.07em] leading-[120%]
          md:text-justify md:[text-align-last:justify]
        "
      >
        <TextAnimate
          animation="blurInUp"
          by="character"
          progress={pP1}
          className="inline"
          segmentClassName="inline-block"
        >
          {P1}
        </TextAnimate>

        {/* IMPORTANT: remove flex here if you want justification to work well */}
        <TextAnimate
          animation="blurInUp"
          by="character"
          progress={pP2}
          className="inline"
          segmentClassName="inline-block"
        >
          {P2}
        </TextAnimate>

        <span className="text-[#2A2A2A]">
          <TextAnimate
            animation="blurInUp"
            by="character"
            progress={pP3}
            className="inline"
            segmentClassName="inline-block"
          >
            {P3}
          </TextAnimate>
        </span>

        <span className="text-[#2A2A2A]">
          <TextAnimate
            animation="blurInUp"
            by="character"
            progress={pP4}
            className="inline"
            segmentClassName="inline-block"
          >
            {P4}
          </TextAnimate>
        </span>
      </div>
    </section>
  );
};

export default WinsText;