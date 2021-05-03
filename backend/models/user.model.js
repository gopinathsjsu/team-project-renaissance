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
            allowNull: false,
            primaryKey: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: true
        },
        address: {
            type: Sequelize.STRING,
            allowNull: true
        },
        phone_number: {
            type: Sequelize.STRING,
            allowNull: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: true
        },
        registered: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        roleId: {
            type: Sequelize.INTEGER,
            references: {
               model: 'roles',
               key: 'id',
            }
        }
    });

    return Users;
};
