/*  When a "number" button is clicked
		check if current num is undefined
			if yes,
				set current num = buttons value
			if no,
				set current num = current num + buttons value
				set display = current num
				(e.g. display is "23" and "1" is clicked, make display = "231") */

var prevNum,
	currentNum,
	display = document.getElementById('result');

// When a "number" button is clicked
function getValue() {
	// Check if number count on display is equal to 13
	//   to prevent overflowing of numbers in display
	if (display.innerHTML.length < 13) {
		// (currentNum == undefined) == (display == 0)
		if (currentNum === undefined) {
			// Prevent calc from displaying a number starting with 0
			if (parseInt(this.value) === 0) {
				if (display.innerHTML.indexOf(0) === 0) {
					return false; // Prevent the execution of ff. lines of code
				}
			}
			
			// If the display is 0, it will be replace by the new value
			//   rather than concatenate to it
			currentNum = this.value;
			display.innerHTML = currentNum;
		} else {
			currentNum = currentNum + this.value;
			display.innerHTML = currentNum;
		}
	// If num count on display is greater than 13, stop getting values
	} else return false;
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
