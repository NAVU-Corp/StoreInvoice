import React, { useEffect, useRef, useState } from "react";
import { BoxShadow } from "../../components";
import { ConfigEvent } from "../../constants/event";
import { InputSetting, KeySetting, LableSetting } from "./components";
import "./SettingPage.scss";

export const SettingPage = () => {
  const configSellerRef = useRef<any>(null);
  const configBuyerRef = useRef<any>(null);

  const [listKeysSeller, setListKeysSeller] = useState<Array<IResConfig>>([]);
  const [listKeysBuyer, setListKeysBuyer] = useState<Array<IResConfig>>([]);
  const [valueKeySeller, setValueKeySeller] = useState("");
  const [valueKeyBuyer, setValueKeyBuyer] = useState("");

  //handleGetAllConfig
  const handleGetAllConfig = () => {
    apiElectron.sendMessages(ConfigEvent.GET_ALL_CONFIGS);
  };

  //handleResultGetAllConfig
  const handleResultGetAllConfig = (_: any, data: IResGetAllConfigs) => {
    if (data.result && data.content.configs) {
      const listSeller = data.content.configs.filter(
        (item) => item.type === 10
      );
      const listBuyer = data.content.configs.filter((item) => item.type === 20);
      setListKeysSeller(listSeller);
      setListKeysBuyer(listBuyer);
    }
  };

  //handleResultInsertOneConfgi
  const handleResultInsertOneConfgi = (_: any, data: { result: number }) => {
    if (data.result) {
      handleGetAllConfig();
    }
  };

  //handleResultDeleteOneConfig
  const handleResultDeleteOneConfig = (_: any, data: { result: number }) => {
    if (data.result) {
      handleGetAllConfig();
    }
  };

  useEffect(() => {
    handleGetAllConfig();

    //RESULT_GET_ALL_CONFIGS
    apiElectron.on(
      ConfigEvent.RESULT_GET_ALL_CONFIGS,
      handleResultGetAllConfig
    );

    //RESULT_INSERT_ONE_CONFIG
    apiElectron.on(
      ConfigEvent.RESULT_INSERT_ONE_CONFIG,
      handleResultInsertOneConfgi
    );
    //RESULT_DELETE_ONE_CONFIG
    apiElectron.on(
      ConfigEvent.RESULT_DELETE_ONE_CONFIG,
      handleResultDeleteOneConfig
    );

    return () => {
      apiElectron.removeListener(
        ConfigEvent.RESULT_GET_ALL_CONFIGS,
        handleResultGetAllConfig
      );
      //RESULT_INSERT_ONE_CONFIG
      apiElectron.removeListener(
        ConfigEvent.RESULT_INSERT_ONE_CONFIG,
        handleResultInsertOneConfgi
      );
      //RESULT_DELETE_ONE_CONFIG
      apiElectron.removeListener(
        ConfigEvent.RESULT_DELETE_ONE_CONFIG,
        handleResultDeleteOneConfig
      );
    };
  }, []);

  //handleKeySeller
  const handleKeySeller = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement;
    setValueKeySeller(target.value);

    if (e.key === "Enter") {
      apiElectron.sendMessages(ConfigEvent.INSERT_ONE_CONFIG, {
        title: target.value,
        type: 10,
      });
      setValueKeySeller("");
      target.value = "";
    }
  };

  //handleAddListSeller
  const handleAddListSeller = () => {
    apiElectron.sendMessages(ConfigEvent.INSERT_ONE_CONFIG, {
      title: valueKeySeller,
      type: 10,
    });
    setValueKeySeller("");
    (document.getElementById('configSellerRef') as any).value = '';
  };

  //handleKeyBuyer
  const handleKeyBuyer = (e: React.KeyboardEvent<HTMLInputElement>) => {
    let target = e.target as HTMLInputElement;
    setValueKeyBuyer(target.value);

    if (e.key === "Enter") {
      apiElectron.sendMessages(ConfigEvent.INSERT_ONE_CONFIG, {
        title: target.value,
        type: 20,
      });
      setValueKeyBuyer("");
      target.value = "";
    }
  };

  //handleAddListBuyer
  const handleAddListBuyer = () => {
    apiElectron.sendMessages(ConfigEvent.INSERT_ONE_CONFIG, {
      title: valueKeyBuyer,
      type: 20,
    });
    setValueKeyBuyer("");
    (document.getElementById('configBuyerRef') as any).value = '';
  };

  return (
    <div className="setting-page">
      <BoxShadow className="setting-page__container">
        <h3>Nh?? cung c???p</h3>
        <InputSetting
          placeholder="G?? t??? kho??..."
          id={`configSellerRef`}
          onKeyDown={handleKeySeller}
          onChange={handleKeySeller as any}
          onAdd={handleAddListSeller}
        />
        <LableSetting />
        {listKeysSeller.map((item, i) => {
          return (
            <KeySetting
              key={i}
              title={item.title}
              onDelete={() =>
                apiElectron.sendMessages(ConfigEvent.DELETE_ONE_CONFIG, {
                  id: item.id,
                })
              }
            />
          );
        })}
      </BoxShadow>
      <BoxShadow className="setting-page__container">
        <h3>Kh??ch h??ng</h3>
        <InputSetting
          placeholder="G?? t??? kho??..."
          id={`configBuyerRef`}
          onKeyDown={handleKeyBuyer}
          onChange={handleKeyBuyer as any}
          onAdd={handleAddListBuyer}
        />
        <LableSetting />
        {listKeysBuyer.map((item, i) => {
          return (
            <KeySetting
              key={i}
              title={item.title}
              onDelete={() =>
                apiElectron.sendMessages(ConfigEvent.DELETE_ONE_CONFIG, {
                  id: item.id,
                })
              }
            />
          );
        })}
      </BoxShadow>
    </div>
  );
};
