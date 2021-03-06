"use strict";

require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const database = require("./app/util/db-client");
// const redisClient = require("./app/util/redis-client");

const app = express();

const user_routes = require("./app/routes/users.routes");
const auth_routes = require("./app/routes/auth.routes");

const { verifyAuth, useSession } = require("./app/util/session_manager");

//Initialize Database and Redis connections
async function init() {
  console.log("Initializing...");

  //Initialize DB
  try {
    await database.connect();
  } catch (err) {
    console.error("Failed to connect to database: ", err);
  }

  // Initialize Redis Cache
  // try {
  //   await redisClient.connect();
  // } catch (err) {
  //   console.error("Failed to connect to Redis: ", err);
  // }
  console.log("Done Initializing Services. Ready to serve.");
}
init();

//Middlewares (including session)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
useSession(app, { port: 6379, host: "redis", password: process.env.REDIS_PASSWORD });

//Routes
auth_routes(app);
app.use("/api/", verifyAuth);
user_routes(app);

//Start server on port __
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
