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
    if (fullNameValue.length < 2) {
        fullNameError.textContent = "Please enter at least 2 characters.";
        return false;
    }
    fullNameError.textContent = "";
    return true;
}
function validateEmail() {
    const emailValue = email.value;
    if (emailValue.length === 0) {
        emailError.textContent = "Please enter your email address.";
        return false;
    }
    if (emailValue.indexOf("@") === -1 || emailValue.indexOf(".") === -1) {
        emailError.textContent = "Please enter a valid email address.";
        return false;
    }
    emailError.textContent = "";
    return true;
}
function validateTopic() {
    const topicValue = topic.value;
    if (topicValue === "") {
        topicError.textContent = "Please select a topic.";
        return false;
    }
    topicError.textContent = "";
    return true;
}
function validateComments() {
    const commentsValue = comments.value;
    if (commentsValue.length < 15) {
        commentsError.textContent = "Please enter at least 15 characters.";
        return false;
    }
    commentsError.textContent = "";
    return true;
}
feedbackForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (website.value !== "" && website.checkValidity() === false) {
        websiteError.textContent = "Please enter a valid website URL.";
        return;
    }
    websiteError.textContent = "";
    const isTheFullNameValid = validateFullName();
    const isTheEmailValid = validateEmail();
    const isTheTopicValid = validateTopic();
    const isTheCommentsValid = validateComments();
    if (isTheFullNameValid === false || isTheEmailValid === false || isTheTopicValid === false || isTheCommentsValid === false) {
        return;
    }
    formStatus.textContent = "Thanks for your feedback, " + fullName.value + "!";
    feedbackForm.reset();
    setTimeout(function () {
        formStatus.textContent = "";
    }, 4000);
});
comments.addEventListener('input', function () {
    const commentsValue = comments.value;
    const currentLengthOfCharacters = commentsValue.length;
    characterCount.textContent = currentLengthOfCharacters + " / 15 characters minimum.";
    if (currentLengthOfCharacters >= 15) {
        characterCount.classList.add('valid');
    } else {
        characterCount.classList.remove('valid');
    }
});