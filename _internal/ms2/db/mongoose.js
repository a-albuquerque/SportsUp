/* Hold connection to mongo server through the Mongoose API. */
const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://user:user@sportsupapi.gl5b7.mongodb.net/SportsUpAPI?retryWrites=true&w=majority'
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
module.exports = { mongoose }  