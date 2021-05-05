module.exports = (sequelize, Sequelize) => {
    const ExternalPayees = sequelize.define("ExternalPayees", {
        merchant_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        merchant_acctno: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bill_amount: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bill_status: {
            type: Sequelize.STRING,
            allowNull: true
        },
        

    });

    return ExternalPayees;
};