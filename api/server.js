require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const database = require("./app/util/db-client");
const redis = require("./app/util/redis-client");

const app = express();

const user_routes = require("./app/routes/users.routes");
const auth_routes = require("./app/routes/auth.routes");

const verifyAuth = require("./app/util/verifyToken");

//Test Redis Connection
async function test_redis() {
  await redis.set("test", "passed");
  if ((await redis.get("test")) === "passed") console.log("Redis Test passed");
  else console.error("Redis Error: connection test failed: ");
}

//Initialize Database and Redis connections
async function init() {
  console.log("Initializing...");
  try {
    await database.connect();
  } catch (err) {
    console.error("Failed to connect to database: ", err);
  }

  try {
    await redis.connect();
  } catch (err) {
    console.error("Failed to connect to Redis: ", err);
  }
  test_redis();
  console.log("Done Initializing Services. Ready to serve.");
}
init();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//Routes
auth_routes(app);
app.use("/api/", verifyAuth);
user_routes(app);

//Start server on port __
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
