  // Function to get query parameters from the URL
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}


function checkUserLogin() {
    const email = getQueryParam('email'); 
    let userData;

    if (email) {
        userData = JSON.parse(localStorage.getItem(email)); 
    }

    // Select necessary elements
    const loginButton = document.querySelector('.btn-custom-1');
    const signupButton = document.querySelector('.for-logging'); 
    const icon = document.querySelector('.profile-icon'); 

    if (userData && userData.logged === "Yes") {
    
        if (loginButton) {
            loginButton.style.display = "none";
        }

        if (signupButton) {
            signupButton.style.display = "none";
        }


        if (icon) {
            icon.style.display = "inline-block";
            icon.innerHTML = `<a href="pages/profile.html?email=${encodeURIComponent(email)}">
                                <i class="fa-solid fa-user py-3 px-4 ml-auto mt-3" style="color:#FD5B4E ; font-size:40px"></i>
                              </a> 
                              <button class="btn btn-blue btn-custom-1 py-3 px-4 ml-auto mt-3 " onclick="logout('${email}')">Logout</button>`;
        }
    } else {
       
        if (loginButton) {
            loginButton.style.display = "inline-block";
            loginButton.innerText = "Login";
            loginButton.onclick = () => {
           
                window.location.href = "pages/login.html";
            };
        }

        if (signupButton) {
            signupButton.style.display = "inline-block";
           // signupButton.innerText = "SIGN UP ";
            signupButton.innerHTML = `<a href="pages/register.html" class="btn btn-primary btn-custom-1 py-3 px-4 ml-auto mt-3 for-logging" >SIGN UP</a>`;
        }

        // Hide profile icon and logout button
        if (icon) {
            icon.style.display = "none";
            icon.innerHTML = ""; // Clear the icon element
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

            window.location.href = "index.html";
        }
    }
}

// Call checkUserLogin when the window loads
window.onload = checkUserLogin;
