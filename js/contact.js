// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize EmailJS
  emailjs.init("arpita"); // Replace with your User ID from EmailJS

  // Get the form element and add event listener for submission
  const contactForm = document.getElementById("contact-form");

  // Form submission event handler
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting normally

    // Get form input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Validate the form
    if (name === "" || email === "" || message === "") {
      displayFeedback("Please fill in all fields.", "danger");
      return;
    }

    // Simple email validation (basic)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      displayFeedback("Please enter a valid email address.", "danger");
      return;
    }

    // Send the form data to EmailJS
    const templateParams = {
      name: name,
      email: email,
      message: message,
    };

    emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams).then(
      function (response) {
        console.log("SUCCESS", response);
        displayFeedback("Your message has been sent successfully!", "success");
        contactForm.reset(); // Reset the form after submission
      },
      function (error) {
        console.log("FAILED", error);
        displayFeedback(
          "Oops! Something went wrong. Please try again later.",
          "danger"
        );
      }
    );
  });

  // Function to display feedback message
  function displayFeedback(message, type) {
    const feedbackElement = document.createElement("div");
    feedbackElement.classList.add("alert", "alert-" + type);
    feedbackElement.textContent = message;

    // Append feedback to the form
    contactForm.insertBefore(feedbackElement, contactForm.firstChild);

    // Remove feedback after 5 seconds
    setTimeout(() => {
      feedbackElement.remove();
    }, 5000);
  }
});
