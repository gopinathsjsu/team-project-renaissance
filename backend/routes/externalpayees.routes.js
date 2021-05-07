
const controller = require("../controllers/externalpayees.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  
  //app.get("/api/externalpayees",controller.getPayee);
  app.post("/api/externalpayees", controller.getPayee);
  app.post("/api/payBill", controller.payBill);
  app.post("/api/refund", controller.refund);
  //app.get("/api/fetchAllAccounts", controller.findAll);
};