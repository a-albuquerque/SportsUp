// Interactions with tournaments

const noMoreContent = document.querySelector("#no-contents");
const allContent = document.querySelector("#all-contents");

const enterButtons = document.getElementsByClassName("ms-0 me-0 col btn btn-success");

let tournaments = [];






// Function for handling participants button being clicked
function viewParticipants(e) {
	e.preventDefault();

	// const card = e.target.parentElement.parentElement.parentElement;

    // const title = card.getElementsByClassName("tournamentTitle")[0].innerText;

    // changeModalTitle(title);
	
}

// // Function for handling enter button being clicked
// function joinTournament(e) {
//     e.preventDefault();

//     // const myURLObj = new URL(window.location.href );
//     // const tournamentId = myURLObj.searchParams.get('tournamentId');

//     var xhr = new XMLHttpRequest();

//     xhr.open("POST", "https://sportsupbackend.herokuapp.com/create-tournament/" + getCookie("user_id" ) + '/' + tournaments[e.myAttr].tournamentId);

//     xhr.onreadystatechange = function() { // Call a function when the state changes.
//        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
//            window.location.href = '/tournament/created/index.html';
//        }
//     }
//     xhr.setRequestHeader("Content-Type", "application/json");
//     xhr.send(JSON.stringify({"name": name, "date": date, "description": description, "organiser": organiser, "location": location}));


// 	// const card = e.target.parentElement.parentElement.parentElement;

//     // const parentCard = e.target.parentElement.parentElement.parentElement.parentElement;

//     // parentCard.style.display = "none";

//     // const title = card.getElementsByClassName("tournamentTitle")[0].innerText;

//     // promptJoinedStatus(title);
// }


class Tournament {
	constructor(tournamentId, tournamentName, tournamentDate, description, organiser, tournamentlocation) {
        this.tournamentId = tournamentId;
        this.tournamentName = tournamentName;
        this.tournamentDate = tournamentDate;
        this.description = description;
        this.organiser = organiser;
        this.tournamentlocation = tournamentlocation;
	}
}

// functions rendering the DOM
function dom_render(tournaments) {
    for (let i = 0; i < tournaments.length; i++) {
      let tournament = tournaments[i];

      const parentContainer = document.getElementById("tournaments-container");
      const mainContainer = document.createElement("div");
      mainContainer.classList.add("container");
      mainContainer.classList.add("mt-4");
      const cardContainer = document.createElement("div");
      cardContainer.classList.add("card");
      cardContainer.classList.add("mt-4");
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");

      const h5Tag = document.createElement("h5");
      const tournamentTitle = document.createElement("span");
      tournamentTitle.classList.add("tournamentTitle");
      tournamentTitle.innerText = tournament.tournamentName;
      h5Tag.appendChild(tournamentTitle);

      const p1 = document.createElement("p");
      p1.classList.add("card-text");
      p1.innerText = "Location: ".concat(tournament.tournamentlocation);
      const p2 = document.createElement("p");
      p2.classList.add("card-text");
      p2.innerText = "Date: ".concat(tournament.tournamentDate);
      const p3 = document.createElement("p");
      p3.classList.add("card-text");
      p3.innerText = tournament.description;
      
      const buttonRow = document.createElement("div");
      buttonRow.classList.add("row"); 
      buttonRow.classList.add("mt-4"); 
      buttonRow.classList.add("mb-0"); 
      buttonRow.classList.add("p-0");
      


      //
      const participantsButton = document.createElement("button");
      participantsButton.type = "button";
      participantsButton.classList.add("ms-0") 
      participantsButton.classList.add("me-0");
      participantsButton.classList.add("col");
      participantsButton.classList.add("btn");
      participantsButton.classList.add("btn-secondary");
      participantsButton.classList.add("myclass");
      participantsButton.setAttribute( "onClick", "joinTournament()" );
      participantsButton.myAttr = i;
    //   participantsButton.setAttribute("data-bs-toggle", "modal");
    //   participantsButton.setAttribute("data-bs-target", "#detailsmodal");
      const participantsIcon = document.createElement("i");
      participantsIcon.classList.add("fa"); 
      participantsIcon.classList.add("fa-users");
      participantsIcon.setAttribute("aria-hidden", "true")
      
      participantsButton.appendChild(participantsIcon);
      participantsButton.appendChild(document.createTextNode(" View Participants"));
    
      // 
      const enterButton = document.createElement("button");
      enterButton.type = "button";
      enterButton.classList.add("ms-0"); 
      enterButton.classList.add("me-0"); 
      enterButton.classList.add("col"); 
      enterButton.classList.add("btn"); 
      enterButton.classList.add("btn-success");
    //   enterButton.setAttribute("data-bs-toggle", "modal");
    //   enterButton.setAttribute("data-bs-target", "#joinedmodal");
      const enterIcon = document.createElement("i");
      enterIcon.classList.add("fa"); 
      enterIcon.classList.add("fa-sign-in");
      enterIcon.setAttribute("aria-hidden", "true")
      enterButton.myAttr = i;
      enterButton.setAttribute( "onClick", "joinTournament('" + String(i) + "')" );
      enterButton.appendChild(enterIcon);
      enterButton.appendChild(document.createTextNode(" Enter tournament"));
      
    //   buttonRow.appendChild(participantsButton);
      buttonRow.appendChild(enterButton);

      cardBody.appendChild(h5Tag);
      cardBody.appendChild(p1);
      cardBody.appendChild(p2);
      cardBody.appendChild(p3);
      cardBody.appendChild(buttonRow);

      cardContainer.appendChild(cardBody);
      mainContainer.appendChild(cardContainer);
      parentContainer.appendChild(mainContainer);
  
    }
  }

