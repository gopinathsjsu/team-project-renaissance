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
    {first_name: 'Jane', last_name: 'Doe', username: 'jane', email: 'jane@test.com', address: '1 test way', phone_number: '3457822344', password: 'test@123', roleId: 1}
  ]).then(function(us) {
    console.log(us);
  });
  ExternalPayee.bulkCreate([
    {merchant_name: 'Tesla', username: 'tom', merchant_acctno: '102345', bill_amount: '485.00'},
    {merchant_name: 'PG&E', username: 'Ben', merchant_acctno: '102346', bill_amount: '85.00'},
    {merchant_name: 'Great Oaks Water', username: 'Jane', merchant_acctno: '102347', bill_amount: '20.45'},
    {merchant_name: 'AT&T', username: 'Holmer', merchant_acctno: '102348', bill_amount: '125.87'},
    
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
  Account.bulkCreate([
    {account_type: "checkings", account_balance: 100, username: "jane", account_number: 1000000000000000}
  ]).then(function(account) {
    console.log(account);
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
