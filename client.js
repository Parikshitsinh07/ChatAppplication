var socket = io("localhost:3000");

//   var messages = document.getElementById("messages");
var msgcantener = document.querySelector(".cantenar");
var form = document.getElementById("form");
var input = document.getElementById("input");
const append = (msg, posstion) => {
  const msgelement = document.createElement("div");
  msgelement.innerText = msg;
  msgelement.classList.add("massage");
  msgelement.classList.add(posstion);
  msgcantener.appendChild(msgelement);
};

const username = prompt("Eneter Your name ");
socket.emit("user", username);

socket.on("user-joined", (username) => {
  // append(`${username} is joined`, "right");
  alert(`${username} join a chet`);
});
socket.on("receive", (data) => {
  append(`${data.username}: ${data.msg}`, "left");
});
form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (input.value) {
    append(`You: ${input.value}`, "right");
    socket.emit("send", input.value);
    input.value = "";
  }
});
