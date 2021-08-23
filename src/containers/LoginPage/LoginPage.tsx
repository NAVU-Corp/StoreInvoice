import React, { useContext, useEffect, useReducer, useState } from "react";
import { useHistory } from "react-router-dom";

import { Alert, BoxShadow, Button, Input } from "../../components";
import { CompanyEvent } from "../../constants/event";
import { ImageLogin } from "../../constants/images";
import { decreaseAction, increaseAction } from "../../store/actions";
import {
  CounterContext,
  counterReducer,
  initialCounterState,
} from "../../store/reducers";
import { CompanyCard } from "./components";

import "./LoginPage.scss";

export const LoginPage = () => {
  const history = useHistory();
  const [taxCode, setTaxCode] = useState("");
  const [error, setError] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const { state, dispatch } = useContext(CounterContext);

  //handleLogin
  const handleLogin = () => {
    if (taxCode) {
      apiElectron.sendMessages(CompanyEvent.GET_ONE_COMPANY, {
        taxcode: taxCode,
      });
    } else {
      setError("Không để trống mã số thuế");
    }
  };

  // reviced result login
  useEffect(() => {
    apiElectron.on(
      CompanyEvent.RESULT_GET_ONE_COMPANY,
      (_: any, data: IResGetOneCompany) => {
        if (data.content.company) {
          console.log(JSON.stringify(data.content.company));
        } else {
          setMessageAlert("Không tìm thấy công ty");
        }
      }
    );
  }, []);

  return (
    <div className="login-page">
      <div>
        Count: {state.value}
        <button onClick={() => dispatch(decreaseAction)}>-</button>
        <button onClick={() => dispatch(increaseAction)}>+</button>
      </div>
      <div className="login-page__container">
        <BoxShadow className="login-page__form">
          <h3>ĐĂNG NHẬP HỆ THỐNG</h3>
          <Input
            label="MST:"
            placeholder="MST"
            className="login-page__input"
            value={taxCode}
            onChange={(e) => setTaxCode(e.target.value)}
            error={error}
          />
          <div className="login-page__actions">
            <Button isBig isRed>
              Xóa
            </Button>
            <Button isWhite isBig onClick={() => history.push("/register")}>
              Mã mới
            </Button>
            <Button isBig onClick={handleLogin}>
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
      <Alert
        isOpen={messageAlert}
        messages={messageAlert}
        setOpen={setMessageAlert}
      />
    </div>
  );
};
