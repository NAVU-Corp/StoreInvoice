import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

import { Alert, BoxShadow, Button, Input } from "../../components";
import { CompanyEvent } from "../../constants/event";

import "./CompanyProfilePage.scss";

export const CompanyProfilePage = () => {
  const [messageError, setMessageError] = useState("");
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

  //handleResultCreateCompany
  const handleResultCreateCompany = (_: any, data: { id: number }) => {
    if (data && data.id) {
      history.replace("/login");
    } else {
      setMessageError("Đã có lỗi khi tạo tài khoản mới");
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
    <div className="company-profile">
      <BoxShadow className="company-profile__container">
        <h3>THÔNG TIN CÔNG TY</h3>
        <form onSubmit={formik.handleSubmit}>
          <Input
            className="company-profile__input"
            placeholder="MST"
            id="taxcode"
            name="taxcode"
            onChange={formik.handleChange}
            value={formik.values.taxcode}
            error={formik.touched.taxcode && formik.errors.taxcode}
          />
          <Input
            className="company-profile__input"
            placeholder="Tên công ty"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name}
          />
          <Input
            className="company-profile__input"
            placeholder="Địa chỉ"
            id="address"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          <Input
            className="company-profile__input"
            placeholder="Quận/huyện"
            id="district"
            name="district"
            onChange={formik.handleChange}
            value={formik.values.district}
          />
          <Input
            className="company-profile__input"
            placeholder="Tỉnh/Thành phố"
            id="province"
            name="province"
            onChange={formik.handleChange}
            value={formik.values.province}
          />
          <Input
            className="company-profile__input"
            placeholder="Điện thoại"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
          />
          <Input
            className="company-profile__input"
            placeholder="Fax"
            id="fax"
            name="fax"
            onChange={formik.handleChange}
            value={formik.values.fax}
          />
          <Input
            className="company-profile__input"
            placeholder="Email"
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <div className="company-profile__actions">
            <Button isBig isRed type="button">
              Trở về
            </Button>
            <Button isBig type="submit">
              Lưu
            </Button>
          </div>
        </form>
      </BoxShadow>
      <Alert
        isOpen={messageError}
        messages={messageError}
        setOpen={setMessageError}
      />
    </div>
  );
};
