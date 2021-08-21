import React from "react";
import {
  Input,
  LabelTitle,
  BoxShadow,
  Select,
  Button,
  Nav,
} from "../../components";
import { Pagination, Table } from "./components";

import "./HomePage.scss";

export const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <Nav />
      <BoxShadow marginBottom={42}>
        <LabelTitle title="Tìm kiếm" hasBottomLine />
        <form className="home-page__from">
          <Select placeholder="Loại hoá đơn" />
          <Input placeholder={"Kí hiệu hóa đơn"} />
          <Select placeholder="Loại hoá đơn" />
          <Input placeholder={"Kí hiệu hóa đơn"} />
          <Select placeholder="Loại hoá đơn" />
          <Input placeholder={"Kí hiệu hóa đơn"} />
          <Select placeholder="Loại hoá đơn" />
          <Input placeholder={"Kí hiệu hóa đơn"} />
        </form>
      </BoxShadow>
      <BoxShadow>
        <LabelTitle title="Danh sách hoá đơn mua" marginBottom={16} hasBtnAdd />
        <Table />
        <Pagination />
      </BoxShadow>
    </div>
  );
};
