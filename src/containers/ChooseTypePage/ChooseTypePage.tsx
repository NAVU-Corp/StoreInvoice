import React from "react";
import { BoxShadow, Button, Select } from "../../components";
import { ImageTimeStore } from "../../constants/images";
import { selectionTypeInvoid } from "../../constants/selections";
import "./ChooseTypePage.scss";

export const ChooseTypePage = () => {
  return (
    <div className="choose-type">
      <BoxShadow className="choose-type__container">
        <form>
          <h3>CHỌN KỲ LƯU TRỮ</h3>
          <Select
            placeholder="Chọn kì"
            label="Chọn kì"
            className="choose-type__input"
            options={selectionTypeInvoid}
          />
          <Select
            placeholder="Chọn tháng/quý"
            label="Chọn tháng/quý"
            className="choose-type__input"
            options={selectionTypeInvoid}
          />
          <Select
            placeholder="Chọn năm"
            label="Chọn năm"
            className="choose-type__input"
            options={selectionTypeInvoid}
          />
          <div className="choose-type__actions">
            <Button isBig isRed>
              Đóng
            </Button>
            <Button isBig>Mở</Button>
          </div>
        </form>
      </BoxShadow>
      <img alt="" src={ImageTimeStore} className="choose-type__img" />
    </div>
  );
};
