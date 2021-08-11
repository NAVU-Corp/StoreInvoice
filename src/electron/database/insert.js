const db = require("./index");

//insertUser
const insertUser = ({ firstName, lastName, email, phone }) => {
  db.run(
    `INSERT INTO users (first_name, last_name, email, phone)
  VALUES (?, ?, ?, ?)`,
    [firstName, lastName, email, phone],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      // get the last insert id
      console.log(`A row has been inserted with rowid ${this.lastID}`);
    }
  );
};

module.exports = {
  insertUser,
};