// Functions

function get_all_tournaments(){
    
    let xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {

            if (this.status == 200) {

                noMoreContent.style.display = "none";

                allContent.style.display = "block";
                
                let json_response = JSON.parse(this.responseText);
                
                for (var i  = 0; i < json_response.length; i++){
                    tournaments.push(new Tournament
                        (json_response[i]._id, 
                        json_response[i].tournament_name,  
                        json_response[i].date,  
                        json_response[i].description,
                        json_response[i].organiser,
                        json_response[i].location))
                }
                
                dom_render(tournaments);

            } else {
                noMoreContent.style.display = "block";
                allContent.style.display = "none";
            }
        }
    });

    xhr.open("GET", "https://sportsupbackend.herokuapp.com/discover-tournaments/" + getCookie("user_id"));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

get_all_tournaments();


const listParticipantButtons = document.getElementsByClassName("myclass");


// Adding listeners to all the participants and enter buttons 
for(var i = 0; i < listParticipantButtons.length; i++){
    listParticipantButtons[i].addEventListener('click', viewParticipants)
    // enterButtons[i].addEventListener('click', joinTournament)
    enterButtons[i].addEventListener('click', joinTournament)

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

function joinTournament(idx) {

    idx = parseInt(idx);
    // const myURLObj = new URL(window.location.href );
    // const tournamentId = myURLObj.searchParams.get('tournamentId');

    var xhr = new XMLHttpRequest();

    xhr.open("POST", "https://sportsupbackend.herokuapp.com/discover-tournament/" + getCookie("user_id" ) + '/' + tournaments[idx].tournamentId);

    xhr.onreadystatechange = function() { // Call a function when the state changes.
       if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
           alert("Joined tournament " + tournaments[idx].tournamentName + "!!!")
           window.location.href = '/tournament/discover/index.html';
       }
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"name": tournaments[idx].tournamentName, "date": tournaments[idx].tournamentDate, "description": tournaments[idx].description, "organiser": tournaments[idx].organiser, "location": tournaments[idx].tournamentlocation}));


    // const card = e.target.parentElement.parentElement.parentElement;

    // const parentCard = e.target.parentElement.parentElement.parentElement.parentElement;

    // parentCard.style.display = "none";

    // const title = card.getElementsByClassName("tournamentTitle")[0].innerText;

    // promptJoinedStatus(title);
};


// +++++++++++++++++++++++++   PHASE 1 CODE   +++++++++++++++++++++++++++++++++++++++++++




// Fuction to change the title of the popup
function changeModalTitle(title) {
    let modalTitle = document.getElementById("detailsModalLabel");
    modalTitle.innerText = title.concat(" Participants");
}

// Fuction to display text in the event joined prompt
function promptJoinedStatus(title) {
    let modalTitle = document.getElementById("joinedModalLabel");
    let modalText = document.getElementById("joinedPrompt");
    const prompt = " Yay! You have joined ".concat(title)
    modalText.innerText = prompt.concat(" !");
    modalTitle.innerText = "Confirmation";
}
