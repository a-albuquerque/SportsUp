/*-----------------------------------------------------------*/
/*  Handles user login interactions. */
/*-----------------------------------------------------------*/
const usersURI = 'http://localhost:5000/users/login' 

let activeUser = false



/* Event listeners for login and registration */
login.addEventListener('click', checkCredential);
register.addEventListener('click', goToRegister);


function checkCredential(e){


	e.preventDefault();

	const triedUsername = loginForm.querySelector('#username').value
	const triedPassword = loginForm.querySelector('#password').value


	const loginBody = {"username": triedUsername, "password": triedPassword}

	fetch(usersURI, {
	  method: "POST",
	  redirect: "follow",
	  headers: {'Content-Type': 'application/json'}, 
	  body: JSON.stringify(loginBody)
	}).then(res => {
	  console.log(res);
	  if (res.redirected) {
        window.location.href = "../preference/index.html";
      }
      else{
      	const invalidMessage = document.createElement('div');
	    invalidMessage.innerHTML = "Invalid Username or Password!";
	    invalidMessage.classList.add("alert");
        invalidMessage.classList.add("alert-danger");
	    invalidMessage.setAttribute("role", "alert");
	    loginFormElement = document.getElementById("loginForm");
	    loginFormElement.appendChild(invalidMessage);
      }
	}).catch(err => {
      console.log(err);
	});

}



function goToRegister(e){
	e.preventDefault();
	window.location.href = "../register/index.html";
}


function goToPreference(e){
	e.preventDefault();
	window.location.href = "../preference/index.html";
}

