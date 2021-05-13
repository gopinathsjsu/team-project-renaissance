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
    /*
        attributes:[[db.Sequelize.fn('DISTINCT', db.Sequelize.col('merchant_name')) ,'merchant_name'], 'username', 'merchant_acctno', 'bill_amount', 'recPeriod'],
    where : {username : req.body.username},
    */

    console.log(req.body.username);
    console.log(req.body.paystatus);
    var status = req.body.paystatus;
    if (status === 'unpaid') {
    console.log('ps out unpaid');
   ep.findAll({
    attributes:['merchant_name', 'username', 'merchant_acctno'],
    //attributes:[[db.Sequelize.fn('DISTINCT', db.Sequelize.col('merchant_name')) ,'merchant_name'], [db.Sequelize.fn('DISTINCT', db.Sequelize.col('merchant_acctno')) ,'merchant_acctno']],
    group: ['merchant_name', 'merchant_acctno'],
    where : {username : req.body.username},
    
}).then(result =>{
    console.log('ps');
    console.log(result);
    return res.status(200).send(result);

}).catch(err =>{
    return res.status(500).send({ message: err.message });

});
    } else {

        ep.findAll({
            attributes:['merchant_name', 'username', 'merchant_acctno', 'bill_amount', 'recPeriod'],
            where : {username : req.body.username}
        }).then(result =>{
            console.log('ps');
            //console.log(result);
            return res.status(200).send(result);
        
        }).catch(err =>{
            return res.status(500).send({ message: err.message });
        
        });

    }
    

};


exports.searchBillsPaid = (req, res) => {
    const user = req.query.user;
    const timePeriod = req.query.date;
    ep.findAll({
        attributes: ['bill_amount', 'recPeriod','merchant_name'],
        where: {
            [Op.and]: [
                {createdAt: {
                    [Op.gte]: moment().subtract(timePeriod, 'months').toDate()
                }},
              { username: user }
            ]
        }
    }).then(search => {
        return res.status(200).send(search);
    }).catch(err => {
        return res.status(500).send({ message: err.messge});
    });  
};


// Retrieve all payee from the database.
exports.payBill = (req, res) => {

        var acntBalance = 0;
        var payAmount = req.body.billAmount;
        var username = req.body.username;
        var merchantAcctno = req.body.mAcctNo;
        var merchantName = req.body.mName;
        var recPeriod = req.body.recPeriod;
        console.log(req.body.username);
        console.log(req.body.billAmount);
        console.log(req.body.mName);
        //console.log('end data');
        /*
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
              ep.create(
                {merchant_name: merchantName, username: username, merchant_acctno: merchantAcctno, bill_amount: payAmount}
             );
             return res.status(200).send('sucess');
            });
            */
        
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
                ep.create(
                    {merchant_name: merchantName, username: username, merchant_acctno: merchantAcctno, bill_amount: payAmount, recPeriod: recPeriod}
                )
                .then(transaction => {
                    return res.status(200).send('success');
                 }).catch(err => {
                    res.status(500).send({ message: err.message });
                 });
                //return res.status(200).send('sucess');
                
                
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
                
