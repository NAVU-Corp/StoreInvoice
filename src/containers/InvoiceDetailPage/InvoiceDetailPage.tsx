import React from "react";
import { BoxShadow, Button, Input, Textarea } from "../../components";
import "./InvoiceDetailPage.scss";

export const InvoiceDetailPage = () => {
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
        <BoxShadow className="invoice-detail__invoid">Hóa đơn</BoxShadow>
      </div>
    </div>
  );
};
