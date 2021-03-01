const mysql = require("mysql");
/**
 * mySQL wrapper to support Promises
 */
class Database {
  constructor(config) {
    this.connection = mysql.createConnection({
      host: config.HOST,
      user: config.USER,
      password: config.PASSWORD,
      database: config.DB,
    });
  }
  /**
   * Connects to the database.
   */
  connect() {
    return new Promise((resolve, reject) => {
      this.connection.connect((error) => {
        if (error) reject(error);
        console.log("Successfully connected to database");
        resolve();
      });
    });
  }
  /**
   * Queries the database with a given SQL query
   * @param {*} sql SQL Query to execute
   * @param {*} args
   */
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
  /**
   * Closes the connection to the database
   */
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end((err) => {
        if (err) return reject(err);
        resolve();
      });
    });
  }
}
const database = new Database({
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
});
database.connect();
const getDb = () => {
  return database;
};
module.exports = database;
// exports.getDb = getDb;
