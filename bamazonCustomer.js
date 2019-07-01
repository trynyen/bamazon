require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.db_password,
    database: "bamazon_db"
});


function afterConnection() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);
        inquirer.prompt([
            {
                type: "input",
                message: "Which product would you like to buy?",
                name: "item"
            },
            {
                type: "input",
                message: "How many units would you like to buy?",
                name: "quantity"
            },
        ]).then(function (check) {
            for (var i = 0; i < res.length; i++) {
                if (check.item == res[i].id) {
                    if (res[i].stock_quantity >= check.quantity) {
                        console.log("Fortunately, we have enough stock")
                    }
                    else {
                        console.log("Insufficient quantity!")
                    }
                }
            }
        })
        connection.end();
    });
}

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as ID: " + connection.threadId);
    afterConnection();
})