// document.cookie = "user_id=6243c4f7057229f0606d885d";

const noMoreContent = document.getElementById("no-contents");
const allContent = document.getElementById("all-contents");

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

// DOM Render Function (Data Function)
function dom_render(persons) {
  for (let i = 0; i < persons.length; i++) {
    const person = persons[i];

    const mainDiv = document.getElementById("container-to-add");

    const row1 = document.createElement("div");
    row1.classList.add("row");
    row1.classList.add("row-bottom");

    const colSm = document.createElement("div");
    colSm.classList.add(["col-sm-6"]);

    const cardDec = document.createElement("div");
    cardDec.classList.add(["card"]);

    const cardBody = document.createElement("div");
    cardBody.classList.add(["card-body"]);

    const h4Tag = document.createElement("h4");
    h4Tag.innerText = person.personName;

    const h4Span = document.createElement("span");
    h4Span.classList.add("badge");
    h4Span.classList.add("bg-secondary");
    h4Span.classList.add("ms-2");
    h4Span.style.cssText = "transform: translateY(-3px)";
    h4Span.innerText = "Age: " + person.age;

    h4Tag.appendChild(h4Span);

    const locationP = document.createElement("p");
    locationP.classList.add(["card-text"]);
    locationP.innerText = "Location: " + person.location;

    const schoolP = document.createElement("p");
    schoolP.classList.add(["card-text"]);
    schoolP.innerText = "School: " + person.university;

    cardBody.appendChild(h4Tag);
    cardBody.appendChild(locationP);
    cardBody.appendChild(schoolP);

    cardDec.appendChild(cardBody);
    colSm.appendChild(cardDec);
    row1.appendChild(colSm);

    const viewButton = document.createElement("div");
    viewButton.classList.add(["col-sm-6"]);

    const aTag = document.createElement("a");
    aTag.style.cssText = "position: relative; top: 35%; left: 30%";
    aTag.classList.add("btn");
    aTag.classList.add("btn-primary");
    aTag.innerText = "View";
    aTag.href = "../../person/index.html?personId=" + person.personId;

    viewButton.appendChild(aTag);

    row1.appendChild(viewButton);
    mainDiv.appendChild(row1);
  }
}

function get_followed_people() {
  let xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status == 200) {
        noMoreContent.style.display = "none";
        allContent.style.display = "block";
        const response = JSON.parse(this.responseText); // will be an array in this case

        let persons = [];

        for (let i = 0; i < response.length; i++) {
          let json_response = response[i];

          let dob = new Date(json_response.date_of_birth);
          let delta = new Date() - dob;
          let age = Math.floor(delta / (1000 * 60 * 60 * 24 * 365.25));

          const new_person = new Person(
            json_response._id,
            json_response.fullname,
            age,
            json_response.location,
            json_response.university,
            json_response.attributes,
            json_response.description
          );

          persons.push(new_person);
        }

        dom_render(persons);
      } else {
        noMoreContent.style.display = "block";
        allContent.style.display = "none";
      }
    }
  });

  xhr.open(
    "GET",
    "https://csc309-backend.herokuapp.com/followed-people/" +
      getCookie("user_id")
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}

get_followed_people();

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
