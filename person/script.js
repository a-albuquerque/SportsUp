// document.cookie = "user_id=624d10590ba3b3b0706b4bf2";
const noMoreContent = document.getElementById("no-contents");
const allContent = document.getElementById("all-contents");

// Person class constructor
class Person {
  constructor(
    personId,
    personName,
    age,
    location,
    university,
    social_handles,
    attributes,
    description
  ) {
    this.personId = personId;
    this.personName = personName;
    this.age = age;
    this.location = location;
    this.university = university;
    (this.social_handles = social_handles), (this.attributes = attributes);
    this.description = description;
  }
}

// DOM render function
function dom_render(person) {
  // Elements to be changed as per the object

  document.getElementsByClassName("name-text")[0].innerText = person.personName;

  document.getElementsByClassName("age-text")[0].innerText =
    "Age " + person.age;

  document.getElementsByClassName("location-text")[0].innerText =
    "Location: " + person.location;

  document.getElementsByClassName("school-text")[0].innerText =
    "School: " + person.university;

  const socialHandle = document.getElementsByClassName("social-handle-name")[0];
  const handleValueReceived = person.social_handles;

  if (handleValueReceived.phone != "") {
    socialHandle.innerText = "Phone: " + handleValueReceived.phone;
  } else if (handleValueReceived.email != "") {
    socialHandle.innerText = "Email: " + handleValueReceived.email;
  } else if (handleValueReceived.facebook != "") {
    socialHandle.innerText = "Facebook: " + handleValueReceived.facebook;
  } else if (handleValueReceived.twitter != "") {
    socialHandle.innerText = "Twitter: " + handleValueReceived.twitter;
  } else if (handleValueReceived.instagram != "") {
    socialHandle.innerText = "Instagram: " + handleValueReceived.instagram;
  } else if (handleValueReceived.pinterest != "") {
    socialHandle.innerText = "Pinterest: " + handleValueReceived.pinterest;
  } else if (handleValueReceived.whatsapp != "") {
    socialHandle.innerText = "WhatsApp: " + handleValueReceived.whatsapp;
  }

  document.getElementsByClassName("person-description")[0].innerText =
    person.description;

  // Elements to be created and added

  // 1. Attributes

  const paraAttributes = document.getElementsByClassName("attributes-text")[0];

  for (let i = 0; i < person.attributes.length; i++) {
    const spanElement = document.createElement("span");
    spanElement.classList.add("badge");
    spanElement.classList.add("rounded-pill");
    spanElement.classList.add("bg-dark");
    spanElement.style.cssText = "transform: translateY(-3px)";

    spanElement.innerText = person.attributes[i];
    paraAttributes.appendChild(spanElement);
  }
}

function get_person_info() {
  let xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status == 200) {
        noMoreContent.style.display = "none";
        allContent.style.display = "block";

        let json_response = JSON.parse(this.responseText);

        let dob = new Date(json_response.date_of_birth);
        let delta = new Date() - dob;
        let age = Math.floor(delta / (1000 * 60 * 60 * 24 * 365.25));

        current_person = new Person(
          json_response._id,
          json_response.fullname,
          age,
          json_response.location,
          json_response.university,
          json_response.social_handles,
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
    "https://csc309-backend.herokuapp.com/person-info/" +
      location.search.replace(/^.*?\=/, "")
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}

// Business Logic
get_person_info();

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
