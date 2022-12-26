import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

let remainingTime;
const btnStart = document.querySelector('button[data-start]');

const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        clearInterval(timerId);
        const selectedDate = selectedDates[0];
        remainingTime = selectedDate - new Date();
        if (remainingTime <=0) {
          Notiflix.Notify.failure('Please choose a date in the future');
          btnStart.setAttribute("disabled", true);
        }
        else {
          btnStart.removeAttribute("disabled");
        }
    },
};

const picker = document.querySelector("input#datetime-picker");
flatpickr(picker, options);

function addLeadingZero(value) {  
    return (value.toString()).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let timerId = null;

btnStart.addEventListener("click", () => {
    btnStart.setAttribute("disabled", true);
    timerId = setInterval(() => {
        remainingTime -= 1000;
        const convertedTime = convertMs(remainingTime);
        days.textContent = addLeadingZero(convertedTime.days);
        hours.textContent = addLeadingZero(convertedTime.hours);
        minutes.textContent = addLeadingZero(convertedTime.minutes);
        seconds.textContent = addLeadingZero(convertedTime.seconds);
    }, 1000);
});