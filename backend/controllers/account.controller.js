const db = require("../models");
const Op = db.Sequelize.Op;
const Account = db.account;

exports.allAccess = (req, res) => {
  console.log("got request");
  console.log(req.body);
  Account.create(req.body)
      .then(account => res.json(account))
    res.status(200).send("testing for create account.");
};


//TODO:

exports.create = (req, res) => {

};

// Retrieve all accounts from the database.
exports.findAll = (req, res) => {
    Account.findAll({}).then(account => {}).catch(err => {});
};

// Update an account by the id in the request
exports.update = (req, res) => {
    Account.findOne({
        where: {
            account_number: req.body.account_number
        }
      }).then(account => {}).catch(err => {});
};

// Delete an account with the specified id in the request
exports.delete = (req, res) => {
    Account.findOne({
        where: {
            account_number: req.body.account_number
        }
      }).then(account => {}).catch(err => {});
};
