import React from "react";
import { IButton } from "../@types/Button";
import "./Button.scss";

export const Button: React.FC<IButton> = ({
  children,
  isRed,
  isBig,
  isWhite,
  isPrimary,
  isDanger,
  isSuccess,
  isSecondary,
  isOutlinePrimary,
  isOutlineSecondary,
  isOutlineDark,
  isWithImage,
  isDark,
  onClick,
  className,
  type,
  isExtraBig,
  style,
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
    
    if (isExtraBig) {
      name = name + " btn--xbig";
    }
    
    if (isPrimary) {
      name = name + " btn--primary";
    }

    if (isDanger) {
      name = name + " btn--danger";
    }

    if (isSuccess) {
      name = name + " btn--success";
    }

    if (isSecondary) {
      name = name + " btn--secondary";
    }

    if (isOutlinePrimary) {
      name = name + " btn--outline-primary";
    }

    if (isOutlineSecondary) {
      name = name + " btn--outline-secondary";
    }

    if (isOutlineDark) {
      name = name + " btn--outline-dark";
    }

    if (isWithImage) {
      name = name + " btn--with-image";
    }

    if (isDark) {
      name = name + " btn--dark";
    }

    return name;
  };

  return (
    <button
      className={`${checkClassName()} ${className}`}
      onClick={onClick}
      type={type}
      style={style}
    >
      {children}
    </button>
  );
};
