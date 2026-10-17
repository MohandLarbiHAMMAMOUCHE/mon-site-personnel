
const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");
const submitButton = contactForm.querySelector(
    'button[type="submit"]'
);

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
    }

    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
    formStatus.textContent = "";

    try {
        const response = await fetch(
            "https://formspree.io/f/mkjoqzgg",
            {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            }
        );

        if (response.ok) {
            formStatus.textContent =
                "Your message has been sent successfully!";
            contactForm.reset();
        } else {
            formStatus.textContent =
                "Unable to send your message. Please try again.";
        }
    } catch (error) {
        formStatus.textContent =
            "Connection error. Please try again later.";
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> Send Message';
    }
});

