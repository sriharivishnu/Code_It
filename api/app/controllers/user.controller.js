const User = require("../models/user.model");

/**
 * Find User given the parameters: UID, email, or username
 * GET request
 * @param {*} req
 * @param {*} res
 */
exports.findUser = async (req, res) => {
  //Verify request has one of the required fields
  if (
    !req.query.hasOwnProperty("email") &&
    !req.query.hasOwnProperty("uid") &&
    !req.query.hasOwnProperty("username")
  ) {
    return res.status(400).send("Bad Request: Missing query parameters");
  }

  //Find the user using the public method
  const user_res = await User.findUserPublic(req.query, (err) => res.status(500).send(err));

  //Internal server error. MySQL connection failure maybe?
  if (!user_res) return res.status(500).send("User Request Failed");

  //User was not found: results array was empty
  if (!user_res.length) return res.status(404).send({ message: "User not found" });

  return res.status(200).send(user_res[0]);
};

exports.updateByUID = (req, res) => {
  res.status(404).send("HELLO");
};
exports.deleteByUID = (req, res) => {
  res.status(404).send("HELLO");
};