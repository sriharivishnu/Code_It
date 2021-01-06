const { v1: uuidv1 } = require("uuid");
const User = require("../models/user.model");

/*
Create a user in the database
POST Request 
{
    email: test@gmail.com,
    username:tester,
    password: 123456
}
*/
exports.create = async (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Content cannot be empty!",
    });
  }
  if (!req.body.hasOwnProperty("email"))
    return res.status(400).send({ message: "Email Required!" });
  if (!req.body.hasOwnProperty("username"))
    return res.status(400).send({ message: "Username Required!" });
  if (!req.body.hasOwnProperty("password"))
    return res.status(400).send({ message: "Password Required!" });
  const bcrypt = require("bcryptjs");
  let hashed, salt;
  try {
    salt = await bcrypt.genSalt(12);
    hashed = await bcrypt.hash(req.body.password, salt);
  } catch (e) {
    return res.status(500).send({ message: "Internal Server Error", error: e });
  }
  req.body.password = hashed;
  const uid = uuidv1();
  const newUser = new User({
    uid: uid,
    email: req.body.email,
    username: req.body.username,
    hashed_password: hashed,
  });
  User.create(newUser, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Internal Server Error while Creating User",
      });
    else res.status(200).send(data);
  });
};

/*
Find User given the parameters: UID, email, or username
GET request
*/
exports.findUser = async (req, res) => {
  const onError = (err) => {
    res.status(500).send(err);
  };
  let user;
  if (req.query.uid) {
    user = await User.findByUID(req.query.uid).catch(onError);
  } else if (req.query.email) {
    user = await User.findByEmail(req.query.email).catch(onError);
  } else if (req.query.username) {
    user = await User.findByUsername(req.query.username).catch(onError);
  } else {
    return res.status(400).send("Bad Request: Missing query parameters");
  }
  if (user.length) return res.status(200).send(user[0]);
  res.status(404).send({ message: "User not found" });
};

/*
Logs in a user given an email or username
POST request
email-based
    {
        email: test@gmail.com,
        password: 123456
    }
or username-based
    {
        username: tester123,
        password: 123456
    }
*/
exports.login = (req, res) => {
  if (req.body.hasOwnProperty("email") && req.body.hasOwnProperty("username"))
    return res.status(400).send("Cannot login with both username and email");
  if (req.body.hasOwnProperty("email") && req.body.hasOwnProperty("password")) {
    User.findByEmail(req.body.email, (err, data) => {
      if (err) {
        if (data.kind == "not_found") return res.status(404).send({ message: "User Not Found" });
        else return res.status(500).send(err);
      } else {
      }
    });
  }
  if (req.hasOwnProperty("username") && req.hasOwnProperty("password")) {
  }
};
exports.updateByUID = (req, res) => {
  res.status(404).send("HELLO");
};
exports.deleteByUID = (req, res) => {
  res.status(404).send("HELLO");
};
