import React from "react";
import { useHistory } from "react-router-dom";

import { BoxShadow, Button, Input } from "../../components";
import { ImageLogin } from "../../constants/images";
import { CompanyCard } from "./components";

import "./Login.scss";

export const Login = () => {
  const history = useHistory();

  return (
    <div className="login">
      <div className="login__container">
        <BoxShadow className="login__form">
          <h3>ĐĂNG NHẬP HỆ THỐNG</h3>
          <Input label="MST:" placeholder="MST" className="login__input" />
          <div className="login__actions">
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
        <img src={ImageLogin} className="login__img" />
      </div>
      <div className="login__companys">
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
        <CompanyCard />
      </div>
    </div>
  );
};
