"use strict";
let engineer;
engineer = {
    name: "John Steed",
    age: 55,
    greet(message) {
        console.log(message + " " + this.name);
    }
};
engineer.greet("Hello");
class Person {
    constructor(name, age) {
        if (name) {
            this.name = name;
        }
        if (age) {
            this.age = age;
        }
    }
    greet(message) {
        if (this.name) {
            console.log(message + " " + this.name);
        }
        else {
            console.log("Hello");
        }
    }
}
let person = new Person("Emma Peel", 30);
person.greet("Hello again ... ");
person.name = "Tara King";
person.greet("Hello again ... ");
let add;
add = (n1, n2) => n1 + n2;
let operation;
operation = (n1, n2) => n1 + n2;
console.log(add(4, 6));
console.log(operation(4, 6));
let johnDoe = new Person();
console.log(johnDoe);
johnDoe.greet("Hello you ... ");
johnDoe.name = "Tara King";
johnDoe.greet("Hello you ... ");
//# sourceMappingURL=02interfaces.js.map