const { account, transaction } = require("../models");
const db = require("../models");
const Transaction = db.transaction;
const Account = db.account;
const { accountController } = require('./account.controller');
const Op = db.Sequelize.Op;
const Sequelize = require("sequelize");
const moment= require('moment');

exports.transfer = (req, res) => {
    const { payee_id, beneficiary_id, transaction_amount, recurring_period } = req.body;
    if(parseFloat(transaction_amount).toFixed(2) < 0) {
        return res.status(200).send("amount Incorrect");
    } else if(payee_id == beneficiary_id) {
        return res.status(200).send("same accounts");
    }
    else {
        Account.findOne({
            where: {
                account_number: payee_id
            }
        }).then(sender => {
            updateSenderMoney(transaction_amount, sender.account_balance, payee_id, true)
            .then(() => {
                Account.findOne({
                    where: {
                        account_number: beneficiary_id
                    },
                }).then(recipient => {
                    updateRecipientMoney(transaction_amount, recipient.account_balance, beneficiary_id, true)
                    .then(() => {
                        Transaction.create({
                            payee_id: payee_id,
                            beneficiary_id: beneficiary_id,
                            transaction_amount: transaction_amount,
                            recurring_period: recurring_period
                        })
                        return res.status(200).send("success");
                    })
                    .catch(err => {
                        console.log('error message', err);
                    });
                })
                .catch(err => {
                    res.status(500).send({ message: err.message });
                });
            }).catch(err => {
                res.status(500).send({ message: err.message });
            });
        })
        .catch(err => {
            return res.status(500).send({ message: err.message });
        });
    }
};

async function updateRecipientMoney(money, recipientAvailableFunds, recipientId, isConfirm) {
    if (isConfirm) {
        Account.findOne({
            where: {
                account_number: recipientId
            },
        }).then(() => {
            Account.update(
                { account_balance: (parseFloat(recipientAvailableFunds) + parseFloat(money)).toFixed(2) },
                { where: { account_number: recipientId } },
            );
        }).catch(err => {
            return res.status(500).send({ message: err.message });
        });
    }else {
        return res.status(200).send("recipient");
    }
}

async function updateSenderMoney(money, senderAvailableFunds, senderId, isConfirm) {
//Checking if sender has funds
    const diff = (parseFloat(senderAvailableFunds) - parseFloat(money));

    if (diff < 0) {
        throw new Error('Sender dosent have enough funds');

    } else {
        if (isConfirm) {
            Account.update(
            { account_balance: (parseFloat(senderAvailableFunds) - parseFloat(money)).toFixed(2) },
            { where: { account_number: senderId } },
        );
        }

    }
}

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

exports.searchTransactions = (req, res) => {
    const accno = req.query.accno;
    const timePeriod = req.query.date;
    Transaction.findAll({
        attributes: ['transaction_amount', 'beneficiary_id','payee_id','transaction_id', 'createdAt'],
        
        where: Sequelize.and({
                createdAt: {
                    [Op.gte]: moment().subtract(timePeriod, 'months').toDate()
                }
            },
            Sequelize.or(
                {payee_id: accno},
                {beneficiary_id: accno},
            )
        )

    }).then(search => {
        return res.status(200).send(search);
    }).catch(err => {
        return res.status(500).send({ message: err.messge});
    });  
};
