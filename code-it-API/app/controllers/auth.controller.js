const { v1: uuidv1 } = require("uuid");
const User = require("../models/user.model");
const { registerValidation, loginValidation } = require("../util/validation");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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

  //Create session token
  const token = jwt.sign({ uid: uid }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
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
  else if (req.hasOwnProperty("username")) {
    result = await User.findByUsername(req.body.username, true).catch((err) => {
      res.status(500).send(err);
    });
  }

  //----- ADD MORE SIGN IN METHODS HERE -----

  //-----------------------------------------

  //Check if there is some connection error server-side
  if (!result) return res.status(500).send("Internal Server Error");

  //Check if the user exists
  if (!result.length) return res.status(400).send({ message: "User not found" });
  const user = result[0];

  //Check if passwords match
  let authenticated = await bcrypt.compare(req.body.password, user.password_hash);
  if (!authenticated) res.status(401).send({ message: "Incorrect email/username or password" });

  //Create session token
  const token = jwt.sign({ uid: user.uid }, process.env.TOKEN_SECRET);
  res.header("auth-token", token).send(token);
};
