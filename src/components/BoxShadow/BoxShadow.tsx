import React, { forwardRef } from "react";
import "./BoxShadow.scss";

export const BoxShadow = forwardRef<HTMLDivElement, IBoxShadow>(
  (
    {
      children,
      padding,
      paddingBottom,
      paddingLeft,
      paddingTop,
      paddingRight,
      marginBottom,
      className,
      color,
    },
    ref
  ) => {
    return (
      <div
        className={`box-shadow ${className}`}
        ref={ref}
        style={{
          padding,
          paddingBottom,
          paddingLeft,
          paddingTop,
          paddingRight,
          marginBottom,
          color,
        }}
      >
        {children}
      </div>
    );
  }
);
