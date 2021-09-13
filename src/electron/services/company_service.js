class CompanyService {
  constructor({ companyRepository }) {
    this.companyRepository = companyRepository;
  }

  async createCompany(company, { dateNow }) {
    let message = await this.checkValidInput(company);
    if (message) {
      throw {
        result: 0,
        message: message,
      };
    }

    return this.companyRepository.create(company, { dateNow });
  }

  async updateCompany(company, { dateNow }) {
    let message = await this.checkValidInput(company);
    if (message) {
      throw {
        result: 0,
        message: message,
      };
    }

    return this.companyRepository.update(company, { dateNow });
  }

  async deleteCompany(id, { taxcode, dateNow }) {
    let exists = await this.checkExitsTaxCode(taxcode);
    if (!exists) {
      throw {
        result: 0,
        message: `Mã số thuế chưa được đăng ký trong hệ thống`,
      };
    }

    return this.companyRepository.delete(id, { taxcode, dateNow });
  }

  getCompanyById(filter) {
    return this.companyRepository.getById(filter);
  }

  getCompanies(filter) {
    return this.companyRepository.getList(filter);
  }

  async checkValidInput(company) {
    let resultTaxCodeChacker = await this.companyRepository.checkExitsTaxCode(
      company.taxcode,
      company.id || 0
    );

    if (
      resultTaxCodeChacker &&
      resultTaxCodeChacker.numExists &&
      resultTaxCodeChacker.numExists > 0
    ) {
      return `Mã số thuế này đã được sử dụng.`;
    }

    let resultNameChecker = await this.companyRepository.checkExitsName(
      company.name,
      company.id || 0
    );

    if (
      resultNameChecker &&
      resultNameChecker.numExists &&
      resultNameChecker.numExists > 0
    ) {
      return `Tên công ty này đã được sử dụng.`;
    }

    return "";
  }

  async checkExitsTaxCode(taxcode) {
    let resultTaxCodeChacker = await this.companyRepository.checkExitsTaxCode(
      taxcode,
      0
    );
      console.log(resultTaxCodeChacker);
    if (
      resultTaxCodeChacker &&
      resultTaxCodeChacker.numExists &&
      resultTaxCodeChacker.numExists > 0
    ) {
      return true;
    }

    return false;
  }
}

module.exports = {
  CompanyService,
};
