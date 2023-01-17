/*-----------------------------------------------------------*/
/*  Store and update preference page  */
/*-----------------------------------------------------------*/

// document.cookie = "user_id=624d9c7f0ea1088d60cf28ac";

let activeUser = null;

const noMoreContent = document.querySelector("#no-contents");
const allContent = document.querySelector("#all-contents");

// Mock-up user
class User {
  constructor(
    firstName,
    lastName,
    date_of_birth,
    gender,
    university,
    attributes,
    location,
    province,
    postalCode,
    description,
    social_handles
  ) {
    (this.firstName = firstName),
      (this.lastName = lastName),
      (this.date_of_birth = date_of_birth),
      (this.gender = gender),
      (this.university = university),
      (this.attributes = attributes),
      (this.location = location),
      (this.province = province),
      (this.postalCode = postalCode),
      (this.description = description),
      (this.social_handles = social_handles);
  }
}

/* Event listeners for login and registration */
submit.addEventListener("click", saveAndGoToDiscoverTournament);

// Getting User ID from request

// const requestString = window.location.search;
// const urlParameters = new URLSearchParams(requestString);
// const id = parseInt(urlParameters.get("userId"));

// DOM render code

function dom_render(UserObject) {
  let firstName = document.getElementById("firstName");
  if (UserObject.firstName !== undefined) {
    firstName.placeholder = UserObject.firstName;
  }

  let lastName = document.getElementById("lastName");
  if (UserObject.lastName !== undefined) {
    lastName.placeholder = UserObject.lastName;
  }

  let age = document.getElementById("age");
  if (UserObject.date_of_birth !== undefined) {
    age.placeholder = UserObject.date_of_birth;
  }

  let university = document.getElementById("uni");
  if (UserObject.university !== undefined) {
    university.placeholder = UserObject.university;
  }

  let male = document.getElementById("male");
  let female = document.getElementById("female");
  let otherGender = document.getElementById("otherGender");
  if (UserObject.gender === "male") {
    male.checked = true;
  }
  if (UserObject.gender === "female") {
    female.checked = true;
  }
  if (UserObject.gender === "otherGender") {
    otherGender.checked = true;
  }
  for (let sport of UserObject.attributes) {
    document.getElementById(sport).checked = true;
  }
  let city = document.getElementById("city");
  if (UserObject.location !== undefined) {
    city.placeholder = UserObject.location;
  }
  let province = document.getElementById("province");
  if (UserObject.province !== undefined) {
    province.value = UserObject.province;
  }

  let postalCode = document.getElementById("postalCode");
  if (UserObject.postalCode !== undefined) {
    postalCode.placeholder = UserObject.postalCode;
  }

  let description = document.getElementById("description");
  if (UserObject.description !== undefined) {
    description.innerHTML = UserObject.description;
  }

  // let handle = document.getElementById("handle");
  let contact = document.getElementById("contact");

  const handleValueReceived = UserObject.social_handles;
  if (handleValueReceived) {
    if (handleValueReceived.phone != "") {
      document.getElementById("phone").checked = true;
      contact.innerHTML = handleValueReceived.phone;
    } else if (handleValueReceived.email != "") {
      document.getElementById("email").checked = true;
      contact.innerHTML = handleValueReceived.email;
    } else if (handleValueReceived.facebook != "") {
      document.getElementById("facebook").checked = true;
      contact.innerHTML = handleValueReceived.facebook;
    } else if (handleValueReceived.twitter != "") {
      document.getElementById("twitter").checked = true;
      contact.innerHTML = handleValueReceived.twitter;
    } else if (handleValueReceived.instagram != "") {
      document.getElementById("instagram").checked = true;
      contact.innerHTML = handleValueReceived.instagram;
    } else if (handleValueReceived.pinterest != "") {
      document.getElementById("pinterest").checked = true;
      contact.innerHTML = handleValueReceived.pinterest;
    } else if (handleValueReceived.whatsapp != "") {
      document.getElementById("whatsapp").checked = true;
      contact.innerHTML = handleValueReceived.whatsapp;
    }
  }

  // if (UserObject.contact !== undefined) {
  //   contact.innerHTML = UserObject.contact;
  // }
}

