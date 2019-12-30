// 
const result = document.querySelector('.calculator__result p');
const resultTemp = document.querySelector('.calculator__result p');
const keys = document.querySelector('.calculator__keys');

// Functions for operations:

function displayCalculation() {
  let calculation = [];
  keys.addEventListener('click',(e) => {
    if (e.target.textContent === '←'){
      calculation.pop();
      result.textContent = calculation.join('');
    } else if (e.target.textContent === 'C'){
      calculation = [];
      result.textContent = calculation.join('');
    } else {
      calculation.push(e.target.textContent);
      result.textContent = calculation.join('');
    }
  } );
  
}

displayCalculation();

window.addEventListener('keydown', e => {
  console.log(e.key);
})

