// handles all routes at localhost:3000/
const express = require('express')
const router = express.Router() //express-router
const { v4: uuidv4 } = require('uuid'); // for unique ids
const models = require('../models') //sequelize models //go up 2-routes to find folder
const session = require('express-session');
const { route } = require('.');

//---------- ADD-CLIMB PAGE ROUTES -----------
router.get('/logout', (req,res) => {

    if (req.ression) {
        req.session.isAuthenticated = false
        req.session.destroy((error) => {
            if (error) {
                next(error)
            } else {
                res.redirect('/')
            }
        })
    }
})

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
        req.session.user.sessionId = climbSession.id
        res.redirect('/users/add-routes')
    } else {
        res.render('users/add-climb', {message: "Unable to create session"})
    }
})

router.get('/add-routes', (req,res) => {
    res.render('users/add-routes')
})

router.post('/add-routes', async (req,res) => {
    let userId = req.session.user.userId
    let sessionId = req.session.user.sessionId
    let routeName = req.body.routeName
    let routeGrade = req.body.routeGrade
    let routeColor = req.body.routeColor
    let starRating = req.body.stars
    let attempts = req.body.attempts
    let routeSent = req.body.routeSent
    if (routeSent) {
        routeSent = true
    } else {
        routeSent = false
    }

    console.log(attempts)

    let route = models.UserRoute.build({
        name: routeName,
        grade: routeGrade,
        color: routeColor,
        rating: starRating,
        attempts: attempts,
        sent: routeSent,
        sessionId: sessionId,
        userId: userId
    })

    let persistedRoute = await route.save()
    if (persistedRoute != null) {
        res.redirect('/users/add-routes')
    }
})

router.post('/end-session', (req,res) => {

    res.redirect('/users/data')
})
// --------------MAP ROUTES ---------------

router.get('/map', (req, res) => {
    res.render('users/map')
})

// ---------- DATA PAGE ROUTES -------------

router.get('/data', async(req,res) => {
    let user = req.session.user.userId
    let routesArray = []

    let routes = await models.UserRoute.findAll({
            where:{
            userId: user
            }
        })
    for (let i = 0; i <routes.length; i++){
        routesArray.push(routes[i].dataValues)
    }
    console.log(routesArray)

    res.render('users/data', {userRoutes:routesArray})
})

router.get('/data/edit/route/:routeId', async(req, res) => {
    let user = req.session.user.userId
    let routeId = req.params.routeId
    
    const route = await models.UserRoute.findOne({
        where: {
        userId : user,
        routeId: routeId
        }
    })
    console.log(route)
})

// ---------- INFO PAGE ROUTES --------------

router.get ('/info', (req,res) => {
    res.render('users/info')
})

// export to app.js
module.exports = router
