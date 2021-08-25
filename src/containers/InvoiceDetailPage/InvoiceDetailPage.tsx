import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { number } from "yup/lib/locale";
import { Button, Input, Textarea } from "../../components";
import { InvoiceEvent } from "../../constants/event";
import { FromDetail, InvoicePreview } from "./components";
import "./InvoiceDetailPage.scss";

export const InvoiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [invoice, setInvoice] = useState<IResInvoice>({
    createdate: 0,
    id: 0,
    invoicedate: 0,
    invoicenumber: "",
    invoicesymbol: "",
    invoicetemplate: "",
    linkpdf: "",
    month: "",
    namebuyer: "",
    namepdf: "",
    nameseller: "",
    note: "",
    status: 0,
    typeinvoice: 0,
    updatedate: 0,
  });

  const handleGetOneInvoice = (_: any, data: IResGetOneInvoice) => {
    if (data.content.invoice) {
      setInvoice(data.content.invoice);
    }
  };
  useEffect(() => {
    if (id) {
      apiElectron.sendMessages(InvoiceEvent.GET_ONE_INVOICE, {
        id: parseInt(id || ""),
      });
      apiElectron.on(InvoiceEvent.RESULT_GET_ONE_INVOICE, handleGetOneInvoice);
    }

    return () => {
      apiElectron.removeListener(
        InvoiceEvent.GET_ONE_INVOICE,
        handleGetOneInvoice
      );
    };
  }, [id]);

  return (
    <div className="invoice-detail">
      <div className="invoice-detail__form">
        <h3>THÔNG TIN</h3>
        <FromDetail invoice={invoice} />
      </div>

      <div className="invoice-detail__preview">
        <h3>XEM HÓA ĐƠN</h3>
        <InvoicePreview link={invoice.linkpdf} />
      </div>
    </div>
  );
};
