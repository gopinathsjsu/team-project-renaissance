module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
        first_name: {
            type: Sequelize.STRING
        },
        last_name: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        }
    });

    return Users;
};