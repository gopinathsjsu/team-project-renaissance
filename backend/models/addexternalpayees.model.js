module.exports = (sequelize, Sequelize) => {
    const AddExternalPayees = sequelize.define("AddExternalPayees", {
        merchant_name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        merchant_acctno: {
            type: Sequelize.STRING,
            allowNull: false
        }
        

    });

    return AddExternalPayees;
};