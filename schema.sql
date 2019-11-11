DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(45) NOT NULL,
department_name VARCHAR(45) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(10) NOT NULL,
primary key(item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Asus Laptop",'Electronics',1400,3),
("Bananas",'Food',2.75,10),
("Macbook", 'Electronics',2000,4),
("Iphone Xs Max", 'Phones',1100,5),
("Samsung Note 8", 'Phones',700,8),
("Apple Airpods Pro", 'Headphones',249.99,7),
("Zolo Liberty Wireless Earbuds", 'Headphones',99.99,6),
("Iphone 8", 'Phones',564.99,3),
("Call of Duty for PS4", 'Games',50,10),
("Boosted Electric Longboard", 'Electronics',1000,3),
("Meepo Electric Longboard", 'Electronics',419.99,5);

SELECT * FROM products;