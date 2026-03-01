import type { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({ onClick, children, className = "" }: ButtonProps) =>{
    return(
        <button onClick={onClick}
        className={` text-white font-onest md:min-w-[12vw] md:h-[7vh] md:mt-[3vh] md:text-[0.833vw] font-medium bg-glass-radial-purple border-4 border-[#E7E2FF] ${className}`}>
            {children}
        </button>
    )
}

export default Button;