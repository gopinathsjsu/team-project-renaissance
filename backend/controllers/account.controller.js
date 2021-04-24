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

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};
