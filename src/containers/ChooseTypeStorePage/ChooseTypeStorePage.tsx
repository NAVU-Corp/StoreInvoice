import React, { Fragment, useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { Alert, BoxShadow, Button, Select } from "../../components";
import { ImageTimeStore } from "../../constants/images";
import {
  optionGroupMonth,
  optionMonths,
  optionTypeStore,
  optionYears,
} from "../../constants/selections";
import { doSaveStepFilter } from "../../store/actions";
import { CompanyContext } from "../../store/reducers";
import "./ChooseTypeStorePage.scss";

export const ChooseTypeStorePage = () => {
  const history = useHistory();

  const { dispatch, state: { filterData }, } = useContext(CompanyContext);
  const [valueType, setValueType] = useState(filterData?.valueType || 1);
  const [valueYear, setValueYear] = useState(filterData?.year || (new Date()).getFullYear());
  const [valueMonth, setValueMonth] = useState(filterData?.month || ((new Date()).getMonth() + 1));
  const [valueRankMonth, setValueRankMonth] = useState(filterData?.groupMonth || 10);

  const handleGoToInvoid = () => {
    history.push({
      pathname: "/invoice-type",
      state: {
        month: valueType === 1 ? valueMonth : undefined,
        groupmonth: valueType === 2 ? valueRankMonth : undefined,
        year: valueYear,
      },
    });
  };

  return (
    <div className="choose-type">
      <BoxShadow className="choose-type__container">
        <h3>Chọn kỳ lưu trữ</h3>
        <Select
          placeholder="Chọn kỳ"
          label="Chọn kì"
          className="choose-type__input"
          options={optionTypeStore}
          value={valueType}
          onSelect={(item) => {
            setValueType(item.id);
            if(item.id === 1) {
              setValueMonth((new Date()).getMonth() + 1);
            } else {
              setValueRankMonth(10);
            }
            dispatch(doSaveStepFilter({
              ...filterData,
              valueType: item.id,
            }));
          }}
        />
        {valueType === 1 ? (
          <>
            <Select
              placeholder="Chọn tháng"
              label="Chọn tháng"
              className="choose-type__input"
              options={optionMonths}
              value={valueMonth}
              onSelect={(item) => {
                setValueMonth(item.id);
                dispatch(doSaveStepFilter({
                  ...filterData,
                  month: item.id,
                }));
              }}
            />
          </>
        ) : (
          <>
            <Select
              placeholder="Chọn quý"
              label="Chọn quý"
              className="choose-type__input"
              options={optionGroupMonth}
              value={valueRankMonth}
              onSelect={(item) => {
                setValueRankMonth(item.id);
                dispatch(doSaveStepFilter({
                  ...filterData,
                  groupMonth: item.id,
                }));
              }}
            />
          </>
        )}
        <Select
          placeholder="Chọn năm"
          label="Chọn năm"
          className="choose-type__input"
          options={optionYears}
          value={valueYear}
          onSelect={(item) => {
            setValueYear(item.id);
            dispatch(doSaveStepFilter({
              ...filterData,
              year: item.id,
            }));
          }}
        />
        <Button isPrimary onClick={handleGoToInvoid} className="choose-type__btn">
          Tiếp tục
        </Button>
      </BoxShadow>
      <img alt="" src={ImageTimeStore} className="choose-type__img" />
    </div>
  );
};
