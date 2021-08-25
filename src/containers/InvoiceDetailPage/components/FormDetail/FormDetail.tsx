import React from "react";
import { useFormik } from "formik";

import { Button, Input, Textarea } from "../../../../components";
import "./FormDetail.scss";
import { useHistory } from "react-router-dom";

export const FromDetail: React.FC<IFromDetail> = ({ invoice }) => {
  const history = useHistory();
  const {
    invoicenumber,
    invoicetemplate,
    invoicedate,
    namebuyer,
    note,
    status,
    invoicesymbol,
    nameseller,
  } = invoice;

  const formik = useFormik({
    initialValues: {
      invoicenumber: invoicenumber || "",
      invoicetemplate: invoicetemplate || "",
      invoicedate: invoicedate || "",
      namebuyer: namebuyer || "",
      note: note || "",
      status: status || 0,
      invoicesymbol: invoicesymbol || "",
      nameseller: nameseller || "",
    },

    enableReinitialize: true,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form className="form-detail__form" onSubmit={formik.handleSubmit}>
      <div className="form-detail__block">
        <Input
          placeholder="Loại hóa đơn"
          label="Loại hóa đơn"
          id="status"
          name="status"
          onChange={formik.handleChange}
          value={formik.values.status}
        />
        <Input
          placeholder="Kí hiệu HĐ"
          label="Kí hiệu HĐ"
          marginLeft={8}
          id="invoicesymbol"
          name="invoicesymbol"
          onChange={formik.handleChange}
          value={formik.values.invoicesymbol}
        />
      </div>
      <div className="form-detail__block">
        <Input
          placeholder="Mã HĐ"
          label="Kí hiệu HD"
          id="invoicenumber"
          name="invoicenumber"
          onChange={formik.handleChange}
          value={formik.values.invoicenumber}
        />
        <Input
          placeholder="Số HĐ"
          label="Số HĐ"
          marginLeft={8}
          id="invoicetemplate"
          name="invoicetemplate"
          onChange={formik.handleChange}
          value={formik.values.invoicetemplate}
        />
      </div>
      <Input
        placeholder="Ngày hoá đơn"
        label="Ngày hoá đơn"
        marginBottom={32}
        className="form-detail__input"
        id="invoicedate"
        name="invoicedate"
        onChange={formik.handleChange}
        value={formik.values.invoicedate}
        type="date"
      />
      <Input
        placeholder="Khách hàng"
        label="Khách hàng"
        marginBottom={32}
        className="form-detail__input"
        id="namebuyer"
        name="namebuyer"
        onChange={formik.handleChange}
        value={formik.values.namebuyer}
      />
      <Input
        placeholder="Người bán"
        label="Người bán"
        marginBottom={32}
        className="form-detail__input"
        id="nameseller"
        name="nameseller"
        onChange={formik.handleChange}
        value={formik.values.nameseller}
      />
      <Textarea placeholder="Ghi chú" label="Ghi chú" />
      <div className="form-detail__actions">
        <Button isBig isRed onClick={() => history.goBack()}>
          Trở về
        </Button>
        <Button isBig type="submit">
          Lưu
        </Button>
      </div>
    </form>
  );
};
