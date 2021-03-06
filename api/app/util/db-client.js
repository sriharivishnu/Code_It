const mysql = require("mysql");
/**
 * mySQL wrapper to support Promises
 */
class Database {
  constructor(config) {
    this.config = config;
    this.connection = null;
  }
  /**
   * Connects to the database.
   */
  connect() {
    this.connection = mysql.createConnection({
      host: this.config.HOST,
      user: this.config.USER,
      password: this.config.PASSWORD,
      database: this.config.DB,
    });
    this.connection.on("error", (err) => {
      console.log("db error", err);
      if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("Attempting reconnection...");
        this.connect()
          .then(() => {
            console.log("Connected successfully");
          })
          .catch((err) => {
            console.err("Failed to reconnect");
            try {
              this.connection.close();
            } catch (e) {}
            throw err;
          });
      } else {
        throw err;
      }
    });
    return new Promise((resolve, reject) => {
      this.connection.connect((error) => {
        if (error) return reject(error);
        console.log("Successfully connected to MySQL database");
        resolve();
      });
    });
  }
  /**
   * Handles case where server is disconnected from database
   */
  handle_disconnect() {}
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
      if (!this.connection) resolve(true);
      this.connection.end((err) => {
        if (err) return reject(err);
        resolve(true);
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
module.exports = database;
// exports.getDb = getDb;
