// unknown
let userInput: unknown;
let username: string;

userInput = 5;
console.log(userInput);
userInput = "Fox Mulder";
console.log(userInput);
//TS2322: Type unknown is not assignable to type string
//username = userInput;
if(typeof userInput === "string") {
    username = userInput;
}

// never
function generateError(
    message: string,
    code: number): never {
    throw { message, code };
}
let exception = generateError("Ooops something went wrong", 500);
console.error('exception never displayed: ' + exception);

