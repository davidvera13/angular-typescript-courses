// basic decorator : @Logger
// will apply on function
// function Logger(constructor: Function) {
//     console.log("Logging ...")
//     console.info(constructor.name)
//     console.info(constructor)
// }

// decorator factory
function Logger(logName: string){
    console.log('##### LOGGER FACTORY');
    return function (constructor: Function) {
        console.log(logName);
        console.info(constructor.name)
        console.info(constructor)
    }
}


//function WithTemplate(templateContent: string, hookId: string) {
//    return function(constructor: any) {
//        const hookElt = document.getElementById(hookId);
//        const p = new constructor();
//        if (hookElt) {
//            hookElt.innerHTML = templateContent;
//            hookElt.querySelector('h2')!.textContent = p.name;
//        }
//    }
//}


function WithTemplate(templateContent: string, hookId: string) {
    console.log('##### TEMPLATE FACTORY');
    // if we don't need argument
    //return function (_: Function) {
    // <T extends { new(...args: any[])}: {}}>
    return function <T extends {new(...args: any[]): {name: string}}> (originalConstructor: T) {
        console.log('>> Rendering template');
        //const hookElt = document.getElementById(hookId);
        //const p = new originalConstructor();
        //if (hookElt) {
        //    hookElt.innerHTML = templateContent;
        //    hookElt.querySelector('h2')!.textContent = p.name;
        //}
        // we can return a new class or constructor
        return class extends originalConstructor {
            constructor(..._: any[]) {
            //constructor(...args: any[]) {
                super();
                //console.log('args: ', args);
                const hookElt = document.getElementById(hookId);
                if (hookElt) {
                    hookElt.innerHTML = templateContent;
                    hookElt.querySelector('h2')!.textContent = this.name;
                }
            }
        }
    }
}

// order depends on order of decorators are declared
@Logger('Logging-users')
@WithTemplate('<h1>From Decorator with Love</h1><h2></h2>', 'app')
class Person {
    name: string = 'David';

    constructor() {
        console.log('Creating person instance');
    }
}

const person = new Person();
console.log(person);


// Property Decorators
function Log(
    target: any,
    propertyName: string)  {
    console.log('##### Property decorator');
    console.log('target', target);
    console.log('propertyName', propertyName);
    console.log(' ');
}


// we can change deccriptor
function LogAccessors(
    target: any,
    name: string,
    descriptor: PropertyDescriptor) { //: PropertyDescriptor {
    console.log('##### Accessor decorator!');
    console.log('target', target);
    console.log('name', name);
    console.log('descriptor', descriptor);
    console.log(' ');
    //return {enumerable: true};
}

function LogMethods(
    target: any,
    name: string | Symbol,
    descriptor: PropertyDescriptor): PropertyDescriptor {
    console.log('##### Method decorator!');
    console.log('target', target);
    console.log('name', name);
    console.log('descriptor', descriptor);
    console.log(' ');
    return descriptor;
}

function LogParameter(
    target: any,
    name: string | Symbol,
    position: number) {
    console.log('##### Parameter decorator!');
    console.log('target', target);
    console.log('name', name);
    console.log('position', position);
}

class Product {
    @Log
    private _title: string;
    private _price: number;

    constructor(
        title: string,
        price: number) {
        this._title = title;
        this._price = price;
    }

    @LogAccessors
    set price(price: number) {
        if(price > 0) {
            this._price = price;
        } else {
            throw new Error("Invalid price - price must be greater than 0");
        }
    }

    @LogAccessors
    set title(title: string) {
        this._title = title;
    }

    get title(): string {
        return this._title;
    }

    @LogMethods
    getPriceWithVAT(@LogParameter tax: number) {
        return this._price * (1+ tax);
    }
}


// decorators are not used at run time
console.log('*********************')
const prod1 = new Product('Book', 17);
//const prod2 = new Product('Book 2', 19);
console.log(prod1);
console.log(prod1.getPriceWithVAT(0.20));

function Aubindind(
    _: any,
    __: string,
    descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    const updatedDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = method.bind(this);
            return boundFn.bind(descriptor);
        }
    }
    return updatedDescriptor;
}



class Printer {
    message = 'Printer works';
    @Aubindind
    showMessage() {
        console.log(this.message);
    }
}

const printer = new Printer();
const button = document.querySelector('button')!;
console.log(button);
// returns 'undefined if no Autobinding
button.addEventListener('click', printer.showMessage)
// we need binding
button.addEventListener('click', printer.showMessage.bind(printer));


// adding validators
function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    };
}

function validate(obj: any) {
    // retrieve configurations
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    // if nothing to validate, return true
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    console.log('required test on : ', obj[prop])
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    console.log('positive test on : ', obj[prop])
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

interface ValidatorConfig {
     [propertyName: string]: {
         [propertyName: string]: string[]; // price: [ 'required', 'positive'...]
     };
}

const registeredValidators: ValidatorConfig = {};

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(title: string, price: number) {
        this.title = title;
        this.price = price;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    // get values
    const titleElt = document.getElementById('title') as HTMLInputElement;
    const priceElt = document.getElementById('price') as HTMLInputElement;
    // we miss validation logic: we can send data without values ..
    const title = titleElt.value;
    const price = Number(priceElt.value);

    const createdCourse = new Course(title, price);
    if(!validate(createdCourse)) {
        throw new Error('Invalid values');
    }
    console.log(createdCourse);
})