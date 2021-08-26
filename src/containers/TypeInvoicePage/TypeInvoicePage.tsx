import React from "react";
import { useHistory } from "react-router-dom";
import { BoxShadow, Button } from "../../components";
import "./TypeInvoicePage.scss";

export const TypeInvoicePage = () => {
  const history = useHistory();

  return (
    <div className="type-invoice">
      <BoxShadow className="type-invoice__container">
        <h3>CHỌN LOẠI HOÁ ĐƠN</h3>
        <div className="type-invoice__actions">
          <Button isExtraBig isRed onClick={() => history.push("/")}>
            Hóa đơn mua vào
          </Button>
          <Button isExtraBig onClick={() => history.push("/")}>
            Hóa đơn bán ra
          </Button>
        </div>
      </BoxShadow>
    </div>
  );
};
