// document.cookie = "user_id=6243c4f7057229f0606d885d";
const noMoreContent = document.getElementById("no-contents");
const allContent = document.getElementById("all-contents");

// Tournament Class
class Tournament {
  constructor(
    tournamentId,
    tournamentName,
    tournamentDate,
    tournamentlocation
  ) {
    this.tournamentId = tournamentId;
    this.tournamentName = tournamentName;
    this.tournamentDate = tournamentDate;
    this.tournamentlocation = tournamentlocation;
  }
}

// functions rendering the DOM
function dom_render(tournaments) {
  for (let i = 0; i < tournaments.length; i++) {
    let tournament = tournaments[i];
    const mainDiv = document.getElementById("container-to-add");

    const row1 = document.createElement("div");
    row1.classList.add("row");
    row1.classList.add("row-bottom");

    const cardDiv = document.createElement("div");
    cardDiv.classList.add(["col-sm-6"]);

    const cardDec = document.createElement("div");
    cardDec.classList.add(["card"]);

    const cardBody = document.createElement("div");
    cardBody.classList.add(["card-body"]);

    const h4Tag = document.createElement("h4");
    h4Tag.innerText = tournament.tournamentName;

    // const h4Span = document.createElement("span")
    // h4Span.classList.add(["badge", "bg-secondary", "ms-2"])
    // h4Span.style.transform = "translateY(-3px)"
    // h4Span.innerText = tournament.sport
    // h4Tag.appendChild(h4Span)

    const dateP = document.createElement("p");
    dateP.classList.add(["card-text"]);
    dateP.innerText = "Date: " + tournament.tournamentDate;

    const locationP = document.createElement("p");
    locationP.classList.add(["card-text"]);
    locationP.innerText = "Location: " + tournament.tournamentlocation;

    cardBody.appendChild(h4Tag);
    cardBody.appendChild(dateP);
    cardBody.appendChild(locationP);

    cardDec.appendChild(cardBody);
    cardDiv.appendChild(cardDec);
    row1.appendChild(cardDiv);

    const viewButton = document.createElement("div");
    viewButton.classList.add(["col-sm-6"]);

    const aTag = document.createElement("a");
    aTag.style.position = "relative";
    aTag.style.top = "35%";
    aTag.style.left = "30%";
    aTag.classList.add("btn");
    aTag.classList.add("btn-primary");
    aTag.innerText = "View";
    aTag.href = "../get/index.html?tournamentId=" + tournament.tournamentId;

    viewButton.appendChild(aTag);

    row1.appendChild(viewButton);
    mainDiv.appendChild(row1);
  }
}

// backend function calls

function get_joined_tournaments() {
  let xhr = new XMLHttpRequest();
  // xhr.withCredentials = true;

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status == 200) {
        let json_response = JSON.parse(this.responseText);
        noMoreContent.style.display = "none";
        allContent.style.display = "block";

        let tournaments = [];

        for (let i = 0; i < json_response.length; i++) {
          tournaments.push(
            new Tournament(
              json_response[i]._id,
              json_response[i].tournament_name,
              json_response[i].date,
              json_response[i].location
            )
          );
        }

        dom_render(tournaments);
      } else {
        noMoreContent.style.display = "block";
        allContent.style.display = "none";
      }
    }
  });

  xhr.open(
    "GET",
    "https://sportsupbackend.herokuapp.com/joined-tournaments/" +
      getCookie("user_id")
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}

get_joined_tournaments();

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

// {
//   "tournament_name": "Sample tournament 1",
//   "date": "22-22-22",
//   "description": "sample tennis tournament maybe",
//   "organiser": "Sample organiser",
//   "participants": [
//       "6243c4f7057229f0606d885d"
//   ],
//   "_id": "624a07a68b9fe025f03bbf81",
//   "__v": 0
// }
