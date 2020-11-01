// handles all routes at localhost:3000/
const express = require('express')
const router = express.Router() //express-router
const { v4: uuidv4 } = require('uuid'); // for unique ids
const bcrypt = require('bcrypt') //encryption
const models = require('../models') //sequelize models //go up 2-routes to find folder
const SALT_ROUNDS = 10 // bcrypt
const session = require('express-session')

router.get('/add-climb', (req,res) => {

    res.render('users/add-climb')
})

router.get('/data', (req,res) => {
    res.render('users/data')
})

router.get('/map', (req, res) => {
    res.render('users/map')
})

// export to app.js
module.exports = router
