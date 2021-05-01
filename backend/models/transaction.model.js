module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        payee_id:{
            allowNull: false,
            type: Sequelize.BIGINT
        },
        beneficiary_id:{
            allowNull: false,
            type: Sequelize.BIGINT
        },
        transaction_amount: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        transaction_id: {
            allowNull: false,
            type: Sequelize.BIGINT,
            autoIncrement: true,
            timestamps: true,
            primaryKey: true
        },
    });

    return Transaction;
};