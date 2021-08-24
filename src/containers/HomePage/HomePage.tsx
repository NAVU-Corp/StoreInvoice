import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Input, LabelTitle, BoxShadow, Select } from "../../components";
import { InvoiceEvent } from "../../constants/event";
import { selectionTypeInvoid } from "../../constants/selections";
import { Pagination, Table } from "./components";

import "./HomePage.scss";

export const HomePage: React.FC = () => {
  const { state } =
    useLocation<{ month: number; groupmonth: number; year: number }>();

  const [dataTable, setDataTable] = useState<Array<IResInvoice>>([]);

  const handleListenerGetInvoice = (_: any, data: IResGetAllInvoices) => {
    if (data.content.invoices) {
      setDataTable(data.content.invoices);
    }
  };

  useEffect(() => {
    apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, {});
    apiElectron.on(
      InvoiceEvent.RESULT_GET_ALL_INVOICES,
      handleListenerGetInvoice
    );

    return () => {
      apiElectron.removeListener(
        InvoiceEvent.RESULT_GET_ALL_INVOICES,
        handleListenerGetInvoice
      );
    };
  }, []);

  return (
    <div className="home-page">
      <BoxShadow marginBottom={42}>
        <LabelTitle title="Tìm kiếm" hasBottomLine />
        <div className="home-page__container">
          <form className="home-page__from">
            <Select
              placeholder="Loại hoá đơn"
              label="Loại hoá đơn"
              options={selectionTypeInvoid}
            />
            <Input
              placeholder="Kí hiệu hóa đơn"
              label="Kí hiệu hóa đơn"
              hasIconSearch
            />
            <Input placeholder="Mã hóa đơn" label="Mã hóa đơn" hasIconSearch />
            <Input placeholder="Số hóa đơn" label="Số hóa đơn" hasIconSearch />
            <Input
              placeholder="Ngày hóa đơn"
              label="Ngày hóa đơn"
              hasIconSearch
            />
            <Input placeholder="Khách hàng" label="Khách hàng" hasIconSearch />
            <Select
              placeholder="Chọn kì"
              label="Chọn kì"
              options={selectionTypeInvoid}
            />
            <Input placeholder="Tên file" label="Tên file" hasIconSearch />
          </form>
        </div>
      </BoxShadow>
      <BoxShadow>
        <LabelTitle title="Danh sách hoá đơn mua" marginBottom={16} hasBtnAdd />
        <Table dataTable={dataTable} />
        <Pagination />
      </BoxShadow>
    </div>
  );
};
