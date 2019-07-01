require("dotenv").config();
var inquirer = require("inquirer");
var mysql = require("mysql");

//Connecting mysql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.db_password,
    database: "bamazon_db"
});


function afterConnection() {
    //Get data and display on terminal
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);

        //Displaying 2 questions
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
            //Check quantity of product
            for (var i = 0; i < res.length; i++) {
                if (check.item == res[i].id) {
                    if (res[i].stock_quantity >= check.quantity) {
                        console.log("Fortunately, we have enough stock")
                        connection.query("DELETE FROM products WHERE?",
                            {
                                id: res[i]
                            },
                            function (error, response) {
                                if (error) throw error;
                                console.log(response.affectedRows + " products deleted!");
                            })
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