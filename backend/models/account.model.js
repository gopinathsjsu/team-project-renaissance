module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("Account", {
    account_number: {
        allowNull: false,
        type: Sequelize.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    account_type: {
      type: Sequelize.STRING
    },
    account_balance: {
      type: Sequelize.FLOAT
    },
    userId: {
      references: {
        model: 'users', 
        key: 'username'
     }
    }
  },
  {
    initialAutoIncrement: 1000000000000000,
  });

  return Account;
};
