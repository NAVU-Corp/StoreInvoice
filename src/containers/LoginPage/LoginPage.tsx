import React from "react";
import { useHistory } from "react-router-dom";

import { BoxShadow, Button, Input } from "../../components";
import { ImageLogin } from "../../constants/images";
import { CompanyCard } from "./components";

import "./LoginPage.scss";

export const LoginPage = () => {
  const history = useHistory();

  return (
    <div className="login-page">
      <div className="login-page__container">
        <BoxShadow className="login-page__form">
          <h3>ĐĂNG NHẬP HỆ THỐNG</h3>
          <Input label="MST:" placeholder="MST" className="login-page__input" />
          <div className="login-page__actions">
            <Button isBig isRed>
              Xóa
            </Button>
            <Button isWhite isBig>
              Mã mới
            </Button>
            <Button isBig onClick={() => history.push("/")}>
              Đăng nhập
            </Button>
          </div>
        </BoxShadow>
        <img src={ImageLogin} className="login-page__img" />
      </div>
      <div className="login-page__companys">
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
      </div>
    </div>
  );
};