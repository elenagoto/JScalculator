// 
const result = document.querySelector('.calculator__result p');
const resultTemp = document.querySelector('.calculator__result--temp p');
const keys = document.querySelector('.calculator__keys');
const keysList = document.querySelectorAll('.calculator__key');


// Variables to get the numbers 

let currentNumber = '';
let currentOperator = '';
let currentCalculation = [];
let currentResult = '';




// To manage the Keys containing numbers
function addNumber(number) {
  // Needs to add number to 'currentNumber', to 'calculation' and to 'displayCalculation'
  currentOperator = '';
  currentNumber = number;
  currentCalculation.push(number);
  console.log(currentCalculation);
}

// To manage the keys containing operators
function calculation(operator) {
  // Needs to add operator to 'currentOperator'
  // If there is no number the only operator to use is minus
  if (currentNumber !== '') {
    currentNumber = ''
    // if other operator and 'currentOperator' is not empty replaces the currentOperator in currentCalculation.
    if (operator !== '-' && currentOperator !== '') {
      currentOperator = operator;
      currentCalculation.pop();
      currentCalculation.push(operator);
    } else {
      currentOperator = operator;
      currentCalculation.push(operator);
    }
   // if operator is minus and the 'currentOpeartor' is not empty or number is empty, it is use as negative number instead of operator
  } else if (operator === '-' && (currentOperator != '' || currentNumber === '')) {
    currentNumber = operator;
    currentCalculation.push(operator);
  }
}

// To manage the keys other keys
function resultOrErase(changeKey) {
  // modify the current elements on the display
  // if erase -> remove last item on display calculation. If 
  if (changeKey === '←'){
    currentCalculation.pop();
    if (currentCalculation.length === 0) {
      currentResult = '';
      currentNumber = '';
      currentOperator = '';
    }

  // if the chosen key is 'reset'
  } else if (changeKey === 'C'){
    currentCalculation = [];
    currentResult = '';
    currentNumber = '';
    currentOperator = '';

  // if the chosen key is 'equal'
  } else if (changeKey === '='){
    currentCalculation = [];
    currentCalculation.push(currentResult);
    currentNumber = currentResult;
    currentResult = '';
    currentOperator = '';
    
  }
}

//  To get the temporary result to display on the 'resultTemp' div
function resultCalculation() {
  // eval method will display an error each time strign ends in an operator
  try {
    let number = eval(currentCalculation.join(''));
    if (number != undefined) {
      currentResult = number;
    } 
  } catch (error) {
    console.log('The result is undefined');
  }
}

// Thsi function will use the variables above to display the elements on the page
function displayCalculation() {
  result.textContent = currentCalculation.join('');
  resultTemp.textContent = currentResult;
  if (result.textContent === resultTemp.textContent) {
    resultTemp.textContent = '';
  }
}

keys.addEventListener('click', (e) => {
  e.preventDefault();
  // To make sure that the parent elements are ignored
  if (e.target.classList.contains('calculator__key')) {
    if (e.target.classList.contains('key--number')) {
      addNumber(e.target.textContent);
    } else if (e.target.classList.contains('key--operator')) {
      calculation(e.target.textContent);
    } else if (e.target.classList.contains('key--change')) {
      resultOrErase(e.target.textContent);
    }
  }
  resultCalculation();
  displayCalculation();
});


window.addEventListener('keydown', e => {
  for (key of keysList) {
    if (e.key === key.textContent) {
      key.click();
    } else if (e.key === 'Backspace' && key.textContent === '←') {
      key.click();
    } else if (e.key === 'c' && key.textContent === 'C') {
      key.click();
    } else if (e.key === 'Enter' && key.textContent === '=') {
      key.click();
    }

  }
});
