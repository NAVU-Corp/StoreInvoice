import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import {
  Alert,
  BoxShadow,
  Button,
  Input,
  ModalConfirm,
} from "../../components";
import { CompanyEvent } from "../../constants/event";
import { doSaveCompanyData } from "../../store/actions";
import { CompanyContext } from "../../store/reducers";

import "./LoginPage.scss";

export const LoginPage = () => {
  const history = useHistory();

  const [taxCode, setTaxCode] = useState("");
  const [error, setError] = useState("");
  const [messageAlert, setMessageAlert] = useState("");
  const [messageConfirm, setMessageConfirm] = useState<any>(null);

  const { dispatch } = useContext(CompanyContext);

  //handleLogin
  const handleLogin = () => {
    if (taxCode) {
      apiElectron.sendMessages(CompanyEvent.GET_ONE_COMPANY, {
        taxcode: taxCode,
      });
    } else {
      setError("Vui lòng điền mã số thuế");
    }
  };

  // reviced result login
  const handleCallback = (_: any, data: IResGetOneCompany) => {
    if (data.content.company) {
      dispatch(doSaveCompanyData(data.content.company));
      history.push("/choose-type-store");
    } else {
      setMessageAlert("Không có công ty tương ứng mới MST này");
    }
  };

  // get all company
  const handleGetAllCompany = () => {
    apiElectron.sendMessages(CompanyEvent.GET_ALL_COMPANIES);
  };

  // result get all comapany
  const handleResultDeleteCompany = (_: any, data: IResDeleteCompanies) => {
    if (data && data.result) {
      setMessageAlert("Xóa công ty với MST này thành công");
      setTaxCode("");
    } else {
      if (data?.message) {
        setMessageAlert(data?.message);
      }
    }
  };

  //delele company
  const handleDeleteCompany = () => {
    if (taxCode) {
      apiElectron.sendMessages(CompanyEvent.DELETE_ONE_COMPANY, {
        taxcode: taxCode,
      });
      setError("");
    } else {
      setError("Vui lòng điền mã số thuế");
    }
  };

  useEffect(() => {
    handleGetAllCompany();
    //RESULT_GET_ONE_COMPANY
    apiElectron.on(CompanyEvent.RESULT_GET_ONE_COMPANY, handleCallback);

    //RESULT_DELETE_ONE_COMPANY
    apiElectron.on(
      CompanyEvent.RESULT_DELETE_ONE_COMPANY,
      handleResultDeleteCompany
    );

    return () => {
      apiElectron.removeListener(
        CompanyEvent.RESULT_GET_ONE_COMPANY,
        handleCallback
      );

      apiElectron.removeListener(
        CompanyEvent.RESULT_DELETE_ONE_COMPANY,
        handleResultDeleteCompany
      );
    };
  }, []);

  return (
    <div className="login-page">
      <div className="login-page__container">
        <BoxShadow className="login-page__form">
          <h3>Đăng nhập</h3>
          <Input
            label="MST:"
            placeholder="MST"
            className="login-page__input"
            value={taxCode}
            onChange={(e) => setTaxCode(e.target.value)}
            error={error}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const target = e.target as HTMLInputElement;
                setTaxCode(target.value);
                handleLogin();
              }
            }}
          />
          <div className="login-page__btn-group">
            <Button isPrimary className="login-page__btn" onClick={handleLogin}>
              Đăng nhập
            </Button>
          </div>
          <div className="login-page__actions">
            <Button
              isSecondary
              className="login-page__sm-btn"
              type="button"
              onClick={() => {
                if (taxCode) {
                  setMessageConfirm(
                    `Bạn có chắc muốn xóa công ty có MST này không?`
                  );
                } else {
                  setError("Vui lòng điền mã số thuế");
                }
              }}
            >
              Xóa mã
            </Button>
            <Button
              isSuccess
              className="login-page__sm-btn"
              onClick={() => history.push("/register")}
              type="button"
            >
              Mã mới
            </Button>
          </div>
        </BoxShadow>
        {/* <img src={ImageLogin} className="login-page__img" /> */}
      </div>
      {/* <div className="login-page__companys">
        {listCompanies.map((item, i) => {
          return (
            <CompanyCard
              title={item.name}
              key={i}
              onClick={() => setTaxCode(item.taxcode)}
              isSelected={item.taxcode === taxCode}
            />
          );
        })}
      </div> */}
      <Alert
        isOpen={messageAlert}
        messages={messageAlert}
        setOpen={setMessageAlert}
      />
      <ModalConfirm
        isOpen={messageConfirm}
        message={messageConfirm}
        onCancel={() => setMessageConfirm("")}
        onOK={() => {
          handleDeleteCompany();
        }}
        setOpen={setMessageConfirm}
      />
    </div>
  );
};
