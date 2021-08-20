import React, { useEffect, useState } from "react";
import { Nav } from "../../components";
import "./Test.scss";
import { CompanyEvent, InvoiceEvent, MediaEvent } from "../../constants/event";

export const Test: React.FC = () => {
  const [companies, setCompanies] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [idCompanyDelete, setIdCompanyDelete] = useState<number>(0);
  const [idInvoiceDelete, setIdInvoiceDelete] = useState<number>(0);
  const [fileName, setFileName] = useState<string>('');

  useEffect(() => {
    apiElectron.on(CompanyEvent.RESULT_GET_ALL_COMPANIES, (_, data) => {
      if(data.result === 1) {
        setCompanies(data.content.companies);
        console.log(data);
      } else {
        console.log(data?.message);
      }
    });

    apiElectron.on(CompanyEvent.RESULT_INSERT_ONE_COMPANY, (_, data) => {
      console.log(data);
    });

    apiElectron.on(CompanyEvent.RESULT_DELETE_ONE_COMPANY, (_, data) => {
      console.log(data);
    });

    apiElectron.on(InvoiceEvent.RESULT_GET_ALL_INVOICES, (_, data) => {
      if(data.result === 1) {
        setInvoices(data.content.invoices);
        console.log(data);
      } else {
        console.log(data?.message);
      }
    });

    apiElectron.on(InvoiceEvent.RESULT_DELETE_ONE_INVOICE, (_, data) => {
      console.log(data);
    });

  }, []);

  return (
    <div className="home">
      <Nav />
      <h1>Test</h1>

      <button
        onClick={() => {
          let company = {
            taxcode: "",
            name: "Qwerty 001",
            address: "001 ABC Qwerty",
            email: "qwerty001@gmail.com",
            phone: "0123456789",
            fax: "0987654321",
            province: "TP. HCM",
            district: "Quận 1",
          };

          console.log(company);
          apiElectron.sendMessages(CompanyEvent.INSERT_ONE_COMPANY, company);
        }}
      >
        INSERT COMPANY
      </button>

      <button
        onClick={() => {
          let company = {
            id: 2,
            taxcode: "0123456789",
            name: "Qwerty 002",
            address: "002 ABC Qwerty",
            email: "qwerty002@gmail.com",
            phone: "0123456789",
            fax: "0987654321",
            province: "TP. HCM",
            district: "Quận 1",
          };

          console.log(company);
          apiElectron.sendMessages(CompanyEvent.UPDATE_ONE_COMPANY, company);
        }}
      >
        UPDATE COMPANY
      </button>

      <input type="text" value={idCompanyDelete} onChange={(e) => setIdCompanyDelete(Number(e.target.value || 0))} />

      <button
        onClick={() => {
          apiElectron.sendMessages(CompanyEvent.DELETE_ONE_COMPANY, {
            id: idCompanyDelete,
          });
        }}
      >
        DELETE COMPANY
      </button>

      <button
        onClick={() => {
          apiElectron.sendMessages(CompanyEvent.GET_ALL_COMPANIES);
        }}
      >
        GET ALL COMPANIES
      </button>

      {companies.map((company: any, i) => {
        return <p key={company.id}>{JSON.stringify(company)}</p>;
      })}

      <button
        onClick={() => {
          let invoice = {
            invoicesymbol: "123",
            invoicetemplate: "ABC/123",
            invoicenumber: "745218",
            invoicedate: new Date('2021-08-21'),
            note: "Oke nhé",
            namepdf: "pdf1.pdf",
          };

          console.log(invoice);
          apiElectron.sendMessages(InvoiceEvent.INSERT_ONE_INVOICE, invoice);
        }}
      >
        INSERT INVOICE
      </button>

      <button
        onClick={() => {
          let invoice = {
            id: 4,
            invoicesymbol: "123456",
            invoicetemplate: "ABC/123",
            invoicenumber: "745218",
            invoicedate: new Date('2021-08-21'),
            note: "Oke nhé",
            namepdf: "pdf1.pdf",
          };

          console.log(invoice);
          apiElectron.sendMessages(InvoiceEvent.UPDATE_ONE_INVOICE, invoice);
        }}
      >
        UPDATE INVOICE
      </button>

      <input type="text" value={idInvoiceDelete} onChange={(e) => setIdInvoiceDelete(Number(e.target.value || 0))} />

      <button
        onClick={() => {
          apiElectron.sendMessages(InvoiceEvent.DELETE_ONE_INVOICE, {
            id: idInvoiceDelete,
          });
        }}
      >
        DELETE INVOICE
      </button>

      <button
        onClick={() => {
          apiElectron.sendMessages(InvoiceEvent.GET_ALL_INVOICES);
        }}
      >
        GET ALL INVOICES
      </button>

      {invoices.map((invoice: any, i) => {
        return <p key={invoice.id}>{JSON.stringify(invoice)}</p>;
      })}

      <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value || '')} />

      <button
        onClick={() => {
          let input = {
            filePath: [
              fileName
            ]
          };

          apiElectron.sendMessages(MediaEvent.STORE_MEDIA, input);
        }}
      >
        STORE FILE
      </button>
    </div>
  );
};
