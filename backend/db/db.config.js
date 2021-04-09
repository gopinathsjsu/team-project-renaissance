module.exports = {
    HOST: "us-cdbr-east-03.cleardb.com",
    USER: "bb09506cf346d9",
    PASSWORD: "6fa6f07c",
    DB: "heroku_86e47758032069f",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  /*module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "root",
    DB: "online_banking_system",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };*/