/* eslint-disable prefer-arrow-callback */
require("./database");
require("./events/company_event");
require("./events/invoice_event");
require("./events/media_event");

const { BrowserWindow, app, ipcMain, Notification } = require("electron");
const path = require("path");
const fs = require("fs");
const pdf = require("pdf-parse");
const isDev = require("electron-is-dev");

let mainWindow;

//createWindow
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

/// run app
app
  .whenReady()
  .then(() => {
    createWindow();
  })
  .then(() => {
    // const dataBuffer = fs.readFileSync(path.join(__dirname, "sample.pdf"));
    // pdf(dataBuffer).then(function (data) {
    //   console.log("TEXT", data.text);
    // });
  });