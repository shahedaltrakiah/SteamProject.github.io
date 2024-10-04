const contactForm = document.getElementById('contactForm');
const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const namePattern = /^[a-zA-Z\s]+$/; // Name can only contain letters and spaces
const maxWordCount = 500;

contactForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const firstName = document.getElementById('contactFirstName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    const result = document.getElementById('contactResult');

    // Error display elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
 
    // Reset errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    result.textContent = '';

    let valid = true;

    // Validate first name (no numbers allowed)
    if (!namePattern.test(firstName)) {
        nameError.textContent = "Name can only contain letters and spaces, no numbers.";
        valid = false;
    }

    // Validate email
    if (!emailPattern.test(email)) {
        emailError.textContent = "Invalid email format.";
        valid = false;
    }

    // Validate message
    const wordCount = message.trim().split(/\s+/).length;
    if (wordCount > maxWordCount) {
        messageError.textContent = `Message is too long. Maximum ${maxWordCount} words allowed. You have ${wordCount - maxWordCount} words over the limit.`;
        valid = false;
    } else if (message.trim() === "") {
        messageError.textContent = "Message cannot be empty.";
        valid = false;
    }

    // If valid, display success message
    if (valid) {
        result.textContent = "Message sent successfully!";
        result.className = "success"; // Add a class for success styling if needed
    } else {
        result.className = "error"; // Add a class for error styling if needed
    }
});