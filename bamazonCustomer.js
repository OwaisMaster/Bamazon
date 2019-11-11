const mysql = require("promise-mysql");
const inquirer = require("inquirer");
const config = require('./config.js');
const chalk = require('chalk');
require('console.table');
let response;
let inquirer2;

async function startBamazon() {
    const connection = await mysql.createConnection(config);
    connection.query('SELECT * FROM PRODUCTS').then((response) => {
        console.log(chalk.bold.underline.bgBlue.yellow('\r\nProducts Currently Available: \r\n'));
        for (var i = 0; i < response.length; i++) {
            let product = response[i];
            if (product.stock_quantity > 0) {
                let table = chalk.blue(`Id: ${chalk.red(product.item_id)} 
                Name: ${chalk.yellow(product.product_name)}
                Price: ${chalk.green('$' + product.price)} 
                Department: ${chalk.magenta(product.department_name)}\r\n`)
                console.table(table);
            }
        }
        inquirer2 = inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: "What is the ID of the item you would like to purchase?",

            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many of this product would you like to purchase?'
            }
        ]).then(input => {
            console.log(chalk.yellow('Processing Transaction...'));
            for (var i = 0; i < response.length; i++) {
                console.log("THIS WORKS");
                let product = response[i];
                let quantity = product.stock_quantity;
                if (input.id == product.item_id) {
                    if (quantity >= input.quantity) {
                        newQuantity = quantity - input.quantity;
                        connection.query(`UPDATE products SET stock_quantity=${product.stock_quantity - input.quantity} WHERE item_id=${product.item_id}`).then((response) => {
                            console.log("THIS DOESNT WORK");
                            connection.end();
                        })
                        console.log(chalk.blue("Your order has been placed for a total of ") + chalk.green('$' + input.quantity * product.price));

                    } else {
                        console.log('Insufficient quantity!');
                        connection.end();
                    }
                } break;
            }
        });
    })
};

startBamazon();