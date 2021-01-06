const auth_routes = (app) => {
  const auth_controller = require("../controllers/auth.controller");
  app.post("/api/auth/register", auth_controller.register);
  app.post("/api/auth/login", auth_controller.login);
};

module.exports = auth_routes;
