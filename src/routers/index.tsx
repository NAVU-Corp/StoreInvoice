import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { Home, Login } from "../containers";

export const Routers = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </HashRouter>
  );
};
