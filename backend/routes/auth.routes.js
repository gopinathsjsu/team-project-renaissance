const { verifySignUp } = require("../middleware/verifySignUp");
const controller = require("../controllers/auth.controller");

var cors = require('cors');

var corsOptions = {
  origin: true,
  methods: ['POST'],
  credentials: true,
  maxAge: 3600,
  enablePreflight: true
};

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
    cors(corsOptions),
    controller.signup
  );

  app.post("/api/auth/signin", 
           cors(corsOptions),
	   controller.signin);

  app.post(
    "/api/auth/update", 
    cors(corsOptions),
    controller.update);

};
