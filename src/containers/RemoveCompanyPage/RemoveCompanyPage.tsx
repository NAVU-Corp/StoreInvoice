import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import {
  Alert,
  BoxShadow,
  Button,
  Input,
  ModalConfirm,
} from "../../components";
import { ImageRemoveCompany } from "../../constants/images";
import "./RemoveCompanyPage.scss";
import { CompanyEvent } from "../../constants/event";

export const RemoveCompanyPage = () => {
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState<any>(null);
  const history = useHistory();
  const RegisterSchema = Yup.object().shape({
    taxcode: Yup.string().required("Vui lòng nhập mã số thuế"),
  });

  const formik = useFormik({
    initialValues: {
      taxcode: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      apiElectron.sendMessages(CompanyEvent.DELETE_ONE_COMPANY, values);
    },
  });

  //handleResultCreateCompany
  const handleResultRemoveCompany = (
    _: any,
    data: { result: number; message: string; content: any; }
  ) => {
    if(data && data.result) {
      setMessageSuccess(
        <>
          <span>Bạn đã xóa tài khoản công ty thành công với MST: </span><span style={{ fontWeight: 'bold' }}>{data.content.taxcode}</span>
        </>
      );
    } else {
      setMessageError(data.message);
    }
  };

  useEffect(() => {
    apiElectron.on(
      CompanyEvent.RESULT_DELETE_ONE_COMPANY,
      handleResultRemoveCompany
    );
    return () => {
      apiElectron.removeListener(
        CompanyEvent.RESULT_DELETE_ONE_COMPANY,
        handleResultRemoveCompany
      );
    };
  }, []);

  return (
    <div className="remove-company-page">
      <BoxShadow className="remove-company-page__container">
        <img alt="" src={ImageRemoveCompany} className="remove-company-page__img" />
        <form onSubmit={formik.handleSubmit}>
          <div className="remove-company-page__form">
            <div className="remove-company-page__row">
              <Input
                className="remove-company-page__input"
                placeholder="MST"
                label="Nhập MST để xóa:"
                id="taxcode"
                name="taxcode"
                onChange={formik.handleChange}
                value={formik.values.taxcode}
                error={formik.touched.taxcode && formik.errors.taxcode}
              />
            </div>
            <div className="remove-company-page__row remove-company-page__footer">
              <Button isPrimary className="remove-company-page__btn" type="submit">
                Xóa công ty
              </Button>
            </div>
          </div>
        </form>
      </BoxShadow>
      <Alert
        isOpen={messageError}
        messages={messageError}
        setOpen={setMessageError}
      />
      <Alert
        isOpen={messageSuccess}
        messages={messageSuccess}
        setOpen={setMessageSuccess}
        actionMore={() => {
          history.replace("/login");
        }}
      />
    </div>
  );
};
