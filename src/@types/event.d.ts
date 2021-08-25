interface IResCompany {
  address: string;
  createdate: number;
  district: string;
  email: string;
  fax: string;
  id: number;
  name: string;
  phone: string;
  province: string;
  status: 10 | 20;
  taxcode: string;
  updatedate: number;
}

interface IResInvoice {
  createdate: number;
  id: number;
  invoicedate: number;
  invoicenumber: string;
  invoicesymbol: string;
  invoicetemplate: string;
  linkpdf: string;
  month: string;
  namebuyer: string;
  namepdf: string;
  nameseller: string;
  note: string;
  status: number;
  typeinvoice: number;
  updatedate: number;
}
interface IResGetOneCompany {
  content: {
    company?: IResCompany;
  };
  result: number;
}

interface IResGetAllInvoices {
  content: {
    invoices?: Array<IResInvoice>;
  };
  result: number;
}

interface IResDeleteOneInvoice {
  content: { deleteid: number };
  result: 1;
}
