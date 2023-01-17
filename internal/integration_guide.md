# Integration Guide

## End User Page Routes:

### Authentication

1. Redirect to Login Screen - /
2. Login Screen - /login/index.html
3. Registration Screen - /register/index.html

### Profile

1. Preference Screen - /preference/index.html

### Meet

1. Discover New People Screen - /meet/discover/index.html
2. Followed People Screen - /meet/followed/index.html

### Tournaments

1. My Tournaments Screen - /tournament/joined/index.html
2. Discover Tournaments Screen - /tournament/discover/index.html
3. View Created Tournament Screen - /tournament/created/index.html
4. View Single Tournament Joined People Screen - /tournament/joined/get/index.html?tournamentId={Insert Tournament Id Here}
5. Create Tournament - /tournament/create
6. Edit Tournament Screen - /tournament/edit?tournamentId={Insert Tournament Id Here} (Note UI is same as 5 but additionally has data pre-populated)
7. View Single Tournament Screen - /tournament/get/index.html?tournamentId={Insert Tournament Id Here}

### Shared

1. View Person Screen - /person/index.html?personId={Insert Person Id Here}

## Modularity Requirement 

1. Every screen has a javascript, html and css file.
2. The html file will always be called `index.html` (create folders with the appropriate route name)
3. the javascript file for each screen will always be called `script.js`
4. The css file  for each screen will always be called `style.css`

## Inter Screen Communication

For some cases 2 screens need to communicate. Use query parameters shown in the route description to communicate. Nothing more than an id / type will ever have to be communicated so nothing complex like local storage is required.

## Colour

1. Use Bootstrap's "primary" colour as our main colour (Use your own descretion what main means).
2. Use Bootstrap's "dark" colour for any other colour.

This way all our colour scheme can be standardised.

## Misc

1. `./base_template/index.html` as your starter template. It has a the common navbar and footer that should be uniform across all screens.