// 
const result = document.querySelector('.calculator__result p');
const resultTemp = document.querySelector('.calculator__result p');
const keys = document.querySelector('.calculator__keys');

// Functions for operations:



function displayCalculation() {
  let calculation = '';
  keys.addEventListener('click',(e) => {
  calculation += e.target.textContent;
  result.textContent = calculation;
  } );
  
}

displayCalculation();

window.addEventListener('keydown', e => {
  console.log(e.keyCode);
})

