import React from "react";
import { Switch } from "react-router-dom";

import {
  ChooseTypePage,
  HomePage,
  LoginPage,
  RegisterPage,
  InvoiceDetailPage,
  Test,
} from "../containers";
import { BlankLayout } from "../layouts";
import { PrivateRouter } from "./PrivateRouter";

export const Routers = () => {
  return (
    <Switch>
      <PrivateRouter
        exact
        path="/"
        component={HomePage}
        layout={BlankLayout}
        title={"HOÁ ĐƠN"}
      />
      <PrivateRouter
        exact
        path="/login"
        component={LoginPage}
        layout={BlankLayout}
        title="ĐĂNG NHẬP"
      />
      <PrivateRouter
        exact
        path="/register"
        component={RegisterPage}
        layout={BlankLayout}
        title="ĐĂNG KÝ THÔNG TIN DOANH NGHIỆP"
      />
      <PrivateRouter
        exact
        path="/choose-type-store"
        component={ChooseTypePage}
        layout={BlankLayout}
        title="CHỌN KỲ LƯU TRỮ"
      />
      <PrivateRouter
        exact
        path="/invoice-detail"
        component={InvoiceDetailPage}
        layout={BlankLayout}
        title="CHI TIẾT HÓA ĐƠN"
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
