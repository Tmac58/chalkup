// modules
const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const path = require('path')
const VIEWS_PATH = path.join(__dirname, '/views')

// set up template engine
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine', 'mustache')

//start server
app.listen(3000, () => console.log("Server is Running"))