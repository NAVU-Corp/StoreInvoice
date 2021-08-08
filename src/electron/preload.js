const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("apiElectron", {
  sendMessages(event, message) {
    ipcRenderer.send(event, message);
  },

  on(event, callback) {
    ipcRenderer.on(event, (event, data) => {
      callback(event, data);
    });
  },
});
