import React from "react";
import "./LabelTitle.scss";

export const LabelTitle: React.FC<ILabelTitle> = ({ title, hasBottomLine }) => {
  const checkClassName = () => {
    let name = "label-title";

    if (hasBottomLine) {
      name = name + " label-title--bottom";
    }
    return name;
  };

  return <div className={checkClassName()}>{title}</div>;
};
