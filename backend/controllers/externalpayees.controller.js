const db = require("../models");
const Op = db.Sequelize.Op;
const ep = db.ExternalPayee;


// Retrieve all payee from the database.
exports.getPayee = (req, res) => {

    
    ep.findAll({}).then(function (users) {
        //return users;
        //console.dir(users);
        res.send(users);
        //return users;
    }); 

};
async function newFunction() {
    const data = await ep.findAll({});
}

