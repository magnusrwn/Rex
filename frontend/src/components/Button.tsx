import React, { useState } from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    variant: "primary" | "secondary" | "nagative";
}


const Button: React.FC<ButtonProps> = ({children, onClick, className, disabled, type, variant}) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () =>{
        setIsClicked(!isClicked)
        setTimeout(()=>{
            setIsClicked(false)
        }, 100)
        onClick?.() // how you call a func only if it exists...
    }

    return (
        <button
         onClick={handleClick}
         className={`
            cursor-pointer
            drop-shadow-xl
         ${variant === "primary"?(isClicked ? "text-white bg-blue-900 border-1 border-blue-900 shadow-lg": "text-white  bg-blue-500 border-1 border-blue-500 hover:bg-blue-700 hover:border-blue-700 transition-all duration-200"):
            variant === "secondary" ?(isClicked? "bg-grey-300 text-slate-700 border-1 border-grey-700":"shadow-md text-gray-600 hover:bg-slate-100 transition-all duration-200"):
                (isClicked? "bg-red-100 text-red-700 border-1 border-red-700":"border-1 shadow-md text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-all duration-200")
         }
         
         ${className || ''}`}
         
         disabled={disabled}
         type={type}
         >
            {children}
        </button>
    )
}

export default Button