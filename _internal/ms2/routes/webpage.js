// Webpage routes
const log = console.log

// express
const express = require('express');
const router = express.Router(); // Express Router

// import the user mongoose model
const { User } = require('../models/user')

// helpers/middlewares
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");
const { authenticate, sessionChecker } = require("./helpers/authentication");

/*** Webpage routes below **********************************/
// Inject the sessionChecker middleware to any routes that require it.
// sessionChecker will run before the route handler and check if we are
// logged in, ensuring that we go to the dashboard if that is the case.

// The various redirects will ensure a proper flow between login and dashboard
// pages so that your users have a proper experience on the front-end.

// route for root: should redirect to login route
router.get('/', sessionChecker, (req, res) => {
	res.redirect('/login')
})

// login route serves the login page
router.get('/login', sessionChecker, (req, res) => {
	res.sendFile(path.join(__dirname, '/public/login/index.html'))
	// render the handlebars template for the login page
	// res.render('login.hbs');
})

// dashboard route will check if the user is logged in and server
// the dashboard page
router.get('/dashboard', (req, res) => {
	if (req.session.user) {
		res.cookie('user_id', req.session.user)
		res.sendFile(path.join(__dirname, '/public/dashboard.html'))
		// render the handlebars template with the email of the user
		 // res.render('dashboard.hbs', {
		 // 	username: req.session.username
		 // })
	} else {
		res.redirect('/login')
	}
})

// export the router
module.exports = router