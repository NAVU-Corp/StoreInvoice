const db = require("./index");

//selectAllUsers
const selectAllUsers = () => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
      if (err) {
        reject(err);
        return console.log("err", err);
      }
      resolve(rows);
    });
  });
};

module.exports = {
  selectAllUsers,
};
