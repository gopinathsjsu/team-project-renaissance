// const { authJwt } = require("../middleware");
const controller = require("../controllers/account.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/addAccount", controller.create);

  app.get("/api/fetchAllAccounts", controller.findAll);

  app.delete("/api/deleteAccount", controller.delete);

  app.get("/api/fetchAccountBalance", controller.fetchAccountBalance);
};
