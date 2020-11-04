// handles all routes at localhost:3000/
const express = require('express')
const router = express.Router() //express-router
const { v4: uuidv4 } = require('uuid'); // for unique ids
const models = require('../models') //sequelize models //go up 2-routes to find folder
const session = require('express-session');
const { route } = require('.');

//---------- ADD-CLIMB PAGE ROUTES -----------
router.get('/logout', (req, res) => {

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

router.get('/add-climb', (req, res) => {
    res.render('users/add-climb')
})

router.post('/create-session', async (req, res) => {
    let userId = req.session.user.userId

    let climbSession = models.UserSession.build({
        userId: userId
    })

    let persistedSession = await climbSession.save()
    if (persistedSession != null) {
        req.session.user.sessionId = climbSession.id
        res.redirect('/users/add-routes')
    } else {
        res.render('users/add-climb', { message: "Unable to create session" })
    }
})

router.get('/add-routes', (req, res) => {
    res.render('users/add-routes')
})

router.post('/add-routes', async (req,res) => {
    let totalSeconds = parseInt(req.body.totalSecondsValue)
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

    let route = models.UserRoute.build({
        name: routeName,
        grade: routeGrade,
        color: routeColor,
        rating: starRating,
        attempts: attempts,
        sent: routeSent,
        sessionId: sessionId,
        userId: userId,
        totalSeconds: totalSeconds
        
    })

    let persistedRoute = await route.save()
    if (persistedRoute != null) {

        res.redirect('/users/add-routes')
    }
})

router.post('/end-session', async (req,res) => {
    res.redirect('/users/data')
})
// --------------MAP ROUTES ---------------

router.get('/map', (req, res) => {
    res.render('users/map')
})

// ---------- DATA PAGE ROUTES -------------

router.get('/data', async (req, res) => {
    let user = req.session.user.userId
    let routesArray = []
    let sessionsArray = []

    let sessions = await models.UserSession.findAll({
        where: {
            userId: user
        }
    })
    sessions.forEach(session => {
        sessionsArray.push(session.dataValues)
    })

    let routes = await models.UserRoute.findAll({
        where: {
            userId: user
        }
    })
    for (let i = 0; i < routes.length; i++) {
        routesArray.push(routes[i].dataValues)
    }

    let timeArray = []
    let longestTime = -Infinity
    let shortestTime = Infinity
    let avgTime = 0

    // add all route times to array
    routesArray.forEach(route => {
        let timeSeconds = route.totalSeconds
        timeArray.push(timeSeconds)
    })
    // find longest route time
    timeArray.forEach(time => {
        if (time > longestTime) {
            longestTime = time
        }
    })
    // find shortest route time
    timeArray.forEach(time => {
        if (time < shortestTime) {
            shortestTime = time
        }
    })
    // find average route time
    function findAvgTime() {
        let totalTimes = 0
        timeArray.forEach(time => {
            totalTimes += time
        })
        avgTime =  Math.floor(totalTimes / timeArray.length)
    }
    findAvgTime()

    //find time in minutes and seconds
    function findTimeDisplay(totalSeconds) {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = Math.floor(totalSeconds - minutes * 60)
        let finalTime = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2)

        return finalTime
    }
    // pad time display
    function str_pad_left(string,pad,length) {
        return (new Array(length+1).join(pad)+string).slice(-length);
    }

    let gradesArray = []
    let highestGrade = 0
    let avgGrade = 0
    // fill gradesArray
    routesArray.forEach(route => {
        gradesArray.push(parseInt(route.grade.slice(2)))
    })

    // find highestGrade
    gradesArray.forEach(grade => {
        if (grade > highestGrade) {
            highestGrade = grade
        }
    })

    // find avgGrade
    function findAvgGrade(array) {
        let gradeTotals = 0
        array.forEach(grade => {
            gradeTotals += grade
        })
        avgGrade = Math.round(gradeTotals / array.length)
    }
    findAvgGrade(gradesArray)

    // find percentage sent
    let sentAmount = 0
    routesArray.forEach(route => {
        if (route.sent == true) {
            sentAmount++
        }
    })
    let percentageSent = Math.round((sentAmount / routesArray.length) * 100)

    let userObject = {
        totalSessions: sessionsArray.length,
        totalRoutes: routesArray.length,
        userRoutes: routesArray,
        longestTime: findTimeDisplay(longestTime),
        shortestTime: findTimeDisplay(shortestTime),
        avgTime: findTimeDisplay(avgTime),
        highestGrade: highestGrade,
        avgGrade: avgGrade,
        percentageSent: percentageSent
    }

    res.render('users/data', userObject)
})

router.get('/edit/route/:routeId', async (req, res) => {
    let routeId = req.params.routeId
    const userRoutes = await models.UserRoute.findOne({
        where: {
            id: routeId
        }
    })
    const routeDetails = userRoutes.dataValues
    
    res.render('users/edit-route', routeDetails)
})

router.post('/edit-routes', async (req, res) => {
    let routeId = req.body.routeId
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

    let updatedRoute = await models.UserRoute.update({
        name: routeName,
        grade: routeGrade,
        color: routeColor,
        rating: starRating,
        attempts: attempts,
        sent: routeSent,
    },
        {
            where: {
                id: routeId
            },
        })


        res.redirect('/users/data')
    })

router.post('/delete-route', (req, res) => {
    const routeId = req.body.id


    models.UserRoute.destroy({
        where: {
            id: routeId
        }
    })
        .then(result => console.log(result))
    res.redirect('/users/data')
})

// ---------- INFO PAGE ROUTES --------------

router.get('/info', (req, res) => {
    res.render('users/info')
})


// export to app.js
module.exports = router
