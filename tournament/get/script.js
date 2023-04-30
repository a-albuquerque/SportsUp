/*-----------------------------------------------------------*/
/*  View Tournament and handles user interactions. */
/*-----------------------------------------------------------*/


const requestString = window.location.search;
const urlParameters = new URLSearchParams(requestString);
const id = urlParameters.get("tournamentId");
let activeTournament;

// REMEMBER TO REPLACE LINE 113 IF LOCAL DEVELOPEMENT


get_tournament(id);



function goToJoinedTournaments(e){
	
  e.preventDefault();

  var xhr = new XMLHttpRequest();
  // getCookie("user_id") + '/'
  xhr.open("POST", "https://sportsupbackend.herokuapp.com/discover-tournament/" + getCookie("user_id" ) + '/' + activeTournament._id);

  xhr.onreadystatechange = function() { // Call a function when the state changes.
     if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
         window.location.href = '/tournament/created/index.html';
     }
  }
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify({"name": activeTournament.tournament_name, "date": activeTournament.date, "description": activeTournament.description, "organiser": activeTournament.organiser, "location": activeTournament.location}));

}




function get_tournament(id) {
        // const myURLObj = new URL(window.location.href );
        // const tournamentId = myURLObj.searchParams.get('tournamentId');

        var xhr = new XMLHttpRequest();

        // xhr.open("GET", "https://sportsupbackend.herokuapp.com/edit-tournament/" + getCookie("user_id" ) + '/' + tournamentId);

        xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
        
                    if (this.status == 200) {
                        
                        var json_response = JSON.parse(this.responseText);
                        activeTournament = json_response;                       
                        
                        //dom_render(new Tournament(json_response._id, json_response.tournament_name,  json_response.date, json_response.description, json_response.organiser, json_response.location));

                        const card = document.createElement("div");
                        card.classList.add("card");

                        const title = document.createElement("h5");
                        title.classList.add("card-header");
                        title.innerHTML = json_response.tournament_name;
                        title.setAttribute("id", "tournamentTitle");

                        const body = document.createElement("div");
                        body.classList.add("card-body");

                        const date = document.createElement("h5");
                        date.classList.add("card-title");
                        date.innerHTML = json_response.date;

                        const loc = document.createElement("h5");
                        loc.classList.add("card-title");
                        loc.innerHTML = json_response.location;

                        const strong = document.createElement("strong");
                        strong.innerHTML = " Organizer:";

                        const span = document.createElement("span");
                        strong.innerHTML = json_response.organiser;
                        span.setAttribute("id", "tournamentOrganizer");

                        const organizer = document.createElement("p");
                        organizer.classList.add("card-text");
                        organizer.appendChild(strong);
                        organizer.appendChild(span);

                        const description = document.createElement("p");
                        description.classList.add("card-text");
                        description.innerHTML = json_response.description;
                        const button = document.createElement("button");
                        button.classList.add("btn");
                        button.classList.add("btn-primary");
                        button.classList.add("btn-lg");
                        button.classList.add("btn-block");
                        button.setAttribute("id", "enroll");
                        button.innerHTML = "Enroll Now!!";
                        body.appendChild(date);
                        body.appendChild(loc);
                        body.appendChild(organizer);
                        body.appendChild(description);
                        //body.appendChild(button);
                        body.setAttribute("id", "cbody");
                        card.appendChild(title);
                        card.appendChild(body);
                        const displaySite = document.getElementById("addTournamentHere");
                        displaySite.appendChild(card);
                        enroll.addEventListener('click', goToJoinedTournaments);
        
                    }
                }
            });
        // local testing : xhr.open("GET", "http://localhost:5002/edit-tournament/624ddad8a0255c653ed6a8ee/" + id);
        xhr.open("GET", "https://sportsupbackend.herokuapp.com/edit-tournament/" + getCookie("user_id") + '/' + id);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send();

}



// General utility function taken from https://www.tabnine.com/academy/javascript/how-to-get-cookies/
function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res
}



