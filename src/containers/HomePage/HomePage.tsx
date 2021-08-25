import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Input,
  LabelTitle,
  BoxShadow,
  Select,
  Modal,
  ModalConfirm,
} from "../../components";
import { InvoiceEvent, MediaEvent } from "../../constants/event";
import { selectionTypeInvoid } from "../../constants/selections";
import { Pagination, Table } from "./components";

import "./HomePage.scss";

export const HomePage: React.FC = () => {
  const { state } =
    useLocation<{ month: number; groupmonth: number; year: number }>();

  const [dataTable, setDataTable] = useState<Array<IResInvoice>>([]);
  const [messageConfirm, setMessageConfirm] = useState("");
  const [invoiceId, setInvoiceId] = useState(0);

  //handleAddFilePDF
  const handleAddFilePDF = () => {
    apiElectron.sendMessages(MediaEvent.STORE_MEDIA, { typeinvoice: 10 });
  };

  //handleListenerGetInvoice
  const handleListenerGetInvoice = (_: any, data: IResGetAllInvoices) => {
    if (data.content.invoices) {
      setDataTable(data.content.invoices);
    }
  };

  //handleResultDeleteInvoice
  const handleResultDeleteInvoice = (_: any, data: IResDeleteOneInvoice) => {
    if (data.content && data.result) {
      const deleteInvoice = dataTable.filter(
        (item) => item.id !== data.content.deleteid
      );
      // setDataTable(deleteInvoice);
      console.log("deleteInvoice", deleteInvoice);
      console.log(data.content.deleteid);
    }
    // setMessageConfirm("");
  };

  useEffect(() => {
    apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, {});

    //RESULT_GET_ALL_INVOICES
    apiElectron.on(
      InvoiceEvent.RESULT_GET_ALL_INVOICES,
      handleListenerGetInvoice
    );

    //RESULT_DELETE_ONE_INVOICE
    apiElectron.on(
      InvoiceEvent.RESULT_DELETE_ONE_INVOICE,
      handleResultDeleteInvoice
    );

    return () => {
      apiElectron.removeListener(
        InvoiceEvent.RESULT_GET_ALL_INVOICES,
        handleListenerGetInvoice
      );
      apiElectron.removeListener(
        InvoiceEvent.RESULT_DELETE_ONE_INVOICE,
        handleResultDeleteInvoice
      );
    };
  }, []);

  //handleConfirmDeleteInvoice
  const handleConfirmDeleteInvoice = () => {
    apiElectron.sendMessages(InvoiceEvent.DELETE_ONE_INVOICE, {
      id: invoiceId,
    });
  };

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
        <LabelTitle
          title="Danh sách hoá đơn mua"
          marginBottom={16}
          hasBtnAdd
          handleBtnAdd={handleAddFilePDF}
        />
        <Table
          dataTable={dataTable}
          handleDeleteInvoice={(id) => {
            setMessageConfirm("Bạn có muốn xóa hóa đơn này không?");
            setInvoiceId(id);
          }}
        />
        <Pagination />
      </BoxShadow>

      <ModalConfirm
        isOpen={messageConfirm}
        message={messageConfirm}
        setOpen={setMessageConfirm}
        onCancel={() => setMessageConfirm("")}
        onOK={handleConfirmDeleteInvoice}
      />
    </div>
  );
};
