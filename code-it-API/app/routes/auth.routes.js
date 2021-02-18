const auth_routes = (app) => {
  const auth_controller = require("../controllers/auth.controller");
  app.post("/api/auth/register", auth_controller.register);
  app.post("/api/auth/login", auth_controller.login);
  app.post("/api/auth/token", auth_controller.refreshToken);
};

module.exports = auth_routes;
