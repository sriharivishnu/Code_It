const { v1: uuidv1 } = require("uuid");
const User = require("../models/user.model");
const { registerValidation, loginValidation } = require("../util/validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { create } = require("../models/user.model");

// 1 hour (3600 seconds)
const TOKEN_EXPIRES_IN_SECONDS = 60 * 60;

// 365 Days
const REFRESH_TOKEN_EXPIRES_IN_SECONDS = 60 * 60 * 24 * 365;

// Replace the refresh token when it is a week away from expiry
const REPLACE_REFRESH_TOKEN_WHEN_X_SECONDS_AWAY = 60 * 60 * 24 * 7;

/**
 * Creates just the access token for a user
 * @param {String} uid The UID of the user
 */
function createSessionToken(uid) {
  //Create session token
  const token = jwt.sign({ uid: uid }, process.env.TOKEN_SECRET, {
    expiresIn: TOKEN_EXPIRES_IN_SECONDS,
  });
  return token;
}

/**
 * Creates an access token and a refresh token
 * @param {String} uid The UID of the user
 */
function createTokens(uid) {
  //Create session token
  const token = createSessionToken(uid);
  //Create the refresh token
  const refresh_token = jwt.sign(
    {
      uid: uid,
    },
    process.env.TOKEN_SECRET,
    { expiresIn: REFRESH_TOKEN_EXPIRES_IN_SECONDS }
  );
  return { access_token: token, refresh_token: refresh_token };
}

/**
 * Create a user in the database
 * POST Request : EXAMPLE: 
 * {
    email: test@gmail.com,
    username:tester,
    password: 123456
 * }
 * @param {*} req 
 * @param {*} res 
 */
exports.register = async (req, res) => {
  //Validate the request for the given schema
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  //Compute hashed password
  let hashed, salt;
  try {
    salt = await bcrypt.genSalt(12);
    hashed = await bcrypt.hash(req.body.password, salt);
  } catch (e) {
    return res.status(500).send({ message: "Internal Server Error", error: e });
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
  const userRes = await User.create(newUser).catch((err) => {
    res.status(500).send({
      message: err.message || "Internal Server Error while Creating User",
    });
  });
  if (!userRes) return;

  //Create session token + refresh token
  const tokens = createTokens(newUser.uid);
  res.send(tokens);
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
 * @param {*} req
 * @param {*} res
 */
exports.login = async (req, res) => {
  //Validate login request
  if (req.body.hasOwnProperty("email") && req.body.hasOwnProperty("username"))
    return res.status(400).send({ message: "Cannot login with both username and email" });
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  //Get user depending on login method
  let result;

  //If the user is logging in through email
  if (req.body.hasOwnProperty("email")) {
    result = await User.findByEmail(req.body.email, true).catch((err) => {
      res.status(500).send(err);
    });
  }

  //If the user is logging in through username
  else if (req.body.hasOwnProperty("username")) {
    result = await User.findByUsername(req.body.username, true).catch((err) => {
      res.status(500).send(err);
    });
  } else {
    return res.status(400).send({ message: "Unknown formatting error" });
  }

  //----- ADD MORE SIGN IN METHODS HERE -----

  //-----------------------------------------

  //Check if there is some connection error server-side
  if (!result) return res.status(500).send({ message: "Internal Server Error" });

  //Check if the user exists
  if (!result.length) return res.status(400).send({ message: "User not found" });
  const user = result[0];

  //Check if passwords match
  let authenticated = await bcrypt.compare(req.body.password, user.password_hash);
  if (!authenticated) res.status(401).send({ message: "Incorrect email/username or password" });

  //Create access token + refresh token
  const tokens = createTokens(user.uid);

  //Send the response to the user
  res.send(tokens);
};

exports.token = async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) return res.status(401).send({ message: "No refresh token found!" });

  //--- TODO: Check if refresh token is in the white list

  //---

  //Decode the JWT
  let decoded;
  try {
    decoded = jwt.verify(refresh_token, process.env.TOKEN_SECRET);
  } catch (error) {
    return res.status(401).send({ message: "Invalid Refresh token!" });
  }
  if (!decoded.uid) return res.status(500).send({ message: "Token has invalid contents" });
  let tokens;

  //Check if refresh token is about to expire - send refresh and access
  if (decoded.exp < Date.now() / 1000 + REPLACE_REFRESH_TOKEN_WHEN_X_SECONDS_AWAY) {
    tokens = createTokens(decoded.uid);
  }

  //Only send back an access token
  else {
    tokens = { access_token: createSessionToken(decoded.uid) };
  }

  return res.status(200).send(tokens);
};

exports.logout = async (req, res) => {
  const { refresh_token } = req.body;
  if (!refresh_token) return res.status(200).send({ message: "No refresh token found" });

  // ---  Delete refresh_token from whitelist here

  // -----------
  return res.status(200).send({ message: "Successfully logged out" });
};
