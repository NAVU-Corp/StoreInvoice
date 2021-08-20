

class InvoiceRepository {
  constructor({ utilsDB }) {
    this.utilsDB = utilsDB;
  }

  createTable() {
    const sql = `
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
      )`
    return this.utilsDB.run(sql)
  }

  create(invoice, { 
    dateNow,
  }) {
    const { invoicesymbol, invoicetemplate, invoicenumber, invoicedate, note, namepdf } = invoice;

    return this.utilsDB.run(
      `INSERT INTO invoice (invoicesymbol, invoicetemplate, invoicenumber, invoicedate, note, namepdf,
        status, createdate, updatedate)
      VALUES ($invoicesymbol, $invoicetemplate, $invoicenumber, $invoicedate, $note, $namepdf, 
        $status, $createdate, $updatedate)`,
      {
        $invoicesymbol: invoicesymbol,
        $invoicetemplate: invoicetemplate,
        $invoicenumber: invoicenumber,
        $invoicedate: invoicedate,
        $note: note,
        $namepdf: namepdf,
        $status: 10,
        $createdate: dateNow,
        $updatedate: dateNow,
      });
  }

  update(invoice, { 
    dateNow,
  }) {
    const { id, invoicesymbol, invoicetemplate, invoicenumber, invoicedate, note, namepdf } = invoice;

    return this.utilsDB.run(
      `UPDATE invoice 
      SET invoicesymbol = $invoicesymbol, invoicetemplate = $invoicetemplate, invoicenumber = $invoicenumber, 
        invoicedate = $invoicedate, note = $note, namepdf = $namepdf, status = $status, updatedate = $updatedate 
      WHERE id = $id`,
      {
        $id: id,
        $invoicesymbol: invoicesymbol,
        $invoicetemplate: invoicetemplate,
        $invoicenumber: invoicenumber,
        $invoicedate: invoicedate,
        $note: note,
        $namepdf: namepdf,
        $status: 10,
        $updatedate: dateNow,
      }
    )
  }

  delete(id, { 
    dateNow,
  }) {
    return this.utilsDB.run(
      `UPDATE invoice 
      SET status = $status, updatedate = $updatedate 
      WHERE id = $id`,
      {
        $id: id,
        $status: 90,
        $updatedate: dateNow,
      });
  }

  getById(id) {
    return this.utilsDB.get(
      `SELECT id, invoicesymbol, invoicetemplate, invoicenumber, invoicedate, note, namepdf,
        status, createdate, updatedate
      FROM invoice 
      WHERE status != 90 and id = $id`,
      {
        $id: id,
      })
  }

  getList() {
    let query =
      `SELECT id, invoicesymbol, invoicetemplate, invoicenumber, invoicedate, note, namepdf,
        status, createdate, updatedate
      FROM invoice 
      WHERE status != 90
      ORDER BY invoicedate desc`

    return this.utilsDB.all(query);
  }
}

module.exports = {
  InvoiceRepository,
};