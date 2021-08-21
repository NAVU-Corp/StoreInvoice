import React from "react";
import "./Button.scss";

export const Button: React.FC<IButton> = ({
  children,
  isRed,
  isBig,
  isWhite,
  onClick,
  className,
}) => {
  const checkClassName = () => {
    let name = "btn";
    if (isRed) {
      name = name + " btn--red";
    }
    if (isBig) {
      name = name + " btn--big";
    }

    if (isWhite) {
      name = name + " btn--white";
    }

    return name;
  };

  return (
    <button className={`${checkClassName()} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
