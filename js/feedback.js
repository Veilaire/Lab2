const feedbackForm = document.getElementById('feedbackForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const topic = document.getElementById('topic');
const comments = document.getElementById('comments');
const website = document.getElementById('website');
const fullNameError = document.getElementById('fullNameError');
const emailError = document.getElementById('emailError');
const topicError = document.getElementById('topicError');
const commentsError = document.getElementById('commentsError');
const websiteError = document.getElementById('websiteError');
const characterCount = document.getElementById('characterCount');
const formStatus = document.getElementById('formStatus');
const submitButton = document.getElementById('submitButton');
const resetButton = document.getElementById('resetButton');

function validateFullName() {
    const fullNameValue = fullName.value;
    // Make sure the full name is not empty and has at least 2 characters (excluding spaces)
    if (fullNameValue.split(" ").join("").length < 2) {
        fullNameError.textContent = "Please enter at least 2 characters.";
        fullName.classList.add('invalid');
        fullName.classList.remove('valid');
        return false;
    }
    fullNameError.textContent = "";
    fullName.classList.add('valid');
    fullName.classList.remove('invalid');
    return true;
}
function validateEmail() {
    const emailValue = email.value;
    if (emailValue.length === 0) {
        emailError.textContent = "Please enter your email address.";
        email.classList.add('invalid');
        email.classList.remove('valid');
        return false;
    }
    // Check for "@" and "." in the correct order
    const atPosition = emailValue.indexOf("@");
    const dotPosition = emailValue.lastIndexOf(".");
    // Ensure that both "@" and "." exist first, "@" comes before the last ".", and that the last "." is not the last character
    if (atPosition === -1 || dotPosition === -1 || dotPosition < atPosition || dotPosition === emailValue.length - 1) {
        emailError.textContent = "Please enter a valid email address.";
        email.classList.add('invalid');
        email.classList.remove('valid');
        return false;
    }
    emailError.textContent = "";
    email.classList.add('valid');
    email.classList.remove('invalid');
    return true;
}
function validateTopic() {
    const topicValue = topic.value;
    if (topicValue === "") {
        topicError.textContent = "Please select a topic.";
        topic.classList.add('invalid');
        topic.classList.remove('valid');
        return false;
    }
    topicError.textContent = "";
    topic.classList.add('valid');
    topic.classList.remove('invalid');
    return true;
}
function validateComments() {
    const commentsValue = comments.value;
    if (commentsValue.length < 15) {
        commentsError.textContent = "Please enter at least 15 characters.";
        comments.classList.add('invalid');
        comments.classList.remove('valid');
        return false;
    }
    commentsError.textContent = "";
    comments.classList.add('valid');
    comments.classList.remove('invalid');
    return true;
}
function validateWebsite() {
    const websiteValue = website.value;
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
    websiteError.textContent = "";
    website.classList.add('valid');
    website.classList.remove('invalid');
    return true;
}
function resetForm() {
    fullName.classList.remove('invalid','valid');
    email.classList.remove('invalid','valid');
    topic.classList.remove('invalid','valid');
    comments.classList.remove('invalid','valid');
    website.classList.remove('invalid','valid');
    fullNameError.textContent = "";
    emailError.textContent = "";
    topicError.textContent = "";
    commentsError.textContent = "";
    websiteError.textContent = "";
    characterCount.textContent = "0 / 15";
    characterCount.classList.remove('invalid','valid');
    formStatus.textContent = "";
}
feedbackForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const isWebsiteValid = validateWebsite();
    const isTheFullNameValid = validateFullName();
    const isTheEmailValid = validateEmail();
    const isTheTopicValid = validateTopic();
    const isTheCommentsValid = validateComments();
    if (isTheFullNameValid === false || isTheEmailValid === false || isTheTopicValid === false || isTheCommentsValid === false || isWebsiteValid === false) {
        return;
    }
    const submittedName = fullName.value;
    feedbackForm.reset();
    formStatus.textContent = "Thanks for your feedback, " + submittedName + "!";
    setTimeout(function () {
        formStatus.textContent = "";
    }, 4000);
});
comments.addEventListener('input', function () {
    const commentsValue = comments.value;
    const currentLengthOfCharacters = commentsValue.length;
    characterCount.textContent = currentLengthOfCharacters + " / 15";
    if (currentLengthOfCharacters >= 15) {
        characterCount.classList.add('valid');
        characterCount.classList.remove('invalid');
    } else {
        characterCount.classList.remove('valid');
        characterCount.classList.add('invalid');
    }
    if (comments.classList.contains('invalid') || comments.classList.contains('valid')) {
        validateComments();
    }
});
feedbackForm.addEventListener('reset', function () {
    resetForm();
});
fullName.addEventListener('input', function () {
    if (fullName.classList.contains('invalid') || fullName.classList.contains('valid')) {
        validateFullName();
    }
});
email.addEventListener('input', function () {
    if (email.classList.contains('invalid') || email.classList.contains('valid')) {
        validateEmail();
    }
});
topic.addEventListener('change', function () {
    if (topic.classList.contains('invalid') || topic.classList.contains('valid')) {
        validateTopic();
    }
});