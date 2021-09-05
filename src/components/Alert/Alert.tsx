import React from "react";
import { BoxShadow } from "../BoxShadow/BoxShadow";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import "./Alert.scss";

export const Alert: React.FC<IAlert> = ({ 
  isOpen, 
  setOpen, 
  messages,
  actionMore,
}) => {
  return (
    <Modal isOpen={isOpen} setOpen={setOpen}>
      <BoxShadow className="alert">
        <p>{messages}</p>
        <Button
          isPrimary
          onClick={() => {
            if (setOpen) {
              setOpen(false);
              actionMore();
            }
          }}
        >
          Đồng ý
        </Button>
      </BoxShadow>
    </Modal>
  );
};
