class InvoiceRepository {
  constructor({ utilsDB, storePdfPath }) {
    this.utilsDB = utilsDB;
    this.storePdfPath = storePdfPath;
  }

  //typeinvoice: 10 - Hóa đơn bán ra, 20 - Hóa đơn mua vào
  createTable() {
    let sql = `
      CREATE TABLE IF NOT EXISTS invoice (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        invoicesymbol text,
        invoicetemplate text,
        invoicenumber text,
        invoicedate datetime,
        namebuyer text,
        note text,
        namepdf text,
        status int,
        createdate datetime,
        updatedate datetime
      );`;

    return this.utilsDB.run(sql);
  }

  alterTypeInvoice() {
    let sql =  `ALTER TABLE invoice ADD typeinvoice INT;`;
    return this.utilsDB.run(sql);
  }

  alterNameSeller() {
    let sql = `ALTER TABLE invoice ADD nameseller text;`;
    return this.utilsDB.run(sql);
  }

  alterCompanyId() {
    let sql = `ALTER TABLE invoice ADD companyid int;`;
    return this.utilsDB.run(sql);
  }

  create(invoice, { dateNow }) {
    const {
      companyid,
      invoicesymbol,
      invoicetemplate,
      invoicenumber,
      invoicedate,
      namebuyer,
      nameseller,
      note,
      namepdf,
      typeinvoice,
    } = invoice;
    
    return this.utilsDB.run(
      `INSERT INTO invoice (companyid, invoicesymbol, invoicetemplate, invoicenumber, invoicedate, note, namepdf,
        namebuyer, nameseller, typeinvoice, status, createdate, updatedate)
      VALUES ($companyid, $invoicesymbol, $invoicetemplate, $invoicenumber, $invoicedate, $note, $namepdf, 
        $namebuyer, $nameseller, $typeinvoice, $status, $createdate, $updatedate)`,
      {
        $companyid: companyid,
        $invoicesymbol: invoicesymbol,
        $invoicetemplate: invoicetemplate,
        $invoicenumber: invoicenumber,
        $invoicedate: invoicedate,
        $note: note,
        $namepdf: namepdf,
        $namebuyer: namebuyer,
        $nameseller: nameseller,
        $typeinvoice: typeinvoice,
        $status: 10,
        $createdate: dateNow,
        $updatedate: dateNow,
      }
    );
  }

  update(invoice, { dateNow }) {
    const {
      id,
      companyid,
      invoicesymbol,
      invoicetemplate,
      invoicenumber,
      invoicedate,
      namebuyer,
      nameseller,
      note,
      namepdf,
      typeinvoice,
    } = invoice;

    return this.utilsDB.run(
      `UPDATE invoice 
      SET companyid = $companyid, invoicesymbol = $invoicesymbol, invoicetemplate = $invoicetemplate, invoicenumber = $invoicenumber, 
        invoicedate = $invoicedate, note = $note, namepdf = $namepdf, namebuyer = $namebuyer, namebuyer = $namebuyer, 
        typeinvoice = $typeinvoice, status = $status, updatedate = $updatedate 
      WHERE id = $id`,
      {
        $id: id,
        $companyid: companyid,
        $invoicesymbol: invoicesymbol,
        $invoicetemplate: invoicetemplate,
        $invoicenumber: invoicenumber,
        $invoicedate: invoicedate,
        $note: note,
        $namepdf: namepdf,
        $namebuyer: namebuyer,
        $nameseller: nameseller,
        $typeinvoice: typeinvoice,
        $status: 10,
        $updatedate: dateNow,
      }
    );
  }

  delete(id, { dateNow }) {
    return this.utilsDB.run(
      `UPDATE invoice 
      SET status = $status, updatedate = $updatedate 
      WHERE id = $id`,
      {
        $id: id,
        $status: 90,
        $updatedate: dateNow,
      }
    );
  }

  getById(id) {
    return this.utilsDB.get(
      `SELECT id, ifnull(companyid, 0) companyid, invoicesymbol, invoicetemplate, invoicenumber, invoicedate, note, namepdf,
        '${this.storePdfPath}' || '\\' || ifnull(namepdf, '') linkpdf,
        IFNULL(namebuyer, '') namebuyer, IFNULL(nameseller, '') nameseller, IFNULL(typeinvoice, 10) typeinvoice, 
        status, createdate, updatedate
      FROM invoice 
      WHERE status != 90 and id = $id`,
      {
        $id: id,
      }
    );
  }

