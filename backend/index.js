const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
var bcrypt = require("bcryptjs");

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const Role = db.role;
const User = db.user;
const Account = db.account;

const adminpass = bcrypt.hashSync('admin1');
const adminpass1 = bcrypt.hashSync('admin2');

db.sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created");
  Role.bulkCreate([
    {id: 1, name: 'customer'},
    {id: 2, name: 'admin'}
  ]).then(function(roles) {
    console.log(roles);
  });
  User.bulkCreate([
    {first_name: 'Admin', last_name: 'Account', username: 'admin', email: 'admin@test.com', address: '', phone_number: '', password: adminpass, roleId: 2},
    {first_name: 'Admin', last_name: 'Account', username: 'admin1', email: 'admin1@test.com', address: '', phone_number: '', password: adminpass1, roleId: 2},
    {first_name: 'Jane', last_name: 'Doe', username: 'jane', email: 'jane@test.com', address: '1 test way', phone_number: '3457822344', password: 'test@123', roleId: 1}
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
require('./routes/account.routes')(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});
