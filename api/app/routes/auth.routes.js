const auth_routes = (app) => {
  const auth_controller = require("../controllers/auth.controller");
  app.post("/api/auth/register", auth_controller.register);
  app.post("/api/auth/login", auth_controller.login);
  app.post("/api/auth/logout", auth_controller.logout);
  app.get("/api/auth/loginStatus", auth_controller.loginStatus);
};

module.exports = auth_routes;
