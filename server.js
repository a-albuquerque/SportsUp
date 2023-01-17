/* server.js - Express server*/
'use strict';
const express = require('express')
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '/pub')))

app.get('/', (req, res) => {
	res.send('Goto route /examples.html')
})

const port = process.env.PORT || 5001

app.listen(port, () => {})