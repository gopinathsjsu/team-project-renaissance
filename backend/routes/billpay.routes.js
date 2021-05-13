//const { verifySignUp } = require("../middleware/verifySignUp");
const controller = require("../controllers/db.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });

  app.post(
    "/api/db/payBill",
    controller.payBill
  );

};
