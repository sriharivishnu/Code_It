const redis = require("redis");
const session = require("express-session");
let RedisStore = require("connect-redis")(session);

/**
 * Middleware to ensure user is authenticated when accessing
 * protected routes
 * Responses: 403 - Invalid token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
function verifyAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = "Access Denied";
    res.status(401).send({ message: "Please log in!" });
  }
}

/**
 * Middleware to handle Sessions with Redis. This function
 * sets up the Express app with express-session.
 * @param {*} app
 * @param {*} options - Options for the Redis Store
 */
function useSession(app, options) {
  const redisSessionStore = redis.createClient(options);
  redisSessionStore.on("error", () => {
    console.error("Redis Session is offline");
  });
  redisSessionStore.on("connect", () => {
    console.log("Successfully connected to Redis Session Server.");
  });
  app.use(
    session({
      secret: process.env.TOKEN_SECRET,
      name: "session-token",
      cookie: {
        httpOnly: true,
        secure: false,
        sameSite: true,
        maxAge: null,
      },
      store: new RedisStore({ client: redisSessionStore, ttl: 86400 * 7 }),
      resave: false,
      saveUninitialized: false,
    })
  );
}
module.exports = { verifyAuth, useSession };
