// document.cookie = "user_id=6243c4f7057229f0606d885d";

// Selector
const tournamentsCreated = document.querySelector('#tournaments-created');  

// Classes
class Tournament {
	constructor(tournamentId, tournamentName, tournamentDate, tournamentlocation) {
        this.tournamentId = tournamentId;
        this.tournamentName = tournamentName;
        this.tournamentDate = tournamentDate;
        this.tournamentlocation = tournamentlocation;
	}
}

// Functions

function get_created_tournaments(){
    
    var xhr = new XMLHttpRequest();
    // xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {

            if (this.status == 200) {
                
                var json_response = JSON.parse(this.responseText);
                
                var tournaments = [];

                for (var i  = 0; i < json_response.length; i++){
                    tournaments.push(new Tournament(json_response[i]._id, json_response[i].tournament_name,  json_response[i].date,  json_response[i].location))
                }
                
                dom_render(tournaments);

            }
        }
    });

    xhr.open("GET", "https://csc309-backend.herokuapp.com/created-tournaments/" + getCookie("user_id"));
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send();
}

function dom_render(tournaments){
    tournamentsCreated.innerHTML = tournaments.reduce(function (agg, t) {
        return agg + '<div class="card mb-3"> <div class="card-body"> ' + t.tournamentName + ' <span class="tminusthree badge bg-dark ms-2">' + t.tournamentDate + '</span> <span class="tminusthree badge bg-dark ms-2">' + t.tournamentlocation + '</span> <button onclick="edit_click_handler(\'' + t.tournamentId.trim() + '\')" class="fr btn btn-sm btn-dark" type="button">Edit Tournament</button> </a> <a href="../get/index.html?tournamentId=' + t.tournamentId + '"> <button class="fr me-3 btn btn-sm btn-primary" type="button">View Tournament</button> </a> </div> </div>';
    }, '');
    // tournamentsCreated.innerHTML = tournaments.reduce(function (agg, t) {
    //     return agg + '<div class="card mb-3"> <div class="card-body"> ' + t.tournamentName + ' <span class="tminusthree badge bg-dark ms-2">' + t.tournamentDate + '</span> <span class="tminusthree badge bg-dark ms-2">' + t.tournamentlocation + '</span> <button onclick="test()" class="fr btn btn-sm btn-dark" type="button">Edit Tournament</button> </a> <a href="../get/index.html?tournamentId=' + t.tournamentId + '"> <button class="fr me-3 btn btn-sm btn-primary" type="button">View Tournament</button> </a> </div> </div>';
    // }, '');
    
}

get_created_tournaments();


function test(){
    alert("a");
}

function edit_click_handler(tournament_id){
    document.cookie = "tournament_id=" + tournament_id + '; Path=/;';
    
    window.location.href = "/tournament/edit/index.html"
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