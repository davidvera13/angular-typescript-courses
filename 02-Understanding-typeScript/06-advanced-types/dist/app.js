"use strict";
var _a;
let employee1WithPrivilege = {
    name: "John Steed",
    authorities: ['create-server'],
    startDate: new Date()
};
let employee2WithPrivilege = {
    name: "Emma Peel",
    authorities: ['stop-server'],
    startDate: new Date()
};
let employee3WithPrivilege = {
    name: "Tara King",
    authorities: ['start-server'],
    startDate: new Date()
};
console.log("employee1WithPrivilege", employee1WithPrivilege);
console.log("employee2WithPrivilege", employee2WithPrivilege);
console.log("employee3WithPrivilege", employee3WithPrivilege);
console.log("*************************");
function add(n1, n2) {
    if (typeof n1 === "string" || typeof n2 === "string") {
        return n1.toString() + " " + n2.toString();
    }
    return n1 + n2;
}
console.log(add(2, 3));
console.log(add("Hello", "World"));
let employee = {
    name: "John Wick",
    startDate: new Date()
};
function printEmployeeInformation(emp) {
    console.log('employee name : ', emp.name);
    if ('authorities' in emp) {
        console.log('emp.authorities', emp.authorities);
    }
    if ('startDate' in emp) {
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
class Car {
    drive() {
        console.log("Drive car");
    }
}
class Truck {
    drive() {
        console.log("Drive truck");
    }
    loadCargo(qty) {
        console.log("Loading truck with " + qty + " kg.");
    }
}
let v1 = new Car();
let v2 = new Truck();
function useVehicle(vehicle) {
    vehicle.drive();
    if ('loadCargo' in vehicle) {
        vehicle.loadCargo(1250);
    }
    if (vehicle instanceof Truck) {
        vehicle.loadCargo(222);
    }
}
console.log("*************************");
useVehicle(v1);
console.log("*************************");
useVehicle(v2);
console.log("*************************");
function moveAnimal(animal) {
    switch (animal.type) {
        case "Bird":
            console.log("Flying with speed : " + animal.flyingSpeed);
            break;
        case "Horse":
            console.log("Running with speed : " + animal.runningSpeed);
            break;
    }
}
moveAnimal({ type: "Bird", flyingSpeed: 13 });
moveAnimal({ type: "Horse", runningSpeed: 42 });
const paragraph = document.querySelector('p');
const paragraphMessage = document.getElementById('message');
const userInputElt = document.getElementById('userInput');
const userInputEltLegacy = document.getElementById('userInput');
document.getElementById('userInput').value = "Hello World";
console.log("userInputElt", userInputElt.value);
console.log("userInputEltLegacy", userInputEltLegacy.value);
let errors = {
    id: '12354',
    email: 'email is required',
    telephone: 'telephone is required',
    address: 'address is required'
};
console.log("*************************");
console.log(errors);
function doSum(n1, n2) {
    if (typeof n1 === "string" || typeof n2 === "string") {
        return n1.toString() + " " + n2.toString();
    }
    return n1 + n2;
}
const res = doSum('Frank', 'black');
let split = res.split(' ');
console.log(doSum("1", "2"));
console.log(doSum(3, 4));
console.log(doSum(5, "6"));
console.log(doSum("7", 8));
const fetchedUserData = {
    id: '123',
    name: 'Mad Max',
    job: { title: 'Software engineer', incomes: '40k', description: 'Java Expert' },
};
console.log("fetchedUserData", fetchedUserData);
console.log("job title", (_a = fetchedUserData === null || fetchedUserData === void 0 ? void 0 : fetchedUserData.job) === null || _a === void 0 ? void 0 : _a.title);
const userInput1 = '';
const storedElt1 = userInput1 || 'DEFAULT';
const userInput2 = null;
const storedElt2 = userInput2 || 'DEFAULT';
const userInput3 = '';
const storedElt3 = userInput3 !== null && userInput3 !== void 0 ? userInput3 : 'DEFAULT';
const userInput4 = null;
const storedElt4 = userInput4 !== null && userInput4 !== void 0 ? userInput4 : 'DEFAULT';
const userInput5 = undefined;
const storedElt5 = userInput5 !== null && userInput5 !== void 0 ? userInput5 : 'DEFAULT';
console.log('storedElt1', storedElt1);
console.log('storedElt2', storedElt2);
console.log('storedElt3', storedElt3);
console.log('storedElt4', storedElt4);
console.log('storedElt5', storedElt5);
//# sourceMappingURL=app.js.map