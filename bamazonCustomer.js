require("dotenv").config();
// require("console.table");
var inquirer = require("inquirer");
var mysql = require("mysql");
var chalk = require("chalk");

//Connecting mysql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.db_password,
    database: "bamazon_db"
});


function customer() {
    //Get data and display on terminal
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.table(res);

        //Displaying 2 prompt questions
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
                //If prompt item = item id from product table
                if (check.item == res[i].id) {
                    //If current stock quantity >= prompt quantity
                    if (res[i].stock_quantity >= check.quantity) {

                        //Total price = price of item multilply by prompt quantity
                        var totalPrice = res[i].price * check.quantity;

                        //Update quantity
                        connection.query("UPDATE products SET ? WHERE ?",
                            [
                                //Updated stock quantity = current stock quantity - prompt quantity
                                {
                                    stock_quantity: res[i].stock_quantity - check.quantity
                                },

                                //Do calculation with the prompt item only
                                {
                                    id: check.item
                                }
                            ],

                            //Show table qith updated quantity
                            function (error, response) {
                                if (error) throw error;
                                console.log(chalk.magentaBright("Stock quantity has been updated"));
                                connection.query("SELECT * FROM products", function (error, response) {
                                    if (error) throw error;
                                    console.table(response);

                                    //Show total price
                                    console.log(chalk.cyanBright("Your total is: ") + "$" + totalPrice.toFixed(2));
                                }),

                                //Commit new data to update mysql database
                                connection.commit();
                                //End connection
                                connection.end();
                            })
                    }

                    //If current stock quantity is less than prompt quantity, log Insufficient quantity
                    else {
                        console.log(chalk.magentaBright("Insufficient quantity!"));
                        connection.end();
                    }
                }
            }
        })
    });
}

//Connect to database
connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as ID: " + connection.threadId);
    customer();
})
