DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

-- Create product table
CREATE TABLE products (
id INT NOT NULL AUTO_INCREMENT,
item_id VARCHAR(65) NOT NULL,
product_name VARCHAR(65) NOT NULL,
department_name VARCHAR(65) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT NOT NULL,
PRIMARY KEY(id)
);

-- Add mock products
INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("B072L38SGT", "Dehydrated Water 16oz Can","Groceries", 10.99, 10);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("B01D961QI6", "Earthworm Jerky","Groceries", 13.99, 2);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("B00OAC9BUO", "Five Finger Hands Finger Puppets","Toys & Games", 5.98, 4);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("B015HM637E", "Extra Manly Bacon Scented Mustache","Toys & Games", 7.12, 4);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("B00533KOIC", "1500 Live Ladybugs","Garden & Outdoors", 6.50, 1);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("B01C4K7H5E", "Dog Wig Blonde Ponytail","Pet Supplies", 14.30, 6);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("B07RW258FY", "Cat Butt Tissue Dispenser ","Home & Kitchen", 49.99, 1);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("B0046GK1AI", "Boyfriend Pillow","Home & Kitchen", 34.73, 8);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("B00BC1GCOO", "Mullet Headband","Costumes & Accessories", 10.00, 6);

INSERT INTO products (item_id, product_name, department_name, price, stock_quantity)
VALUES ("B00QVWZ2P4", "Toe Exerciser","Heath & Household", 49.00, 2);

SELECT * FROM products;