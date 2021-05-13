const { Sequelize, account } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;
const Account = db.account;
const User = db.user;

exports.create = (req, res) => {
  //Checking if user is already present in db
  User.findByPk(req.body.username).then(user => {
      if (!user){
        User.create({
            username: req.body.username,
            roleId: 1
            // password: Math.random().toString(36).slice(2)
        })
      }
  }).catch(err => {
      return res.status(500).send({ message: err.message });
  });

  Account.create({
        account_type: req.body.account_type,
        account_balance: req.body.account_balance,
        username: req.body.username,
    }).then(account => {
        return res.status(200).send(account);
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


// Retrieve all accounts from the database.
exports.getOne = (req, res) => {
    Account.findOne({
        attributes: ['account_number', 'account_type', 'account_balance', 'username'],
        where: {
            username: req.body.username
        }
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

exports.fetchAccountBalance = (req, res) => {
  Account.findOne({
        attributes: ['account_balance'],
        where: {
            account_number: req.body.account_number
        }
      }).then(account => {
          return res.status(200).send(account);
      }).catch(err => {
          return res.status(500).send({ message: err.message });
      });
};

// Retrive a list of account numbers associated with the user
exports.getAccountNumber = (req, res) => {
    Account.findAll({
          attributes: ['account_number'],
          where: {
              username: req.query.username
          }
        }).then(account => {
            return res.status(200).send(account);
        }).catch(err => {
            return res.status(500).send({ message: err.message });
        });
  };

exports.fetchBalanceFromUserName = (req, res) => {
  Account.findAll({
        attributes: ['account_number', 'account_type', 'account_balance', 'username'],
        where: {
            username: req.query.username
        }
      }).then(account => {
          return res.status(200).send(account);
      }).catch(err => {
          return res.status(500).send({ message: err.message });
      });
};
// Update an Beneficiary's account's balance with a specified account_number
exports.updateBeneficiaryAccountBalance = (req, res) => {
    Account.findByPk(req.body.beneficiary_account_number).then(account => {
        if (account){
            return account.increment('account_balance', {by: req.body.transaction_amount});
        } else {
            return res.status(400).send({ message: 'user does not exist'});
        }
    }).then(account => {
        return res.status(200).send({ message: 'Beneficiary account balance updated successfully.' });
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    });
};

// Update an Payee's account's balance with a specified account_number
exports.updatePayeeAccountBalance = (req, res) => {
    Account.findByPk(req.body.payee_account_number).then(account => {
        if (account){
            if(account.account_balance > req.body.transaction_amount){
                return account.decrement('account_balance', {by: req.body.transaction_amount});
            } else {
                return res.status(400).send({ message: 'Add sufficient funds'});
            }
        } else {
            return res.status(400).send({ message: 'user does not exist'});
        }
    }).then(account => {
        return res.status(200).send({ message: 'Payee account balance updated successfully.' });
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    });
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

exports.withdraw = (req, res) => {
    const accno = req.query.account_number;
    const amount = req.query.withdrawAmount;
    if(parseFloat(amount).toFixed(2) < 0) {
        return res.status(200).send("amount Incorrect");
    } else {
        Account.findByPk(req.body.payee_account_number).then(account => {
            if (account){
                if(account.account_balance > req.body.transaction_amount){
                    return account.decrement('account_balance', {by: withdrawAmount});
                } else {
                    return res.status(400).send({ message: 'Add sufficient funds'});
                }
            } else {
                return res.status(400).send({ message: 'account does not exist'});
            }
        }).then(account => {
            return res.status(200).send("success");
        }).catch(err => {
            return res.status(500).send({ message: err.message });
        });
    }
};

exports.deposit = (req, res) => {
    const accno = req.query.account_number;
    const amount = req.query.refundAmount;
    if(parseFloat(amount).toFixed(2) < 0) {
        return res.status(200).send("amount Incorrect");
    } else {
        Account.findByPk(req.body.payee_account_number).then(account => {
            if (account){
                if(account.account_balance > req.body.transaction_amount){
                    return account.increment('account_balance', {by: refundAmount});
                } else {
                    return res.status(400).send({ message: 'Add sufficient funds'});
                }
            } else {
                return res.status(400).send({ message: 'account does not exist'});
            }
        }).then(account => {
            return res.status(200).send("success");
        }).catch(err => {
            return res.status(500).send({ message: err.message });
        });
    }
};