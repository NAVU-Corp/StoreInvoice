import React from "react";
import {
  Input,
  LabelTitle,
  BoxShadow,
  Select,
  Button,
  Nav,
} from "../../components";
import { selectionTypeInvoid } from "../../constants/selections";
import { Pagination, Table } from "./components";

import "./HomePage.scss";

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <BoxShadow marginBottom={42}>
        <LabelTitle title="Tìm kiếm" hasBottomLine />
        <div className="home-page__container">
          <form className="home-page__from">
            <Select
              placeholder="Loại hoá đơn"
              label="Loại hoá đơn"
              options={selectionTypeInvoid}
            />
            <Input
              placeholder="Kí hiệu hóa đơn"
              label="Kí hiệu hóa đơn"
              hasIconSearch
            />
            <Input placeholder="Mã hóa đơn" label="Mã hóa đơn" hasIconSearch />
            <Input placeholder="Số hóa đơn" label="Số hóa đơn" hasIconSearch />
            <Input
              placeholder="Ngày hóa đơn"
              label="Ngày hóa đơn"
              hasIconSearch
            />
            <Input placeholder="Khách hàng" label="Khách hàng" hasIconSearch />
            <Select
              placeholder="Chọn kì"
              label="Chọn kì"
              options={selectionTypeInvoid}
            />
            <Input placeholder="Tên file" label="Tên file" hasIconSearch />
          </form>
        </div>
      </BoxShadow>
      <BoxShadow>
        <LabelTitle title="Danh sách hoá đơn mua" marginBottom={16} hasBtnAdd />
        <Table />
        <Pagination />
      </BoxShadow>
    </div>
  );
};
