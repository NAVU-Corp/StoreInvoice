

class CompanyService {
  constructor({ companyRepository }) {
    this.companyRepository = companyRepository;
  }

  async createCompany(company, { 
    dateNow,
  }) {
    this.checkValidInput(company);
    return this.companyRepository.create(company, { dateNow });
  }

  updateCompany(company, { 
    dateNow,
  }) {
    this.checkValidInput(company);
    return this.companyRepository.update(company, { dateNow });
  }

  deleteCompany(id, { 
    dateNow,
  }) {
    return this.companyRepository.delete(id, { dateNow });
  }

  getCompanyById(filter) {
    return this.companyRepository.getById(filter);
  }

  getCompanies(filter) {
    return this.companyRepository.getList(filter);
  }

  checkValidInput(company) {
    let resultTaxCodeChacker = this.companyRepository.checkExitsTaxCode(company.taxcode, company.id || 0);
    if(resultTaxCodeChacker && resultTaxCodeChacker.numExists && resultTaxCodeChacker.numExists > 0) {
      throw({
        result: 0,
        message: `Mã số thuế này đã được sử dụng.`
      });
    }

    let resultNameChecker = this.companyRepository.checkExitsName(company.name, company.id || 0);
    if(resultNameChecker && resultNameChecker.numExists && resultNameChecker.numExists > 0) {
      throw({
        result: 0,
        message: `Tên công ty này đã được sử dụng.`
      });
    }
  }
}

module.exports = {
  CompanyService,
};