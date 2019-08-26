const calculate = (n1, operator, n2) => {
    let firstValue = parseFloat(n1);
    let secondValue = parseFloat(n2);

    if (operator === 'add') return firstValue + secondValue;
    if (operator === 'subtract') return firstValue - secondValue;
    if (operator === 'multiply') return firstValue * secondValue;
    if (operator === 'divide') return firstValue / secondValue;
}

//Listen to button clicks
const interactWithCalculator = () => {
    const calculator = document.querySelector('.calculator');
    const display = document.querySelector('.display');
    const keys = document.querySelector('.calculator-keys');

    keys.addEventListener('click', event => {

        const displayData = display.textContent;
        const action = event.target.dataset.action;
        const key = event.target;
        const previousKeyType = calculator.dataset.previousKeyType;

        if (event.target.matches('button')) {
            //remove .is-depressed class from keys
            Array.from(event.target.parentNode.children)
              .forEach(key => key.classList.remove('is-depressed'))
        }

        //Display number when clicked
        if (!action) {
            if (displayData === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
                display.textContent = key.textContent;
            }else {
                display.textContent = displayData + key.textContent;
            }
            calculator.dataset.previousKeyType = 'number';
        }

        //assign the clicked operator to operator
        if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayData;

            //update calculated value as firstValue
            if (firstValue && operator && previousKeyType !== 'operator' && previousKeyType !== 'calculate') {
                const calcValue = calculate(firstValue, operator, secondValue);
                display.textContent = calcValue;
                calculator.dataset.firstValue = calcValue;
            }else {
                calculator.dataset.firstValue = displayData;
            }

            key.classList.add('is-depressed'); //Hightlight the active operator
            calculator.dataset.previousKeyType = 'operator';
            calculator.dataset.operator = action;
        }

        //Check if the display data includes (.). if not, add (.) when key is clicked
        if (action === 'decimal') {
            if(!displayData.includes('.')){
                display.textContent = displayData + '.';
            }else if (previousKeyType === 'operator' || previousKeyType === 'calculate'){
                display.textContent = '0.'
            }

            calculator.dataset.previousKeyType = 'decimal';
        }

        //Clear key
        if (action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]');
            clearButton.textContent = 'CE'
        }

        if(action === "clear") {
            if (key.textContent === 'AC') {
                calculator.dataset.firstValue = '';
                calculator.dataset.modifierValue = '';
                calculator.dataset.operator = '';
                calculator.dataset.previousKeyType = '';
            }else {
                key.textContent = 'AC'
            }

            display.textContent = 0;
            calculator.dataset.previousKeyType = 'clear';
        }

        //get first first value, opertaor and secondValue, call calculate function
        if (action === 'calculate') {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayData;

            if (firstValue) {
                if (previousKeyType === 'calculate') {
                    firstValue = displayData;
                    secondValue = calculator.dataset.modifierValue;
                }

                display.textContent = calculate(firstValue, operator, secondValue);
            }

            calculator.dataset.modifierValue = secondValue;
            calculator.dataset.previousKeyType = 'calculate';
        }
    })
};

interactWithCalculator()
