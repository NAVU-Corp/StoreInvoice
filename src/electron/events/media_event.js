const { MediaEvent } = require("../../constants/event");
const { mediaService } = require("../database/index");

const { ipcMain } = require("electron");

// listener store media
ipcMain.on(MediaEvent.STORE_MEDIA, (event, { typeinvoice }) => {
  let dateNow = new Date();
  mediaService.storeFile({ typeinvoice, dateNow })
    // .then((data) => event.reply(MediaEvent.RESULT_STORE_MEDIA, {
    //   result: 1,
    // }))
    // .catch((err) => event.reply(MediaEvent.RESULT_STORE_MEDIA, err));
});