const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
const PORT = 4000;

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

const db = require("./models");
const Role = db.role;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created");
  Role.bulkCreate([
    {id: 1, name: 'user'},
    {id: 2, name: 'admin'}
  ]).then(function(roles) {
    console.log(roles);
  });
});

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to online banking application." });
});

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});