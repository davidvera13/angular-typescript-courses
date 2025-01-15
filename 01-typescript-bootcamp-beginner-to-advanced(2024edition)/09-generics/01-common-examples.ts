// lib that uses generics
const numbers = new Array<number>();
numbers.push(100);
// TS2345: Argument of type string is not assignable to parameter of type number
// numbers.push("Hello")

// other lib that uses generics
const promise = new Promise<string>(
    (resolve, reject) =>
        resolve("Hello World"));

promise.then(val => {
})