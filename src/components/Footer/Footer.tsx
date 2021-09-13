import React, { useEffect, useState } from "react";
import { AutoUpdateEvent } from "../../constants/event";
import "./Footer.scss";

export const Footer = () => {
  // const [version, setVersion] = useState(0);

  // //handleResultGetVersion
  // const handleResultGetVersion = (_: any, data: { version: any }) => {
  //   setVersion(data.version);
  // };

  // useEffect(() => {
  //   //GET_VERSION
  //   apiElectron.sendMessages(AutoUpdateEvent.GET_VERSION);

  //   //RESULT_GET_VERSION
  //   apiElectron.on(AutoUpdateEvent.RESULT_GET_VERSION, handleResultGetVersion);

  //   return () => {
  //     apiElectron.on(
  //       AutoUpdateEvent.RESULT_GET_VERSION,
  //       handleResultGetVersion
  //     );
  //   };
  // }, []);
  return (
    <div className="footer">
      <p>Bản quyền thuộc <span style={{ fontWeight: 'bold' }}>Vinasc.group</span></p>
      <p>Đơn vị sản xuất: <span style={{ fontWeight: 'bold' }}>AI Doomo</span></p>
      {/* <p>{`Phiên bản: ${version}`}</p> */}
    </div>
  );
};
