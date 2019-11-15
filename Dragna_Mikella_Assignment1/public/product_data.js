// Author: Mikella Dragna
// Date: 11/14/19
// Description: product page to defined all products

var products = [
    {
        "model": "Lash Slick",
        "price": 16.00,
        "image": "./images/LashSlick.jpg"
    },
    {
        "model": "Boy Brow",
        "price": 16.00,
        "image": "./images/BoyBrow.jpg"
    },
    {
        "model": "Cloud Paint",
        "price": 18.00,
        "image": "./images/CloudPaint.jpg"
    },
    {
        "model": "Lip Gloss",
        "price": 14.00,
        "image": "./images/LipGloss.jpg"
    },
    {  
        "model":"Generation G",  
        "price": 18.00,  
        "image": "./images/GenG.jpg"
    }
// checks if products in the array are defined
]; 
if(typeof module != 'undefined') {
    module.exports.products = products;
  }