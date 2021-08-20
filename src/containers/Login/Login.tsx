import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { BoxShadow, Button, Input } from "../../components";
import { WinEvent } from "../../constants/event";
import { ImageLogin } from "../../constants/images";
import { CompanyCard } from "./components";
import "./Login.scss";

export const Login = () => {
  const history = useHistory();
  const [height, setHeight] = useState(800);
  useEffect(() => {
    apiElectron.on(WinEvent.WIN_SIZE, (_, message) => {
      setHeight(message - 43);
    });
  }, []);
  return (
    <div className="login">
      <div className="login__container">
        <BoxShadow className="login__form">
          <h3>ĐĂNG NHẬP HỆ THỐNG</h3>
          <br />

          <Input label="MST:" placeholder="MST" className="login__input" />
          <br />
          <br />
          <br />
          <br />
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
