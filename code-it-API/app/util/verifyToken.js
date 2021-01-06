const jwt = require("jsonwebtoken");

function verifyAuth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access Denied: Please login");

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.uid = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
}
module.exports = verifyAuth;
