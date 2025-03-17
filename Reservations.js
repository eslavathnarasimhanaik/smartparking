document.addEventListener("DOMContentLoaded", function () {
    const forms = document.querySelectorAll("form"); // Select all forms
    const confirmationMessage = document.getElementById("confirmation-message");

    forms.forEach((form) => {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent default form submission

            let isValid = validateForm(form);

            if (isValid) {
                // Hide the form and show the confirmation message
                form.style.display = "none";
                confirmationMessage.innerHTML = "✅ Thank you! Your reservation is confirmed. Redirecting...";
                confirmationMessage.style.display = "block";

                // Redirect to Home Page after 3 seconds
                setTimeout(() => {
                    window.location.href = "index.html"; // Change to your actual homepage URL
                }, 3000);
            }
        });
    });

    function validateForm(form) {
        let isValid = true;

        // Identify form fields dynamically
        const name = form.querySelector("#name");
        const email = form.querySelector("#email");
        const date = form.querySelector("#date");
        const time = form.querySelector("#time");
        const vehicle = form.querySelector("#vehicle");
        const vehicleNumber = form.querySelector("#vehicleNumber");
        const duration = form.querySelector("#duration");

        // Clear previous errors
        form.querySelectorAll(".error-message").forEach(el => el.remove());

        // Validate Name (if available)
        if (name && name.value.trim().length < 3) {
            showError(name, "⚠️ Name must be at least 3 characters long.");
            isValid = false;
        }

        // Validate Email (if available)
        if (email && !/^\S+@\S+\.\S+$/.test(email.value)) {
            showError(email, "⚠️ Enter a valid email address.");
            isValid = false;
        }

        // Validate Date (Prevents selecting past dates)
        if (date) {
            let today = new Date().toISOString().split("T")[0];
            if (date.value < today || date.value === "") {
                showError(date, "⚠️ Date cannot be in the past.");
                isValid = false;
            }
        }

        // Validate Time (if available)
        if (time) {
            let currentTime = new Date();
            let selectedDate = new Date(date.value);
            let selectedTime = time.value;

            if (!selectedTime) {
                showError(time, "⚠️ Please select a valid time.");
                isValid = false;
            } else if (selectedDate.toDateString() === currentTime.toDateString() &&
                selectedTime < currentTime.toLocaleTimeString('en-GB', { hour12: false }).slice(0, 5)) {
                showError(time, "⚠️ Time must be in the future.");
                isValid = false;
            }
        }

        // Validate Vehicle Selection (if available)
        if (vehicle && vehicle.value === "") {
            showError(vehicle, "⚠️ Please select a vehicle type.");
            isValid = false;
        }

        // Validate Vehicle Number (if available)
        if (vehicleNumber && vehicleNumber.value.trim() === "") {
            showError(vehicleNumber, "⚠️ Vehicle Number is required.");
            isValid = false;
        }

        // Validate Duration (if available)
        if (duration && duration.value < 1) {
            showError(duration, "⚠️ Duration must be at least 1 hour.");
            isValid = false;
        }

        return isValid;
    }

    function showError(input, message) {
        const errorElement = document.createElement("div");
        errorElement.className = "error-message";
        errorElement.style.color = "red";
        errorElement.style.fontSize = "12px";
        errorElement.style.marginTop = "4px";
        errorElement.textContent = message;
        input.parentNode.appendChild(errorElement);
    }

    // Real-Time Validation
    document.querySelectorAll("input, select").forEach((input) => {
        input.addEventListener("input", function () {
            document.querySelectorAll(".error-message").forEach(el => el.remove());
        });
    });
});
