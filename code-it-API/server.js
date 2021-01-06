const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const routes = require("./app/routes/users.routes");
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Welcome!" });
});

routes(app);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
