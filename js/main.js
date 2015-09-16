var prevNum,
	currentNum,
	display = document.getElementById('result');

// When a "number" button is clicked
function getValue() {
	// Check if number count on display is equal to 13
	//   to prevent overflowing of numbers in display
	// Note: undefined does not have a length property so we need to check for it
	if (currentNum === undefined || currentNum.length < 13) {
		// undefined currentNum == zero (0) display
		if (currentNum === undefined) {
			// Prevent calc from displaying a number starting with 0
			// Info: uses parseInt since the value of input is a string
			if (parseInt(this.value) === 0) {
				// Check if display starts with 0
				if (display.innerHTML.indexOf(0) === 0) {
					return false; // Prevent the execution of ff. lines of code
				}
			}

			currentNum = this.value;
			if (parseInt(display.innerHTML) === 0) {
				// Check for operators in display
				if (isOperating()) {
					display.innerHTML += currentNum;
				} else {
					// If the display is 0, it will be replace by the button's value
					//   rather than concatenate to it
					display.innerHTML = currentNum;
				}
			} else {
				display.innerHTML += currentNum;
			}
		} else {
			// Add the value to currentNum so that it can be tracked
			//   by operator functions later
			currentNum += this.value;
			display.innerHTML += this.value;
		}

		if (display.innerHTML.length > 18) {
			// Make the display text smaller so that it will not overflow
			display.style.fontSize = "16px";
		}
	}
	// If num count on display is greater than 13, stop getting values
	else return false;
}

var numberBtns = document.querySelectorAll('.number');

for (var i = 0, len = numberBtns.length; i < len; i++) {
	numberBtns[i].addEventListener('click', getValue);
}

var inuseOperator;

// Check if an operator exist on display
function isOperating() {
	var operators = ["+", "-", "*", "/"];
	for (var i = 0, len = operators.length; i < len; i++) {
		// If an operator is found
		if (display.innerHTML.indexOf(operators[i]) !== -1) {
			return true; // So, the operation will not proceed
		} else {
			return false;
		}
	}
}

function getOperator() {
	if (!isOperating()) {
		// This will prevent the display from returning NaN if user 
		// did NOT enter a value || just clicked an operator in the first use
		if (currentNum === undefined) prevNum = 0;
		else prevNum = currentNum;
		// Reset currentNum
		currentNum = undefined;
		// Add operator sign in display
		display.innerHTML += "+";
		inuseOperator = "+";
	} else {
		// TO DO -----> call "equals" function to display result
		// then add "operator to display"
		console.log('Operator is already in use');
	}
}

var operatorBtns = document.querySelectorAll('.operator');

operatorBtns[3].onclick = getOperator;

// When "equals" (=) is clicked or called
function equal() {
	// check if inuse operator is not undefined to prevent running equal() when
	// there's no operator in use
	if (inuseOperator !== undefined) {
		// Testing: for checking if display is NaN
		if (isNaN(parseInt(display.innerHTML))) {
			console.log(display.innerHTML);
			display.innerHTML = "Syntax Error";
		}
		// check if current no. is undefined
		// to indicate whether the operation should be repeated
		if (currentNum === undefined) {
			display.innerHTML = parseFloat(prevNum) + parseFloat(prevNum);
		} else {
			display.innerHTML = parseFloat(prevNum) + parseFloat(currentNum);
		}

		// TO DO -----> change "delete" button (x) to (=)
		prevNum = display.innerHTML;
	} else {
		console.log("Can't perform anything, operator is undefined");
	}

}

document.getElementById('equal').onclick = equal;

/*  When "clear all" (AC) is clicked
		set in use operator = undefined
		set current num and previous num = undefined
		set display = 0 */

/* 	When "decimal" button (.) is clicked
		add "." to current num
		display it */
