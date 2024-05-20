const login = require("./login.router");
const repair = require("./repair.router");

function loadRoutes(app) {
  app.use("/login", login);
  app.use("/product", product);
  app.use("/repair", repair);
}

module.exports = loadRoutes;
