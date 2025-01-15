// get html element based on id
// we know what element is expected: we can 'assert' that is more specifically an HTMLInputElement
const input = document.getElementById("input-field") as HTMLInputElement;

// we can access properties specific to HTMLInputElement
input.value;

// similar to casting: using assertions is more readable
const input2 = <HTMLInputElement> document.getElementById("input-field") as HTMLInputElement;
input2.value


const input3 = document.getElementById("input-field");
// there is no value property on HTMLElement
//input2.value;
(input3 as HTMLInputElement).value;

