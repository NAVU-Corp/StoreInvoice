import React, { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";
import moment from "moment";
import { useHistory } from "react-router-dom";
import {
  Button,
  Input,
  ModalConfirm,
  Select,
  Textarea,
} from "../../../../components";
import { optionTypeInvoid } from "../../../../constants/selections";
import "./FormDetail.scss";
import { InvoiceEvent, MediaEvent } from "../../../../constants/event";

export const FromDetail: React.FC<IFromDetail> = ({
  invoice,
  handleSubmit,
}) => {
  const [message, setMessage] = useState("");

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
    datechoose,
    linkpdf,
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
      datechoose: moment(
        datechoose ? new Date(datechoose) : new Date()
      ).format("YYYY-MM-DD"),
    },
    enableReinitialize: true,
    onSubmit: (values: any) => {
      values.invoicedate = new Date(values.invoicedate);
      values.datechoose = new Date(values.datechoose);
      return handleSubmit(values);
    },
  });

  // handleResultDeleteOneInvoice
  const handleResultDeleteOneInvoice = (_: any, data: { result: number }) => {
    if (data && data.result) {
      history.replace("/");
    } else {
      alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  const handleOpenFile = (url: string) => {
    apiElectron.sendMessages(
      MediaEvent.OPEN_FILE_MEDIA,
      { url: url },
    );
  }

  const handleOpenFolder = (url: string) => {
    apiElectron.sendMessages(
      MediaEvent.OPEN_FOLDER_MEDIA,
      { url: url },
    );
  }

  useEffect(() => {
    apiElectron.on(
      InvoiceEvent.RESULT_DELETE_ONE_INVOICE,
      handleResultDeleteOneInvoice
    );
    return () => {
      apiElectron.removeListener(
        InvoiceEvent.RESULT_DELETE_ONE_INVOICE,
        handleResultDeleteOneInvoice
      );
    };
  }, []);

  return (
    <Fragment>
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
            placeholder="Ngày nhập hóa đơn"
            label="Ngày nhập hóa đơn"
            className="form-detail__input"
            marginLeft={8}
            id="datechoose"
            name="datechoose"
            onChange={formik.handleChange}
            value={formik.values.datechoose}
            type="date"
          />
        </div>
        <div className="form-detail__block">
          <Input
            placeholder="Mẫu số hóa đơn"
            label="Mẫu số hóa đơn"
            id="invoicesymbol"
            name="invoicesymbol"
            onChange={formik.handleChange}
            value={formik.values.invoicesymbol}
            className="form-detail__input"
          />
          <Input
            placeholder="Ký hiệu hóa đơn"
            label="Ký hiệu hóa đơn"
            marginLeft={8}
            id="invoicetemplate"
            name="invoicetemplate"
            onChange={formik.handleChange}
            value={formik.values.invoicetemplate}
            className="form-detail__input"
          />
        </div>
        <div className="form-detail__block">
          <Input
            placeholder="Số hóa đơn"
            label="Số hóa đơn"
            id="invoicenumber"
            name="invoicenumber"
            onChange={formik.handleChange}
            value={formik.values.invoicenumber}
            className="form-detail__input"
          />
          <Input
            placeholder="Ngày hoá đơn"
            label="Ngày hoá đơn"
            marginLeft={8}
            className="form-detail__input"
            id="invoicedate"
            name="invoicedate"
            onChange={formik.handleChange}
            value={formik.values.invoicedate}
            type="date"
          />
        </div>
        <Input
          placeholder="Nhà cung cấp"
          label="Nhà cung cấp"
          marginBottom={32}
          className="form-detail__input"
          id="nameseller"
          name="nameseller"
          onChange={formik.handleChange}
          value={formik.values.nameseller}
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
        <Textarea
          placeholder="Ghi chú"
          label="Ghi chú"
          onChange={formik.handleChange}
          value={formik.values.note}
          name="note"
          id="note"
        />
        <div className="form-detail__actions">
          <Button
            isDark
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setMessage("Bạn có muốn xóa hóa đơn này không?");
            }}
            type="button"
          >
            Xóa HĐ
          </Button>
          <Button
            isSuccess
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleOpenFile(linkpdf);
            }}
            type="button"
          >
            Xem HĐ
          </Button>
          <Button
            isSuccess
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleOpenFolder(linkpdf);
            }}
            type="button"
          >
            Xem trong thư mục
          </Button>
          <Button isPrimary type="submit">
            Lưu
          </Button>
        </div>
      </form>
      <ModalConfirm
        isOpen={message}
        message={message}
        setOpen={setMessage}
        onCancel={(e) => {
          e.stopPropagation();
          e.preventDefault();
          setMessage("");
        }}
        onOK={(e) => {
          e.stopPropagation();
          e.preventDefault();
          apiElectron.sendMessages(InvoiceEvent.DELETE_ONE_INVOICE, {
            id: invoice.id,
          });
        }}
      />
    </Fragment>
  );
};
