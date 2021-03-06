import React, { FC } from "react";
import { Footer, TitleBar } from "../../components";
import "./BlankLayout.scss";

export const BlankLayout: FC<ILayout> = ({ children, title }) => {
  return (
    <div className="blank-layout">
      <TitleBar title={title} />
      <div className="blank-layout__center">
        {children}
        <Footer />
      </div>
    </div>
  );
};
