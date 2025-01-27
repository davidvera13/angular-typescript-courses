var button = document.querySelector("button");
// we are force to cast the constants and ! operator is a non-null assertion operator
// that tells the compiler that a variable or property is not null or undefined, and it should be treated as such
var input1 = document.getElementById("num1");
var input2 = document.getElementById("num2");
// we declare num1 & num2 as number
function add(num1, num2) {
    return num1 + num2;
}
button.addEventListener("click", function () {
    console.log(add(+input1.value, +input2.value));
});
