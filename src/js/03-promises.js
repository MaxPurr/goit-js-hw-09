import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    const obj = { position, delay }
    setTimeout(() => {
      if (shouldResolve) {
        resolve(obj);
      } else {
        reject(obj);
      }
    }, delay);
  });
  return promise;
}

const form = document.querySelector("form.form");
const delay = form.elements["delay"];
const step = form.elements["step"];
const amount = form.elements["amount"];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const delayV = Number(delay.value);
  const stepV = Number(step.value);
  const amountV = Number(amount.value);
  for (let i = 0; i < amountV; i += 1){
  createPromise(i + 1, delayV + stepV * i)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  });
  }
 });

