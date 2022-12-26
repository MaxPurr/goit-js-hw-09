function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector("body");
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let timerId = null;

function switchButtons(btn1, btn2) {
  btn1.setAttribute("disabled", true);
  btn2.removeAttribute("disabled");
}

const changeСolor = () => {
  switchButtons(btnStart, btnStop);
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

btnStart.addEventListener("click", changeСolor);

btnStop.addEventListener("click", () => {
    switchButtons(btnStop, btnStart);
    clearInterval(timerId);
});

