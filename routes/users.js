// handles all routes at localhost:3000/
const express = require('express')
const router = express.Router() //express-router
const { v4: uuidv4 } = require('uuid'); // for unique ids
const models = require('../models') //sequelize models //go up 2-routes to find folder
const session = require('express-session')

//---------- ADD-CLIMB PAGE ROUTES -----------

router.get('/add-climb', (req,res) => {
    res.render('users/add-climb')
})

router.post('/create-session', async (req,res) => {
    let userId = req.session.user.userId

    let climbSession = models.UserSession.build({
        userId: userId
    })

    let persistedSession = await climbSession.save()
    if (persistedSession != null) {
        res.redirect('/users/add-routes')
    } else {
        res.render('users/add-climb', {message: "Unable to create session"})
    }
})

router.get('/add-routes', (req,res) => {
    res.render('users/add-routes')
})

router.post('/add-routes', (req,res) => {
    
})


// ---------- DATA PAGE ROUTES -------------

router.get('/data', (req,res) => {
    res.render('users/data')
})

// export to app.js
module.exports = router
