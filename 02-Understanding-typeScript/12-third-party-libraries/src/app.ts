// TS7016: Could not find a declaration file for module lodash.
import _ from 'lodash';
import 'reflect-metadata';
import {plainToInstance} from 'class-transformer'
import {validate} from 'class-validator'

import {Product} from "./product.model";
// this declares that value will be created somewhere (maybe in html file)...
declare var GLOBAL: any;

// let shuffle an array
console.log(_.shuffle([1, 2, 3, 4, 5]));
// TS2552: Cannot find name GLOBAL. Did you mean global?
console.log(GLOBAL);

let product = new Product("productSku", "productName", 17.85);
console.log(product);
console.log(product.getInformation());

// faking data retrieved from web.
// each element of the array do not have getInformation method
const products = [
    { id: '1', title: "Product 1", price: 12 },
    { id: '2', title: "Product 2", price: 5 },
    { id: '3', title: "Product 3", price: 18 },
    { id: '4', title: "Product 4", price: 3 }
]

// we have to convert onto mapped object to access this method: cumbersome ...
const loadedProducts = products.map(product => new Product(product.id, product.title, product.price))
loadedProducts.forEach(product => console.log(product.getInformation()));

console.log('**********************');
// we can use class transformer
const reloadedProducts = plainToInstance(Product, products);
reloadedProducts.forEach(product => console.log(product.getInformation()));

const newProduct = new Product('', '', -4);
console.log(newProduct.getInformation());
validate(newProduct).then(errors => {
    if (errors.length > 0) {
        console.log("Validation errors");
        console.log(errors);
    } else {
        console.log(newProduct.getInformation());
    }
})