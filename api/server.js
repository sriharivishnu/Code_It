const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
require("dotenv").config();

const user_routes = require("./app/routes/users.routes");
const auth_routes = require("./app/routes/auth.routes");

const verifyAuth = require("./app/util/verifyToken");

// app.use(express.static(path.join(__dirname, "build")));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

auth_routes(app);
app.use("/api/", verifyAuth);
user_routes(app);

//Fallback
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "build/index.html"));
// });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
