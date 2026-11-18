
function showPage(pageId) {
    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.remove("hidden");
    } else {
        console.error("Page not found: " + pageId);
    }
}


// USER REGISTRATION
document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const user = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        age: document.getElementById("age").value,
        height: document.getElementById("height").value,
        weight: document.getElementById("weight").value,
        locality: document.getElementById("locality").value,
        food: document.getElementById("food").value
    };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(u => u.email === user.email)) {
        alert("Email already registered!");
        return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");

    this.reset();
    showPage("login");
});

// USER LOGIN
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u =>
        u.email === email && u.password === password
    );

    if (user) {
        sessionStorage.setItem("loggedInUser", user.email);
        loadDashboard(user);
    } else {
        alert("Invalid Email or Password!");
    }
});

// DASHBOARD
function loadDashboard(user) {
    document.getElementById("welcomeUser").innerText =
        "Welcome, " + user.name + "!";

    document.getElementById("profileDetails").innerText =
        user.name + " | Age: " + user.age;

    document.getElementById("foodPreference").innerText = user.food;

    document.getElementById("userLocality").innerText = user.locality;

    showPage("dashboard");
}

// LOGOUT
function logout() {
    sessionStorage.removeItem("loggedInUser");
    showPage("home");
}

// RESTORE LOGIN DURING SAME BROWSER SESSION
window.addEventListener("DOMContentLoaded", function() {
    const email = sessionStorage.getItem("loggedInUser");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(u => u.email === email);

    if (user) {
        loadDashboard(user);
    }
});
