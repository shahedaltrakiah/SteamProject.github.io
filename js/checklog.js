

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
            loginButton.onclick = () => logout(email); 
        }

        if (icon) {
            icon.innerHTML = `<a href="pages/profile.html?email=${encodeURIComponent(email)}">
                                <i class="fa-solid fa-user"></i>
                              </a>`;
        }
    } else {
      
        if (loginButton) {
            loginButton.innerText = "Login";
            loginButton.onclick = () => {
              
                window.location.href = "pages/login.html";
            };
        }

        if (icon) {
            // Remove profile icon if not logged in
            icon.innerHTML = '';
        }
    }
}

// Logout function
function logout(email) {
    if (email) {
        const userData = JSON.parse(localStorage.getItem(email));
        if (userData) {
         
            userData.logged = "no";
            localStorage.setItem(email, JSON.stringify(userData));
            console.log("User logged out.");

            window.location.href = "../index.html";
        }
    }
}


window.onload = checkUserLogin;


