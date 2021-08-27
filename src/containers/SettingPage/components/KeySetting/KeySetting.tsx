import React from "react";
import { SvgClose } from "../../../../assets/svg";
import "./KeySetting.scss";

export const KeySetting = () => {
  return (
    <div className="key-setting">
      <div className="key-setting__text">Từ hóa công nhan</div>
      <SvgClose fill="#db2424" />
    </div>
  );
};
