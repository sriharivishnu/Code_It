const { v1: uuidv1 } = require("uuid");
const User = require("../models/user.model");

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
  if (!user) return;
  if (user.length) return res.status(200).send(user[0]);
  res.status(404).send({ message: "User not found" });
};

exports.updateByUID = (req, res) => {
  res.status(404).send("HELLO");
};
exports.deleteByUID = (req, res) => {
  res.status(404).send("HELLO");
};
