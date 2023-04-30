
const saveButton = document.querySelector('#saveButton');
const cancelButton = document.querySelector('#cancelButton');



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

saveButton.addEventListener('click', createTournament);

function createTournament(e) {
     e.preventDefault();

     console.log("created tournament");
     const name = document.getElementById("tournamentName").value;
     const date = document.getElementById("tournamentDate").value;
     const location = document.getElementById("locationName").value;
     const organiser = document.getElementById("organiserName").value;
     const description = document.getElementById("description").value;

     var xhr = new XMLHttpRequest();

     xhr.open("POST", "https://sportsupbackend.herokuapp.com/create-tournament/" + getCookie("user_id" ));

     xhr.onreadystatechange = function() { // Call a function when the state changes.
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            window.location.href = '/tournament/created/index.html';
        }
     }
     xhr.setRequestHeader("Content-Type", "application/json");
     xhr.send(JSON.stringify({"name": name, "date": date, "description": description, "organiser": organiser, "location": location}));
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