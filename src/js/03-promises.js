const formEl = document.querySelector('.form');
const firstDelayInputEl = document.querySelector('input[delay]');
const stepInputEl = document.querySelector('input[step]');
const amountInputEl = document.querySelector('input[amount]');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  event.preventDefault();
  const elements = event.currentTarget.elements;
  let delay = Number(elements.delay.value);
  let step = Number(elements.step.value);
  let amount = Number(elements.amount.value);

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
