// *** VARIABLES ***

const result = document.querySelector('.calculator__result p');
const resultTemp = document.querySelector('.calculator__result--temp p');
const keys = document.querySelector('.calculator__keys');
const keysList = document.querySelectorAll('.calculator__key');

// Arrays to compare
const numbers = ['0','1', '2', '3', '4', '5', '6', '8', '9', '.'];
const operators = ['+', '-', '*', '/'];

// Variables to store the calculation and the result
let currentCalculation = [];
let currentElement = '';
let currentResult = '';
// This variable contains the final result when the user clicks on 'equal'
// This variable allows the user to use the final result for a new calculation, but it gets erased when the user clicks on a new number right after equal.
let finalResult = '';

// Var to know if the user has started a calculation or nor
let newCalculation = false;


// **** FUNCTIONS **** 
// To manage the Keys containing numbers
function addNumber(number) {
  // We need to know if we have to add a zero before a dot
  let zero = '';
  // Add zero before the dot if there is no previous number
  if (number === '.' && (newCalculation === false || operators.includes(currentElement))) {
    zero = '0';
  }
  
  // Start calculation
  newCalculation = true;
  // Erase previous result if there is final result
  if (finalResult !== '') {
    currentCalculation.pop();
    finalResult = '';
  }
  // Add number to the currentCalculation Array
  currentCalculation.push(zero + number);

  console.log(currentCalculation);
}

// To manage the keys containing operators
function calculation(operator) {
  // if the operator is minus, always add it
  if (operator === '-' && currentElement !== '-') {
      currentCalculation.push(operator);
  // If the operator is other than minus, it can only be added after a number
  } else if (newCalculation === true) {
    // The function has to determine if the current element is a number or operator
    let replace = false;
    // replace will be true if current element is an operator
    if (operators.includes(currentElement)) {
      replace = true;
    } 
    //  if replace is true, new operator replaces the previous one. 
    if (replace === true) {
      // remove previous operator
      currentCalculation.pop();
    }
    // Add operator to array
    currentCalculation.push(operator);
  }
  // Always erase finalResult
  finalResult = '';
}

// To manage the keys other keys
function modifyCalculation(changeKey) {

  // if erase -> remove last item on display calculation. If 
  if (changeKey === '←'){
    // Remove last item in the currentCalculation array
    currentCalculation.pop();
    // if the item removed was the last, reset the other variables
    if (currentCalculation.length === 0) {
      currentResult = '';
      newCalculation = false;
    }
    
  // if the chosen key is 'reset', reset all the variables
  } else if (changeKey === 'C'){
    newCalculation = false;
    currentCalculation = [];
    currentElement = '';
    currentResult = '';

  // if the chosen key is 'equal' use the current result as the first element in the array
  } else if (changeKey === '='){
    currentCalculation = [];
    currentCalculation.push(currentResult);
    finalResult = currentResult;
    currentResult = '';
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
  if (currentCalculation.length > 1) {
    resultTemp.textContent = currentResult;
  } else {
    resultTemp.textContent = '';
  } 
}

function modifyFont() {
  if (result.textContent.length >= 14) {
    result.setAttribute('class', 'result--small');
  } else {
    result.removeAttribute('class');
  }

  if (resultTemp.textContent.length >= 16) {
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
    } else if (e.target.classList.contains('key--modifier')) {
      modifyCalculation(e.target.textContent);
    }
  }
  resultCalculation();
  displayCalculation();
  modifyFont();
  currentElement = currentCalculation[currentCalculation.length - 1];

  console.log(`The current element is ${currentElement} ---
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


