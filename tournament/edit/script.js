const saveButton = document.querySelector("#saveButton");
const cancelButton = document.querySelector("#cancelButton");

class Tournament {
  constructor(
    tournamentId,
    tournamentName,
    tournamentDate,
    description,
    organiser,
    tournamentlocation
  ) {
    this.tournamentId = tournamentId;
    this.tournament_name = tournamentName;
    this.date = tournamentDate;
    this.description = description;
    this.organiser = organiser;
    this.location = tournamentlocation;
  }
}

saveButton.addEventListener("click", editTournament);

const tournament_id = getCookie("tournament_id");

document.cookie = "tournament_id=;expires=Thu, 01 Jan 1970 00:00:00 GMT";

function get_tournament() {
  // const myURLObj = new URL(window.location.href );
  // const tournamentId = myURLObj.searchParams.get('tournamentId');

  var xhr = new XMLHttpRequest();

  // xhr.open("GET", "https://sportsupbackend.com/edit-tournament/" + getCookie("user_id" ) + '/' + tournamentId);

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status == 200) {
        var json_response = JSON.parse(this.responseText);

        dom_render(
          new Tournament(
            json_response._id,
            json_response.tournament_name,
            json_response.date,
            json_response.description,
            json_response.organiser,
            json_response.location
          )
        );
      }
    }
  });

  xhr.open(
    "GET",
    "https://sportsupbackend.herokuapp.com/edit-tournament/" +
      getCookie("user_id") +
      "/" +
      tournament_id
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}

get_tournament();

function dom_render(tournament) {
  if (tournament.tournament_name) {
    document.getElementById("tournamentName").placeholder =
      tournament.tournament_name;
  }

  if (tournament.date) {
    document.getElementById("tournamentDate").placeholder = tournament.date;
  }

  if (tournament.location) {
    document.getElementById("locationName").placeholder = tournament.location;
  }

  if (tournament.organiser) {
    document.getElementById("organiserName").placeholder = tournament.organiser;
  }

  if (tournament.description) {
    document.getElementById("description").placeholder = tournament.description;
  }
}

function editTournament(e) {
  e.preventDefault();

  const myURLObj = new URL(window.location.href);
  const tournamentId = myURLObj.searchParams.get("tournamentId");

  console.log("created tournament");
  const name = document.getElementById("tournamentName").value;
  const date = document.getElementById("tournamentDate").value;
  const location = document.getElementById("locationName").value;
  const organiser = document.getElementById("organiserName").value;
  const description = document.getElementById("description").value;

  var xhr = new XMLHttpRequest();

  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
      if (this.status == 200) {
        window.location.href = "/tournament/created/index.html";
      }
    }
  });

  //      xhr.onreadystatechange = function() { // Call a function when the state changes.
  //         if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
  //             window.location.href = '/tournament/created/index.html';
  //         }
  //      }

  xhr.open(
    "POST",
    "https://sportsupbackend.com/edit-tournament/" +
      getCookie("user_id") +
      "/" +
      tournament_id
  );
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      name: name,
      date: date,
      description: description,
      organiser: organiser,
      location: location,
    })
  );
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
