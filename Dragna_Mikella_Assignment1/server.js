// Author: Mikella Dragna
// Date: 11/14/19
// Description: server with server side validation


// mostly from lab 13
var data = require('./public/product_data.js'); // assign the product data from the array into the variable products
var products = data.products; // stores products into variable products 
var path = require('path'); // load/create path module
var express = require('express'); // gets express package 
var app = express(); // starts express 
var myParser = require("body-parser"); // requires body parser to form data 
var fs = require('fs'); // allows to work with file system 
var invoice = require('./public/invoice.js'); // assign invoice data 

// from lab 13, logs the method and path into the console
app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next(); 
});

//from lab 13
app.use(myParser.urlencoded({ extended: true }));

//from lab 13, posts the process form data with the action as process_form 
app.post("/process_form", function (request, response) {
    process_quantity_form (request.body, response); 
});

// deliver index html file 
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// deliver product page html file 
app.get('/products_page', function(req, res) {
    res.sendFile(path.join(__dirname, './public/products_page.html'));
});

// endpoint to checkout the user 
app.post('/checkout', function(req, res) {
    // arrary to hold all errors 
    var error = [];
    // arrary to hold all products purchased 
    var purchases = [];
    // array to hold valid products purchased 
    var items = [];
    // finding products purchased  
    console.log(req.body)
    for (let item in req.body) {
        //if product is purchased then continue 
        if (req.body[item] == "Purchase!") {
            continue;
        }
        // find the products in inventory and return it
        var invIndex = products.findIndex(function(product){
            return item == product.model;
        });

// data validation 
items.push (+req.body[item])
//skip items with 0 or no quantity 
if (+req.body[item] == 0 || req.body[item] == ""){
    continue;
}
//If there are no errors, push the infotmation of the items purchased  
    if (isNonNegInt(req.body[item])){
        var itemPurchases = {amtPurchased: +req.body[item], item, price: products[invIndex].price };
        console.log(itemPurchases);
        purchases.push(itemPurchases)
    } 
    //push errors 
    else {
        error.push("Invalid Data!!");
    }
}

// if there is an error (non neg interger entered), then they will be sent to page with 'ERROR: Enter valid quantity :-(' with font and background  
if (error.length){
    res.send(`
    <head>
    <link href="server.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display&display=swap" rel="stylesheet">
    </head>
    <body style="background-color: pink;">
        <h1>ERROR: Enter valid quantity :-( </h1>
    </body>
    `);
// if there is an error (0 or no number), then they will be sent to page with 'ERROR: Must enter quantity :-(' with font and background  
} else if(items.every(function(element){return element == 0})){
    res.send(`
    <head>
    <link href="server.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display&display=swap" rel="stylesheet">
    </head>
    <body style="background-color: pink;">
    <h1> ERROR: Must enter quantity :-( </h1>
    </body>
    `)
// if no erroer then send the invoice with this tax and shipping rate 
} else {
    // defines tax and shipping rate 
    res.send(invoice.createInvoice(purchases, .0575, .0225))
}
}); 

// function of response to post the process form data
function process_quantity_form (POST, response){
    model = products[0]['model'];
    model_price = products[0]['price'];
}

// from lab 13
app.use(express.static('./public')); // retrives get request and look for file in public directory
app.listen(8080, () => console.log(`listening on port 8080`)); // the server listens on port 8080 and prints the imessage into the console 

//from lab order_page lab 13, function that returns errors
function isNonNegInt(q, return_errors = false) {
    errors = []; // assume no errors at first
    if(q == '') q =0; // handle blank inputs as if they are 0
    if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
    else if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
    else if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
    return return_errors ? errors : (errors.length == 0); //return error if there are errors
}