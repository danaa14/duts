import { motion, type Transition } from "framer-motion"
import { cn } from "../../lib/utils"

export interface HighlightTextProps {
  text: string
  className?: string
  style?: React.CSSProperties
  inView?: boolean
  transition?: Transition
}

const HighlightText = ({
  text,
  className,
  style,
  inView = false,
  transition = { duration: 2, ease: "easeInOut" },
}: HighlightTextProps) => {
  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={
        inView
          ? { backgroundSize: "100% 100%" }
          : { backgroundSize: "0% 100%" }
      }
      transition={transition}
      className={cn(
        "relative inline-block px-2 py-1 rounded-lg",
        "bg-gradient-to-r from-[rgba(21,84,209,0.14)] to-[rgba(21,84,209,0.13)]",
        "bg-no-repeat bg-left",
        className
      )}
      style={{
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        ...style,
      }}
    >
      <span
        style={{
          position: "relative",
          top: "0.5vh",
          display: "inline-block",
        }}
      >
        {text}
      </span>
    </motion.span>
  )
}

export default HighlightText
