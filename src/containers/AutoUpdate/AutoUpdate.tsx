import React, { useEffect, useState } from "react";
import { BoxShadow, Button, Modal } from "../../components";
import { AutoUpdateEvent } from "../../constants/event";
import "./AutoUpdate.scss";

export const AutoUpdate = () => {
  const [isOpen, setIsOpen] = useState(false);

  //handleUpdateDownloaded
  const handleUpdateDownloaded = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    //UPDATE_DOWNLOADED
    apiElectron.on(AutoUpdateEvent.UPDATE_DOWNLOADED, handleUpdateDownloaded);
    return () => {
      apiElectron.removeListener(
        AutoUpdateEvent.UPDATE_DOWNLOADED,
        handleUpdateDownloaded
      );
    };
  }, []);

  return (
    <Modal isOpen={isOpen}>
      <BoxShadow className="auto-update">
        <p>
          Đã tải thành công bản cập nhập mới. Bạn có muốn cập nhận ngay không?
        </p>
        <div className="auto-update__actions">
          <Button 
            isSecondary 
            style={{ marginRight: '30px' }}
            onClick={() => setIsOpen(false)}>
            Hủy
          </Button>
          <Button
            isPrimary
            onClick={() =>
              apiElectron.sendMessages(AutoUpdateEvent.REQUIRE_UPDATE)
            }
          >
            Cập nhật
          </Button>
        </div>
      </BoxShadow>
    </Modal>
  );
};
