// Built-in Generics
// array is a list of data of a specific type.
const arr: Array<number> = [1, 2, 3];
const names = ["John Steed", "Emma Peel", "Cathy Gale"];
// we can use string methods on array of string
names[0].split(" ").forEach(elt => { console.log(elt) });

const promise = new Promise<string>((resolve, reject) => {
    let random = Math.floor(Math.random() * 10);
    if(random >= 0){
        setTimeout(() => {
            resolve("This is completed");
        }, 500);
    } else {
        reject("I crashed");
    }
})

//promise.then(res => {
//    res.split(' ').forEach(elt => { console.log(elt) });
//});


// Custome Generics
function merge<T, U>(eltA: T, eltB: U) {
    return Object.assign(eltA!, eltB);
}

console.log(merge<{firstName: string, lastName: string}, {age: number}>({firstName: 'Walter', lastName: 'Skinner'}, {age: 45}));
const mergedData: {firstName: string, lastName: string, age: number} = merge({firstName: 'Walter', lastName: 'Skinner'}, {age: 45});
// i should be able to access object properties
console.log("mergedData.firstName", mergedData.firstName);
console.log("mergedData.lastName", mergedData.lastName);
console.log("mergedData.age", mergedData.age);

// constraints
console.log("******************");
// merge don't handle number value: result : {firstName: 'Walter', lastName: 'Skinner'}
console.log(merge({firstName: 'Walter', lastName: 'Skinner'}, 45));

function mergeWithConstraints<T extends object, U extends object>(eltA: T, eltB: U) {
    return Object.assign(eltA!, eltB);
}
// we have constraint on second generic type: number is nnot na object
//console.log(mergeWithConstraints({firstName: 'Walter', lastName: 'Skinner'}, 45))
console.log(mergeWithConstraints({firstName: 'Walter', lastName: 'Skinner'}, { age: 46}));


console.log("******************");
// other example
interface HasLengthObject {
    length: number;
}

function countAndPrint<T extends HasLengthObject>(element: T): [T, string] {
    let description = 'Got no elements';
    // how to be sure element has a length property ? meke T extends an interface that has length prop
    if(element.length == 1)
        description = 'Got 1 element';
    if(element.length > 1)
        description = 'Got ' + element.length + ' elements';
    return [element, description];
}
// number has no length property
// console.log(countAndPrint(1));
console.log(countAndPrint(''));
console.log(countAndPrint([]));
console.log(countAndPrint('?'));
console.log(countAndPrint(['wow']));
console.log(countAndPrint('Is there anybody out there!'));
console.log(countAndPrint(['Is there anybody out there!', 'Another brick in the Wall', 'Wish you were here']));

// keyof constraint
function extractConstraint<T extends object, U extends keyof T>(
    obj: T, key: U) {
    // TS7053: Element implicitly has an any type because expression of type string can't be used to index type {}
    // No index signature with a parameter of type string was found on type {
    return obj[key];
}

extractConstraint({ 'name': 'Fox Mulder'}, 'name');

// generic classes: T extends string numbers and booleans, it can't handle objects
class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data]
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('John');
textStorage.addItem('Paul');
textStorage.addItem('George');
textStorage.addItem('Ringo');
textStorage.removeItem('George');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(3);
numberStorage.addItem(14);
numberStorage.addItem(156);
numberStorage.addItem(13);
numberStorage.removeItem(13);
console.log(numberStorage.getItems());

// TS2344: Type object does not satisfy the constraint string | number | boolean
//const objStorage = new DataStorage<object>();
//objStorage.addItem({ name: 'John' });
//objStorage.addItem({ name: 'Paul' });
//objStorage.addItem({ name: 'George' });
//console.log(objStorage.getItems());
//objStorage.removeItem({ name: 'John' });
// object not removed
//console.log(objStorage.getItems());
const item = { name: 'Walter'};
//objStorage.addItem(item);
//console.log(objStorage.getItems());
//objStorage.removeItem(item);
//console.log(objStorage.getItems());


// some generic utilities
interface CourseGoal {
    title: string;
    description: string;
    startedAt: Date;
}

function createCourseGoal(
    title: string,
    description: string,
    startedAt: Date): CourseGoal {
    //return { title: title, description: description, startedAt: startedAt };
    // if key has same name as variables
    //return { title, description, startedAt };

    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.startedAt = startedAt;
    return courseGoal as CourseGoal;
}


// immutable
const people: Readonly<string[]> = ['John', 'Paul', 'George'];
// TS2339: Property push does not exist on type readonly string[]
//people.push('Ringo');
