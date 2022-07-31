bodyEl = document.querySelector('body');
buttonStart = document.querySelector('button[data-start]');
buttonStop = document.querySelector('button[data-stop]');

buttonStart.addEventListener('click', onStartButtonClick);
buttonStop.addEventListener('click', onStopButtonClick);

let startInterval = null;

function onStartButtonClick() {
  buttonStart.disabled = true;
  startInterval = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopButtonClick() {
  buttonStart.disabled = false;
  clearInterval(startInterval);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
