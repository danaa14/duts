import type { ReactNode } from "react";

interface ButtonProps {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({ onClick, children, className = "" }: ButtonProps) =>{
    return(
        <button onClick={onClick}
        className={`text-white font-onest min-w-[12vw] h-[7vh] mt-[3vh] text-[0.833vw] font-medium bg-glass-radial-purple border-[0.4vh] border-[#E7E2FF] ${className}`}>
            {children}
        </button>
    )
}

export default Button;