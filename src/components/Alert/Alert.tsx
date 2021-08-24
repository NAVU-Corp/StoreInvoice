import React, { Fragment, useRef, useState } from "react";
import { useClickOutside } from "../../hooks";
import { BoxShadow } from "../BoxShadow/BoxShadow";
import "./Alert.scss";

export const Alert: React.FC<IAlert> = ({ isOpen, setOpen, messages }) => {
  const alertRef = useRef<HTMLDivElement>(document.createElement("div"));

  useClickOutside(alertRef, () => {
    if (setOpen) {
      setOpen(false);
    }
  });

  return (
    <Fragment>
      {isOpen && (
        <div className="alert">
          <BoxShadow ref={alertRef}>{messages}</BoxShadow>
        </div>
      )}
    </Fragment>
  );
};
