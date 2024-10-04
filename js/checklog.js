

function checkUserLogin() {
    const email = getQueryParam('email'); 
    let userData;

    if (email) {
        userData = JSON.parse(localStorage.getItem(email));
    }

    if (userData && userData.logged === "Yes") {
        var logoutButton = document.querySelector('.btn-custom-1'); 
        if (logoutButton) {
            logoutButton.innerText = "Logout";
            logoutButton.onclick = logout;
        }

        var icon = document.querySelector('.for-logging');
        if (icon) {
            icon.innerHTML = `<a href="pages/profile.html?email=${encodeURIComponent(email)}"><i class="fa-solid fa-user"></i></a>`;
        }
    } else {
        var loginButton = document.querySelector('.btn-custom-1'); 
        if (loginButton) {
            loginButton.innerText = "Login";
            // loginButton.onclick = login; // Make sure this function exists
        }
    }
}

function logout() {
    const email = getQueryParam('email'); 
    if (email) {
        const userData = JSON.parse(localStorage.getItem(email));
        if (userData) {
            userData.logged = "no"; 
            localStorage.setItem(email, JSON.stringify(userData)); 
            console.log("User logged out.");
            window.location.href = "../index.html"; // Redirect after logging out
        }
    }
}

window.onload = checkUserLogin;

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name); 
}

