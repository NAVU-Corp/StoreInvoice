import React, { FC, Fragment, useState } from "react";

import {
  BoxShadow,
  Button,
  Input,
  Loader,
  Modal,
} from "../../../../components";
import { formatDate } from "../../../../helpers";
import "./ModalDate.scss";

export const ModalDate: FC<IModalDate> = ({
  onChoosePDF,
  onClose,
  loading,
  ...props
}) => {
  const [date, setDate] = useState(formatDate(new Date()));

  return (
    <Modal {...props}>
      <BoxShadow className="modal-date">
        {loading ? (
          <Loader />
        ) : (
          <Fragment>
            <h3>Ngày lưu hóa đơn</h3>
            <Input
              type="date"
              className="modal-date__input"
              marginBottom={16}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <div className="modal-date__actions">
              <Button
                isSecondary
                onClick={onClose}
                className="modal-date__btn-cancel"
              >
                Hủy
              </Button>
              <Button
                isPrimary
                className="modal-date__btn-accept"
                onClick={() => {
                  if (onChoosePDF) {
                    return onChoosePDF(date);
                  }
                }}
              >
                Chọn PDF
              </Button>
            </div>
          </Fragment>
        )}
      </BoxShadow>
    </Modal>
  );
};
