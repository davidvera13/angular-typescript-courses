const username = "Fox Mulder"
console.log("Hello " + username + "!!");
// appId is not used but no error is declared
let appId = "abc123";
// first button: document requires module commonjs
const button = document.querySelector("button")!;
button.addEventListener("click", () => { console.log(" clicked !!"); });

function clickHandler(message: string) {
    // TS6133: userName is declared but its value is never read.
    //let userName = 'John';
    console.log('Clicked! ' + message);
}

if (button) {
    button.addEventListener('click', clickHandler.bind(null, "You're welcome!"));
}


//noImplicitReturns: TS7030: Not all code paths return a value. fix by adding a return after if statement
function add(n1: number, n2: number) {
    if (n1 + n2 > 0) {
        return n1 + n2;
    }
    return;
}