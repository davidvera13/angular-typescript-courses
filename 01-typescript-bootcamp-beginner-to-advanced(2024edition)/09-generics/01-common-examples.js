// lib that uses generics
var numbers = new Array();
numbers.push(100);
// TS2345: Argument of type string is not assignable to parameter of type number
// numbers.push("Hello")
// other lib that uses generics
var promise = new Promise(function (resolve, reject) {
    return resolve("Hello World");
});
promise.then(function (val) {
});
