const controller = require("../controllers/transaction.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
	res.header("Access-Control-Allow-Origin", "*");
        next();
      });

    app.post("/api/transfer", controller.transfer);
    app.get("/api/fetchTransactions", controller.fetchTransactions);
    app.get("/api/searchTransactions", controller.searchTransactions);
};
