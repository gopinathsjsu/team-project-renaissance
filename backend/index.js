const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const PORT = 4000;

var corsOptions = {
  origin: "https://online-banking-application.herokuapp.com/"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 

const db = require("./models");
const Role = db.role;
const User = db.user;

db.sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created");
  Role.bulkCreate([
    {id: 1, name: 'user'},
    {id: 2, name: 'admin'}
  ]).then(function(roles) {
    console.log(roles);
  });
  User.bulkCreate([
    {first_name: 'John', last_name: 'Average', username: 'john12', email: 'john@test.com', address: 'test street 1', phone_number: '123456789', password: 'test@123' },
    {first_name: 'Jane', last_name: 'Doe', username: 'jane23', email: 'jane@test.com', address: 'test street 2', phone_number: '453899780', password: 'admin@123'}
  ]).then(function(us) {
    console.log(us);
  });
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to online banking application." });
});

// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});