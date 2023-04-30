/*-----------------------------------------------------------*/
/*  Handles user registration. */
/*-----------------------------------------------------------*/

const addUserURI = "https://csc309-backend.herokuapp.com/register";

/* Event listener for registration */
register.addEventListener("click", addUser);

function addUser(e) {
  e.preventDefault();

  const username = registrationForm.querySelector("#username").value;
  const password = registrationForm.querySelector("#password").value;
  const repeatedPassword =
    registrationForm.querySelector("#repeatedPassword").value;

  // Remove previous warnings, if exist
  if (document.contains(document.getElementById("doNotMatch"))) {
    document.getElementById("doNotMatch").remove();
  }

  if (document.contains(document.getElementById("repeatedUsername"))) {
    document.getElementById("repeatedUsername").remove();
  }

  // Password do not match
  if (password !== repeatedPassword) {
    let invalidMessage = document.createElement("div");
    invalidMessage.innerHTML = "Repeated password do not match!";
    invalidMessage.classList.add("alert");
    invalidMessage.classList.add("alert-danger");
    invalidMessage.setAttribute("role", "alert");
    invalidMessage.setAttribute("id", "doNotMatch");

    loginFormElement = document.getElementById("registrationForm");
    loginFormElement.appendChild(invalidMessage);

    return;
  }

  const addUserBody = { username: username, password: password };

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status == 200) {
        var json_response = JSON.parse(this.responseText);

        if (json_response.error === "Username already exists") {
          let invalidMessage = document.createElement("div");
          invalidMessage.innerHTML =
            "Username is taken, please choose another!";
          invalidMessage.classList.add("btn");
          invalidMessage.classList.add("btn-warning");
          invalidMessage.setAttribute("role", "alert");
          invalidMessage.setAttribute("id", "repeatedUsername");
          loginFormElement = document.getElementById("registrationForm");
          loginFormElement.appendChild(invalidMessage);
        } else {
          let successMessage = document.createElement("div");
          successMessage.classList.add("btn");
          successMessage.classList.add("btn-lg");
          successMessage.classList.add("btn-success");
          successMessage.setAttribute("type", "button");
          successMessage.setAttribute("onclick", 'window.location = "/login"');
          successMessage.innerHTML = "Registration Successful! Click to Login!";
          loginFormElement = document.getElementById("registrationForm");
          loginFormElement.appendChild(successMessage);
        }
      }
    }
  });

  xhr.open("POST", addUserURI);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(addUserBody));
}
