// Intersection types
// 3 solutions :
// 1. With interfaces
// 2. With types
// 3. With interfaces and type
type Admin = { name: string; authorities: string[] };
type Employee = { name: string; startDate: Date };

// also can be managed with interfaces
interface IAdmin {
    name: string;
    authorities: string[]
}
interface IEmployee {
    name: string;
    startDate: Date
}

interface IElevatedEmployeeV1 extends IAdmin, IEmployee{

}

type ElevatedEmployee = Admin & Employee;
type IElevatedEmployeeV2 = IAdmin & IEmployee;

let employee1WithPrivilege: ElevatedEmployee = {
    name: "John Steed",
    authorities: ['create-server'],
    startDate: new Date()
}

let employee2WithPrivilege: IElevatedEmployeeV1 = {
    name: "Emma Peel",
    authorities: ['stop-server'],
    startDate: new Date()
}

let employee3WithPrivilege: IElevatedEmployeeV2 = {
    name: "Tara King",
    authorities: ['start-server'],
    startDate: new Date()
}

console.log("employee1WithPrivilege", employee1WithPrivilege);
console.log("employee2WithPrivilege", employee2WithPrivilege);
console.log("employee3WithPrivilege", employee3WithPrivilege);

console.log("*************************");
type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

// Type guards
function add(n1: Combinable, n2: Combinable): any {
    // typeof is a type guard
    if (typeof n1 === "string" || typeof n2 === "string") {
        return n1.toString() + " " + n2.toString();
    }
    return n1 + n2;
}

console.log(add(2, 3));
console.log(add("Hello", "World"));

type UnknownEmployee = Employee | Admin;

let employee: Employee | undefined = {
    name: "John Wick",
    startDate: new Date()
}

function printEmployeeInformation(emp: UnknownEmployee): void {
    console.log('employee name : ', emp.name);
    if ('authorities' in emp) {
        // it's an instance of Admin
        console.log('emp.authorities', emp.authorities);
    }
    if('startDate' in emp) {
        // instance of Employee
        console.log('emp.startDate', emp.startDate);
    }

}
printEmployeeInformation(employee1WithPrivilege);
console.log("*************************");
printEmployeeInformation(employee2WithPrivilege);
console.log("*************************");
printEmployeeInformation(employee3WithPrivilege);

console.log("*************************");
printEmployeeInformation(employee);

// using instance of
class Car {
    drive() {
        console.log("Drive car");
    }
}

class Truck {
    drive() {
        console.log("Drive truck");
    }

    loadCargo(qty: number) {
        console.log("Loading truck with " + qty + " kg.");
    }
}


type Vehicle = Car | Truck;
let v1 = new Car();
let v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();
    if('loadCargo' in vehicle) {
       vehicle.loadCargo(1250);
    }
    if(vehicle instanceof Truck) {
        vehicle.loadCargo(222);
    }
}
console.log("*************************");
useVehicle(v1);
console.log("*************************");
useVehicle(v2);
console.log("*************************");

// discriminated unions
interface Bird {
    // we declare litteral type
    type: "Bird";
    flyingSpeed: number;
}
interface Horse {
    // we declare litteral type
    type: "Horse";
    runningSpeed: number;
}
type Animal = Bird | Horse;

function moveAnimal(animal: Animal ) {
    switch (animal.type) {
        case "Bird":
            console.log("Flying with speed : " + animal.flyingSpeed);
            break;
        case "Horse":
            console.log("Running with speed : " + animal.runningSpeed);
            break;
    }
}

moveAnimal({type: "Bird", flyingSpeed: 13});
moveAnimal({type: "Horse", runningSpeed: 42});

// type casting
const paragraph = document.querySelector('p');                        // HTMLParagraphElement | null
const paragraphMessage = document.getElementById('message');                 // HTMLElement | null
const userInputElt = document.getElementById('userInput')! as HTMLInputElement;               // HTMLElement ? we can get value from input
const userInputEltLegacy = <HTMLInputElement> document.getElementById('userInput')! ;         // HTMLElement ? we can get value from input

(document.getElementById('userInput')! as HTMLInputElement).value = "Hello World"
// TS2339: Property value does not exist on type HTMLElement without casting
console.log("userInputElt", userInputElt.value);
console.log("userInputEltLegacy", userInputEltLegacy.value);

// index properties
interface ErrorContainer {
    // Key can have any name and the property accepts a string as value
    [key: string]: string;

}

let errors: ErrorContainer = {
    id: '12354',
    email: 'email is required',
    telephone: 'telephone is required',
    address: 'address is required'

};
console.log("*************************");
console.log(errors);

// function overloads
// we defined same method with overloads
function doSum(n1: number, n2: number): number
// we have 2 string and this signature is used
function doSum(n1: string, n2: string): string
// we have a string and a number this signature is used
function doSum(n1: string, n2: string): string
function doSum(n1: string, n2: number): string
function doSum(n1: number, n2: string): string
function doSum(n1: Combinable, n2: Combinable): any {
    // typeof is a type guard
    if (typeof n1 === "string" || typeof n2 === "string") {
        return n1.toString() + " " + n2.toString();
    }
    return n1 + n2;
}


// should return a string
const res = doSum('Frank', 'black');
let split = res.split(' ');

// overloads cases :
console.log(doSum("1", "2"));
console.log(doSum(3, 4));
console.log(doSum(5, "6"));
console.log(doSum("7", 8));

// optional chaining

const fetchedUserData = {
    id: '123',
    name: 'Mad Max',
    job: { title: 'Software engineer', incomes: '40k', description: 'Java Expert' },
}

console.log("fetchedUserData", fetchedUserData);

console.log("job title", fetchedUserData?.job?.title);

// Nullish Coalescing
//const userInput = null;
const userInput1 = '';
const storedElt1 = userInput1 || 'DEFAULT';
const userInput2 = null;
const storedElt2 = userInput2 || 'DEFAULT';

// ?? is Nullish coalescing
const userInput3 = '';
const storedElt3 = userInput3 ?? 'DEFAULT';

const userInput4 = null;
const storedElt4 = userInput4 ?? 'DEFAULT';

const userInput5 = undefined;
const storedElt5 = userInput5 ?? 'DEFAULT';

console.log('storedElt1', storedElt1);
console.log('storedElt2', storedElt2);
console.log('storedElt3', storedElt3);
console.log('storedElt4', storedElt4);
console.log('storedElt5', storedElt5);