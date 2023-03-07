
const form = document.querySelector('.form');
const delayEl = document.querySelector('input[name="delay"]');
const stepEl = document.querySelector('input[name="step"]');
const amountEl = document.querySelector('input[name="amount"]');
const btnCreatePromise = document.querySelector('button[type="submit"]');

function createPromise(position, delayEl) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve({ position, delayEl });
      } else {
        reject({ position, delayEl });
      }
    }, delayEl);
  });

  return promise;
}

btnCreatePromise.addEventListener('click', e => {
  e.preventDefault();
  let firstDelay = +delayEl.value;
  let delayStep = +stepEl.value;

  for (let i = 0; i < amountEl.value; i += 1) {
    createPromise(1 + i, firstDelay + i * delayStep)
      .then(({ position, delayEl }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delayEl}ms`);
      })
      .catch(({ position, delayEl }) => {
        console.log(`❌ Rejected promise ${position} in ${delayEl}ms`);
      });
  }

  form.reset();
});