# Bamazon

Once ```node bamazonCustomer.js``` is ran it will show you all currently available products and you will be prompted to pick a product by its ID. Once the ID is entered, you will be prompted for the quantity you would like to purchase. If quantity is available, your order will be placed and you will be asked if you want to continue.

![Successful Transaction](/images/bamazonsuccessNocontinue.gif)


If quantity is unavailable then you will be informed and your order will be canceled. Then the user is prompted again whether they want to continue. If they choose to continue the products will be displayed again and the prompt restarts. If they want to quit shopping at any moment, entering 'x' will shutdown the program.

![Insufficent Quantity](/images/bamazonInsufficent.gif)