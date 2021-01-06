const users_routes = (app) => {
  const users = require("../controllers/user.controller");
  app.post("/api/users/create", users.create);
  app.get("/api/users", users.findUser);
  app.put("/api/users/update/:userID", users.updateByUID);
  app.delete("/api/users/:userID", users.deleteByUID);
};

module.exports = users_routes;
