const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electronApi", {
  notificationApi: {
    sendNotification(message) {
      ipcRenderer.send("notify", message);
    },
  },
  batteryApi: {},
  filesApi: {},
});
