// class KeyValue {
//     constructor(
//         public readonly key: any,
//         public readonly value: any) {
//     }
//
//     print() {
//         console.log(`key = ${this.key} value = ${this.value}`);
//     }
// }
var KeyValue = /** @class */ (function () {
    function KeyValue(key, value) {
        this.key = key;
        this.value = value;
    }
    KeyValue.prototype.print = function () {
        console.log("key = ".concat(this.key, " value = ").concat(this.value.toString()));
    };
    return KeyValue;
}());
var p1 = new KeyValue("1", 10);
var val1 = p1.value;
var p2 = new KeyValue(2, "Hello World");
var val2 = p2.value;
var course = {
    title: "Typescript Bootcamp",
    subtitle: "Learn the language, build practical projects",
    lessonsCount: 100
};
var p3 = new KeyValue("3", course);
var val3 = p3.value;
p1.print();
p2.print();
p3.print(); // print an object
