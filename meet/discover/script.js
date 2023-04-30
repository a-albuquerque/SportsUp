// Selector
const personNameTitle = document.querySelector("#personNameTitle");
const personAge = document.querySelector("#personAge");
const personLocation = document.querySelector("#personLocation");
const personUniversity = document.querySelector("#personUniversity");
const personAttributes = document.querySelector("#personAttributes");
const personNameDescription = document.querySelector("#personNameDescription");
const personDescription = document.querySelector("#personDescription");

const followButton = document.querySelector("#followButton");
const passButton = document.querySelector("#passButton");

const noMoreContent = document.querySelector("#no-contents");
const allContent = document.querySelector("#all-contents");

var current_person = null;

// document.cookie = "user_id=6243c4f7057229f0606d885d";

// Event Listeners
followButton.addEventListener("click", followAction);
passButton.addEventListener("click", passAction);

// Classes
class Person {
  constructor(
    personId,
    personName,
    age,
    location,
    university,
    attributes,
    description
  ) {
    this.personId = personId;
    this.personName = personName;
    this.age = age;
    this.location = location;
    this.university = university;
    this.attributes = attributes;
    this.description = description;
  }
}

// Data Functions
function dom_render(person) {
  personNameTitle.innerHTML = person.personName;
  personNameDescription.innerHTML = person.personName;
  personAge.innerHTML = person.age;
  personLocation.innerHTML = person.location;
  personUniversity.innerHTML = person.university;
  personDescription.innerHTML = person.description;
  personAttributes.innerHTML = person.attributes.reduce(function (agg, p) {
    return (
      agg +
      '<span class="tminusthree ms-1 badge rounded-pill bg-dark">' +
      p +
      "</span>"
    );
  }, "");
}

function get_new_person_to_discover() {
  var xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status == 200) {
        noMoreContent.style.display = "none";
        allContent.style.display = "block";

        var json_response = JSON.parse(this.responseText);

        var dob = new Date(json_response.date_of_birth);
        var delta = new Date() - dob;
        var age = Math.floor(delta / (1000 * 60 * 60 * 24 * 365.25));

        current_person = new Person(
          json_response._id,
          json_response.fullname,
          age,
          json_response.location,
          json_response.university,
          json_response.attributes,
          json_response.description
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
    "https://sportsupbackend.herokuapp.com/discover-people/" +
      getCookie("user_id")
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}

// Business Logic
get_new_person_to_discover();

// Action Functions
function followAction() {
  var xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      get_new_person_to_discover();
    }
  });

  xhr.open(
    "POST",
    "https://sportsupbackend.herokuapp.com/follow-person/" +
      getCookie("user_id") +
      "/" +
      current_person.personId
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}

function passAction() {
  var xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      get_new_person_to_discover();
    }
  });

  xhr.open(
    "POST",
    "https://sportsupbackend.herokuapp.com/pass-person/" +
      getCookie("user_id") +
      "/" +
      current_person.personId
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
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
