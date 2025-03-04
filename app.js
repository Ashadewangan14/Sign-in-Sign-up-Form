const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});

// Password Validation Function
function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
  return passwordRegex.test(password);
}

// Email Validation Function
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Contact Number Validation Function
function validateContactNumber(number) {
  const contactRegex = /^\+\d{1,3}[-\s]?\d{10}$/; // Example: +91-9876543210 or +91 9876543210
  return contactRegex.test(number);
}

// Sign Up Form Submission
document.querySelector(".sign-up-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("signup-username").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const contact = document.getElementById("signup-contact").value.trim();
  const errorMessage = document.getElementById("signup-error");

  let errors = [];

  if (!validateEmail(email)) {
    errors.push("❌ Invalid email format.");
  }

  if (!validatePassword(password)) {
    errors.push("❌ Password must be 8-16 chars, with upper, lower, number & symbol.");
  }

  if (!validateContactNumber(contact)) {
    errors.push("❌ Invalid contact number format. Use country code (e.g., +91 9876543210).");
  }

  if (errors.length > 0) {
    errorMessage.innerHTML = errors.join("<br>");
    return;
  }

  if (localStorage.getItem(email)) {
    alert("⚠️ Email already registered! Use another email.");
    return;
  }

  localStorage.setItem(email, JSON.stringify({ username, password, contact }));
  // alert("✅ Sign up successful! You can now log in.");
  document.querySelector(".sign-in-form").reset();
  window.location.href = "dashboard.html";
});

// Sign In Form Submission
document.querySelector(".sign-in-form").addEventListener("submit", function (event) {
  event.preventDefault();
  const email = document.getElementById("signin-username").value.trim();
  const password = document.getElementById("signin-password").value;
  const errorMessage = document.getElementById("signin-error");

  const storedUser = localStorage.getItem(email);
  if (!storedUser) {
    errorMessage.textContent = "❌ Email not found! Please sign up.";
    return;
  }

  const userData = JSON.parse(storedUser);
  if (userData.password !== password) {
    errorMessage.textContent = "❌ Incorrect password! Please try again.";
    return;
  }

  sessionStorage.setItem("loggedInUser", email);
  // alert("✅ Login successful! Welcome, " + userData.username);
  document.querySelector(".sign-in-form").reset();
  window.location.href = "dashboard.html"; // Redirect to dashboard
});