function loaad_preferences() {
  let xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status == 200) {
        noMoreContent.style.display = "none";
        allContent.style.display = "block";

        let json_response = JSON.parse(this.responseText);

        // if(json_response.date_of_birth !== null){
        //     let dob = new Date(json_response.date_of_birth);
        //     let delta = new Date() - dob;
        //     let age = Math.floor(delta / (1000 * 60 * 60 * 24 * 365.25));
        // } else {
        //     let age = 0;
        // }

        current_person = new User(
          json_response.firstName,
          json_response.lastName,
          json_response.date_of_birth,
          json_response.gender,
          json_response.university,
          json_response.attributes,
          json_response.location,
          json_response.province,
          json_response.postalCode,
          json_response.description,
          json_response.social_handles,
          json_response.contact
        );
        dom_render(current_person);
      } else {
        noMoreContent.style.display = "block";
        allContent.style.display = "none";
      }
    }
  });

  xhr.open(
    "GET",
    "https://csc309-backend.herokuapp.com/set-preference/" +
      getCookie("user_id")
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}

loaad_preferences();

function saveAndGoToDiscoverTournament(e) {
  e.preventDefault();

  // Update/Edit user information

  activeUser = {};

  activeUser.firstName = document.getElementById("firstName").value;

  activeUser.lastName = document.getElementById("lastName").value;

  const DOBentered = document.getElementById("age").value;
  let placeholder = document.getElementById("age").getAttribute("placeholder");

  // activeUser.date_of_birth = document.getElementById("age").value;
  if (checkDate(DOBentered) || checkDate(placeholder)) {
    activeUser.date_of_birth = document.getElementById("age").value;
  } else {
    alert("Invalide date format. Use YYYY/MM/DD");
    return;
  }

  activeUser.university = document.getElementById("uni").value;

  if (document.getElementById("male").checked) {
    activeUser.gender = "male";
  }

  if (document.getElementById("female").checked) {
    activeUser.gender = "female";
  }

  if (document.getElementById("otherGender").checked) {
    activeUser.gender = "otherGender";
  }

  activeUser.attributes = [];
  let chosenSports = document.querySelectorAll('input[name="sport"]:checked');
  chosenSports.forEach((sport) => {
    activeUser.attributes.push(sport.value);
  });

  activeUser.location = document.getElementById("city").value;

  activeUser.province = document.getElementById("province").value;

  activeUser.postalCode = document.getElementById("postalCode").value;

  activeUser.description = document.getElementById("description").value;

  // const handleName = document.getElementById("handle").value;
  const handleValue = document.getElementById("contact").value;
  if (document.getElementById("phone").checked) {
    activeUser.social_handles = {
      phone: handleValue,
      email: "",
      facebook: "",
      twitter: "",
      instagram: "",
      pinterest: "",
      whatsapp: "",
    };
  } else if (document.getElementById("email").checked) {
    activeUser.social_handles = {
      phone: "",
      email: handleValue,
      facebook: "",
      twitter: "",
      instagram: "",
      pinterest: "",
      whatsapp: "",
    };
  } else if (document.getElementById("facebook").checked) {
    activeUser.social_handles = {
      phone: "",
      email: "",
      facebook: handleValue,
      twitter: "",
      instagram: "",
      pinterest: "",
      whatsapp: "",
    };
  } else if (document.getElementById("twitter").checked) {
    activeUser.social_handles = {
      phone: "",
      email: "",
      facebook: "",
      twitter: handleValue,
      instagram: "",
      pinterest: "",
      whatsapp: "",
    };
  } else if (document.getElementById("instagram").checked) {
    activeUser.social_handles = {
      phone: "",
      email: "",
      facebook: "",
      twitter: "",
      instagram: handleValue,
      pinterest: "",
      whatsapp: "",
    };
  } else if (document.getElementById("pinterest").checked) {
    activeUser.social_handles = {
      phone: "",
      email: "",
      facebook: "",
      twitter: "",
      instagram: "",
      pinterest: handleValue,
      whatsapp: "",
    };
  } else if (document.getElementById("whatsapp").checked) {
    activeUser.social_handles = {
      phone: "",
      email: "",
      facebook: "",
      twitter: "",
      instagram: "",
      pinterest: "",
      whatsapp: handleValue,
    };
  }

  activeUser.contact = document.getElementById("contact").value;

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status == 200) {
        window.location.href = "/meet/discover/index.html";
      }
    }
  });

  xhr.open(
    "POST",
    "https://csc309-backend.herokuapp.com/set-preference/" +
      getCookie("user_id")
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(activeUser));
}

function checkDate(dateEntered) {
  let regexToCheck =
    "((?:19|20)\\d\\d)/(0?[1-9]|1[012])/([12][0-9]|3[01]|0?[1-9])";
  return dateEntered.match(regexToCheck) != null;
}

// General utility function taken from https://www.tabnine.com/academy/javascript/how-to-get-cookies/
function getCookie(cName) {
  const name = cName + "=";
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split("; ");
  let res;
  cArr.forEach((val) => {
    if (val.indexOf(name) === 0) res = val.substring(name.length);
  });
  return res;
}
