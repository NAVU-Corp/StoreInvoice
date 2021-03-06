import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  LabelTitle,
  BoxShadow,
  ModalConfirm,
  Pagination,
  Alert,
} from "../../components";
import { InvoiceEvent, MediaEvent } from "../../constants/event";
import { CompanyContext } from "../../store/reducers";
import {
  FormFilter,
  ModalDate,
  ModalPreviewInvoice,
  Table,
} from "./components";
import "./HomePage.scss";

export const HomePage = () => {
  const { state } = useLocation<IParamsFilterHome>();

  const {
    state: { companyData, filterData },
  } = useContext(CompanyContext);

  //useState
  const [dataTable, setDataTable] = useState<Array<IResInvoice>>([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [messageConfirm, setMessageConfirm] = useState("");
  const [invoiceId, setInvoiceId] = useState(0);
  // const [linkPDF, setLinkPDF] = useState("");
  const [isOpenFile, setIsOpenFile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageAlert, setMessageAlert] = useState("");

  const [objectFilter, setObjectFilter] = useState<any>({
    companyid: companyData.id,
    page,
    pagesize: 20,
    valueType: filterData ? filterData.valueType : 1,
    typeinvoice: filterData ? filterData.typeInvoice : 10,
    groupmonth:
      filterData.valueType === 2
        ? (filterData && filterData.groupMonth) || undefined
        : undefined,
    month:
      filterData.valueType === 1
        ? (filterData && filterData.month) || undefined
        : undefined,
    year: filterData.year || undefined,
  });

  //handleAddFilePDF
  const handleAddFilePDF = (date: any) => {
    apiElectron.sendMessages(MediaEvent.STORE_MEDIA, {
      typeinvoice: filterData ? filterData.typeInvoice : 10,
      companyid: companyData.id,
      datechoose: date ? new Date(date) : new Date(),
      filter: objectFilter,
    });
    setLoading(true);
  };

  //handleListenerGetInvoice
  const handleGetAllInvoices = (filter: any) => {
    let temp;
    if(filter) {
      temp = filter;
    } else {
      temp = objectFilter;
    }

    if(objectFilter && objectFilter.companyid && objectFilter.companyid !== 0) {
      apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, temp);
    }
  };

  //handleListenerGetInvoice
  const handleListenerGetInvoice = (_: any, data: IResGetAllInvoices) => {
    if (data.content.invoices) {
      setDataTable(data.content.invoices);
      setPage(data.content.pageconfig.page);
      setTotalPage(data.content.pageconfig.totalpage);
    }
  };

  //handleResultStoreMedia
  const handleResultStoreMedia = (_: any, data: { result: number, content: any }) => {
    if (data.result) {
      let time = setTimeout(() => {
        setObjectFilter(data.content.filter);
        handleGetAllInvoices(data.content.filter);
        setIsOpenFile(false);
        setLoading(false);
        clearTimeout(time);
      }, 2000);
    } else {
      setMessageAlert("Vui l??ng ch???n h??a ????n ????? t???i l??n");
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllInvoices(undefined);
    //RESULT_GET_ALL_INVOICES
    apiElectron.on(
      InvoiceEvent.RESULT_GET_ALL_INVOICES,
      handleListenerGetInvoice
    );
    //RESULT_STORE_MEDIA
    apiElectron.on(MediaEvent.RESULT_STORE_MEDIA, handleResultStoreMedia);

    //removeListener
    return () => {
      apiElectron.removeListener(
        InvoiceEvent.RESULT_GET_ALL_INVOICES,
        handleListenerGetInvoice
      );

      apiElectron.removeListener(
        MediaEvent.RESULT_STORE_MEDIA,
        handleResultStoreMedia
      );

      apiElectron.removeListener(
        InvoiceEvent.RESULT_DELETE_ONE_INVOICE,
        handleResultDeleteInvoice
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

    // return () => {
    //   apiElectron.removeListener(
    //     InvoiceEvent.RESULT_DELETE_ONE_INVOICE,
    //     handleResultDeleteInvoice
    //   );
    // };
  }, [dataTable]);

  //handleConfirmDeleteInvoice
  const handleConfirmDeleteInvoice = () => {
    apiElectron.sendMessages(InvoiceEvent.DELETE_ONE_INVOICE, {
      id: invoiceId,
    });
  };

  const handleOpenFile = (url: string) => {
    apiElectron.sendMessages(MediaEvent.OPEN_FILE_MEDIA, { url: url });
  };

  const handleOpenFolder = (url: string) => {
    apiElectron.sendMessages(MediaEvent.OPEN_FOLDER_MEDIA, { url: url });
  };

  //handleFilterVoice
  const handleFilterVoice = (values: ISubmitFilter) => {
    const {
      groupmonth,
      invoicedate,
      invoicenumber,
      invoicesymbol,
      invoicetemplate,
      month,
      namebuyer,
      nameseller,
      year,
      monthfilter,
    } = values;

    let filter = {
      ...objectFilter,
      page: 0,
      monthfilter: monthfilter || undefined,
      year: (filterData && filterData.year) || undefined,
      invoicedate: invoicedate || undefined,
      invoicenumber: invoicenumber || undefined,
      invoicesymbol: invoicesymbol || undefined,
      invoicetemplate: invoicetemplate || undefined,
      namebuyer: namebuyer || undefined,
      nameseller: nameseller || undefined,
    };

    setObjectFilter(filter);
    handleGetAllInvoices(filter);

    // apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, {
    //   companyid: companyData.id,
    //   valueType: filterData ? filterData.valueType : 1,
    //   page,
    //   typeinvoice: filterData ? filterData.typeInvoice : 10,
    //   groupmonth:
    //     filterData.valueType === 2
    //       ? (filterData && filterData.groupMonth) || undefined
    //       : undefined,
    //   month:
    //     filterData.valueType === 1
    //       ? (filterData && filterData.month) || undefined
    //       : undefined,
    //   monthfilter: monthfilter || undefined,
    //   year: (filterData && filterData.year) || undefined,
    //   invoicedate: invoicedate || undefined,
    //   invoicenumber: invoicenumber || undefined,
    //   invoicesymbol: invoicesymbol || undefined,
    //   invoicetemplate: invoicetemplate || undefined,
    //   namebuyer: namebuyer || undefined,
    //   nameseller: nameseller || undefined,
    // });
  };

  // useEffect(() => {
  //   if(objectFilter && objectFilter.companyid && objectFilter.companyid !== 0) {
  //     apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, objectFilter);
  //   }
  // }, [objectFilter]);

  // useEffect(() => {
  //   setObjectFilter({
  //     ...objectFilter,
  //     valueType: filterData ? filterData.valueType : 1,
  //     typeinvoice: filterData ? filterData.typeInvoice : 10,
  //     groupmonth:
  //       filterData.valueType === 2
  //         ? (filterData && filterData.groupMonth) || undefined
  //         : undefined,
  //     month:
  //       filterData.valueType === 1
  //         ? (filterData && filterData.month) || undefined
  //         : undefined,
  //   })
  // }, [filterData]);

  return (
    <div className="home-page">
      <BoxShadow marginBottom={42}>
        <FormFilter
          year={state?.year}
          month={state?.month}
          groupmonth={state?.groupmonth}
          handleSubmitForm={handleFilterVoice}
        />
      </BoxShadow>
      <BoxShadow className="home-page__box-table">
        <LabelTitle
          title={`Danh s??ch ho?? ????n ${
            filterData && filterData.typeInvoice === 20 ? "mua v??o" : "b??n ra"
          } `}
          marginBottom={16}
          hasBtnAdd
          handleBtnAdd={() => setIsOpenFile(true)}
        />
        <Table
          typeInvoice={filterData.typeInvoice || 10}
          dataTable={dataTable}
          handleDeleteInvoice={(id) => {
            setMessageConfirm("B???n c?? mu???n x??a h??a ????n n??y kh??ng?");
            setInvoiceId(id);
          }}
          // handlePreviewPDF={(link) => setLinkPDF(link)}
          handleOpenFile={(link) => handleOpenFile(link)}
          handleOpenFolder={(link) => handleOpenFolder(link)}
        />
        {totalPage !== 1 && (
          <Pagination
            totalPage={totalPage}
            page={page}
            handleSelectNumber={(pageInside) => {
              setPage(pageInside);

              let filter = {
                ...objectFilter,
                page: pageInside,
              };

              setObjectFilter(filter);
              handleGetAllInvoices(filter);

              // apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, {
              //   companyid: companyData.id,
              //   page: pageInside,
              // });
            }}
            onBack={() => {
              if (page > 0) {
                setPage((page) => page - 1);

                let filter = {
                  ...objectFilter,
                  page: page - 1,
                };

                setObjectFilter(filter);
                handleGetAllInvoices(filter);

                // apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, {
                //   companyid: companyData.id,
                //   page: page - 1,
                // });
              }
            }}
            onNext={() => {
              if (page < totalPage) {
                setPage((page) => page + 1);

                let filter = {
                  ...objectFilter,
                  page: page + 1,
                };

                setObjectFilter(filter);
                handleGetAllInvoices(filter);

                // apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES, {
                //   companyid: companyData.id,
                //   page: page + 1,
                // });
              }
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
      {/* <ModalPreviewInvoice
        isOpen={linkPDF}
        link={linkPDF}
        setOpen={setLinkPDF}
      /> */}
      <ModalDate
        onChoosePDF={handleAddFilePDF}
        isOpen={isOpenFile}
        setOpen={setIsOpenFile}
        onClose={() => setIsOpenFile(false)}
        loading={loading}
      />
      <Alert
        isOpen={messageAlert}
        messages={messageAlert}
        setOpen={setMessageAlert}
      />
    </div>
  );
};
