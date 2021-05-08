const { account, transaction } = require("../models");
const db = require("../models");
const Transaction = db.transaction;
const Account = db.Account;
const { accountController } = require('./account.controller');
const Op = db.Sequelize.Op;

exports.transfer = (req, res) => {
    const beneficiary = req.body.beneficiary_id;
    Transaction.create({
            payee_id: req.body.payee_id,
            beneficiary_id: req.body.beneficiary_id,
            transaction_amount: req.body.transaction_amount
    })
    .then(transaction => {
        return res.status(200).send({ message: "Transaction successful!"})
     }).catch(err => {
        res.status(500).send({ message: err.message });
     });
};

//retrieve transactions from database 
exports.fetchTransactions = (req, res) => {
    console.log("request: " + req)
    Transaction.findAll({
        attributes: ['beneficiary_id', 'transaction_amount', 'transaction_id', 'createdAt'],
        where: {
            payee_id: req.query.payee_id
        }
    }).then(transaction => {
        return res.status(200).send(transaction);
    }).catch(err => {
        return res.status(500).send({ message: err.message });
    });
};

