let displayValue = "0";
let waitingForOperand = false;
let operator = null;
let previousValue = null;

const display = document.getElementById("display");

function updateDisplay() {
    display.textContent = displayValue;
}

function clearDisplay() {
    displayValue = "0";
    previousValue = null;
    operator = null;
    waitingForOperand = false;
    updateDisplay();
}

function appendNumber(number) {
    if (waitingForOperand) {
        displayValue = number;
        waitingForOperand = false;
    } else {
        displayValue = displayValue === "0" ? number : displayValue + number;
    }
    updateDisplay();
}

function appendOperator(nextOperator) {
    if (previousValue == null) {
        previousValue = parseFloat(displayValue);
    } else if (operator) {
        const result = calculateResult(previousValue, parseFloat(displayValue), operator);
        displayValue = `${result}`;
        previousValue = result;
    }
    waitingForOperand = true;
    operator = nextOperator;
    updateDisplay();
}

function calculateResult(firstOperand, secondOperand, operator) {
    if (operator === "+") return firstOperand + secondOperand;
    if (operator === "-") return firstOperand - secondOperand;
    if (operator === "*") return firstOperand * secondOperand;
    if (operator === "/") return secondOperand !== 0 ? firstOperand / secondOperand : "Error";
    return secondOperand;
}

function appendDecimal() {
    if (waitingForOperand) {
        displayValue = "0.";
        waitingForOperand = false;
    } else if (!displayValue.includes(".")) {
        displayValue += ".";
    }
    updateDisplay();
}

function calculate() {
    if (operator && !waitingForOperand) {
        displayValue = `${calculateResult(previousValue, parseFloat(displayValue), operator)}`;
        previousValue = null;
        operator = null;
    }
    updateDisplay();
}

function deleteLast() {
    displayValue = displayValue.length > 1 ? displayValue.slice(0, -1) : "0";
    updateDisplay();
}

// Initialize display
updateDisplay();