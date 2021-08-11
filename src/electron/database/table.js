const db = require("./index");

db.run(
  `CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL UNIQUE
)`,
  function (err) {
    if (err) {
      return console.log("err create table", err);
    }

    console.log("create users table successfully!!!");
  }
);
