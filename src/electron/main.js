/* eslint-disable prefer-arrow-callback */
const { BrowserWindow, app, ipcMain, Notification } = require("electron");
const path = require("path");
const fs = require("fs");
const pdf = require("pdf-parse");
const isDev = require("electron-is-dev");

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minHeight: 400,
    minWidth: 800,
    backgroundColor: "black",
    webPreferences: {
      nodeIntegration: false,
      worldSafeExecuteJavaScript: true,
      contextIsolation: true,

      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "../../public/index.html"));
  if (isDev) {
    mainWindow.webContents.openDevTools();
  }
};

ipcMain.on("notify", (_, message) => {
  console.log("bundle");
  new Notification({ title: "Test Notifiation", body: message }).show();
});

app
  .whenReady()
  .then(() => {
    createWindow();
  })
  .then(() => {
    const dataBuffer = fs.readFileSync(path.join(__dirname, "sample.pdf"));
    pdf(dataBuffer).then(function (data) {
      // number of pages
      console.log(data.numpages);
      // number of rendered pages
      console.log(data.numrender);
      // PDF info
      console.log(data.info);
      // PDF metadata
      console.log(data.metadata);
      // PDF.js version
      // check https://mozilla.github.io/pdf.js/getting_started/
      console.log(data.version);
      // PDF text
      console.log(data.text);
    });
  });
