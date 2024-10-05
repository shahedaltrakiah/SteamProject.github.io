// Function to get query parameters from the URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Function to check if the user is logged in
function checkUserLogin() {
    const email = getQueryParam('email'); 
    let userData;

    if (email) {
        userData = JSON.parse(localStorage.getItem(email)); 
    }

    // Select necessary elements
    const loginButton = document.querySelector('.btn-custom-1');
    const icon = document.querySelector('.for-logging');

    if (userData && userData.logged === "Yes") {
        // User is logged in
        if (loginButton) {
            loginButton.innerText = "Logout";
            loginButton.onclick = () => logout(email); // Set the logout function on click
        }

        if (icon) {
            icon.innerHTML = `<a href="../pages/profile.html?email=${encodeURIComponent(email)}">
                                <i class="fa-solid fa-user" style="color:white"></i>
                              </a>`;
        }
    } else {
        // User is not logged in
        if (loginButton) {
            loginButton.innerText = "Login";
            loginButton.onclick = () => {
                // Redirect to login page
                window.location.href = "../index.html";
            };
        }

        if (icon) {
            icon.innerHTML = `<a href="../pages/signup.html">SIGN UP</a>`;
        }
    }
}

// Logout function
function logout(email) {
    if (email) {
        const userData = JSON.parse(localStorage.getItem(email));
        if (userData) {
            // Set the user's logged status to "no"
            userData.logged = "no";
            localStorage.setItem(email, JSON.stringify(userData));
            console.log("User logged out.");

            // Redirect to homepage after logout
            window.location.href = "../index.html";
        }
    }
}

// Call checkUserLogin when the window loads
window.onload = checkUserLogin;