  getList(filter) {
    filter = filter || {};
    filter.page = filter.page || 0;
    filter.pagesize = filter.pagesize || 20;

    let condition = ``;

    if(filter.companyid) {
      condition += ` and ifnull(companyid, 0) = $companyid `;
    }

    if (filter.typeinvoice) {
      condition += ` and IFNULL(typeinvoice, 10) = $typeinvoice `;
    }

    if (filter.namebuyer) {
      condition += ` and IFNULL(namebuyer, 10) like $namebuyer `;
    }

    if (filter.nameseller) {
      condition += ` and IFNULL(nameseller, 10) like $nameseller `;
    }

    if (filter.frominvoicedate) {
      condition += ` and invoicedate >= $frominvoicedate `;
    }

    if (filter.toinvoicedate) {
      condition += ` and invoicedate <= $toinvoicedate `;
    }

    if (filter.invoicesymbol) {
      condition += ` and ifnull(invoicesymbol, '') like $invoicesymbol `;
    }

    if (filter.invoicetemplate) {
      condition += ` and ifnull(invoicetemplate, '') like $invoicetemplate `;
    }

    if (filter.invoicenumber) {
      condition += ` and ifnull(invoicenumber, '') like $invoicenumber `;
    }

    if (filter.month) {
      condition += ` and CAST(strftime('%m', datetime(createdate / 1000, 'unixepoch')) as int) = $month `;
    }

    if (filter.groupmonth) {
      if (filter.groupmonth === 10) {
        // Quý 1
        condition += ` and CAST(strftime('%m', datetime(createdate / 1000, 'unixepoch')) as int) in (1, 2, 3) `;
      } else if (filter.groupmonth === 20) {
        // Quý 2
        condition += ` and CAST(strftime('%m', datetime(createdate / 1000, 'unixepoch')) as int) in (4, 5, 6) `;
      } else if (filter.groupmonth === 30) {
        // Quý 3
        condition += ` and CAST(strftime('%m', datetime(createdate / 1000, 'unixepoch')) as int) in (7, 8, 9) `;
      } else if (filter.groupmonth === 40) {
        // Quý 4
        condition += ` and CAST(strftime('%m', datetime(createdate / 1000, 'unixepoch')) as int) in (10, 11, 12) `;
      }
    }

    if (filter.year) {
      condition += ` and CAST(strftime('%y', datetime(createdate / 1000, 'unixepoch')) as int) = $year `;
    }

    let query = 
      `SELECT id, ifnull(companyid, 0) companyid, IFNULL(invoicesymbol, '') invoicesymbol, ifnull(invoicetemplate, '') invoicetemplate, 
        ifnull(invoicenumber, '') invoicenumber, ifnull(invoicedate, 0) invoicedate, ifnull(note, '') note, 
        ifnull(namepdf, '') namepdf, IFNULL(namebuyer, '') namebuyer, IFNULL(nameseller, '') nameseller, 
        IFNULL(typeinvoice, 10) typeinvoice, status, createdate, updatedate, 
        '${this.storePdfPath}' || '\\' || ifnull(namepdf, '') linkpdf,
        strftime('%m ', datetime(ifnull(invoicedate, 0) / 1000, 'unixepoch')) month 
      FROM invoice 
      WHERE status != 90 ${condition} 
      ORDER BY invoicedate desc
      limit $page, $pagesize;`;

    return this.utilsDB.all(query, {
      $companyid: filter.companyid,
      $typeinvoice: filter.typeinvoice,
      $namebuyer: filter.namebuyer ? `%${filter.namebuyer}%` : undefined,
      $nameseller: filter.nameseller ? `%${filter.nameseller}%` : undefined,
      $frominvoicedate: filter.frominvoicedate,
      $toinvoicedate: filter.toinvoicedate,
      $invoicesymbol: filter.invoicesymbol
        ? `%${filter.invoicesymbol}%`
        : undefined,
      $invoicetemplate: filter.invoicetemplate
        ? `%${filter.invoicetemplate}%`
        : undefined,
      $invoicenumber: filter.invoicenumber
        ? `%${filter.invoicenumber}%`
        : undefined,
      $month: filter.month,
      $year: filter.year,
      $page: filter.page * filter.pagesize,
      $pagesize: filter.pagesize,
    });
  }
}

module.exports = {
  InvoiceRepository,
};
