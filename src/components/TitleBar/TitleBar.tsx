import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { SvgMinimize, SvgZoom, SvgClose, SvgZoomOut } from "../../assets/svg";
import { WinEvent } from "../../constants/event";
import { Avatar } from "../Avatar/Avatar";
import { Logo } from "../Logo/Logo";
import "./TitleBar.scss";

export const TitleBar: React.FC<ITitleBar> = ({ title }) => {
  const history = useHistory();
  const [isMaximized, setIsMaximized] = useState(true);

  useEffect(() => {
    apiElectron.on(WinEvent.IS_MAXIMIZED, (_: any, ms: any) => {
      setIsMaximized(ms.isMaximized);
    });
  }, []);

  return (
    <div className="title-bar">
      <div className="title-bar__logo">
        <Logo />
        <Link to={`/test-api`}>Test API</Link>
        <div
          className="title-bar__avatar"
          onClick={() => history.push("/login")}
        >
          <Avatar marginRight={4} marginLeft={16} />
          <span>User name</span>
        </div>
      </div>
      <span className="title-bar__title">{title}</span>
      <div className="title-bar__action">
        <div
          className="title-bar__close title-bar__close--nomal"
          onClick={() => apiElectron.sendMessages(WinEvent.WIN_MINIMIZE)}
        >
          <SvgMinimize />
        </div>
        <div
          className="title-bar__close title-bar__close--nomal"
          onClick={() => apiElectron.sendMessages(WinEvent.WIN_ZOOM)}
        >
          {isMaximized ? <SvgZoom /> : <SvgZoomOut />}
        </div>
        <div
          className="title-bar__close"
          onClick={() => apiElectron.sendMessages(WinEvent.WIN_CLOSE)}
        >
          <SvgClose />
        </div>
      </div>
    </div>
  );
};
