const numbers = [1, 2 ,3];

// get numbers array and add values
const moreNumbers = [
    ...numbers,
    4, 5, 6];

console.log(moreNumbers);


// we extract first, second and third  & fourth element from array
// assign to parameter
const [
    first,
    second,
    third, someOther] = moreNumbers;

console.log(first, second, third, someOther);