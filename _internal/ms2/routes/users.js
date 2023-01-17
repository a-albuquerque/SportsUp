// User routes
const log = console.log
const express = require('express');
const router = express.Router(); 
const { User } = require('../models/user')
const { mongoChecker, isMongoError } = require("./helpers/mongo_helpers");



// Sample user
class _User {
	constructor(username, password) {
		this.username =  username;
		this.password = password;
        this.firstName;
        this.lastName;
        this.age;
        this.gender;
        this.city;
        this.province;
        this.postalCode;
        this.description;
        this.handle;
        this.contact;
        this.sports;
        this.school;		
	}
}
let mockUser = new _User("user", "user");
mockUser.firstName = "Rosalind"
mockUser.lastName = "Franklin"
mockUser.age = "21";
mockUser.gender = "female"
mockUser.city = "Toronto";
mockUser.province = "ON";
mockUser.postalCode = "M5S1A1"
mockUser.sports = ["Baseball", "Running", "Cycling", "Ice Hockey", "Table Tennis", "Tennis"];
mockUser.description = "Hi folks! I am a Tennis lover (in all modalities) and a busy undergrad student who just got in town. I am eager to make new friends and would love to coordinate with a partner to play with! I would prefer to meet at a downtown court but I am open to commute (I know some Tennis gems hidden all over GTA ;>) Also open to other sports and a cup of coffee!  Shoot me a message if interested! See you soon!";
mockUser.handle = "facebook";
mockUser.contact = "rosa.fraklin@mail.utoronto.ca"



/*** User API routes ****************/


// POST route to create a user 
router.post('/api/users', mongoChecker, async (req, res) => {

	// Create a new user
	const user = new User({
		username: req.body.username,
		password: req.body.password,
		firstName: "",
		lastName: "",
		age: "",
		gender: "",
		city: "",
		province: "",
		postalCode: "",
		sports: [],
		description: "",
		handle: "",
		contact: ""
	})

	try {
		// Save the user
		const newUser = await user.save()
		req.session.user = user._id;
        req.session.username = user.username
        const preferenceURL = '/preference/index.html' + '?userId=' + user._id.toString()
        res.cookie('user_id', req.session.user)
        res.redirect(preferenceURL);
	} catch (error) {
		if (isMongoError(error)) { // check for if mongo server suddenly disconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			log(error)
			res.status(400).send('Username already exists') 
		}
	}
})




// PATCH route to add/update user preferences or profile information
router.patch('/api/users', mongoChecker, async (req, res) => {

	try {
		log(req.session.user)
		log(req.body)
		const requestedUser = await User.findById(req.session.user)
		if (!requestedUser) {
			res.status(404).send('User is not registred!')  
		} else {
			let updatedUser
			if (req.body.firstName){
				requestedUser.firstName = req.body.firstName
				updatedUser = await User.findOneAndUpdate({_id: req.session.user}, {firstName: requestedUser.firstName}, {new: true, useFindAndModify: false})
			}
			if (req.body.lastName){
				requestedUser.lastName = req.body.lastName
				updatedUser = await User.findOneAndUpdate({_id: req.session.user}, {lastName: requestedUser.lastName}, {new: true, useFindAndModify: false})
			}
			if (req.body.age){
				requestedUser.age = req.body.age
				updatedUser = await User.findOneAndUpdate({_id: req.session.user}, {age: requestedUser.age}, {new: true, useFindAndModify: false})
			}
			if (req.body.gender){
				requestedUser.gender = req.body.gender
				updatedUser = await User.findOneAndUpdate({_id: req.session.user}, {gender: requestedUser.gender}, {new: true, useFindAndModify: false})
			}
			if (req.body.city){
				requestedUser.city = req.body.city
				updatedUser = await User.findOneAndUpdate({_id: req.session.user}, {city: requestedUser.city}, {new: true, useFindAndModify: false})
			}
			if (req.body.province){
				requestedUser.province = req.body.province
				updatedUser = await User.findOneAndUpdate({_id: req.session.user}, {province: requestedUser.province}, {new: true, useFindAndModify: false})
			}
			if (req.body.postalCode){
				requestedUser.postalCode = req.body.postalCode
				updatedUser = await User.findOneAndUpdate({_id: req.session.user}, {postalCode: requestedUser.postalCode}, {new: true, useFindAndModify: false})
			}
			if (req.body.sports){
				requestedUser.sports = req.body.sports
				updatedUser = await User.findOneAndUpdate({_id: req.session.user}, {sports: requestedUser.sports}, {new: true, useFindAndModify: false})
			}
			if (req.body.description){
				requestedUser.description = req.body.description
				updatedUser = await User.findOneAndUpdate({_id: req.session.user}, {description: requestedUser.description}, {new: true, useFindAndModify: false})
			}
			if (req.body.handle && req.body.handle !== "select"){
				requestedUser.handle = req.body.handle
				updatedUser = await User.findOneAndUpdate({_id: req.session.user}, {handle: requestedUser.handle}, {new: true, useFindAndModify: false})
			}
			if (req.body.contact){
				requestedUser.contact = req.body.contact
				updatedUser = await User.findOneAndUpdate({_id: req.session.user}, {contact: requestedUser.contact}, {new: true, useFindAndModify: false})
			}
			if (!updatedUser) {
				res.status(404).send("Could not update User!")
			} else {   
				res.send(updatedUser)
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  
	}

})




// Get route to retrieve a user 
router.get('/api/users', mongoChecker, async (req, res) => {
	try {
		//log(req.session.user)
		const requestedUser = await User.findById(req.session.user)
		if (!requestedUser) {
			res.status(200).send({"message": 'User is not registred!'})  
		} else {  
			res.cookie('user_id', req.session.user)
			if (requestedUser.username === "user"){
				res.status(200).send(mockUser)
			}
			else{
				res.status(200).send(requestedUser)
			}
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  
	}
})




//////////////

/*** Login and Logout routes ***/


// A route to login and create a session
router.post('/users/login', mongoChecker, async (req, res) => {
	const username = req.body.username
    const password = req.body.password

    try {
		const user = await User.findByUsernamePassword(username, password);
		if (!user) {
            res.status(401).send('Invalid Credentials');
        } else {
            req.session.user = user._id;
            req.session.username = user.username
            res.cookie('user_id', req.session.user)
            const preferenceURL = '/preference/index.html' + '?userId=' + user._id.toString()
        	res.redirect(preferenceURL);
        }
    } catch (error) {
    	if (isMongoError(error)) { 
			res.status(500).send('Could not authenticate');
		} else {
			log(error)
			res.status(400).send('Could not authenticate');
		}
    }

})

// A route to logout a user
router.get('/users/logout', (req, res) => {
	req.session.destroy((error) => {
		if (error) {
			res.status(500).send(error)
		} else {
			res.redirect('/')
		}
	})
})



module.exports = router
