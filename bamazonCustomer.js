require("dotenv").config();
// require("console.table");
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


function customer() {
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
                        console.log(check.item);
                        console.log("Fortunately, we have enough stock")
                        var totalPrice = res[i].price * check.quantity;
                        console.log("Your total is: $" + totalPrice);

                        //Update quantity
                        connection.query("UPDATE products SET ? WHERE ?",
                            [
                                {
                                    stock_quantity: res[i].stock_quantity - check.quantity
                                },
                                {
                                    id: check.item
                                }
                            ],

                            //Show updated table
                            function (error, response) {
                                if (error) throw error;
                                console.log("Stock quantity has been updated");
                                connection.query("SELECT * FROM products", function (error, response) {
                                    if (error) throw error;
                                    console.table(response);
                                }),
                                    connection.commit();
                                connection.end();
                            })
                    }
                    else {
                        console.log("Insufficient quantity!");
                        connection.end();
                    }
                }
            }
        })
    });
}

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as ID: " + connection.threadId);
    customer();
})

// loadProducts()
// promptCustomerForItem(res)
// checkInventory()
// loadProducts()
// promptCustomerForQuantity(product)
// checkIfShouldExit()
// makePurchase(product, quantity)
    // UPDATE products SET .... 
// loadProducts()

