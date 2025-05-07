
// Contact Page CSS
document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name'); // on contact page
    const nameDisplay = document.getElementById('userName'); // on thank you page
    const emailInput = document.getElementById('email'); // added for email

    // Contact page logic
    if (path.includes("contact.html")) {
        if (form && nameInput) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();

                const name = nameInput.value.trim();
                const isValid = name.length > 0;

                const email = emailInput.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                const isEmailValid = emailRegex.test(email);

                // Hide any previous error message
                emailError.style.display = 'none';

                if (isValid && isEmailValid) {
                    sessionStorage.setItem('formSubmitted', 'true');
                    localStorage.setItem('submittedName', name);
                    window.location.href = 'thankyou.html';
                }
                else {
                    if (!isEmailValid) {
                        emailError.textContent = "Please enter a valid email address.";
                        emailError.style.display = 'block';
                    }
                }
            });

            // Add input event to remove error when valid email is entered
            emailInput.addEventListener('input', function () {
                const email = emailInput.value.trim();
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                if (emailRegex.test(email)) {
                    emailError.style.display = 'none';  // Hide error message if email is valid
                }
            });
        }
    }

    // Thank you page logic
    if (path.includes("thankyou.html")) {
        // Prevent direct access
        if (!sessionStorage.getItem('formSubmitted')) {
            window.location.href = 'contact.html';
        } else {
            sessionStorage.removeItem('formSubmitted'); // clear after use

            // Show the name
            const userName = localStorage.getItem('submittedName');
            if (nameDisplay) {
                nameDisplay.textContent = userName || 'Friend';
            }
        }
    }
});



// Rotating logo
const logo = document.getElementById('rotatingLogo');
let rotation = 0;

function rotateLogo() {
    rotation += 0.1; // Adjust speed here
    logo.style.transform = `rotate(${rotation}deg)`;
    requestAnimationFrame(rotateLogo);
}

if (logo) {
    rotateLogo();
}


// Welcome message fade animation
const welcomeMessage = document.querySelector('.welcome-message');

if (welcomeMessage) {
    let opacity = 0;
    let fadingIn = true;

    function fadeText() {
        if (fadingIn) {
            opacity += 0.002;
            if (opacity >= 1) {
                fadingIn = false;
            }
        } else {
            opacity -= 0.002;
            if (opacity <= 0) {
                fadingIn = true;
            }
        }
        welcomeMessage.style.opacity = opacity;
        requestAnimationFrame(fadeText);
    }

    fadeText();
}


// Contact form animation fade in/out
const form = document.querySelector('.contact-form');
let opacity = 0.15;
let direction = 1;

setInterval(() => {
    opacity += direction * 0.005;

    // Reverse direction at boundaries
    if (opacity >= 0.3) direction = -1;
    if (opacity <= 0.1) direction = 1;

    // Apply the updated box-shadow
    form.style.boxShadow = `0 0 25px rgba(0, 255, 255, ${opacity.toFixed(3)})`;
}, 50); // Runs every 50ms



// Clickable main logo
document.getElementById("logoClick").addEventListener("click", function () {
    if (window.location.pathname.includes("/projects/")) {
        window.location.href = "../home.html";
    } else {
        window.location.href = "home.html";
    }
});

// Clickable small logo
document.getElementById("footerLogoClick").addEventListener("click", function () {
    if (window.location.pathname.includes("/projects/")) {
        window.location.href = "../home.html";
    } else {
        window.location.href = "home.html";
    }
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'auto'            
    });
});

