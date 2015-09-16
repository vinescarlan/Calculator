var prevNum,
	currentNum,
	display = document.getElementById('result');

// When a "number" button is clicked
function getValue() {
	// Check if number count on display is equal to 13
	//   to prevent overflowing of numbers in display
	if (display.currentNum.length < 13) {
		// (currentNum == undefined) == (display == 0)
		if (currentNum === undefined) {
			// Prevent calc from displaying a number starting with 0
			if (parseInt(this.value) === 0) {
				if (display.innerHTML.indexOf(0) === 0) {
					return false; // Prevent the execution of ff. lines of code
				}
			}

			currentNum = this.value;
			if (parseInt(display.innerHTML) === 0) {
				// If the display is 0, it will be replace by the button's value
				//   rather than concatenate to it
				display.innerHTML = currentNum;
			} else {
				display.innerHTML += currentNum;
			}
		} else {
			// Add the value to currentNum so that it can be tracked
			//   by operator functions later
			currentNum += this.value;
			display.innerHTML += this.value;
		}
	}
	// If num count on display is greater than 13, stop getting values
	else return false;
}

var numberBtns = document.querySelectorAll('.number');

for (var i = 0, len = numberBtns.length; i < len; i++) {
	numberBtns[i].addEventListener('click', getValue);
}

/*  When an "operator button (+,-,*,/) is clicked
		check if the "operator" do not exist on display
			if yes,
				set previous num = current num
				set current num = undefined
				add "operator" to display (e.g. 1124+)
				set in use operator = "operator"
			if no,
				call "equals" function to display result
				then add "operator to display"
			both before, check if current num is 0 -> TODO */

var inuseOperator;

function getOperator() {
	var operators = ["+", "-", "*", "/"];

	function checkForOperators() {
		for (i = 0, len = operators.length; i < len; i++) {
			if (display.innerHTML.indexOf(operators[i]) == -1) {
				return true;
			} else {
				return false;
			}
		}
	}

	if (checkForOperators()) {
		prevNum = currentNum;
		currentNum = undefined;
		display.innerHTML += "+";
		inuseOperator = "+";
	} else {
		console.log('false');
	}
}

var operatorBtns = document.querySelectorAll('.operator');

operatorBtns[3].onclick = getOperator;

/*  When "equals" (=) is clicked or called
		* check if inuse operator is not undefined to prevent running equal() when
		* there's no operator in use
		if yes,
			check if current no. is undefined
				if yes,
					set display = previous num + (inuseoperator)
								  + previous num
				if no,
					set display = previous num + (inuseoperator)
								  + current num
				both after,
					change "delete" button (x) to (=)
					set previous num = display value
					set previous num + (operator) + current num
		if no,
			return "Can't perform anything, operator is undefined" */

/*  When "clear all" (AC) is clicked
		set in use operator = undefined
		set current num and previous num = undefined
		set display = 0 */

/* 	When "decimal" button (.) is clicked
		add "." to current num
		display it */
