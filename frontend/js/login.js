// frontend/js/login.js
document.getElementById("loginForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        const msgEl = document.getElementById("loginMessage");

        if (response.ok) {
            msgEl.style.color = "green";
            msgEl.textContent = "Login successful! Redirecting...";
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1500);
        } else {
            msgEl.style.color = "red";
            msgEl.textContent = data.message || "Login failed!";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("loginMessage").textContent = "Server error!";
    }
});
