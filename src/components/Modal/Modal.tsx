import React, { useRef } from "react";
import { useClickOutside } from "../../hooks";
import "./Modal.scss";

export const Modal: React.FC<IModal> = ({ children, isOpen, setOpen }) => {
  const ref = useRef<HTMLDivElement>(document.createElement("div"));

  useClickOutside(ref, () => {
    if (setOpen) {
      setOpen(false);
    }
  });
  return (
    <div className={isOpen ? "modal modal--open" : "modal"}>
      <div
        ref={ref}
        className={
          isOpen
            ? "modal__container modal__container--open"
            : "modal__container"
        }
      >
        {children}
      </div>
    </div>
  );
};
