import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BoxShadow, Button, Select } from "../../components";
import { ImageTimeStore } from "../../constants/images";
import {
  optionGroupMonth,
  optionMonths,
  optionTypeStore,
  optionYears,
} from "../../constants/selections";
import "./ChooseTypePage.scss";

export const ChooseTypePage = () => {
  const history = useHistory();

  const [valueType, setValueType] = useState<IOption>({ id: 0, title: "" });
  const [valueYear, setValueYear] = useState<IOption>({ id: 0, title: "" });
  const [valueRankMonth, setValueRankMonth] = useState<IOption>({
    id: 0,
    title: "",
  });

  const handleGoToInvoid = () => {
    history.push({
      pathname: "/",
      state: {
        month: valueRankMonth.id,
        groupmonth: valueType.id,
        year: valueYear.id,
      },
    });
  };

  return (
    <div className="choose-type">
      <BoxShadow className="choose-type__container">
        <form>
          <h3>CHỌN KỲ LƯU TRỮ</h3>
          <Select
            placeholder="Chọn kì"
            label="Chọn kì"
            className="choose-type__input"
            options={optionTypeStore}
            value={valueType}
            onSelect={(item) => setValueType(item)}
          />
          <Select
            placeholder="Chọn tháng/quý"
            label="Chọn tháng/quý"
            className="choose-type__input"
            options={valueType.id === 1 ? optionMonths : optionGroupMonth}
            value={valueRankMonth}
            onSelect={(item) => setValueRankMonth(item)}
          />
          <Select
            placeholder="Chọn năm"
            label="Chọn năm"
            className="choose-type__input"
            options={optionYears}
            value={valueYear}
            onSelect={(item) => setValueYear(item)}
          />
          <div className="choose-type__actions">
            <Button isBig isRed onClick={() => history.push("/invoice-type")}>
              Bỏ qua
            </Button>
            <Button isBig onClick={handleGoToInvoid}>
              Mở
            </Button>
          </div>
        </form>
      </BoxShadow>
      <img alt="" src={ImageTimeStore} className="choose-type__img" />
    </div>
  );
};
