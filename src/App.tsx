import React, { Fragment } from "react";
import "./App.scss";
import { Routers } from "./routers";
import { TitleBar } from "./components";

export const App = () => {
  return (
    <Fragment>
      <TitleBar />
      <Routers />
    </Fragment>
  );
};
