import React, { useEffect, useState } from "react";
import { BoxShadow } from "../../components";
import { ConfigEvent } from "../../constants/event";
import { InputSetting, KeySetting, LableSetting } from "./components";
import "./SettingPage.scss";

export const SettingPage = () => {
  const [listKeysSeller, setListKeysSeller] = useState([]);
  const [listKeysBuyer, setListKeysBuyer] = useState([]);
  const [valueKeySeller, setValueKeySeller] = useState("");
  const [valueKeyBuyer, setValueKeyBuyer] = useState("");

  useEffect(() => {
    apiElectron.sendMessages(ConfigEvent.GET_ALL_CONFIGS);
    apiElectron.on(ConfigEvent.RESULT_GET_ALL_CONFIGS, (_: any, data: any) => {
      console.log("data", data);
    });
  }, []);

  //handleKeySeller
  const handleKeySeller = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValueKeySeller(target.value);

    if (e.key === "Enter") {
      console.log(target.value);
    }
  };

  //handleAddListSeller
  const handleAddListSeller = () => {};

  //handleKeyBuyer
  const handleKeyBuyer = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setValueKeyBuyer(target.value);

    if (e.key === "Enter") {
      console.log(target.value);
    }
  };

  //handleAddListBuyer
  const handleAddListBuyer = () => {};

  return (
    <div className="setting-page">
      <BoxShadow className="setting-page__container">
        <h3>NHÀ CUNG CẤP</h3>
        <InputSetting
          placeholder="Gõ từ khoá..."
          onKeyDown={handleKeySeller}
          onAdd={handleAddListSeller}
        />
        <LableSetting />
        {listKeysSeller.map((item, i) => {
          return <KeySetting key={i} />;
        })}
      </BoxShadow>
      <BoxShadow className="setting-page__container">
        <h3>KHÁCH HÀNG</h3>
        <InputSetting
          placeholder="Gõ từ khoá..."
          onKeyDown={handleKeyBuyer}
          onAdd={handleAddListBuyer}
        />
        <LableSetting />
        {listKeysBuyer.map((item, i) => {
          return <KeySetting key={i} />;
        })}
      </BoxShadow>
    </div>
  );
};
