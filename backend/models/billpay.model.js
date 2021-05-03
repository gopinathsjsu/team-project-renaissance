module.exports = (sequelize, Sequelize) => {
    const Billpay = sequelize.define("billpay", {
        user_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        bill_account_no: {
            type: Sequelize.STRING,
            allowNull: false
        },
        bill_amount: {
            type: Sequelize.STRING,
            allowNull: true
        }
    });

    return Billpay;
};