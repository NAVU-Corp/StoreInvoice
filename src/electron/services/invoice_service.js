

class InvoiceService {
  constructor({ invoiceRepository }) {
    this.invoiceRepository = invoiceRepository;
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

  deleteInvoice(id, { 
    dateNow,
  }) {
    return this.invoiceRepository.delete(id, { dateNow });
  }

  getInvoiceById(id) {
    return this.invoiceRepository.getById(id, { dateNow });
  }

  getInvoices() {
    return this.invoiceRepository.getList();
  }
}

module.exports = {
  InvoiceService,
};