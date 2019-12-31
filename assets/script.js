// 
const result = document.querySelector('.calculator__result p');
const resultTemp = document.querySelector('.calculator__result--temp p');
const keys = document.querySelector('.calculator__keys');

// Functions for operations:
function tempCalculation(calculArray) {
  tempCalcul = calculArray.join('');
  result.textContent = tempCalcul;
  try {
    let resultNumber = eval(tempCalcul);
    if (resultNumber.toString() != tempCalcul) {
      return resultNumber;
    } else {
      return '';
    }
  } catch (error) {
    console.log('operation incompleted');
  }
}

function displayCalculation() {
  // Array to contain the calculation
  let calculation = [];
  // Event listener
  keys.addEventListener('click',(e) => {
    e.preventDefault();
    // To make sure that the parent elements are ignored
    if (e.target.classList.contains('calculator__key')) {
      // if the chosen key is 'erase'
      if (e.target.textContent === '←'){
        calculation.pop();
        resultTemp.textContent = tempCalculation(calculation);

      // if the chosen key is 'reset'
      } else if (e.target.textContent === 'C'){
        calculation = [];
        result.textContent = '';
        resultTemp.textContent = '';
      
      // if the chosen key is 'equal'
      } else if (e.target.textContent === '='){
        result.textContent = tempCalculation(calculation);
        calculation = [];
        calculation.push(result.textContent);
        resultTemp.textContent = '';
      
      // if the chosen key is any other key
      } else {
        calculation.push(e.target.textContent);
        resultTemp.textContent = tempCalculation(calculation)
      }
    }
  } );
  
}

displayCalculation();

window.addEventListener('keydown', e => {
  console.log(e.key);
})
