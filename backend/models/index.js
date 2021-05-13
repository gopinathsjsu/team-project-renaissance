const config = require("../db/db.config.js");

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.account = require("../models/account.model.js")(sequelize, Sequelize);
db.transaction = require("../models/transaction.model.js")(sequelize, Sequelize);
db.ExternalPayee = require("../models/externalpayees.model.js")(sequelize, Sequelize);
//db.ExternalPayee = require("../models/addexternalpayees.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId",
//   as: "roles"
// });

//Added association to account for user
//db.user.hasOne(db.role);

db.account.hasOne(db.user);

db.account.hasMany(db.transaction);

//db.transaction.hasOne(db.account);

db.ROLES = ["user", "admin"];

module.exports = db;
