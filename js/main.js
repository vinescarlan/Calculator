var prevNum,
	currentNum,
	display = document.getElementById('result');

// When a "number" button is clicked
function getValue() {
	// Prevent adding number in display when displayed sign is equals
	if (document.querySelector('.clear-entry').className.indexOf('no-border') != -1) {
		return false;
	}

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

// Make display sign from = to encircled X
function changeDisplaySign() {
	// Change display sign
	var x = document.querySelector('.clear-entry');
	x.innerHTML = "&times;";
	x.className = "clear-entry";
}

function getOperator() {
	if (!isOperating()) {
		changeDisplaySign(); // So, users can input number
		if (prevNum != parseFloat(display.innerHTML)) {
			// This will prevent the display from returning NaN if user 
			// did NOT enter a value || just clicked an operator in the first use
			if (currentNum === undefined) prevNum = 0;
			else prevNum = currentNum;
		}

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

		// Change "delete" button (x) to (=)
		var x = document.querySelector('.clear-entry');
		x.innerHTML = "=";
		x.className += " no-border";

		prevNum = display.innerHTML;
		console.log(prevNum);
	} else {
		console.log("Can't perform anything, operator is undefined");
	}
}

document.getElementById('equal').onclick = equal;

function clearAll() {
	// Reset all from the start
	changeDisplaySign();
	inuseOperator = currentNum = prevNum = undefined;
	display.innerHTML = 0;
}

document.getElementById('clear').onclick = clearAll;

/* 	When "decimal" button (.) is clicked
		add "." to current num
		display it */
