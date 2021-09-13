

class InvoiceService {
  constructor({ invoiceRepository, fs }) {
    this.invoiceRepository = invoiceRepository;
    this.fs = fs;
  }

  createInvoice(invoice, { 
    dateNow,
  }) {
    return this.invoiceRepository.create(invoice, { dateNow });
  }

  updateInvoice(invoice, { 
    dateNow,
  }) {
    return this.invoiceRepository.update(invoice, { dateNow });
  }

  async deleteInvoice(id, { 
    dateNow,
  }) {
    let invoice = await this.invoiceRepository.getById(id);
    if (this.fs.existsSync(invoice.linkpdf)) {
      this.fs.unlink(invoice.linkpdf, (err) => {
        // console.log("File succesfully deleted: " + invoice.linkpdf);
      });
    }

    return this.invoiceRepository.delete(id, { dateNow });
  }

  getInvoiceById(id) {
    return this.invoiceRepository.getById(id);
  }

  getInvoices(filter) {
    return this.invoiceRepository.getList(filter);
  }

  countInvoices(filter) {
    return this.invoiceRepository.countList(filter);
  }
}

module.exports = {
  InvoiceService,
};