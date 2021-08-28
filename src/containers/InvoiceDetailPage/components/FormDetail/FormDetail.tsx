import React from "react";
import { useFormik } from "formik";
import moment from "moment";

import { Button, Input, Select, Textarea } from "../../../../components";
import "./FormDetail.scss";
import { useHistory } from "react-router-dom";
import { optionTypeInvoid } from "../../../../constants/selections";

export const FromDetail: React.FC<IFromDetail> = ({
  invoice,
  handleSubmit,
}) => {
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
      invoicedate: moment(
        invoicedate ? new Date(invoicedate) : new Date()
      ).format("YYYY-MM-DD"),
      namebuyer: namebuyer || "",
      note: note || "",
      status: status || 0,
      invoicesymbol: invoicesymbol || "",
      nameseller: nameseller || "",
    },

    enableReinitialize: true,
    onSubmit: (values: any) => {
      values.invoicedate = new Date(values.invoicedate);
      return handleSubmit(values);
    },
  });

  return (
    <form className="form-detail__form" onSubmit={formik.handleSubmit}>
      <div className="form-detail__block">
        <Select
          placeholder="Loại hóa đơn"
          label="Loại hóa đơn"
          value={formik.values.status}
          options={optionTypeInvoid}
          onSelect={(item) => formik.setFieldValue("status", item.id)}
          className="form-detail__input"
        />
        <Input
          placeholder="Kí hiệu HĐ"
          label="Kí hiệu HĐ"
          marginLeft={8}
          id="invoicesymbol"
          name="invoicesymbol"
          onChange={formik.handleChange}
          value={formik.values.invoicesymbol}
          className="form-detail__input"
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
          className="form-detail__input"
        />
        <Input
          placeholder="Số HĐ"
          label="Số HĐ"
          marginLeft={8}
          id="invoicetemplate"
          name="invoicetemplate"
          onChange={formik.handleChange}
          value={formik.values.invoicetemplate}
          className="form-detail__input"
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
      <Textarea
        placeholder="Ghi chú"
        label="Ghi chú"
        onChange={formik.handleChange}
        value={formik.values.note}
        name="note"
        id="note"
      />
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
