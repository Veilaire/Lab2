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
    if (emailValue.indexOf("@") === -1 || emailValue.indexOf(".") === -1) {
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
    characterCount.textContent = "0 / 15 characters minimum.";
    characterCount.classList.remove('valid');
    formStatus.textContent = "";
}
feedbackForm.addEventListener('submit', function (event) {
    event.preventDefault();
    if (website.value !== "" && website.checkValidity() === false) {
        websiteError.textContent = "Please enter a valid website URL.";
        website.classList.add('invalid');
        website.classList.remove('valid');
        return;
    }
    website.classList.remove('invalid');
    if (website.value !== "") {
        website.classList.add('valid');
    } else {
        website.classList.remove('valid');
    }
    websiteError.textContent = "";
    const isTheFullNameValid = validateFullName();
    const isTheEmailValid = validateEmail();
    const isTheTopicValid = validateTopic();
    const isTheCommentsValid = validateComments();
    if (isTheFullNameValid === false || isTheEmailValid === false || isTheTopicValid === false || isTheCommentsValid === false) {
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
    characterCount.textContent = currentLengthOfCharacters + " / 15 characters minimum.";
    if (currentLengthOfCharacters >= 15) {
        characterCount.classList.add('valid');
    } else {
        characterCount.classList.remove('valid');
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
comments.addEventListener('input', function () {
    if (comments.classList.contains('invalid') || comments.classList.contains('valid')) {
        validateComments();
    }
});