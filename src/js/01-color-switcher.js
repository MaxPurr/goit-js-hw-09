function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector("body");
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let timerId = null;

const changeСolor = () => {
  btnStart.setAttribute("disabled", true);
  btnStop.removeAttribute("disabled");
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
};

btnStart.addEventListener("click", changeСolor);

btnStop.addEventListener("click", () => {
    btnStart.removeAttribute("disabled");
    btnStop.setAttribute("disabled", true);
    clearInterval(timerId);
});

