const mysql = require("promise-mysql");
const inquirer = require("inquirer");
const config = require('./config.js');
const chalk = require('chalk');
require('dotenv').config();


async function startBamazon() {
    const connection = await mysql.createConnection(config);
    connection.query('SELECT * FROM PRODUCTS').then((response) => {
        console.log(chalk.bold.underline.bgBlue.yellow('\r\nProducts Currently Available: \r\n'));
        for (var i = 0; i < response.length; i++) {
            let product = response[i];
            if (parseInt(product.stock_quantity) > 0) {
                console.log(chalk.blue(`
                Id: ${chalk.red(product.item_id)} 
                Name: ${chalk.yellow(product.product_name)}
                Price: ${chalk.green('$' + product.price)} 
                Department: ${chalk.magenta(product.department_name)}
                Quantity: ${chalk.yellow(product.stock_quantity)}\r\n`));
            }
        }
        inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: `What is the ID of the item you would like to purchase? ${chalk.red(['Enter "x" to exit anytime'])}`,
                validate: function (val) {
                    if (val === "x") {
                        process.exit(0);
                    } else if (!isNaN(val)) {
                        return !isNaN(val);
                    };
                }
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'How many of this product would you like to purchase?',
                validate: function (val) {
                    return val > 0 || val.toLowerCase() === "x";
                }
            }
        ]).then(input => {
            if (input.id === 'x' || input.quantity === 'x') {
                process.exit(0);
            }
            console.log(chalk.yellow('Processing Transaction...'));
            for (var i = 0; i < response.length; i++) {
                let product = response[i];
                let quantity = product.stock_quantity;
                if (input.id == product.item_id) {
                    if (quantity >= input.quantity) {
                        newQuantity = quantity - input.quantity;
                        connection.query(`UPDATE products SET stock_quantity=${product.stock_quantity - input.quantity} WHERE item_id=${product.item_id}`).then((response) => {
                            connection.end();
                        })
                        console.log(chalk.blue.bgBlack("Your order has been placed for a total of ") + chalk.green('$' + input.quantity * product.price));
                        askContinue();
                    } else {
                        console.log(chalk.red.bold('Insufficient quantity!'));
                        askContinue();

                    }
                    break;
                };
            }
        });
    })
};


function askContinue() {
    inquirer.prompt([
        {
            type: 'confirm',
            name: 'exit',
            message: "Would you like to continue? [y/n]",
        }
    ]).then(input => {
        var choice = input.exit
        if (choice === false) {
            console.log(chalk.bold.underline.bgCyan.white("Keeping checking back for new products!"));
            process.exit(0);
        } else if (choice === true) {
            startBamazon();
        }
    })
};


startBamazon();