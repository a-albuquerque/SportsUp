/*-----------------------------------------------------------*/
/*  Store and update preference page  */
/*-----------------------------------------------------------*/

const usersURI = '/api/users'


let activeUser = null;

// Mock-up user
class User {
	constructor(username, password) {
		this.username =  username;
		this.password = password;
        this.firstName;
        this.lastName;
        this.age;
        this.gender;
        this.city;
        this.province;
        this.postalCode;
        this.description;
        this.handle;
        this.contact;

        this.sports;

        this.school;
		
	}

}
let mockUser = new User("user", "user");
mockUser.firstName = "Rosalind"
mockUser.lastName = "Franklin"
mockUser.age = "21";
mockUser.gender = "female"
mockUser.city = "Toronto";
mockUser.province = "ON";
mockUser.postalCode = "M5S1A1"
mockUser.sports = ["Baseball", "Running", "Cycling", "Ice Hockey", "Table Tennis", "Tennis"];
mockUser.description = "Hi folks! I am a Tennis lover (in all modalities) and a busy undergrad student who just got in town. I am eager to make new friends and would love to coordinate with a partner to play with! I would prefer to meet at a downtown court but I am open to commute (I know some Tennis gems hidden all over GTA ;>) Also open to other sports and a cup of coffee!  Shoot me a message if interested! See you soon!";
mockUser.handle = "facebook";
mockUser.contact = "rosa.fraklin@mail.utoronto.ca"





/* Event listeners for login and registration */
submit.addEventListener('click', saveAndGoToDiscoverTournament);




// Getting User ID from request

const requestString = window.location.search;
const urlParameters = new URLSearchParams(requestString);
const id = parseInt(urlParameters.get("userId"));

// SERVER CALL
getUser(id);



function getUser(_id) {
    fetch(usersURI, {
      method: "GET",
      headers: {'Content-Type': 'application/json'}, 
    }).then(response => response.json())
      .then((data) => {
                        activeUser = data
                        // If user is already registered, this is an edit profile view, should load data
                        if(activeUser != null){
                            //console.log(activeUser)
                            let firstName = document.getElementById("firstName");
                            firstName.placeholder = activeUser.firstName;
                            let lastName = document.getElementById("lastName");
                            lastName.placeholder = activeUser.lastName;
                            let age = document.getElementById("age");
                            age.placeholder = activeUser.age;
                            let male = document.getElementById("male");
                            let female = document.getElementById("female");
                            let otherGender = document.getElementById("otherGender");
                            if(activeUser.gender === "male"){
                                male.checked = true;
                            }
                            if(activeUser.gender === "female"){
                                female.checked = true;
                            }
                            if(activeUser.gender === "otherGender"){
                                otherGender.checked = true;
                            }
                            for (let sport of activeUser.sports) {
                                document.getElementById(sport).checked = true;
                            }
                            let city = document.getElementById("city");
                            city.placeholder = activeUser.city;
                            let province = document.getElementById("province");
                            province.value = activeUser.province;
                            let postalCode = document.getElementById("postalCode");
                            postalCode.placeholder = activeUser.postalCode;
                            let description = document.getElementById("description");
                            description.innerHTML =  activeUser.description;
                            let handle = document.getElementById("handle");
                            handle.value = activeUser.handle;
                            let contact = document.getElementById("contact");
                            contact.innerHTML =  activeUser.contact;
                        }
                    }
            );
}


  function saveAndGoToDiscoverTournament(e){
	
    e.preventDefault();

    // Update/Edit user information

    activeUser = {}

    activeUser.firstName = document.getElementById("firstName").value;

    activeUser.lastName = document.getElementById("lastName").value;

    activeUser.age = document.getElementById("age").value;

    if(document.getElementById("male").checked){
        activeUser.gender = "male";
    }

    if(document.getElementById("female").checked){
        activeUser.gender = "female";
    }

    if(document.getElementById("otherGender").checked){
        activeUser.gender = "otherGender";
    }

    activeUser.sports = [];
    let chosenSports = document.querySelectorAll('input[name="sport"]:checked');
    chosenSports.forEach(  (sport) => {activeUser.sports.push(sport.value);}    );

    activeUser.city = document.getElementById("city").value;
   
    activeUser.province = document.getElementById("province").value;

    activeUser.postalCode = document.getElementById("postalCode").value;

    activeUser.description = document.getElementById("description").value;

    activeUser.handle = document.getElementById("handle").value;

    activeUser.contact = document.getElementById("contact").value;


    fetch(usersURI, {
      method: "PATCH",
      redirect: "follow",
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(activeUser)
    }).then(res => {
      //console.log(res);
      }).catch(err => {
      console.log(err);
    });


	window.location.href = "/preference";
}