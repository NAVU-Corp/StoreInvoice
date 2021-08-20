import React from "react";
import { Route, Switch } from "react-router-dom";
import { Home, Test } from "../containers";

export const Routers = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/test" component={Test} />
    </Switch>
  );
};
