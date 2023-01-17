/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
	}, 
	password: {
		type: String,
		required: true,
		minlength: 1
	},
	firstName: {type: String},
	lastName: {type: String},
	age: {type: String},
	gender: {type: String},
	city: {type: String},
	province: {type: String},
	postalCode: {type: String},
	description: {type: String},
	handle: {type: String},
	contact: {type: String},
	sports: [String],
	school: {type: String},
	followed: [Number],
	passed: [Number],
	tournament_joined:[Number],
	tournament_created:[Number]
})


const TournamentSchema = new mongoose.Schema({
	tournament_name: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
	}, 
	date: {
		type: String,
		required: true,
		minlength: 1
	},
	description: {type: String},
	organizer: {type: String},
	participants: [UserSchema]
})



UserSchema.pre('save', function(next) {
	const user = this; 
	if (user.isModified('password')) {
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(user.password, salt, (err, hash) => {
				user.password = hash
				next()
			})
		})
	} else {
		next()
	}
})


UserSchema.statics.findByUsernamePassword = function(username, password) {
	const User = this 
	return User.findOne({ username: username }).then((user) => {
		if (!user) {
			return Promise.reject() 
		}
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, user.password, (err, result) => {
				if (result) {
					resolve(user)
				} else {
					reject()
				}
			})
		})
	})
}

const User = mongoose.model('User', UserSchema)
module.exports = { User }

