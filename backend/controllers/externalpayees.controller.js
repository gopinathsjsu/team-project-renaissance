const { ExternalPayee } = require("../models");
const db = require("../models");
const Op = db.Sequelize.Op;
const ep = db.ExternalPayee;
const Account = db.account;

// Retrieve all payee from the database.
exports.getPayee = (req, res) => {

    
    /*ep.findAll({}).then(function (users) {
        //return users;
        //console.dir(users);
        res.send(users);
        //return users;
    }); */
    /*
    ep.findAll({
        attributes:['merchant_name', 'username', 'merchant_acctno', 'bill_amount', 'bill_status']
    }).then(result =>{
        return res.status(200).send(result);

    }).catch(err =>{
        return res.status(500).send({ message: err.message });

    });
    */

   ep.findAll({
    attributes:['merchant_name', 'username', 'merchant_acctno', 'bill_amount', 'bill_status'],
    where : {username : req.body.username, bill_status : req.body.paystatus }
}).then(result =>{
    return res.status(200).send(result);

}).catch(err =>{
    return res.status(500).send({ message: err.message });

});
    

};


// Retrieve all payee from the database.
exports.payBill = (req, res) => {

        var acntBalance = 0;
        var payAmount = req.body.billAmount;
        var username = req.body.username;
        var merchantAcctno = req.body.id;
       // console.log(req.body.username);
        //console.log(req.body.billAmount);
       // console.log(req.body.id);
        //console.log('end data');
    
        acntBalance = Account.findOne({
              attributes: ['account_number', 'account_type', 'account_balance', 'username'],
              where: {
                username: username
              }
            }).then(account => {
                acntBalance = account.account_balance;
                var balance = acntBalance - payAmount;
                console.log('balance is');
                console.log(balance);
                if (balance < 0) {
                    return res.status(200).send('low balance');
                }
                Account.update(
                    {account_balance: balance},
                    {where: {username: username} }
                );
                ep.update(
                    {bill_status: 'paid'},
                    {where: {merchant_acctno: merchantAcctno, username: username}}
                );
                return res.status(200).send('sucess');
                
                
            });
            
    };


    // Retrieve all payee from the database.
exports.refund = (req, res) => {
    var username = req.body.username;
    var refundAmount = req.body.refundAmount;
    console.log(username);
    console.log(refundAmount);
    

    Account.findOne({
          attributes: ['account_number', 'account_type', 'account_balance', 'username'],
          where: {
            username: username
          }
        }).then(account => {
            console.log('Money in account is');
            console.log(account.account_balance);
            console.log(account);
            var acntBalance = account.account_balance;
            var balance = acntBalance + parseInt(refundAmount);
            console.log('balance is');
            console.log(balance);
            
            Account.update(
                {account_balance: balance},
                {where: {username: username} }
            );
            
            return res.status(200).send('sucess');
            
            
        });
        
};
                
