import React from "react";
import { SvgDelete } from "../../../../assets/svg";
import { Button } from "../../../../components";
import "./Table.scss";

const DATA = [
  {
    stt: "1",
    MaHD: "215-593-5846",
    SoHD: "215-593-5846",
    NgayHD: "11/11/2000",
    Cusumer: "South Mariane",
    note: "Note 1221221",
  },
  {
    stt: "2",
    MaHD: "215-593-5846",
    SoHD: "215-593-5846",
    NgayHD: "11/11/2000",
    Cusumer: "South Mariane",
    note: "Note 1221221",
  },
  {
    stt: "3",
    MaHD: "215-593-5846",
    SoHD: "215-593-5846",
    NgayHD: "11/11/2000",
    Cusumer: "South Mariane",
    note: "Note 1221221",
  },
  {
    stt: "4",
    MaHD: "215-593-5846",
    SoHD: "215-593-5846",
    NgayHD: "11/11/2000",
    Cusumer: "South Mariane",
    note: "Note 1221221",
  },
  {
    stt: "5",
    MaHD: "215-593-5846",
    SoHD: "215-593-5846",
    NgayHD: "11/11/2000",
    Cusumer: "South Mariane",
    note: "Note 1221221",
  },
  {
    stt: "5",
    MaHD: "215-593-5846",
    SoHD: "215-593-5846",
    NgayHD: "11/11/2000",
    Cusumer: "South Mariane",
    note: "Note 1221221",
  },
  {
    stt: "5",
    MaHD: "215-593-5846",
    SoHD: "215-593-5846",
    NgayHD: "11/11/2000",
    Cusumer: "South Mariane",
    note: "Note 1221221",
  },
  {
    stt: "5",
    MaHD: "215-593-5846",
    SoHD: "215-593-5846",
    NgayHD: "11/11/2000",
    Cusumer: "South Mariane",
    note: "Note 1221221",
  },
  {
    stt: "5",
    MaHD: "215-593-5846",
    SoHD: "215-593-5846",
    NgayHD: "11/11/2000",
    Cusumer: "South Mariane",
    note: "Note 1221221",
  },
];

export const Table = () => {
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
        {DATA.map((item, i) => {
          return (
            <tr key={i}>
              <td align="center">{item.stt}</td>
              <td
                align="center"
                style={{ fontWeight: "bold", color: "#262626" }}
              >
                {item.MaHD}
              </td>
              <td align="center">{item.MaHD}</td>
              <td align="center">{item.SoHD}</td>
              <td align="center">{item.NgayHD}</td>
              <td align="center">{item.NgayHD}</td>
              <td align="center">{item.note}</td>
              <td align="center">
                <Button className="table__btn">Xem</Button>
              </td>
              <td align="center">
                <Button isRed>
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
