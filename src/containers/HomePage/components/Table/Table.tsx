import React from "react";
import { useHistory } from "react-router-dom";

import { SvgDelete } from "../../../../assets/svg";
import { Button } from "../../../../components";
import "./Table.scss";

export const Table: React.FC<ITable> = ({ dataTable, handleDeleteInvoice }) => {
  const history = useHistory();

  return (
    <table className="table">
      <thead>
        <tr>
          <th>STT</th>
          <th>Ký hiệu HĐ</th>
          <th>Mã HĐ</th>
          <th>Số HĐ</th>
          <th>Ngày hóa đơn</th>
          <th>Khách hàng</th>
          <th>Ghi chú</th>
          <th>Xem HĐ</th>
          <th>Xóa</th>
        </tr>
      </thead>
      <tbody>
        {dataTable?.map((item, i) => {
          return (
            <tr
              key={i}
              className="table__row"
              onClick={() => history.push(`/invoice-detail/${item.id}`)}
            >
              <td align="center">{i + 1}</td>
              <td
                align="center"
                style={{ fontWeight: "bold", color: "#262626" }}
              >
                {item.invoicesymbol}
              </td>
              <td align="center">{item.invoicenumber}</td>
              <td align="center">{item.invoicetemplate}</td>
              <td align="center">{item.invoicedate}</td>
              <td align="center">{item.namebuyer}</td>
              <td align="center">{item.note}</td>
              <td align="center">
                <Button className="table__btn">Xem</Button>
              </td>
              <td align="center">
                <Button
                  isRed
                  onClick={(e) => {
                    e.stopPropagation();
                    if (handleDeleteInvoice) {
                      return handleDeleteInvoice(item.id);
                    }
                  }}
                >
                  <SvgDelete />
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
