import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";

import { BoxShadow, Button, Input } from "../../components";
import { ImageRegister } from "../../constants/images";

import "./RegisterPage.scss";
import { CompanyEvent } from "../../constants/event";

export const RegisterPage = () => {
  const history = useHistory();
  const RegisterSchema = Yup.object().shape({
    taxcode: Yup.string().required("Vui lòng nhập mã số thuế"),
    name: Yup.string().required("Vui lòng nhập tên công ty"),
    email: Yup.string().email("Email không đúng"),
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

  useEffect(() => {
    apiElectron.on(
      CompanyEvent.RESULT_INSERT_ONE_COMPANY,
      (_: any, data: { id: number }) => {
        if (data && data.id) {
          // history.replace("/login");
          alert(data.id)
        } else {
          alert("Đã có lỗi khi tạo tài khoản mới");
        }
      }
    );
  }, []);

  return (
    <div className="register-page">
      <BoxShadow className="register-page__container">
        <img alt="" src={ImageRegister} className="register-page__img" />
        <form onSubmit={formik.handleSubmit}>
          <Input
            className="register-page__input"
            placeholder="MST"
            id="taxcode"
            name="taxcode"
            onChange={formik.handleChange}
            value={formik.values.taxcode}
            error={formik.touched.taxcode && formik.errors.taxcode}
          />
          <Input
            className="register-page__input"
            placeholder="Tên công ty"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name}
          />
          <Input
            className="register-page__input"
            placeholder="Địa chỉ"
            id="address"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          <Input
            className="register-page__input"
            placeholder="Quận/huyện"
            id="district"
            name="district"
          />
          <Input
            className="register-page__input"
            placeholder="Tỉnh/Thành phố"
            id="province"
            name="province"
            onChange={formik.handleChange}
            value={formik.values.province}
          />
          <Input
            className="register-page__input"
            placeholder="Điện thoại"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          <Input
            className="register-page__input"
            placeholder="Fax"
            id="fax"
            name="fax"
            onChange={formik.handleChange}
            value={formik.values.fax}
          />
          <Input
            className="register-page__input"
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <Button isBig className="register-page__btn" type="submit">
            Đăng Ký
          </Button>
        </form>
      </BoxShadow>
    </div>
  );
};
