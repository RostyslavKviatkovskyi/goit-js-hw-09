import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let isButtonStartActive = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates, dateStr, instance) {
    // console.log(selectedDates[0]);
    selectedDate = selectedDates[0];
  },
  onChange(selectedDates) {
    const DifferenceTime = selectedDates[0].getTime() - Date.now();
    if (DifferenceTime > 0 && !isButtonStartActive) {
      btnStartEl.setAttribute('disabled', '');
      checkActiveStartButton();
    }
    if (DifferenceTime <= 0) {
      window.alert('Please choose a date in the future');
      if (isButtonStartActive) {
        btnStartEl.removeAttribute('disabled', 'true');
        checkActiveStartButton();
      }
    }
  },
};

function checkActiveStartButton() {
  if (isButtonStartActive) {
    btnStartEl.setAttribute('disabled');
    return;
  } else {
    btnStartEl.removeAttribute('disabled', 'true');
  }
}

const btnStartEl = document.querySelector('button[data-start]');
const timerOutput = document.querySelector('.timer');
const textInputEL = document.querySelector('#datetime-picker');

btnStartEl.addEventListener('click', onBtnStart);

flatpickr('#datetime-picker', options);

function onBtnStart() {
  startTimer();
  btnStartEl.setAttribute('disabled', 'false');
}

function startTimer() {
  textInputEL.setAttribute('disabled', 'true');
  const selectedDate = new Date(textInputEL.value);
  const selectedTimeMs = selectedDate.getTime();
  const intervalId = setInterval(() => {
    const deltaTime = selectedTimeMs - Date.now();

    if (deltaTime < 0 && deltaTime > -1000) {
      clearInterval(intervalId);
      textInputEL.removeAttribute('disabled', 'true');
    } else {
      updateTime(convertMs(deltaTime));
    }
  }, 1000);
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
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

  const getTime = { days, hours, minutes, seconds };
  return getTime;
}

function updateTime(dateObj) {
  const dateArray = Object.entries(dateObj);
  dateArray.forEach(([dataSelector, value], index) => {
    timerOutput.querySelector(`[data-${dataSelector}]`).textContent =
      addLeadingZero(value);
    if (dataSelector === 'days') {
      return;
    }
  });
}
