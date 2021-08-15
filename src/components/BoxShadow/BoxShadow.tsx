import React from "react";
import "./BoxShadow.scss";

export const BoxShadow: React.FC<IBoxShadow> = ({
  children,
  padding,
  paddingBottom,
  paddingLeft,
  paddingTop,
  paddingRight,
  marginBottom,
  className,
}) => {
  return (
    <div
      className={`box-shadow ${className}`}
      style={{
        padding,
        paddingBottom,
        paddingLeft,
        paddingTop,
        paddingRight,
        marginBottom,
      }}
    >
      {children}
    </div>
  );
};
