const mysql = require("mysql");
const dbConfig = require("../config/db.config");

class Database {
  constructor(config) {
    this.connection = mysql.createConnection({
      host: config.HOST,
      user: config.USER,
      password: config.PASSWORD,
      database: config.DB,
    });
  }
  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((error) => {
        if (error) reject(error);
        console.log("Successfully connected to database");
        resolve();
      });
    });
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}
const database = new Database(dbConfig);
database.connect();
module.exports = database;
