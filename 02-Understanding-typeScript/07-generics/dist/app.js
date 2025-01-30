"use strict";
const arr = [1, 2, 3];
const names = ["John Steed", "Emma Peel", "Cathy Gale"];
names[0].split(" ").forEach(elt => { console.log(elt); });
const promise = new Promise((resolve, reject) => {
    let random = Math.floor(Math.random() * 10);
    if (random >= 0) {
        setTimeout(() => {
            resolve("This is completed");
        }, 500);
    }
    else {
        reject("I crashed");
    }
});
function merge(eltA, eltB) {
    return Object.assign(eltA, eltB);
}
console.log(merge({ firstName: 'Walter', lastName: 'Skinner' }, { age: 45 }));
const mergedData = merge({ firstName: 'Walter', lastName: 'Skinner' }, { age: 45 });
console.log("mergedData.firstName", mergedData.firstName);
console.log("mergedData.lastName", mergedData.lastName);
console.log("mergedData.age", mergedData.age);
console.log("******************");
console.log(merge({ firstName: 'Walter', lastName: 'Skinner' }, 45));
function mergeWithConstraints(eltA, eltB) {
    return Object.assign(eltA, eltB);
}
console.log(mergeWithConstraints({ firstName: 'Walter', lastName: 'Skinner' }, { age: 46 }));
console.log("******************");
function countAndPrint(element) {
    let description = 'Got no elements';
    if (element.length == 1)
        description = 'Got 1 element';
    if (element.length > 1)
        description = 'Got ' + element.length + ' elements';
    return [element, description];
}
console.log(countAndPrint(''));
console.log(countAndPrint([]));
console.log(countAndPrint('?'));
console.log(countAndPrint(['wow']));
console.log(countAndPrint('Is there anybody out there!'));
console.log(countAndPrint(['Is there anybody out there!', 'Another brick in the Wall', 'Wish you were here']));
function extractConstraint(obj, key) {
    return obj[key];
}
extractConstraint({ 'name': 'Fox Mulder' }, 'name');
class DataStorage {
    constructor() {
        this.data = [];
    }
    addItem(item) {
        this.data.push(item);
    }
    removeItem(item) {
        this.data.splice(this.data.indexOf(item), 1);
    }
    getItems() {
        return [...this.data];
    }
}
const textStorage = new DataStorage();
textStorage.addItem('John');
textStorage.addItem('Paul');
textStorage.addItem('George');
textStorage.addItem('Ringo');
textStorage.removeItem('George');
console.log(textStorage.getItems());
const numberStorage = new DataStorage();
numberStorage.addItem(3);
numberStorage.addItem(14);
numberStorage.addItem(156);
numberStorage.addItem(13);
numberStorage.removeItem(13);
console.log(numberStorage.getItems());
const item = { name: 'Walter' };
function createCourseGoal(title, description, startedAt) {
    let courseGoal = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.startedAt = startedAt;
    return courseGoal;
}
const people = ['John', 'Paul', 'George'];
//# sourceMappingURL=app.js.map