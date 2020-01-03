// 
const result = document.querySelector('.calculator__result p');
const resultTemp = document.querySelector('.calculator__result--temp p');
const keys = document.querySelector('.calculator__keys');
const keysList = document.querySelectorAll('.calculator__key');


// Arrays to compare

const numbers = ['0','1', '2', '3', '4', '5', '6', '8', '9', '.'];
const operators = ['+', '-', '*', '/'];
const modifiers = ['=', 'C', '←']

// Variables to store the calculation and the result
let currentCalculation = [];
let currentElement = currentCalculation[currentCalculation.length - 1];
let currentResult = '';

// Var to know if the user has started a calculation or nor
let newCalculation = false;




// To manage the Keys containing numbers
function addNumber(number) {
  // We need to know if we have to add a zero before a dot
  let zero = '';
  for (operator of operators) {
    if (number === '.' && (newCalculation === false || currentElement === operator)) {
      zero = '0';
    }
  }
  newCalculation = true;
  currentCalculation.push(zero + number);
  console.log(currentCalculation);
}

// To manage the keys containing operators
function calculation(operator) {
  // Needs to add operator to 'currentOperator'
  // If there is no number the only operator to use is minus
  if (newCalculation === true) {
    // if other operator and 'currentOperator' is not empty replaces the currentOperator in currentCalculation.
    if (currentOperator !== '' && operator != '-') {
      currentOperator = operator;
      currentCalculation.pop();
      currentCalculation.push(operator);
    } else if (currentOperator === '') {
      currentOperator = operator;
      currentCalculation.push(operator);
    }
   // if operator is minus and the 'currentOpeartor' is not empty or number is empty, it is use as negative number instead of operator
  } else if (operator === '-' && (currentOperator != '' || newCalculation === false)) {
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
    currentNumber = '';
    currentOperator = '';
    if (currentCalculation.length === 0) {
      currentResult = '';
      newCalculation = false;
    }
    
  // if the chosen key is 'reset'
  } else if (changeKey === 'C'){
    newCalculation = false;
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
}

function modifyFont() {
  if (result.textContent.length >= 13) {
    result.setAttribute('class', 'result--small');
  } else {
    result.removeAttribute('class');
  }

  if (resultTemp.textContent.length >= 15) {
    resultTemp.setAttribute('class', 'temp--small');
  } else {
    resultTemp.removeAttribute('class');
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
  modifyFont();

  console.log(`The currentNumber is: ${currentNumber} ---
  The current operator is ${currentOperator} ---
  The current calculation is ${currentCalculation} ---
  The current Result is ${currentResult} ---`)
});

// EventListener to be able to use the keyboard also
window.addEventListener('keydown', e => {
  
  for (key of keysList) {
    if (e.key === key.textContent) {
      key.click();
    // If key is backspace
    } else if (e.key === 'Backspace' && key.textContent === '←') {
      key.click();
    // if key is C or clear
    } else if ((e.key === 'c' || e.key === 'Clear') && key.textContent === 'C') {
      key.click();
    // if key is enter 
    } else if (e.key === 'Enter' && key.textContent === '=') {
      key.click();
    } else if (e.key === ',' && key.textContent === '.') {
      key.click();
    }
  }
});


