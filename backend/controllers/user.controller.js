const db = require("../models");
const Op = db.Sequelize.Op;
const User = db.user;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.updateProfile = (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
      }).then(account => {}).catch(err => {});
};