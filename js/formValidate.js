/********w*************
    
	Project 4 Javascript
	Name: Ma Crizza Lynne Regacho
    Date: 2024-04-22
	Description: This JavaScript file, formValidate.js, is responsible for validating the user input 
	form for our project. It checks the input fields against certain criteria to ensure that the data 
	entered by the user is valid and correct.

**********************/


/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e) {

	e.preventDefault();

	

	// Hides all error elements on the page
	hideErrors();

	// Determine if the form has errors
	if (formHasErrors()) {
		// Prevents the form from submitting

		// When using onSubmit="validate()" in markup, returning false would prevent
		// the form from submitting
		return false;
	}

	// When using onSubmit="validate()" in markup, returning true would allow
	// the form to submit
	alert('Form submitted successfully!');

	// Reset the form
	document.getElementById('myForm').reset();

	// Redirect to the homepage
    window.location.href = "index.html";
	
    return true;


}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e) {
    e.preventDefault();

    // Confirm that the user wants to reset the form.
    if (confirm('Clear form?')) {
        // Reset the form
        e.target.closest('form').reset();

        // Ensure all error fields are hidden
        hideErrors();

        // Set focus to the first text field on the page
        document.getElementById("name").focus();

        // When using onReset="resetForm()" in markup, returning true will allow
        // the form to reset
        return true;
    }

    // When using onReset="resetForm()" in markup, returning false would prevent
    // the form from resetting
    return false;
}

/*
 * Does all the error checking for the form.
 *
 * return   True if an error was found; False if no errors were found
 */
function formHasErrors() {
    let errorFlag = false;
    let requiredFields = ["name", "phone", "email", "subject", "message"];

    for (let i = 0; i < requiredFields.length; i++) {
        let textField = document.getElementById(requiredFields[i]);
        
        if (!formFieldHasInput(textField)) {
            document.getElementById(requiredFields[i] + "_error").style.display = "block";
            
            if (!errorFlag) {
                textField.focus();
                textField.select();
            }

            // Raise the error flag
            errorFlag = true;
        } 
	}
	

	// validation for Canadian phone number
	let phoneRegex = new RegExp(/^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/);
	let phone = document.getElementById("phone").value;

	if (!formFieldHasInput(document.getElementById("phone"))) {
		document.getElementById("phone_error").style.display = "block";
		
		if (!errorFlag) {
			document.getElementById("phone").focus();
			document.getElementById("phone").select();
		}

		// Raise the error flag
		errorFlag = true;
	}

	else if (!phoneRegex.test(phone)) {
		document.getElementById("phoneformat_error").style.display = "block";
		
		if (!errorFlag) {
			document.getElementById("phone").focus();
			document.getElementById("phone").select();
		}

		// Raise the error flag
		errorFlag = true;
	}



	// validation for email address
	let emailRegex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
	let email = document.getElementById("email").value;

	if (!formFieldHasInput(document.getElementById("email"))) {
		document.getElementById("email_error").style.display = "block";
		
		if (!errorFlag) {
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}

		// Raise the error flag
		errorFlag = true;

		
	}
	
	else if (!emailRegex.test(email)) {
		document.getElementById("emailformat_error").style.display = "block";
		
		if (!errorFlag) {
			document.getElementById("email").focus();
			document.getElementById("email").select();
		}

		// Raise the error flag
		errorFlag = true;
	}




	// code above here
	return errorFlag;
}


function formFieldHasInput(fieldElement) {
    if (fieldElement.value == null || fieldElement.value.trim() == "") {
        return false;
    }

    return true;
}





/*
 * Hides all of the error elements.
 */
function hideErrors() {
	// Get an array of error elements
	let error = document.getElementsByClassName("error");

	// Loop through each element in the error array
	for (let i = 0; i < error.length; i++) {
		// Hide the error element by setting it's display style to "none"
		error[i].style.display = "none";
	}
}

/*
 * Handles the load event of the document.
 */
function load() {
    // Call the hideErrors function
    hideErrors();

    // Add event listener for the form submit
    document.getElementById("submit").addEventListener("click", validate);

    // Add event listener for the form reset
	document.getElementById("clear").addEventListener("click", resetForm);
	
}



// Add document load event listener
document.addEventListener("DOMContentLoaded", load);












