import React from "react";
import { Input, LabelTitle, BoxShadow, Select, Button } from "../../components";
import { Table } from "./components";

import "./Home.scss";

export const Home: React.FC = () => {
  return (
    <div className="home">
      <BoxShadow marginBottom={42}>
        <LabelTitle title="Tìm kiếm" hasBottomLine />
        <div className="home__from">
          <div>
            <Select placeholder="Loại hoá đơn" />
            <Input placeholder={"Kí hiệu hóa đơn"} />
          </div>
          <div>
            <Select placeholder="Loại hoá đơn" />
            <Input placeholder={"Kí hiệu hóa đơn"} />
          </div>
          <div>
            <Select placeholder="Loại hoá đơn" />
            <Input placeholder={"Kí hiệu hóa đơn"} />
          </div>
          <div>
            <Select placeholder="Loại hoá đơn" />
            <Input placeholder={"Kí hiệu hóa đơn"} />
          </div>
        </div>
      </BoxShadow>
      <BoxShadow>
        <LabelTitle title="Danh sách hoá đơn mua" />
        <Button>Xem</Button>
        <Table />
      </BoxShadow>
    </div>
  );
};
