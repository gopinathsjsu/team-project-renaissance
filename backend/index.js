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
const Transaction = db.transaction;
const BillPay = db.BillPay;
const ExternalPayee = db.ExternalPayee;

const adminuserpass1 = bcrypt.hashSync('admin1');
const adminuserpass2 = bcrypt.hashSync('admin2');
const userpwd = bcrypt.hashSync('test@123');


db.sequelize.sync({ force: true }).then(() => {
  console.log("Database & tables created");
  Role.bulkCreate([
    {id: 1, name: 'customer'},
    {id: 2, name: 'admin'}
  ]).then(function(roles) {
    console.log(roles);
  });
  
  User.bulkCreate([
    {first_name: 'Admin', last_name: 'Account', username: 'admin1', email: 'admin@test.com', address: '', phone_number: '', password: adminuserpass1, roleId: 2},
    {first_name: 'Admin', last_name: 'Account', username: 'admin2', email: 'admin1@test.com', address: '', phone_number: '', password: adminuserpass2, roleId: 2},
    {first_name: 'Jane', last_name: 'Doe', username: 'jane', email: 'jane@test.com', address: '1 test way', phone_number: '3457822344', password: userpwd, roleId: 1},
    {first_name: 'Holmer', last_name: 'Simpson', username: 'hsimpson', email: 'hsimpson@test.com', address: '1 test way', phone_number: '3457822344', password: userpwd, roleId: 1, registered: true},
    {first_name: 'Bart', last_name: 'Simpson', username: 'bsimpson', email: 'bsimpson@test.com', address: '1 test way', phone_number: '3457822344', password: userpwd, roleId: 1, registered: true}
  ]).then(function(us) {
    console.log(us);
  });
  
  
  Account.bulkCreate([
    {account_no: '10123', account_type: 'checkin', account_balance: '12500', username: 'hsimpson'},
    {account_no: '10124', account_type: 'checkin', account_balance: '500', username: 'bsimpson'},
    
    
  ]).then(function(us) {
    console.log(us);
  });
  Transaction.bulkCreate([
    {payee_id: 1000000000000000, beneficiary_id: 1000000000000001, transaction_amount: 100, transaction_id: 1000000000000000},
    {payee_id: 1000000000000000, beneficiary_id: 1000000000000002, transaction_amount: 101, transaction_id: 1000000000000001},
    {payee_id: 1000000000000000, beneficiary_id: 1000000000000003, transaction_amount: 100, transaction_id: 1000000000000002},
    {payee_id: 1000000000000008, beneficiary_id: 1000000000000001, transaction_amount: 100, transaction_id: 1000000000000003}
  ]).then(function(transaction) {
    console.log(transaction);
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
require('./routes/transaction.routes')(app);
require('./routes/externalpayees.routes')(app);

const PORT = process.env.PORT || 4000;
app.listen(PORT, function() {
  console.log("Server is running on Port: " + PORT);
});