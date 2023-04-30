/*-----------------------------------------------------------*/
/*  Handles user login interactions. */
/*-----------------------------------------------------------*/
const usersURI = "https://sportsupbackend.herokuapp.com/login";

let activeUser = false;

/* Event listeners for login and registration */
login.addEventListener("click", checkCredential);
register.addEventListener("click", goToRegister);

function checkCredential(e) {
  e.preventDefault();

  const triedUsername = loginForm.querySelector("#username").value;
  const triedPassword = loginForm.querySelector("#password").value;

  const loginBody = { username: triedUsername, password: triedPassword };

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status == 200) {
        var json_response = JSON.parse(this.responseText);
        document.cookie = "user_id=" + json_response.user_id + ";path=/";
        window.location.href = "../preference/index.html";
      }

      if (this.status == 500) {
        if (document.contains(document.getElementById("invalidMessage"))) {
          document.getElementById("invalidMessage").remove();
        }
        const invalidMessage = document.createElement("div");
        invalidMessage.innerHTML = "Something went wrong!";
        invalidMessage.classList.add("alert");
        invalidMessage.classList.add("alert-danger");
        invalidMessage.setAttribute("role", "alert");
        loginFormElement = document.getElementById("loginForm");
        loginFormElement.appendChild(invalidMessage);
      }

      if (this.status == 203) {
        const invalidMessage = document.createElement("div");
        invalidMessage.innerHTML = "Invalid Username!";
        invalidMessage.classList.add("alert");
        invalidMessage.classList.add("alert-danger");
        invalidMessage.setAttribute("role", "alert");
        loginFormElement = document.getElementById("loginForm");
        loginFormElement.appendChild(invalidMessage);
      }

      if (this.status == 204) {
        const invalidMessage = document.createElement("div");
        invalidMessage.innerHTML = "Invalid Password!";
        invalidMessage.classList.add("alert");
        invalidMessage.classList.add("alert-danger");
        invalidMessage.setAttribute("role", "alert");
        loginFormElement = document.getElementById("loginForm");
        loginFormElement.appendChild(invalidMessage);
      }
    }
  });

  xhr.open("POST", usersURI);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(loginBody));
}

function goToRegister(e) {
  e.preventDefault();
  window.location.href = "../register/index.html";
}

function goToPreference(e) {
  e.preventDefault();
  window.location.href = "../preference/index.html";
}
