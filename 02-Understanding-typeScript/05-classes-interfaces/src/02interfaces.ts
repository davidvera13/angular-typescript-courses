interface Engineer {
    name: string;
    age: number;

    greet(name: string): void;
}

let engineer: Engineer;
engineer = {
    name: "John Steed",
    age: 55,
    greet(message: string) {
        console.log(message + " " + this.name);
    }
}

engineer.greet("Hello");

// Using Interfaces with Classes
interface Named {
    readonly name?: string;
    // Optional Parameters & Properties
    nickname?: string;
}

// multiple inheritance allowed on interfaces
interface Greetable extends Named {
    greet(content: string): void;
}

class Person implements Greetable { //, Named {
//class Person implements Greetable, Named {
    name?: string;
    age?: number;

    constructor(name?: string, age?: number) {
        if(name) {
            this.name = name;
        }
        if(age) {
            this.age = age;
        }
    }

    greet(message: string): void {
        if(this.name) {
            console.log(message + " " + this.name);
        } else {
            console.log("Hello");
        }
    }
}

let person: Person = new Person("Emma Peel", 30)
person.greet("Hello again ... ")
person.name = "Tara King";
person.greet("Hello again ... ")


// Interfaces as Function Types
type AddFn = (a: number, b: number) => number;
let add: AddFn;
add = (n1: number, n2: number) => n1 + n2;

interface AddInterface {
    // anonymour function in interface
    (a: number, b: number): number;
}
let operation: AddInterface;
operation = (n1: number, n2: number) => n1 + n2;

console.log(add(4, 6));
console.log(operation(4, 6));

let johnDoe: Person = new Person();
console.log(johnDoe);
johnDoe.greet("Hello you ... ");
johnDoe.name = "Tara King";
johnDoe.greet("Hello you ... ");
