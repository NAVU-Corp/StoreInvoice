import React from "react";
import { Switch } from "react-router-dom";

import { Home, Login, Test } from "../containers";
import { BlankLayout } from "../layouts";
import { PrivateRouter } from "./PrivateRouter";

export const Routers = () => {
  return (
    <Switch>
      <PrivateRouter
        exact
        path="/"
        component={Home}
        layout={BlankLayout}
        title={"HOÁ ĐƠN"}
      />
      <PrivateRouter
        exact
        path="/login"
        component={Login}
        layout={BlankLayout}
        title="ĐĂNG NHẬP"
      />
      <PrivateRouter
        exact
        path="/test-api"
        component={Test}
        layout={BlankLayout}
        title="TEST API"
      />
    </Switch>
  );
};
