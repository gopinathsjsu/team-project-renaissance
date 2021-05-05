const { ExternalPayee } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;
const ep = db.ExternalPayee;


// Retrieve all payee from the database.
exports.getPayee = (req, res) => {

    
    /*ep.findAll({}).then(function (users) {
        //return users;
        //console.dir(users);
        res.send(users);
        //return users;
    }); */

    ep.findAll({
        attributes:['merchant_name', 'username', 'merchant_acctno', 'bill_amount', 'bill_status']
    }).then(result =>{
        return res.status(200).send(result);

    }).catch(err =>{
        return res.status(500).send({ message: err.message });

    });
    

};


/*async function newFunction() {
    const data = await ep.findAll({});
}*/

