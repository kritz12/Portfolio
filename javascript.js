
document.addEventListener('DOMContentLoaded', () => {
    // Initialize EmailJS with your actual public key from EmailJS dashboard
    emailjs.init("bREe6OkrDVV_l7f6_");

    const form = document.getElementById('contact-form');
    const errorMessage = document.getElementById('form-message');
    const submitButton = document.querySelector('form button[type="submit"]');

    // Check if form exists in DOM before adding listener
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            // Client-side validation
            if (!name || !email || !subject || !message) {
                showError("All fields are required!");
                return;
            }

            if (!validateEmail(email)) {
                showError("Please enter a valid email address!");
                return;
            }

            errorMessage.textContent = ""; // Clear any error messages
            submitButton.textContent = "Sending...";  // Show sending status
            submitButton.disabled = true;

            // Sending the email with your actual service ID and template ID
            emailjs.send("service_0atyk36", "template_z9kherw", {
                from_name: name,
                from_email: email,
                subject: subject,
                message: message,
            }, "bREe6OkrDVV_l7f6_")
            .then((response) => {
                form.reset();  // Reset the form after successful submission
                showSuccess("Your message has been sent successfully!");
            }).catch((err) => {
                showError("Failed to send message. Please try again later.");
                console.error("EmailJS Error:", error);
            }).finally(() => {
                submitButton.textContent = "Send Message";  // Reset button text
                submitButton.disabled = false;
            });
        });
    }

    // Function to validate email format
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Display error messages dynamically
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.style.color = "red";
    }

    // Display success messages dynamically
    function showSuccess(message) {
        errorMessage.textContent = message;
        errorMessage.style.color = "green";
    }
});
