const sqlite3 = require("sqlite3");
const isDev = require("electron-is-dev");

class UtilsDB {
  constructor() {
    this.db = new sqlite3.Database(
      isDev
        ? __dirname + "/app.db"
        : process.env.LOCALAPPDATA + "/production.db",
      (err) => {
        if (err) {
          console.log("Could not connect to database:", err);
        } else {
          console.log("Connected to the in-memory SQlite database.");
        }
      }
    );
  }

  run(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve({ id: this.lastID });
        }
      });
    });
  }

  get(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

  all(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }

  checkExistsColumn(params = []) {
    return new Promise((resolve, reject) => {
      let sql = `SELECT COUNT(*) AS numcol 
        FROM pragma_table_info($table) 
        WHERE name=$column`;

      this.db.get(sql, params, (err, result) => {
        if (err) {
          console.log("Error running sql: " + sql);
          console.log(err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = {
  UtilsDB,
};
