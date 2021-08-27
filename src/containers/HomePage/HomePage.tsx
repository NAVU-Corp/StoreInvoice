import React, { useContext, useEffect, useState } from "react";
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
import { optionTypeInvoid } from "../../constants/selections";
import { CompanyContext } from "../../store/reducers";
import { Pagination, Table } from "./components";

import "./HomePage.scss";

export const HomePage: React.FC = () => {
  const { state } =
    useLocation<{ month: number; groupmonth: number; year: number }>();

  const {
    state: { companyData },
  } = useContext(CompanyContext);

  const [dataTable, setDataTable] = useState<Array<IResInvoice>>([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  const [messageConfirm, setMessageConfirm] = useState("");
  const [invoiceId, setInvoiceId] = useState(0);
  const [typeInvoice, setTypeInvoice] = useState(10);

  //handleAddFilePDF
  const handleAddFilePDF = () => {
    apiElectron.sendMessages(MediaEvent.STORE_MEDIA, {
      typeinvoice: typeInvoice,
      companyid: companyData.id,
    });
  };

  //handleListenerGetInvoice
  const handleGetAllInvoices = () => {
    apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, {
      companyid: companyData.id,
      page,
    });
  };

  //handleListenerGetInvoice
  const handleListenerGetInvoice = (_: any, data: IResGetAllInvoices) => {
    if (data.content.invoices) {
      setDataTable(data.content.invoices);
      console.log("data", data);
      setPage(data.content.pageconfig.page);
      setTotalPage(data.content.pageconfig.totalpage);
    }
  };

  //handleResultStoreMedia
  const handleResultStoreMedia = (_: any, data: { result: number }) => {
    if (data.result) {
      let time = setTimeout(() => {
        handleGetAllInvoices();
        clearTimeout(time);
      }, 1000);
    }
  };
  useEffect(() => {
    handleGetAllInvoices();
    //RESULT_GET_ALL_INVOICES
    apiElectron.on(
      InvoiceEvent.RESULT_GET_ALL_INVOICES,
      handleListenerGetInvoice
    );
    //RESULT_STORE_MEDIA
    apiElectron.on(MediaEvent.RESULT_STORE_MEDIA, handleResultStoreMedia);

    return () => {
      apiElectron.removeListener(
        InvoiceEvent.RESULT_GET_ALL_INVOICES,
        handleListenerGetInvoice
      );

      apiElectron.removeListener(
        MediaEvent.RESULT_STORE_MEDIA,
        handleResultStoreMedia
      );
    };
  }, []);

  //handleResultDeleteInvoice
  const handleResultDeleteInvoice = (_: any, data: IResDeleteOneInvoice) => {
    if (data.content && data.result) {
      const deleteInvoice = dataTable.filter(
        (item) => item.id !== data.content.deleteid
      );
      setDataTable(deleteInvoice);
    }
    setMessageConfirm("");
  };
  useEffect(() => {
    //RESULT_DELETE_ONE_INVOICE
    apiElectron.on(
      InvoiceEvent.RESULT_DELETE_ONE_INVOICE,
      handleResultDeleteInvoice
    );

    return () => {
      apiElectron.removeListener(
        InvoiceEvent.RESULT_DELETE_ONE_INVOICE,
        handleResultDeleteInvoice
      );
    };
  }, [dataTable]);

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
              options={optionTypeInvoid}
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
              options={optionTypeInvoid}
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
        {totalPage !== 1 && (
          <Pagination
            totalPage={totalPage}
            page={page}
            handleSelectNumber={(pageInside) => {
              setPage(pageInside);

              apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, {
                companyid: companyData.id,
                page: pageInside,
              });
            }}
          />
        )}
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
