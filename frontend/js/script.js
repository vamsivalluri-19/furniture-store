// Handle Login
document.getElementById("loginForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let res = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    });

    let data = await res.json();
    alert(data.message || data.error);
});

// Handle Registration
document.getElementById("registerForm")?.addEventListener("submit", async (e) => {
    e.preventDefault();
    let username = document.getElementById("reg_username").value;
    let password = document.getElementById("reg_password").value;

    let res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    });

    let data = await res.json();
    alert(data.message || data.error);
});
