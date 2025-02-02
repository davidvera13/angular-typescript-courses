"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function Logger(logName) {
    console.log('##### LOGGER FACTORY');
    return function (constructor) {
        console.log(logName);
        console.info(constructor.name);
        console.info(constructor);
    };
}
function WithTemplate(templateContent, hookId) {
    console.log('##### TEMPLATE FACTORY');
    return function (originalConstructor) {
        console.log('>> Rendering template');
        return class extends originalConstructor {
            constructor(..._) {
                super();
                const hookElt = document.getElementById(hookId);
                if (hookElt) {
                    hookElt.innerHTML = templateContent;
                    hookElt.querySelector('h2').textContent = this.name;
                }
            }
        };
    };
}
let Person = class Person {
    constructor() {
        this.name = 'David';
        console.log('Creating person instance');
    }
};
Person = __decorate([
    Logger('Logging-users'),
    WithTemplate('<h1>From Decorator with Love</h1><h2></h2>', 'app')
], Person);
const person = new Person();
console.log(person);
function Log(target, propertyName) {
    console.log('##### Property decorator');
    console.log('target', target);
    console.log('propertyName', propertyName);
    console.log(' ');
}
function LogAccessors(target, name, descriptor) {
    console.log('##### Accessor decorator!');
    console.log('target', target);
    console.log('name', name);
    console.log('descriptor', descriptor);
    console.log(' ');
}
function LogMethods(target, name, descriptor) {
    console.log('##### Method decorator!');
    console.log('target', target);
    console.log('name', name);
    console.log('descriptor', descriptor);
    console.log(' ');
    return descriptor;
}
function LogParameter(target, name, position) {
    console.log('##### Parameter decorator!');
    console.log('target', target);
    console.log('name', name);
    console.log('position', position);
}
class Product {
    constructor(title, price) {
        this._title = title;
        this._price = price;
    }
    set price(price) {
        if (price > 0) {
            this._price = price;
        }
        else {
            throw new Error("Invalid price - price must be greater than 0");
        }
    }
    set title(title) {
        this._title = title;
    }
    get title() {
        return this._title;
    }
    getPriceWithVAT(tax) {
        return this._price * (1 + tax);
    }
}
__decorate([
    Log
], Product.prototype, "_title", void 0);
__decorate([
    LogAccessors
], Product.prototype, "price", null);
__decorate([
    LogAccessors
], Product.prototype, "title", null);
__decorate([
    LogMethods,
    __param(0, LogParameter)
], Product.prototype, "getPriceWithVAT", null);
console.log('*********************');
const prod1 = new Product('Book', 17);
console.log(prod1);
console.log(prod1.getPriceWithVAT(0.20));
function Aubindind(_, __, descriptor) {
    const method = descriptor.value;
    const updatedDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = method.bind(this);
            return boundFn.bind(descriptor);
        }
    };
    return updatedDescriptor;
}
class Printer {
    constructor() {
        this.message = 'Printer works';
    }
    showMessage() {
        console.log(this.message);
    }
}
__decorate([
    Aubindind
], Printer.prototype, "showMessage", null);
const printer = new Printer();
const button = document.querySelector('button');
console.log(button);
button.addEventListener('click', printer.showMessage);
button.addEventListener('click', printer.showMessage.bind(printer));
function Required(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'required'] });
}
function PositiveNumber(target, propName) {
    var _a, _b;
    registeredValidators[target.constructor.name] = Object.assign(Object.assign({}, registeredValidators[target.constructor.name]), { [propName]: [...((_b = (_a = registeredValidators[target.constructor.name]) === null || _a === void 0 ? void 0 : _a[propName]) !== null && _b !== void 0 ? _b : []), 'positive'] });
}
function validate(obj) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    console.log('required test on : ', obj[prop]);
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    console.log('positive test on : ', obj[prop]);
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}
const registeredValidators = {};
class Course {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
}
__decorate([
    Required
], Course.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Course.prototype, "price", void 0);
const courseForm = document.querySelector('form');
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleElt = document.getElementById('title');
    const priceElt = document.getElementById('price');
    const title = titleElt.value;
    const price = Number(priceElt.value);
    const createdCourse = new Course(title, price);
    if (!validate(createdCourse)) {
        throw new Error('Invalid values');
    }
    console.log(createdCourse);
});
//# sourceMappingURL=app.js.map