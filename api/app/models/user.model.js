const sql = require("../util/db-client");
const USERS_TABLE = "users";
const SELECT_USER_SECURE = "SELECT BIN_TO_UUID(uid) AS uid, username, email, password_hash";
const SELECT_USER_PUBLIC = "SELECT BIN_TO_UUID(uid) AS uid, username";

/**
 *  User Model : uid, username, email, hashed_password
 */
function User(user) {
  this.uid = user.uid;
  this.username = user.username;
  this.email = user.email;
  this.hashed_password = user.hashed_password;
}

/**
 * The new user to create
 * Should have keys: uid, username, email, and the hashed password
 * @param {*} newUser
 * @returns {Promise} results of the SQL query as a list
 */
User.create = (newUser) => {
  const QUERY = `INSERT INTO ${USERS_TABLE} (uid, username, email, password_hash) VALUES (UUID_TO_BIN(?), ?, ?, ?)`;
  return sql.query(QUERY, [newUser.uid, newUser.username, newUser.email, newUser.hashed_password]);
};

/**
 * Finds a user by their username in the database
 * @param {String} username
 * @param {Boolean} secure  True to return protected data like email and password; otherwise false.
 * @returns {Promise} results of the SQL query as a list
 */
User.findByUsername = (username, secure = false) => {
  const QUERY = `${
    secure ? SELECT_USER_SECURE : SELECT_USER_PUBLIC
  } FROM ${USERS_TABLE} WHERE username = ?`;
  return sql.query(QUERY, username);
};

/**
 * Finds a user by their email in the database.
 * @param {*} email
 * @param {*} secure True to return protected data like email and password; otherwise false.
 * @returns {Promise} The list of results of the SQL query as a Promise
 */
User.findByEmail = (email, secure = false) => {
  const QUERY = `${
    secure ? SELECT_USER_SECURE : SELECT_USER_PUBLIC
  } FROM ${USERS_TABLE} WHERE email = ?`;
  return sql.query(QUERY, email);
};

/**
 * Finds a user by the UID
 * @param {String} userID
 * @param {Boolean} secure  True to return protected data like email and password; otherwise false.
 * @returns {Promise}       The list of results of the SQL query as a Promise
 */
User.findByUID = (userID, secure = false) => {
  const QUERY = `${
    secure ? SELECT_USER_SECURE : SELECT_USER_PUBLIC
  } FROM ${USERS_TABLE} WHERE uid = UUID_TO_BIN(?)`;
  return sql.query(QUERY, userID);
};

/**
 * Updates a user's details: Should only be used by the user themselves,
 * or an authenticated admin.
 * @param {*} uid    The UID of the user
 * @param {*} user   The new user deetails
 * @param {*} result The callback function with result (error, data) => {}
 */
User.updateByUID = (uid, user, result) => {
  sql.query(
    `UPDATE ${USERS_TABLE} SET email = ?, username = ? WHERE uid = UUID_TO_BIN(?)`,
    [user.email, user.username, uid],
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

/**
 * Removes a user by their UID. Should only be called by an authenticated admin,
 * or a by the user themselves. This action cannot be undone.
 * @param {String} uid       User UID
 * @param {*} result The callback function with result (error, data) => {}
 */
User.removeByUID = (uid, result) => {
  sql.query(`DELETE FROM ${USERS_TABLE} WHERE uid = UUID_TO_BIN(?)`, uid, (err, res) => {
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

/**
 * Finds a user after checking which paramaters were given (UID, email, username).
 * This method is safe to use as a response to any authenticated user, as it only
 * returns a UID and username, and other non-essential data.
 *
 * Note that this is an asynchronous method.
 * @param {*} query
 * @param {*} onError
 * @returns A list of the results (not a promise)
 */
User.findUserPublic = async (query, onError) => {
  let user_res;
  //UID
  if (query.uid) {
    user_res = await User.findByUID(query.uid, false).catch(onError);
  }
  //Email
  else if (query.email) {
    user_res = await User.findByEmail(query.email, false).catch(onError);
  }
  //Username
  else if (query.username) {
    user_res = await User.findByUsername(query.username, false).catch(onError);
  }
  //Unknown parameter method
  if (!user_res) return null;
  return user_res;
};

module.exports = User;
