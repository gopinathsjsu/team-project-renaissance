const db = require("../models");
const config = require("../db/auth.config");
const User = db.user;
const Role = db.role;
const AllRoles = db.ROLES;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const { user } = require("../models");

exports.signup = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (!user.registered) {
      User.update({
        password: bcrypt.hashSync(user.password, 8),
        first_name:user.firstname,
        last_name:user.lastname,
        username: user.username,
        email: user.email,
        address: user.address,
        phone_number: user.contact,
        registered: true
      }, {
        where: { username: user.username }
      })
      .then(user => {
        // if (AllRoles) {
        //   Role.findAll({
        //     where: {
        //       name: {
        //         [Op.or]: req.body.roles
        //       }
        //     }
        //   }).then(roles => {
        //     // user.setroles(roles).then(() => {
        //     //   res.send({ message: "User was registered successfully!" });
        //     // });
        //   });
        // } else {
        //   // user role = 1
        //   // user.setroles([1]).then(() => {
        //   //   res.send({ message: "User was registered successfully!" });
        //   // });
        // }
        return res.status(200).send("success");
      })
      .catch(err => {
        return res.status(500).send({ message: err.message });
      });
    } else {
      return res.status(200).send({ message: "User Already Signed Up, please login!!!" });
    }
  }).catch(err => {
    return res.status(500).send({ message: err.message });
  });
};

// Assumptions: There is only 1 admin in the system.
exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      var authorities = [];
      // user.getRoles().then(roles => {
      //   for (let i = 0; i < roles.length; i++) {
      //     authorities.push("ROLE_" + roles[i].name.toUpperCase());
      //   }
      res.status(200).send({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.roleId,
        address: user.address,
        firstname: user.first_name,
        lastname: user.last_name,
        accessToken: token
      });
      // });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.update = (req, res) => {
  User.update(req.body, {
    where: {
      username: req.body.username
    }
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
      message: err.message + "Error updating username with username=" + username //username
    });
  });
};
