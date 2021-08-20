const fs = require('fs');
const path = require("path");
const { app } = require("electron");

const { UtilsDB } = require('./ultilsdb');

const { CompanyRepository } = require('../repositories/company_repository');
const { InvoiceRepository } = require('../repositories/invoice_repository');

const { CompanyService } = require('../services/company_service');
const { InvoiceService } = require('../services/invoice_service');

const { MediaService } = require('../services/media_service');

const storePdfPath = path.join(app.getPath('userData'), 'store-pdf');

if (!fs.existsSync(storePdfPath)){
  fs.mkdirSync(storePdfPath);
}

const utilsDB = new UtilsDB();

const companyRepository = new CompanyRepository({ utilsDB });
const invoiceRepository = new InvoiceRepository({ utilsDB });

const companyService = new CompanyService({ companyRepository });
const invoiceService = new InvoiceService({ invoiceRepository });

const mediaService = new MediaService({ storePdfPath });

companyRepository.createTable();
invoiceRepository.createTable();

module.exports = {
  companyService,
  invoiceService,
  mediaService,
};