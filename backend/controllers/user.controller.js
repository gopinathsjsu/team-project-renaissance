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

exports.update = (req, res) => {
    const username = req.body.username;
    User.update({
      password: bcrypt.hashSync(req.body.password, 8),
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
      phone_number:req.body.contact
    }, {
        where: { username: req.body.username }
    }).then(num => {
      if (num == 1) {
        res.send({
          message: "User Profile was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with id=${username}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + username
      });
    });
  };