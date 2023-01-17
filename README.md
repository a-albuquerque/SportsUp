# SportsUp: The Sports meet up place! - Team 05

## https://stormy-badlands-86736.herokuapp.com/ 
(link to access our deployed app on heroku)

In our app regular users will get access to a login screen when logging in for the first time, if they have not signed up they can click on the signup button and be redirected towards the signup view. In the signup view they can type a non-existing user name and password, after this they get directed to their profile page where they can enter details about themselves and their sports preferences.

For convenience we have already hardcode a user in JS with the following credentials:

- username: user
- password: user

After entering these details they click on get started button and are directed to discover people view where they get recommendations for people they might want to connect with. They can follow or pass this person.

- If they follow they are directed to their followed people view. In this view they get a list of the people they have followed and they have the choice to view the person which leads them to that person's profile where they can view more details about the person and their attributes(eg- golf, soccer etc).
- If they pass on this person they are shown another profile and so on.

The User has access to a navigation bar on top which has the following options:

- My profile: Clicking on this gives user the access to their profile.
- Discover people: Clicking on this leads to the discover people screen which is explained above.
- Followed People: Clicking on this takes to the list of people you have followed, you can then view their profiles if you want.
- Joined Tournaments: clicking on this takes you to a dashboard that has all the tournaments you have joined along with an overview of them (for hardcoded user we have three tournaments already created). Clicking on "view" for any t=fo these tournaments leads you to a detailed view of that tournament.
- Discover tournaments: Clicking on this leads you to a discover tournaments view. In this view you have a list of tournaments available along with some more information about them. you can then:
  - Click on "participants" which brings up a popup of all the participants of a tournament. You can view each of the participants' profiles by clicking on "view". We have some hardcoded participants for phase 1.
  - Click on "enter" which enters you into the tournament along with an acknowledgment popup. For phase 1 you only get the popup and don't actually join the tournament.
  - Click on "more info" you get a popup with more information about the tournament. For phase 1 the button is dead, we plan to have a popup with more information about a tournament in that.
  - Search for a tournament in the search bar. For phase 1 searching has not been implemented.
- Created tournaments: Clicking on this takes you to the tournaments you created. Here you can view or adit any tournament or create a tournament. Clicking on edit or create takes you to another view where you can enter/edit the details for a tournament and "save" or "cancel" you changes. For phase 1 save and cancel don't do anything.

We made use of bootstrap for the grid layout and the navbar. We have specified in the code where we have adapted the navbar from the bootstrap navbar.

## Repository Organization
The frontend files are contained in the following subdirectories of root (and their subfolders):
- /img
- /login
- /meet
- /person
- /preference
- /register
- /tournament

The backend files are contained in the following subdirectory:
/backend/ms1

## SportsUp Server Organization

SportsUp has its backend deployed at a different server than the one which is hosting the front end, as recommended in our lectures. 

- The frontend is hosted at: https://stormy-badlands-86736.herokuapp.com/ 

- The backend is hosted at: https://csc309-backend.herokuapp.com/

- The database is hosted at MongoDB cloud and can be accessed with the following connection strings: mongodb+srv://mongo-user:nGc7crCIbNMzOr25@maincluster.erymi.mongodb.net/sports_up_db

## Instructions for Local Deployment

In case you decide to deploy the app locally, you should clone the repository:
````
git clone git@github.com:csc309-winter-2022/team05.git
````

### Pre Setup

For the scope of the cloned repository do a find and replace of `https://stormy-badlands-86736.herokuapp.com/` with `https://localhost:5002/`. This will allow you to use a local backend.

### Frontend Deployment Instructions

1. Open the cloned repository in vscode.
2. Use the live server plugin of vscode in the /login/index.html file to run the frontend. (After installing the live server plugin, you can do this by right clicking anywhere in the `/login/index.html` file and selecting the open with live server option).
3. This should start a local deployment of the frontend.

### Backend Deployment Instructions

1. Using a terminal on linux or mac, navigate to the `/backend/ms1` folder.
2. Then you should run the following commands to start a local instance of the backend.

```
npm install
npm start
```

The server will be running on port `5002` and will connect to the MongoDB Cloud Atlas cluster automatically. In case you want to test with a local database, simply replace the connection string at the backend/ms1/db/mongoose.js file.
