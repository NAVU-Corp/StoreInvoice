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
        }}
      >
        {children}
      </div>
    );
  }
);
