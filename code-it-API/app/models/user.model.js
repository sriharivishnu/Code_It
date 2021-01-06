const sql = require("./db");
const USERS_TABLE = "users";
const SELECT_USER = "SELECT BIN_TO_UUID(uid) AS uid, username, email, password_hash";
function User(user) {
  this.uid = user.uid;
  this.username = user.username;
  this.email = user.email;
  this.hashed_password = user.hashed_password;
}

User.create = (newUser, result) => {
  with (newUser) {
    const QUERY = `INSERT INTO ${USERS_TABLE} (uid, username, email, password_hash) VALUES (UUID_TO_BIN('${uid}'), '${username}', '${email}', '${hashed_password}')`;
    sql.query(QUERY, (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(err, null);
        return;
      }
      console.log("Created user: ", res);
      result(null, res);
    });
  }
};

User.findByUsername = (username) => {
  const QUERY = `${SELECT_USER} FROM ${USERS_TABLE} WHERE username = '${username}'`;
  return sql.query(QUERY);
};

User.findByEmail = (email) => {
  const QUERY = `${SELECT_USER} FROM ${USERS_TABLE} WHERE email = '${email}'`;
  return sql.query(QUERY);
};

User.findByUID = (userID) => {
  const QUERY = `${SELECT_USER} FROM ${USERS_TABLE} WHERE uid = UUID_TO_BIN('${userID}')`;
  return sql.query(QUERY);
};

User.updateByUID = (id, user, result) => {
  sql.query(
    `UPDATE ${USERS_TABLE} SET email = ?, username = ? WHERE uid = ?`,
    [user.email, user.username, id],
    (err, res) => {
      if (err) {
        console.log("Error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("Updated user: ", user);
      result(null, user);
    }
  );
};

User.removeByUID = (uid, result) => {
  sql.query(`DELETE FROM ${USERS_TABLE} WHERE uid = ?`, uid, (err, res) => {
    if (err) {
      console.log("Error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log(`Deleted user with uid: ${uid}`);
    result(null, res);
  });
};

module.exports = User;
