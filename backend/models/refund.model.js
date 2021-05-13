module.exports = (sequelize, Sequelize) => {
    const Refund = sequelize.define("refund", {
        username: {
            allowNull: false,
            type: Sequelize.STRING
        },
        refund_amount: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        refund_id: {
            allowNull: false,
            type: Sequelize.INTEGER,
            autoIncrement: true,
            //timestamps: true,
            primaryKey: true
        },
    },
    {
        initialAutoIncrement: 1,
    });

    return Refund;
};