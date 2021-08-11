const { UserEvent } = require("../../constants/event");
const { insertUser } = require("../database/insert");
const { selectAllUsers } = require("../database/select");

const { ipcMain } = require("electron");

// listern insert one user
ipcMain.on(UserEvent.INSERT_ONE_USER, (_, message) => {
  insertUser(message);
});

// listner get all user
ipcMain.on(UserEvent.GET_ALL_USERS, (event, _) => {
  selectAllUsers()
    .then((data) => event.reply(UserEvent.RESULT_GET_ALL_USER, data))
    .catch((err) => event.reply(UserEvent.RESULT_GET_ALL_USER, err));
});
