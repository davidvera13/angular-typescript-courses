// enumerations
enum Authorities {
    // default value are numbers we can set values as string
    ROLE_SUPER_ADMIN= 'ROLE_SUPER_ADMIN',
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_USER = 'ROLE_USER',
    ROLE_GUEST = 'ROLE_GUEST'
}

// object
interface Person {
    // we define a type: type is not exported in js
    name: string;
    age: number;
    occupation: string;
    hobbies: string[];
    // declaring an array : it would allow person.role.push('Writer')
    //role: (string | number)[];
    // declaring a tuple
    role: [number, string];
    authorities: Authorities[];
}

// we can define type expected as object
const john: Person = {
    name: "John Steed",
    age: 52,
    occupation: "Spy",
    hobbies: [ "Sport", "Cooking", "Java Development", "JavaScript" ],
    role: [2, 'Administrator'],
    authorities: [
        Authorities.ROLE_SUPER_ADMIN,
        Authorities.ROLE_ADMIN],
}

// this will work and we don't expect it to allow it because we expect a tuple...
john.role.push("123");
// we can define type expected ...
const emma: {
    name: string,
    age: number,
    occupation: string ,
    gender: string,
    authorities: Authorities[]} = {
    name: "Emma Peel",
    age: 26,
    occupation: "Spy",
    gender: "Female",
    authorities: [Authorities.ROLE_USER, Authorities.ROLE_GUEST],
}

console.log("John: ", john);
// TS2339: Property someProp does not exist on type
//console.log("object: ", person.someProp);
console.log("john name: ", john.name);

console.log("Emma: ", emma);
console.log("Emma name: ", emma.name);

let programmingSkills: string[] = ["JavaScript", "Python", "C#", "Java", "Spring"];
console.log("Programming Skills", programmingSkills);
// using for loop
for(let hobby of john.hobbies) {
    // hobby is of type string, so we access string methods
    console.log("Hobby: ", hobby.toUpperCase());
}