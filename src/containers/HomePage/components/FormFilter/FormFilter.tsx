import React, { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Button, Input, LabelTitle, Select } from "../../../../components";
import "./FormFilter.scss";
import {
  optionGroupMonth,
  optionMonths,
  optionTypeStore,
  optionYears,
} from "../../../../constants/selections";
import { CompanyContext } from "../../../../store/reducers";
import { DetectMonthInGroupMonth } from "../../../../constants/month-valid";

export const FormFilter: React.FC<IFormFilter> = ({
  groupmonth,
  month,
  year,
  handleSubmitForm,
}) => {
  const [typeStore, setTypeStore] = useState(1);
  const { dispatch, state: { filterData }, } = useContext(CompanyContext);
  const [optionValidMonths, setOptionValidMonth] = useState<any>([]);

  const formik = useFormik({
    initialValues: {
      invoicesymbol: "",
      invoicetemplate: "",
      invoicenumber: "",
      invoicedate: "",
      invoicedateview: "",
      namebuyer: "",
      nameseller: "",
      month: month || 0,
      groupmonth: groupmonth || 0,
      year: year || 0,
      monthfilter: 0,
    },
    enableReinitialize: true,
    onSubmit: (values: any) => {
      if (values.invoicedateview) {
        values.invoicedate = new Date(values.invoicedateview);
      }
      return handleSubmitForm(values);
    },
  });

  const handleClearForm = () => {
    formik.resetForm();
    formik.submitForm();
  }

  useEffect(() => {
    if(filterData && filterData.valueType == 2 && filterData.groupMonth) {
      setOptionValidMonth(DetectMonthInGroupMonth(filterData.groupMonth));
    }
  }, [filterData]);

  return (
    <form className="form-filter" onSubmit={formik.handleSubmit}>
      <LabelTitle
        title="Tìm kiếm"
        hasBottomLine
        secondContent={
          <div>
            <Button isSecondary type="button" 
              onClick={handleClearForm} 
              style={{ marginRight: '15px' }}>
                Nhập lại
            </Button>
            <Button isPrimary type="submit">Tìm kiếm</Button>
          </div>
        }
        className="form-filter__title"
      />

      <div className="form-filter__container">
        <Input
          placeholder="Mẫu số hóa đơn"
          label="Mẫu số hóa đơn"
          hasIconSearch
          className="form-filter__input"
          value={formik.values.invoicesymbol}
          onChange={formik.handleChange}
          id="invoicesymbol"
          name="invoicesymbol"
        />
        <Input
          placeholder="Ký hiệu hóa đơn"
          label="Ký hiệu hóa đơn"
          hasIconSearch
          className="form-filter__input"
          value={formik.values.invoicetemplate}
          onChange={formik.handleChange}
          id="invoicetemplate"
          name="invoicetemplate"
        />
        <Input
          placeholder="Số hóa đơn"
          label="Số hóa đơn"
          hasIconSearch
          className="form-filter__input"
          value={formik.values.invoicenumber}
          onChange={formik.handleChange}
          id="invoicenumber"
          name="invoicenumber"
        />
        <Input
          placeholder="Ngày hóa đơn"
          label="Ngày hóa đơn"
          type="date"
          className="form-filter__input"
          value={formik.values.invoicedateview}
          onChange={formik.handleChange}
          id="invoicedateview"
          name="invoicedateview"
        />
        { filterData.typeInvoice === 10 ? (
          <Input
            placeholder="Khách hàng"
            label="Khách hàng"
            hasIconSearch
            className="form-filter__input"
            value={formik.values.namebuyer}
            onChange={formik.handleChange}
            id="namebuyer"
            name="namebuyer"
          />
        ) : (
          <Input
            placeholder="Nhà cung cấp"
            label="Nhà cung cấp"
            hasIconSearch
            className="form-filter__input"
            value={formik.values.nameseller}
            onChange={formik.handleChange}
            id="nameseller"
            name="nameseller"
          />
        ) }
        
        {/* <Select
          placeholder="Chọn kì"
          label="Chọn kì"
          className="form-filter__input"
          options={optionTypeStore}
          value={typeStore}
          onSelect={(item) => setTypeStore(item.id)}
        /> */}
        {/* <Select
          placeholder="Chọn năm"
          label="Chọn năm"
          className="form-filter__input"
          options={optionYears}
          value={formik.values.year}
          onSelect={(item) => formik.setFieldValue("year", item.id)}
        /> */}
        {filterData.valueType === 2 ? (
          <>
            <Select
              placeholder="Chọn tháng"
              label="Chọn tháng"
              className="form-filter__input"
              options={optionValidMonths}
              value={formik.values.monthfilter}
              onSelect={(item) => formik.setFieldValue("monthfilter", item.id)}
            />
          </>
        ) : (
          <div className="form-filter__input" style={{ width: '300px' }}></div>
        )}
        <div className="form-filter__input" style={{ width: '300px' }}></div>
        <div className="form-filter__input" style={{ width: '300px' }}></div>
      </div>
    </form>
  );
};
