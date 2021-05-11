const { verifySignUp } = require("../middleware/verifySignUp");
const controller = require("../controllers/auth.controller");

var cors = require('cors');

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
    "/api/auth/signup",
    /*[
      verifySignUp.checkDuplicateUsername,
      verifySignUp.checkRolesExisted
    ],*/
    cors(),
    controller.signup
  );

  app.post("/api/auth/signin", 
           cors(),
	   controller.signin);

  app.post(
    "/api/auth/update", 
    cors(),
    controller.update);

};
