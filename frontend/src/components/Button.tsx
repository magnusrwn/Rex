import React from "react";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
}


const Button: React.FC<ButtonProps> = ({children, onClick, className, disabled, type}) => {
    return (
        <button
         onClick={onClick}
         className={`m-7 px-2 py-1 bg-blue-500 text-white rounded-md drop-shadow-xl hover:bg-blue-600 transition-all duration-200 ${className || ''}`}
         disabled={disabled}
         type={type}
         >
            {children}
        </button>
    )
}

export default Button