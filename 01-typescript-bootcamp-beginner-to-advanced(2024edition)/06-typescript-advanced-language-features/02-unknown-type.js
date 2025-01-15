var anyValue;
anyValue = true;
anyValue = 10;
anyValue = "Hello World";
anyValue = [];
anyValue = {};
anyValue = null;
anyValue = undefined;
var value1 = anyValue;
var value2 = anyValue;
var value3 = anyValue;
var value4 = anyValue;
var value5 = anyValue;
var value6 = anyValue;
var value7 = anyValue;
var value8 = anyValue;
// close to any type
var unknownValue;
unknownValue = true;
unknownValue = 10;
unknownValue = "Hello World";
unknownValue = [];
unknownValue = {};
unknownValue = null;
unknownValue = undefined;
var value10 = unknownValue;
var value11 = unknownValue;
//Type unknown is not assignable to type boolean
//let value12: boolean = unknownValue;
// we need to make an if check on type before assignation
if (typeof unknownValue == "boolean") {
    var value12 = unknownValue;
}
//let value13: number = unknownValue;
if (typeof unknownValue == "string") {
    var value14 = unknownValue;
}
// let value14: string = unknownValue;
// let value15: object = unknownValue;
// let value16: any[] = unknownValue;
// let value17: Function = unknownValue;
