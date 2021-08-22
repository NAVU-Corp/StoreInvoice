import React, { FC } from "react";
import "./Textarea.scss";

export const Textarea: FC<ITextarea> = ({
  children,
  label,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="textarea">
      <div className="textarea__label">{label}</div>
      <div className="textarea__container">
        <textarea placeholder={placeholder} value={value} onChange={onChange} />
      </div>
    </div>
  );
};
