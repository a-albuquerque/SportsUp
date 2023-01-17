
// AUTHENTICATION HELPER

const { User } = require('../../models/user')

module.exports = {
	authenticate: (req, res, next) => {
		if (req.session.user) {
			User.findById(req.session.user).then((user) => {
				if (!user) {
					return Promise.reject()
				} else {
					req.user = user
					next()
				}
			}).catch((error) => {
				res.status(401).send("Unauthorized")
			})
		} else {
			res.status(401).send("Unauthorized")
		}
	},
	

    sessionChecker: (req, res, next) => {		
	    if (req.session.user) {
	    	const preferenceURL = '/preference/index.html' + '?userId=' + req.session.user.toString()
        	res.redirect(preferenceURL); // TODO REDIRECT TO VIEW'S SCREEN WHEN IMPLEMENTED
	    } else {
	        next(); 
	    }    
	}
}