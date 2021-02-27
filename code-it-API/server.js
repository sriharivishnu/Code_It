const express = require("express");
const bodyParser = require("body-parser");
const app = express();
require("dotenv").config();

const user_routes = require("./app/routes/users.routes");
const auth_routes = require("./app/routes/auth.routes");

const verifyAuth = require("./app/util/verifyToken");

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

auth_routes(app);
app.use(verifyAuth);
user_routes(app);

const PORT = process.env.PORT ? process.env.PORT : 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
