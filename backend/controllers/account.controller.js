const db = require("../models");
const Op = db.Sequelize.Op;
const Account = db.account;
const User = db.user;

exports.create = (req, res) => {
    Account.create({
        account_type: req.body.account_type,
        account_balance: req.body.account_balance,
        username: req.body.username,
    })
    User.create({
        username: req.body.username
        // password: Math.random().toString(36).slice(2)
    })
    .then(account => {
        return res.status(200).send({ message: "Account created successfully." });
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    });
};

// Retrieve all accounts from the database.
exports.findAll = (req, res) => {
    Account.findAll({
      attributes: ['account_number', 'account_type', 'account_balance', 'username']
    }).then(account => {
        return res.status(200).send(account);
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    });
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
    Account.destroy({
        where: {
            account_number: req.body.account_number
        }
      }).then(account => {
        return res.status(200).send({ message: `Account ${account} deleted successfully.` });
      }).catch(err => {
        return res.status(500).send({ message: err.message });
      });
};
