const button = document.querySelector("button");
const input1 = document.getElementById("num1");
const input2 = document.getElementById("num2");

// not returning a sum but a concatenation
function add(num1, num2) {
  return num1 + num2;
}

button.addEventListener("click", function() {
  // value of input is always a string ...
  console.log(add(input1.value, input2.value));
});
