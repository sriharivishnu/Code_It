const jwt = require("jsonwebtoken");

/**
 * Middleware to ensure user is authenticated when accessing
 * protected routes
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function verifyAuth(req, res, next) {
  //Ensure that there is a token in the header
  const token = req.header("auth-token");
  if (!token) return res.status(401).send({ message: "Access Denied: Please login" });

  //Try verifying the token using the TOKEN SECRET
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.uid = verified;
    next();
  } catch (err) {
    res.status(403).send({ message: "Invalid token!" });
  }
}
module.exports = verifyAuth;
