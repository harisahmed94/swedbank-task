var activeSlide = 0; // starting with the first slide
var forward = document.getElementById("btn-forward"); // accessing the next button in variable forward
var backward = document.getElementById("btn-backward"); // accessing the back button in variable backward
var x = document.getElementsByClassName("slide"); // accessing all the slides in variable x
var y = document.getElementsByClassName("form-body__step"); // accessing all the progress steps in variable y
x[activeSlide].style.display = "block"; // making the first slide visible
y[activeSlide].classList.add("active"); // setting the first progress node to active

function changeSlide(i) {
	/* this function serves as the main function as it is run when either of the button
	is pressed and makes calls to other functions as well */
	var flag = 1; // this flag determines whether we need to perform data validation or not
	if ( i === 0 ) { // if arguement i is 0 then next button is pressed and data validation is neccessary
		flag = (validateInput()); // function call for data validation
	}
	if (flag) { // steps to be done when moving forward or backward
		x[activeSlide].style.display = "none";
		y[activeSlide].classList.remove("active");
		if (i === 0) {
			y[activeSlide].classList.add("passed");
			activeSlide = activeSlide + 1;
		} else {
			activeSlide = activeSlide - 1;
			y[activeSlide].classList.remove("passed");	
		}
		x[activeSlide].style.display = "block";
		y[activeSlide].classList.add("active");
	}

	buttonControl(); // function call for updating button states

	if (activeSlide === 6) {
		displaySummary(); // displaying data when on Summary tab
	}
}

function buttonControl() {
	// this function enables or disables a button depending upon the tab visible
	if (activeSlide === 0) {
		backward.classList.add("disabled");
	}
	else {
		backward.classList.remove("disabled");
	}
	if (activeSlide === 6) {
		forward.classList.add("disabled");
	}
	else {
		forward.classList.remove("disabled");
	}
}

function validateInput() {
	/* this function validates the data in the input fields and generates some feedback
	on the basis of validation */
	var error = document.getElementById("error1"); 
	var valid = true;
	var fields = x[activeSlide].getElementsByClassName("validate");
	for (var i = 0; i < fields.length; i++) {
		if (fields[i].type === "checkbox" && !(fields[i].checked)) {
			fields[i].classList.add("invalid");
			valid = false;
			error.classList.add("active");
		}
		else if (fields[i].type === "radio" && (document.querySelector('input[name = "radioInput"]:checked') === null)) {
			fields[i].classList.add("invalid");
			valid = false;
			error.classList.add("active");
		}
		else if (fields[i].value === "") {
			fields[i].classList.add("invalid");
			valid = false;
			error.classList.add("active");
		}
		else {
			fields[i].classList.remove("invalid");
			error.classList.remove("active");
		}
	}
	if (valid) {
		return 1;
	}
}

function displaySummary() {
	/* this function gathers the data of the input fields into variables
	and outputs in the summary tab */
	var name, pid, limit, transactions, online, occupation, preferences;
	name = document.getElementById("cardholdersName");
	pid = document.getElementById("cardHoldersId");
	limit = document.getElementById("selectLimit");
	transactions = document.getElementById("radio1"); 
	if(transactions.checked) {
		online = "Yes";
	}
	else {
		online = "No";
	}
	occupation = document.getElementById("selectOccupation");
	preferences = document.getElementById("textareaPreferences");	

	var summary = '<p>' + name.value + '</p>' +
				  '<p>' + pid.value + '</p>' +
				  '<p>' + limit.value + '</p>' +
				  '<p>' + online + '</p>' +
				  '<p>' + occupation.value + '</p>' +
				  '<p>' + preferences.value + '</p>';
	var elem = document.getElementsByClassName("summaryInsert");
	elem[0].innerHTML = summary;
}
