// handles all routes at localhost:3000/
const express = require('express')
const router = express.Router() //express-router
const { v4: uuidv4 } = require('uuid'); // for unique ids
const bcrypt = require('bcrypt') //encryption
const models = require('../models') //sequelize models //go up 2-routes to find folder
const SALT_ROUNDS = 10 // bcrypt
const session = require('express-session')


router.get('/', (req,res) => {
    res.render('index')
})

router.get('/register', (req,res) => {
    res.render('register')
})

router.post('/register', async(req,res) => {
    const username = req.body.username
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword

    if(password !== confirmPassword) {
        res.render('register', {message: "Password does not match"})
    }

    // check table: Users for username
    let persistedUser = await models.Users.findOne({
        where: {
            username: username
        }
    })
    // if user doesn't already exist -> create new user object and save to Users table
    if (persistedUser == null) {
        bcrypt.hash(password, SALT_ROUNDS, async (error, hash) => {
            if (error) {
                res.render('/register', {message: 'Error creating user'})
            } else {
                // create user (with hashed password)
                let user = models.Users.build({
                    username: username,
                    password: hash
                })
                // save user to table
                let savedUser = await user.save()
                // after user is created send to log-in page
                if(savedUser != null) {
                    res.redirect('login')
                } else { // if user already exists in Users table -> send user to registration page
                    res.render('register', {message: "User already exists"})
                }
            }
        })
    }
    else {
        res.render('register', {message: "User already exists"})
    }
})

router.get('/login', (req,res) => {
    res.render('login')
})

router.post('/login', async (req,res) => {
    const username = req.body.username
    const password = req.body.password

    // find user in table Users by username
    let user = await models.Users.findOne({
        where: {
            username: username
        }
    })
    // check if user exists
    if (user != null) {
        // check input password against hashed password in table
        bcrypt.compare(password, user.password, (error, result) => {
            if (result) {
                // create a session and redirect user
                if (req.session) {
                    // set session user to userId & authenticate user
                    req.session.user = {userId: user.id}
                    req.session.isAuthenticated = true
                    // send user to homepage (data)
                    res.redirect('/users/data')
                }
            } else {
                // if error signing in -> send user back to login page
                res.render('login', {message: 'Incorrect username or password'})
            }
        })
    } else {
        res.redirect('/login')
    }
})



// export to app.js
module.exports = router
