import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { BoxShadow, Button } from "../../components";
import "./TypeInvoicePage.scss";
import { ImageInvoiceBill, ImageReceiptBill } from "../../constants/images";
import { CompanyContext } from "../../store/reducers";
import { doSaveStepFilter } from "../../store/actions";

export const TypeInvoicePage = () => {
  const history = useHistory();
  const { dispatch, state: { filterData }, } = useContext(CompanyContext);
  // const { state } = useLocation<IParamsFilterTypeInvoice>();

  return (
    <div className="type-invoice">
      <BoxShadow className="type-invoice__container">
        <h3>Chọn loại hóa đơn</h3>
        <div className="type-invoice__actions">
          <Button
            isOutlinePrimary
            isWithImage
            onClick={() => {
              history.push({
                pathname: "/",
              });
              dispatch(doSaveStepFilter({
                ...filterData,
                typeInvoice: 20,
              }));
            }}
            style={{
              background: 'transparent',
            }}
          >
            Hóa đơn mua vào
            <img src={ImageInvoiceBill} className="type-invoice__btn-img" />
          </Button>
          <Button
            isOutlinePrimary
            isWithImage
            onClick={() => {
              history.push({
                pathname: "/",
              })
              dispatch(doSaveStepFilter({
                ...filterData,
                typeInvoice: 10,
              }));
            }}
            style={{
              background: 'transparent',
            }}
          >
            Hóa đơn bán ra
            <img src={ImageReceiptBill} className="type-invoice__btn-img" />
          </Button>
        </div>
      </BoxShadow>
    </div>
  );
};
