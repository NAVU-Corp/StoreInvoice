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
import { ImageRegister } from "../../constants/images";

import "./RegisterPage.scss";
import { CompanyEvent } from "../../constants/event";

export const RegisterPage = () => {
  const [messageError, setMessageError] = useState("");
  const [messageSuccess, setMessageSuccess] = useState<any>(null);
  const history = useHistory();
  const RegisterSchema = Yup.object().shape({
    taxcode: Yup.string().required("Vui lòng nhập mã số thuế"),
    name: Yup.string().required("Vui lòng nhập tên công ty"),
    email: Yup.string().email("Email không đúng định dạng"),
  });

  const formik = useFormik({
    initialValues: {
      taxcode: "",
      name: "",
      address: "",
      email: "",
      phone: "",
      fax: "",
      province: "",
      district: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: (values) => {
      apiElectron.sendMessages(CompanyEvent.INSERT_ONE_COMPANY, values);
    },
  });

  //handleResultCreateCompany
  const handleResultCreateCompany = (
    _: any,
    data: { id: number; message: string; company: any }
  ) => {
    if (data && data.id) {
      let company = data.company;
      console.log(company);
      setMessageSuccess(
        <>
          <span>Bạn đã đăng ký tài khoản công ty thành công:</span><br></br>
          <span>- MST: <span style={{ fontWeight: 'bold' }}>{company.taxcode}</span></span><br></br>
          <span>- Tên công ty: <span style={{ fontWeight: 'bold' }}>{company.name}</span></span>
        </>
      );
    } else {
      setMessageError(data.message);
    }
  };

  useEffect(() => {
    apiElectron.on(
      CompanyEvent.RESULT_INSERT_ONE_COMPANY,
      handleResultCreateCompany
    );
    return () => {
      apiElectron.removeListener(
        CompanyEvent.RESULT_INSERT_ONE_COMPANY,
        handleResultCreateCompany
      );
    };
  }, []);

  return (
    <div className="register-page">
      <BoxShadow className="register-page__container">
        <img alt="" src={ImageRegister} className="register-page__img" />
        <form onSubmit={formik.handleSubmit}>
          <div className="register-page__form">
            <div className="register-page__row">
              <div className="register-page__col-2">
                <label className="register-page__label">MST</label>
                <Input
                  className="register-page__input"
                  placeholder="MST"
                  id="taxcode"
                  name="taxcode"
                  onChange={formik.handleChange}
                  value={formik.values.taxcode}
                  error={formik.touched.taxcode && formik.errors.taxcode}
                />
              </div>
              <div className="register-page__col-2">
              <label className="register-page__label">Tên công ty</label>
                <Input
                  className="register-page__input"
                  placeholder="Tên công ty"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.touched.name && formik.errors.name}
                />
              </div>
            </div>
            <div className="register-page__row">
              <div className="register-page__col-2">
                <label className="register-page__label">Email</label>
                <Input
                  className="register-page__input"
                  placeholder="Email"
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
              </div>
              <div className="register-page__col-2">
              <label className="register-page__label">Điện thoại</label>
                <Input
                  className="register-page__input"
                  placeholder="Điện thoại"
                  id="phone"
                  name="phone"
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
              </div>
            </div>
            <div className="register-page__row">
              <div className="register-page__col-2">
                <label className="register-page__label">Địa chỉ</label>
                <Input
                  className="register-page__input"
                  placeholder="Địa chỉ"
                  id="address"
                  name="address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
              </div>
              <div className="register-page__col-2">
              <label className="register-page__label">Fax</label>
              <Input
                className="register-page__input"
                placeholder="Fax"
                id="fax"
                name="fax"
                onChange={formik.handleChange}
                value={formik.values.fax}
              />
              </div>
            </div>
            <div className="register-page__row">
              <div className="register-page__col-2">
                <label className="register-page__label">Tỉnh/Thành phố</label>
                <Input
                  className="register-page__input"
                  placeholder="Tỉnh/Thành phố"
                  id="province"
                  name="province"
                  onChange={formik.handleChange}
                  value={formik.values.province}
                />
              </div>
              <div className="register-page__col-2">
                <label className="register-page__label">Quận/huyện</label>
                <Input
                  className="register-page__input"
                  placeholder="Quận/huyện"
                  id="district"
                  name="district"
                  onChange={formik.handleChange}
                  value={formik.values.district}
                />
              </div>
            </div>
            <div className="register-page__row register-page__footer">
              <Button isPrimary className="register-page__btn" type="submit">
                Đăng Ký
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
      {/* <ModalConfirm
        isOpen={messageSuccess}
        message={messageSuccess}
        onCancel={() => setMessageSuccess("")}
        onOK={() => history.replace("/login")}
        setOpen={setMessageSuccess}
      /> */}
    </div>
  );
};
