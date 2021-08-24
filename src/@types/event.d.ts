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

interface IResGetOneCompany {
  content: {
    company?: IResCompany;
  };
  result: number;
}
