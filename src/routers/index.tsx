import React from "react";
import { Switch } from "react-router-dom";

import { Home, Login } from "../containers";
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
    </Switch>
  );
};
