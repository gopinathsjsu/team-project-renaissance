const db = require("../models");
const Transaction = db.transaction;
const Op = db.Sequelize.Op;

exports.transfer = (req, res) => {
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

exports.findAll = (req, res) => {
    Transaction.findAll({}).then(transaction => {}).catch(err => {});
};