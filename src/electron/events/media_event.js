const { MediaEvent } = require("../../constants/event");
const { mediaService } = require("../database/index");

const { ipcMain } = require("electron");

// listener store media
ipcMain.on(MediaEvent.STORE_MEDIA, async (event, { typeinvoice, companyid, datechoose, filter }) => {
  if(!companyid || companyid < 1) {
    event.reply(MediaEvent.RESULT_STORE_MEDIA, {
      result: 0,
      message: 'Vui lòng chọn công ty.'
    });
    return;
  }

  if(!datechoose) {
    event.reply(MediaEvent.RESULT_STORE_MEDIA, {
      result: 0,
      message: 'Vui lòng chọn ngày nhập hóa đơn.'
    });
    return;
  }

  let dateNow = new Date();
  var resultStore = await mediaService.storeFile({ typeinvoice, companyid, datechoose, dateNow });
  event.reply(MediaEvent.RESULT_STORE_MEDIA, {
    result: resultStore,
    content: {
      filter,
    }
  });
});

// open link url
ipcMain.on(MediaEvent.OPEN_FILE_MEDIA, async (event, { url }) => {
  mediaService.openFile({ url });
});

// open link url
ipcMain.on(MediaEvent.OPEN_FOLDER_MEDIA, async (event, { url }) => {
  mediaService.openFolderFile({ url });
});