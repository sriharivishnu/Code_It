const code_routes = (app) => {
  const controller = require("../controllers/code.controller");
  app.post("run", controller.run);
};

module.exports = code_routes;
