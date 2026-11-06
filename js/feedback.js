// References to form elements
const feedbackForm = document.getElementById('feedbackForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const topic = document.getElementById('topic');
const comments = document.getElementById('comments');
const website = document.getElementById('website');
// References to error message elements
const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const topicError = document.getElementById('topicError');
const commentsError = document.getElementById('commentsError');
const websiteError = document.getElementById('websiteError');
// References to character count and form status elements
const characterCount = document.getElementById('characterCount');
const formStatus = document.getElementById('formStatus');

// Validate the full name field
function validateFullName() {
    const fullNameValue = fullName.value;
    // Make sure the full name is not empty and has at least 2 characters (excluding spaces)
    if (fullNameValue.split(" ").join("").length < 2) {
        fullNameError.textContent = "Please enter at least 2 characters.";
        fullName.classList.add('invalid');
        fullName.classList.remove('valid');
        return false;
    }
    // Clear the error messge and mark the field as valid
    fullNameError.textContent = "";
    fullName.classList.add('valid');
    fullName.classList.remove('invalid');
    return true;
}
// Validate the email field
function validateEmail() {
    const emailValue = email.value;
    // Check if the email field is empty
    if (emailValue.length === 0) {
        emailError.textContent = "Please enter your email address.";
        email.classList.add('invalid');
        email.classList.remove('valid');
        return false;
    }
    // Check for "@" and "." in the correct order
    const atPosition = emailValue.indexOf("@");
    const dotPosition = emailValue.lastIndexOf(".");
    // Ensure that both "@" and "." exist first, "@" comes before the last ".", and that the last "." is not the last character. Also use browser's email validation.
    if (email.checkValidity() === false || atPosition === -1 || dotPosition === -1 || dotPosition < atPosition || dotPosition === emailValue.length - 1) {
        emailError.textContent = "Please enter a valid email address.";
        email.classList.add('invalid');
        email.classList.remove('valid');
        return false;
    }
    // Clear the error message and mark the field as valid
    emailError.textContent = "";
    email.classList.add('valid');
    email.classList.remove('invalid');
    return true;
}
// Validate the topic field
function validateTopic() {
    const topicValue = topic.value;
    // Check if the placeholder is still selected (no topic selected)
    if (topicValue === "") {
        topicError.textContent = "Please select a topic.";
        topic.classList.add('invalid');
        topic.classList.remove('valid');
        return false;
    }
    // Clear the error message and mark the field as valid
    topicError.textContent = "";
    topic.classList.add('valid');
    topic.classList.remove('invalid');
    return true;
}
// Validate the comments field
function validateComments() {
    const commentsValue = comments.value;
    // Check if the comments field has a minimum of 15 characters and a maximum of 50 characters
    if (commentsValue.length < 15 || commentsValue.length > 50) {
        commentsError.textContent = "Please enter a minimum of 15 and a maximum of 50 characters.";
        comments.classList.add('invalid');
        comments.classList.remove('valid');
        characterCount.classList.add('invalid');
        characterCount.classList.remove('valid');
        return false;
    }
    // Clear the error message and mark the field as valid
    commentsError.textContent = "";
    comments.classList.add('valid');
    comments.classList.remove('invalid');
    characterCount.classList.add('valid');
    characterCount.classList.remove('invalid');
    return true;
}
// Validate the website field
function validateWebsite() {
    const websiteValue = website.value;
    // If the website field is empty, clear any error messages and return true (valid) since it is optional
    if (websiteValue === "") {
        websiteError.textContent = "";
        website.classList.remove('invalid', 'valid');
        return true;
    }
    const dotPosition = websiteValue.indexOf(".");
    // Ensure that the website is valid by checking if it has a dot and that the dot is not the last character
    if (website.checkValidity() === false || dotPosition === -1 || dotPosition === websiteValue.length - 1) {
        websiteError.textContent = "Please enter a valid website URL.";
        website.classList.add('invalid');
        website.classList.remove('valid');
        return false;
    }
    // Clear the error message and mark the field as valid
    websiteError.textContent = "";
    website.classList.add('valid');
    website.classList.remove('invalid');
    return true;
}
// Reset the form and clear all validation states and error messages
function resetForm() {
    // Remove validation classes from form fields
    fullName.classList.remove('invalid','valid');
    email.classList.remove('invalid','valid');
    topic.classList.remove('invalid','valid');
    comments.classList.remove('invalid','valid');
    website.classList.remove('invalid','valid');
    characterCount.classList.remove('invalid','valid');
    // Clear validation error messages
    fullNameError.textContent = "";
    emailError.textContent = "";
    topicError.textContent = "";
    commentsError.textContent = "";
    websiteError.textContent = "";
    characterCount.textContent = "0 / 50";
    // Clear the form status message
    formStatus.textContent = "";
}
// Event listener for form submission
feedbackForm.addEventListener('submit', function (event) {
    // Prevent the default form submission behavior of reloading the page
    event.preventDefault();
    // Run validation functions for all fields
    const isWebsiteValid = validateWebsite();
    const isTheFullNameValid = validateFullName();
    const isTheEmailValid = validateEmail();
    const isTheTopicValid = validateTopic();
    const isTheCommentsValid = validateComments();
    // Stop submission if any field is invalid
    if (isTheFullNameValid === false || isTheEmailValid === false || isTheTopicValid === false || isTheCommentsValid === false || isWebsiteValid === false) {
        return;
    }
    // Store submitted name before resetting the form
    const submittedName = fullName.value;
    // Reset the form after a successful submission
    feedbackForm.reset();
    // Display a personalized success message for 4 seconds, uses the stored name since the form is reset and the name field is cleared
    formStatus.textContent = "Thanks for your feedback, " + submittedName + "!";
    setTimeout(function () {
        formStatus.textContent = "";
    }, 4000);
});
// Event listener for comments input to update character counter whenever someone types in the field
comments.addEventListener('input', function () {
    const commentsValue = comments.value;
    const currentLengthOfCharacters = commentsValue.length;
    // Current character count
    characterCount.textContent = currentLengthOfCharacters + " / 50";
    // Change the counter color depending if the comments field is within the range of a minimum of 15 and a maximum of 50 characters
    if (currentLengthOfCharacters >= 15 && currentLengthOfCharacters <= 50) {
        characterCount.classList.add('valid');
        characterCount.classList.remove('invalid');
    } else {
        characterCount.classList.remove('valid');
        characterCount.classList.add('invalid');
    }
    // Revalidate the comments field if it has been checked once
    if (comments.classList.contains('invalid') || comments.classList.contains('valid')) {
        validateComments();
    }
});
// Event listener for reset button to clear all validation states and error messages
feedbackForm.addEventListener('reset', function () {
    resetForm();
});
// Event listener for first name input to revalidate the field if it has been checked once
fullName.addEventListener('input', function () {
    if (fullName.classList.contains('invalid') || fullName.classList.contains('valid')) {
        validateFullName();
    }
});
// Event listener for email input to revalidate the field if it has been checked once
email.addEventListener('input', function () {
    if (email.classList.contains('invalid') || email.classList.contains('valid')) {
        validateEmail();
    }
});
// Event listener for topic selection to revalidate the field if the user changes their selection
topic.addEventListener('change', function () {
    if (topic.classList.contains('invalid') || topic.classList.contains('valid')) {
        validateTopic();
    }
});
// Event listener for website input to revalidate the field if it has been checked once
website.addEventListener('input', function () {
    if (website.classList.contains('invalid') || website.classList.contains('valid')) {
        validateWebsite();
    }
});