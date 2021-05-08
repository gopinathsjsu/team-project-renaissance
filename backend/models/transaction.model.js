module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        payee_id:{
            allowNull: false,
            type: Sequelize.BIGINT,
            foreignKey: true
        },
        beneficiary_id:{
            allowNull: false,
            type: Sequelize.BIGINT,
            foreignKey: true
        },
        transaction_amount: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        transaction_id: {
            allowNull: false,
            type: Sequelize.BIGINT,
            autoIncrement: true,
            //timestamps: true,
            primaryKey: true
        }
    },
    {
        initialAutoIncrement: 1000000000000000,
    });

    return Transaction;
};