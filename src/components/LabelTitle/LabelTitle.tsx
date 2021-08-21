import React from "react";
import { SvgPlus } from "../../assets/svg";
import { Button } from "../Button/Button";
import "./LabelTitle.scss";

export const LabelTitle: React.FC<ILabelTitle> = ({
  title,
  hasBottomLine,
  marginBottom,
  hasBtnAdd,
  handleBtnAdd,
}) => {
  const checkClassName = () => {
    let name = "label-title";

    if (hasBottomLine) {
      name = name + " label-title--bottom";
    }
    return name;
  };

  return (
    <div className={checkClassName()} style={{ marginBottom }}>
      <span>{title}</span>
      {hasBtnAdd && (
        <Button isWhite className="label-title__btn" onClick={handleBtnAdd}>
          <SvgPlus />
        </Button>
      )}
    </div>
  );
};
