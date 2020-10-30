const express = require('express')
const router = express.Router() //express-router
const { v4: uuidv4 } = require('uuid'); // for unique ids
const bcrypt = require('bcrypt') //encryption
const models = require('../models') //sequelize models //go up 2-routes to find folder
const SALT_ROUNDS = 10 // bcrypt

router.get('/data', (req,res) => {
    res.render('users/data')
})

// export to app.js
module.exports = router
