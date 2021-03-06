const fs = require('fs');
const path = require("path");
const { app } = require("electron");
const uuid = require('uuid');
const pdf = require("pdf-parse");
const { dialog, shell } = require('electron');

const { UtilsDB } = require('./ultilsdb');

const { CompanyRepository } = require('../repositories/company_repository');
const { InvoiceRepository } = require('../repositories/invoice_repository');
const { ConfigRepository } = require('../repositories/config_repository');

const { CompanyService } = require('../services/company_service');
const { InvoiceService } = require('../services/invoice_service');
const { ConfigService } = require('../services/config_service');

const { MediaService } = require('../services/media_service');

const storePdfPath = path.join(app.getPath('userData'), 'store-pdf');

if (!fs.existsSync(storePdfPath)){
  fs.mkdirSync(storePdfPath);
}

const utilsDB = new UtilsDB();

const companyRepository = new CompanyRepository({ utilsDB });
const invoiceRepository = new InvoiceRepository({ utilsDB, storePdfPath });
const configRepository = new ConfigRepository({ utilsDB });

const companyService = new CompanyService({ companyRepository });
const invoiceService = new InvoiceService({ invoiceRepository, fs });
const configService = new ConfigService({ configRepository });

const mediaService = new MediaService({ storePdfPath, fs, path, uuid, pdf, configRepository, dialog, invoiceRepository, shell });

companyRepository.createTable();
invoiceRepository.createTable();
configRepository.createTable();

invoiceRepository.alterCompanyId();
invoiceRepository.alterNameSeller();
invoiceRepository.alterTypeInvoice();
invoiceRepository.alterDateChoose();

configRepository.createDefaultConfigCustomer();
configRepository.createDefaultConfigBuyer();

module.exports = {
  companyService,
  invoiceService,
  mediaService,
  configService,
};