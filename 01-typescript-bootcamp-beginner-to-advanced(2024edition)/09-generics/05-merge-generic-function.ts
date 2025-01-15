const someData = {
    title: "Typescript Bootcamp",
    subtitle: "Learn the language, build practical projects",
    lessonsCount: 100
}

const moreData = {
    seqNo: 10,
    price: 100
}

// we want to add moreData properties and someData properties onto a third object
// we can do it manually (not cool)
// const expectedOutput = {
//     title: "Typescript Bootcamp",
//     subtitle: "Learn the language, build practical projects",
//     lessonsCount: 100,
//     seqNo: 10,
//     price: 100
// }


// we can use merge method that "merge" 2 objects onto a third one
export function merge<T, U>(obj1: T, obj2: U) {
    return Object.assign(obj1, obj2) as (T & U);
}

const merged = merge(someData, moreData);
console.log(merged)


const merged2 = merge(someData, "Hello");
console.log(merged2)