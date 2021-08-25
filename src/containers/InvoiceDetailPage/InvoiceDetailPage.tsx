import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Input, Textarea } from "../../components";
import { InvoiceEvent } from "../../constants/event";
import { InvoicePreview } from "./components";
import "./InvoiceDetailPage.scss";

export const InvoiceDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  // const handleGetOneInvoice = (_: any, data: any) => {
  //   console.log("data", data);
  // };
  // useEffect(() => {
  //   if (id) {
  //     apiElectron.sendMessages(InvoiceEvent.GET_ONE_INVOICE, {
  //       id: parseInt(id || ""),
  //     });
  //     apiElectron.on(InvoiceEvent.RESULT_GET_ONE_INVOICE, handleGetOneInvoice);
  //   }

  //   return () => {
  //     apiElectron.removeListener(
  //       InvoiceEvent.GET_ONE_INVOICE,
  //       handleGetOneInvoice
  //     );
  //   };
  // }, [id]);

  return (
    <div className="invoice-detail">
      <form className="invoice-detail__form">
        <h3>THÔNG TIN</h3>
        <div className="invoice-detail__block">
          <Input placeholder="STT" label="STT" />
          <Input placeholder="Kí hiệu HĐ" label="Kí hiệu HĐ" marginLeft={8} />
        </div>
        <div className="invoice-detail__block">
          <Input placeholder="Mã HĐ" label="Kí hiệu HD" />
          <Input placeholder="Số HĐ" label="Số HĐ" marginLeft={8} />
        </div>
        <Input
          placeholder="Ngày hoá đơn"
          label="Ngày hoá đơn"
          marginBottom={32}
          className="invoice-detail__input"
        />
        <Input
          placeholder="Khách hàng"
          label="Khách hàng"
          marginBottom={32}
          className="invoice-detail__input"
        />
        <Textarea placeholder="Ghi chú" label="Ghi chú" />
        <div className="invoice-detail__actions">
          <Button isBig isRed>
            Trở về
          </Button>
          <Button isBig>Lưu</Button>
        </div>
      </form>
      <div className="invoice-detail__preview">
        <h3>XEM HÓA ĐƠN</h3>
        <InvoicePreview />
      </div>
    </div>
  );
};
