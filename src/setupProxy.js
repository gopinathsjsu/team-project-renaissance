const proxy = require("http-proxy-middleware");

module.exports = function(app) {
    app.use(
        proxy("/home", {
            target: "http://localhost:4000", 
            secure: false,
            changeOrigin: true
        })
    );

    app.use(
        proxy("/profile", {
            target: "http://localhost:4000", 
            secure: false,
            changeOrigin: true
        })
    );

    app.use(
        proxy("/login", {
            target: "http://localhost:4000", 
            secure: false,
            changeOrigin: true
        })
    );
    
    app.use(
        proxy("/admin", {
            target: "http://localhost:4000", 
            secure: false,
            changeOrigin: true
        })
    );

    app.use(
        proxy("/adminlogin", {
            target: "http://localhost:4000", 
            secure: false,
            changeOrigin: true
        })
    );

    app.use(
        proxy("/register", {
            target: "http://localhost:4000", 
            secure: false,
            changeOrigin: true
        })
    );

    app.use(
        proxy("/createAccount", {
            target: "http://localhost:4000", 
            secure: false,
            changeOrigin: true
        })
    );

    app.use(
        proxy("/transfer", {
            target: "http://localhost:4000", 
            secure: false,
            changeOrigin: true
        })
    );

    app.use(
        proxy("/billpay", {
            target: "http://localhost:4000", 
            secure: false,
            changeOrigin: true
        })
    );

    app.use(
        proxy("/fetchTransactions", {
            target: "http://localhost:4000", 
            secure: false,
            changeOrigin: true
        })
    );
}

