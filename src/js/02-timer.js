import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const picker = document.querySelector('input');
const buttonStart = document.querySelector('button[data-start]');
const timerEl = document.querySelector('.timer');
const dayEl = document.querySelector('span[data-days]');
const hoursEL = document.querySelector('span[data-hours]');
const minutesEL = document.querySelector('span[data-minutes]');
const secondsEL = document.querySelector('span[data-seconds]');

let deltaTime;
let startTime;

buttonStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      alert('Please select date in a future');
    } else {
      buttonStart.disabled = false;
      startTime = selectedDates[0];
      console.log(startTime);
    }
  },
};

flatpickr('#datetime-picker', options);

function pad(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const StartTimer = () => {
  buttonStart.disabled = true;
  const updateTimerInterval = setInterval(() => {
    const currentTime = new Date();
    deltaTime = startTime.getTime() - currentTime;
    console.log(deltaTime);
    console.log(convertMs(deltaTime));
    const timeObj = convertMs(deltaTime);
    if (deltaTime <  1000) {
      clearInterval(updateTimerInterval);
      timerEl.style.color = 'red';
    }
    updateTimer(timeObj);

    
  }, 1000);
};

function updateTimer(timeObj) {
  dayEl.textContent = pad(timeObj.days);
  hoursEL.textContent = pad(timeObj.hours);
  minutesEL.textContent = pad(timeObj.minutes);
  secondsEL.textContent = pad(timeObj.seconds);
}

buttonStart.addEventListener('click', StartTimer);