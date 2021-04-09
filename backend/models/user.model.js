module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        first_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        last_name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true
        },
        address: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    return Users;
};