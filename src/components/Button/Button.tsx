import React from "react";
import "./Button.scss";

export const Button: React.FC<IButton> = ({
  children,
  isRed,
  isBig,
  isWhite,
  isPrimary,
  onClick,
  className,
  type,
  isExtraBig,
}) => {
  const checkClassName = () => {
    let name = "btn";
    
    if (isRed) {
      name = name + " btn--red";
    } else if (isBig) {
      name = name + " btn--big";
    } else if (isWhite) {
      name = name + " btn--white";
    } else if (isExtraBig) {
      name = name + " btn--xbig";
    } else if (isPrimary) {
      name = name + " btn--primary";
    }

    return name;
  };

  return (
    <button
      className={`${checkClassName()} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
