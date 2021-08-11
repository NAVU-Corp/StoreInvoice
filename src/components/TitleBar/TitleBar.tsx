import React from "react";
import { SvgMinimize, SvgZoom } from "../../assets/svg";
import { Avatar } from "../Avatar/Avatar";
import { Logo } from "../Logo/Logo";
import "./TitleBar.scss";

export const TitleBar = () => {
  return (
    <div className="title-bar">
      <Logo />
      <Avatar />
      <span>HOÁ ĐƠN</span>
      <div>
        <SvgMinimize />
        <SvgZoom />
      </div>
    </div>
  );
};
