const { v1: uuidv1 } = require("uuid");
const User = require("../models/user.model");
const { registerValidation, loginValidation } = require("../util/validation");
const bcrypt = require("bcryptjs");

/**
 * Create a user in the database
 * POST Request : EXAMPLE:
 * {
 *  email: test@gmail.com,
 *  username:tester,
 *  password: 123456
 * }
 * Responses: 200, 400, 401, 409, 500
 * @param {*} req
 * @param {*} res
 */
exports.register = async (req, res) => {
  //Validate the request for the given schema
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });
  //Compute hashed password
  let hashed, salt;
  try {
    salt = await bcrypt.genSalt(12);
    hashed = await bcrypt.hash(req.body.password, salt);
  } catch (e) {
    return res.status(500).send({ message: "Internal Server Error during registration", error: e });
  }
  req.body.password = hashed;

  //Create the user with a new UID
  const uid = uuidv1();
  const newUser = new User({
    uid: uid,
    email: req.body.email,
    username: req.body.username,
    hashed_password: hashed,
  });
  //Try creating the user
  let userRes;
  try {
    userRes = await User.create(newUser);
  } catch (err) {
    return res.status(409).send({
      error: { code: err.code, message: err.sqlMessage || "Unknown error occurred" },
    });
  }
  if (!userRes) return res.status(500).send({ error: "Unknown error occurred" });

  //Create session token
  req.session.regenerate(() => {
    req.session.user = newUser.uid;
    res.status(200).send({ message: "Authentication Successful" });
  });
};

/**
 * Logs in a user given an email or username
 * POST request
 * email-based
 *  {
 *      email: test@gmail.com,
 *      password: 123456
 *  }
 * or username-based
 *  {
 *      username: tester123,
 *      password: 123456
 *  }
 * Responses: 200, 400, 401, 500
 * @param {*} req
 * @param {*} res
 */
exports.login = async (req, res) => {
  //Validate login request
  if (req.body.hasOwnProperty("email") && req.body.hasOwnProperty("username"))
    return res.status(400).send({ error: "Cannot login with both username and email" });
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ error: error.details[0].message });

  //Get user depending on login method
  let result;

  //If the user is logging in through email
  try {
    if (req.body.hasOwnProperty("email")) {
      result = await User.findByEmail(req.body.email, true);
    }

    //If the user is logging in through username
    else if (req.body.hasOwnProperty("username")) {
      result = await User.findByUsername(req.body.username, true);
    }
  } catch (err) {
    return res
      .status(500)
      .send({ error: err.code || err || "Unknown Error Occurred during login" });
  }

  //----- ADD MORE SIGN IN METHODS HERE -----

  //-----------------------------------------

  //Check if there is some connection error server-side
  if (!result) return res.status(500).send({ error: "Internal Server Error" });

  //Check if the user exists
  if (!result.length) return res.status(400).send({ error: "User not found" });
  const user = result[0];

  //Check if passwords match
  let authenticated = await bcrypt.compare(req.body.password, user.password_hash);
  if (!authenticated)
    return res.status(401).send({ error: "Incorrect email/username or password" });

  //Create session token
  req.session.regenerate(() => {
    req.session.user = user.uid;
    res.status(200).send({ message: "Authentication Successful" });
  });
};

/**
 * "Logs out" a user. Deletes their session token
 * from the session database.
 * Responses: 200, 401
 * @param {*} req
 * @param {*} res
 */
exports.logout = async (req, res) => {
  if (!req.session) return res.status(401).send("Not Logged in");
  req.session.destroy(() => {
    return res.status(200).send({ message: "Successfully logged out" });
  });
};

/**
 * Checks the login status of a user.
 * Responses: 200
 * @param {*} req
 * @param {*} res
 */
exports.loginStatus = async (req, res) => {
  if (!req.session) res.status(200).send({ status: false });
  else if (req.session.user) res.status(200).send({ status: true });
};
