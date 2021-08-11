const sqlite3 = require("sqlite3").verbose();
const isDev = require("electron-is-dev");
// const { Notification } = require("electron");
let db = new sqlite3.Database(
  isDev ? __dirname + "/app.db" : process.resourcesPath + "/app.db",
  (err) => {
    if (err) {
      // new Notification({ title: "ERRR", body: err.message }).show();
      return console.error(err.message);
    }
    // new Notification({
    //   title: "Successfull",
    //   body: "Connected to the in-memory SQlite database",
    // }).show();
    console.log("Connected to the in-memory SQlite database.");
  }
);

module.exports = db;
