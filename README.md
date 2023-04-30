# SportsUp - Your Sports meet up place - UNDER MAINTENANCE NOW, please check back in a few days

## https://sportsup.herokuapp.com/

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

- The frontend is hosted at: https://sportsup.herokuapp.com/ 

- The backend is hosted at: https://sportsupbackend.herokuapp.com/

- The database is hosted at MongoDB cloud and can be accessed with the following connection strings: mongodb+srv://mongo-user:nGc7crCIbNMzOr25@maincluster.erymi.mongodb.net/sports_up_db

## Instructions for Local Deployment

In case you decide to deploy the app locally, you should clone the repository:
````
git clone git@github.com:a-albuquerque/SportsUp.git
````

Then you should replace the connection URI to our backend for a connection to your localhost (port 5001). You may find it useful to use the batch replacement tool of your text editor to replace:
https://sportsup.herokuapp.com/  for  https://localhost:5001/
Across all source files, including the ones in the frontend.

Then simply navigate to /backend/ms1 folder. Then you should include the following commands:
```
npm install
npm start
```
The server will be running on port 5002 and will connect to the MongoDB Cloud Atlas cluster automatically. In case you want to test with a local database, simply replace the connection string at the backend/ms1/db/mongoose.js file.

You should now be able to access the app through the frontend files. You may start by opening the file /login/index.html through your favourite browser.
