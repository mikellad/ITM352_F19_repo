// Author: Mikella Dragna
// Date: 11/14/19
// Description: invoice page with calculations


// exports this function so server.js can access it
module.exports = {
    // creates invoice function
    createInvoice: function (data, taxPercent, shippingPercent) {
        let htmlTemplate = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Invoice</title>
                <link rel='stylesheet' type='text/css' href='/invoice-style.css'>
                <link href="https://fonts.googleapis.com/css?family=Playfair+Display&display=swap" rel="stylesheet">
                </head>
            <body>
                <div class="container">
                <h1 style="text-align: center;">Thank you for your purchase :-)</h1>
                    !!invoice!!
                </div>
            </body>
            </html>
        `;

        // formatting the table label coloumns
        let tableTemplate = `
            <table>
                <tbody>
                <tr>
                <th style="text-align: center;" colspan="3">Item</th>
                <th style="text-align: center;" colspan="1">Qty</th>
                <th style="text-align: center;" colspan="1">Unit Price</th>
                </tr>
                !!data!!
                </tbody>
            </table>
        `;

        //formatting the rows uder the columns above 
        let subtotal = 0;
        let tableRows = ``;
        data.forEach(purchase => {
            //calculate for subtotal 
            let extendedPrice = purchase.amtPurchased * purchase.price;
            subtotal += extendedPrice;
            tableRows += `
            <tr>
            <td style="text-align: center;" colspan="3">${purchase.item}</th>
            <td style="text-align: center;" colspan="1">${purchase.amtPurchased}</th>
            <td style="text-align: center;" colspan="1">$${purchase.price}</th>
            </tr>
        `;
        });

        // calculate tax & shipping
        let tax = subtotal * taxPercent;
        let shipping = subtotal * shippingPercent;
        let total = subtotal + tax + shipping;

        // add subtotal to table
        tableRows += `
            <tr>
                <td colspan="4" align="right"><strong>Subtotal</strong></td>
                <td colspan="1">$${subtotal.toFixed(2)}</td>
            </tr>
        `;

        // calculate tax and add tax to table 
        tableRows += `
            <tr>
                <td colspan="4" align="right">Tax @ ${(taxPercent * 100).toFixed(2)}</td>
                <td colspan="1">$${tax.toFixed(2)}</td>
            </tr>
        `;

        // add shipping to table
        tableRows += `
            <tr>
                <td colspan="4" align="right">Shipping @ ${(shippingPercent * 100).toFixed(2)}</td>
                <td colspan="1">$${shipping.toFixed(2)}</td>
            </tr>
        `;

        // add total to table
        tableRows += `
            <tr>
                <td colspan="4" align="right"><strong>Total</strong></td>
                <td colspan="1">$${total.toFixed(2)}</td>
            </tr>
        `;

        // Put the table rows in tableTemplate
        tableTemplate = tableTemplate.replace('!!data!!', tableRows);

        // Put the table in to the htmlTemplate
        let htmlTem = htmlTemplate.replace('!!invoice!!', tableTemplate);

        // return the page
        return htmlTem;
    }
};