const { MediaEvent } = require("../../constants/event");
const { mediaService } = require("../database/index");

const { ipcMain } = require("electron");

// listener store media
ipcMain.on(MediaEvent.STORE_MEDIA, async (event, { typeinvoice, companyid }) => {
  if(!companyid || companyid < 1) {
    event.reply(MediaEvent.RESULT_STORE_MEDIA, {
      result: 0,
      message: 'Vui lòng chọn công ty.'
    });
    return;
  }

  let dateNow = new Date();
  var resultStore = await mediaService.storeFile({ typeinvoice, companyid, dateNow });
  event.reply(MediaEvent.RESULT_STORE_MEDIA, {
    result: resultStore,
  });
});