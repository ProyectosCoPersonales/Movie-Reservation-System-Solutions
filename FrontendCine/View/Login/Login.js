const container = document.querySelector(".container");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const toggleLink = document.getElementById("toggleLink");
const formTitle = document.getElementById("formTitle");

function toggleForms() {
  container.classList.toggle("expanded");
  loginForm.classList.toggle("fade-out");
  registerForm.classList.toggle("fade-out");

  setTimeout(() => {
    loginForm.classList.toggle("hidden");
    registerForm.classList.toggle("hidden");

    if (loginForm.classList.contains("hidden")) {
      formTitle.textContent = "Create Your Account";
      toggleLink.textContent = "Back to Login";
    } else {
      formTitle.textContent = "Hello! Good Morning";
      toggleLink.textContent = "Create Account";
    }

    loginForm.classList.toggle("fade-out");
    registerForm.classList.toggle("fade-out");
  }, 300);
}

toggleLink.addEventListener("click", function (e) {
  e.preventDefault();
  toggleForms();
});


document.addEventListener("DOMContentLoaded", function () {
  const titleElement = document.getElementById("formTitle");
  const currentHour = new Date().getHours();

  let greeting;

  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  titleElement.textContent = `Hello! ${greeting}`;
});

$(document).ready(function () {
  $("#loginForm").submit(function (event) {
    event.preventDefault();
    var username = $("#username").val();
    var password = $("#password").val();
    console.log(username);
    console.log(password);

    $.ajax({
      url: "http://localhost:8080/auth/login",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        username: username,
        password: password
      }),
      success: function (response) {
        var token = response.token;
        var username = response.username; 
        var role = response.role; 

        localStorage.setItem("jwtToken", token);
        localStorage.setItem("username", username);
        localStorage.setItem("userRole", role);

        var baseUrl = window.location.origin;
        if(role==='ADMIN'){
          window.location.href = baseUrl + '/View/UserForm/UserForm.html';
        }else if(role==='USER'){
          window.location.href = baseUrl + '/View/Dashboard/index.html';          
        }else{
          window.location.href = baseUrl + '/View/Login/Login.html'
        }
      },
      error: function (xhr, status, error) {
        console.log("Login error:", error);
        alert("Login failed. Please check your credentials.");
      },
    });
  });
});
