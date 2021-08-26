import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { InvoiceEvent } from "../../constants/event";
import { CompanyContext } from "../../store/reducers";
import { FromDetail, InvoicePreview } from "./components";
import "./InvoiceDetailPage.scss";

export const InvoiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const {
    state: { companyData },
  } = useContext(CompanyContext);

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

  //handleGetOneInvoice
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

  //handleUpdateInvoice
  const handleUpdateInvoice = (values: any) => {
    let invoice = {
      id: 3,
      invoicesymbol: "123456",
      invoicetemplate: "ABC/123",
      invoicenumber: "745218",
      invoicedate: new Date("2021-08-21"),
      note: "Oke nhé",
    };

    console.log("values", values);
    console.log({
      ...values,
      id: invoice.id,
    });

    apiElectron.sendMessages(InvoiceEvent.UPDATE_ONE_INVOICE, {
      ...values,
      id: invoice.id,
    });
  };

  //handleResultUpdateInvoice
  useEffect(() => {
    const handleResultUpdateInvoice = (_: any, data: any) => {
      console.log(data);
    };

    apiElectron.on(
      InvoiceEvent.RESULT_UPDATE_ONE_INVOICE,
      handleResultUpdateInvoice
    );

    return () => {
      apiElectron.removeListener(
        InvoiceEvent.RESULT_UPDATE_ONE_INVOICE,
        handleResultUpdateInvoice
      );
    };
  }, []);

  return (
    <div className="invoice-detail">
      <div className="invoice-detail__form">
        <h3>THÔNG TIN</h3>
        <FromDetail invoice={invoice} handleSubmit={handleUpdateInvoice} />
      </div>

      <div className="invoice-detail__preview">
        <h3>XEM HÓA ĐƠN</h3>
        <InvoicePreview link={invoice.linkpdf} />
      </div>
    </div>
  );
};
