import React from "react";

type CardProps = {
  title: string;
  description: string;
  imageUrl?: string;
  className?: string;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  imageUrl,
  className,
  onClick,
}) => {
  // handles cloick if any... else does nothing (skips)
  const handleClick = () =>{
    if (onClick) {
      onClick()
    }
  }
  return (
    <div onClick={handleClick} className={`rounded-xl transition-all duration-700 max-w-sm w-full mx-auto overflow-hidden flex flex-col ${className || ''}`}>
      {imageUrl && (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      )}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-4xl transition-all duration-700 ">{title}</h3>
        <p className="text-base mb-4 flex-1">{description}</p>
      </div>
    </div>
  );
};

export default Card