// modules
const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser') // body-parser -> urlencoded
const path = require('path') // for partials path
const models = require('./models') // sequelize models
const bcrypt = require('bcrypt') // password encryption
const session = require('express-session')
const indexRoutes = require('./routes/index') // index routes at '/'
const userRoutes = require('./routes/users') // user routes at '/users'
const authenticate = require('./authenticate')

// path for directory ./views
const VIEWS_PATH = path.join(__dirname, '/views')
// local host port
const PORT = 3000  // LOCAL PORT ONLY!!!
// const PORT = process.env.PORT || 8080
//salt rounds for password encryption
SALT_ROUNDS = 10

// GLOBAL VARIALBES
global.__basedir = __dirname // global variable for root directory path name

// MIDDLEWARE
app.use(bodyParser.urlencoded({extended: false}))
app.use(session({
    secret: 'secret cat',
    resave: true,
    saveUninitialized: false // won't save if nothing in session
}))
app.use('/', indexRoutes) // any route at root handled in ./routes/index
// app.use('/users', authenticate.authenticate, userRoutes) // any route at /users/...
app.use('/users', userRoutes) // ------------ NO AUTHENTICATION, DELETE AND USE ABOVE FOR RELEASE!!!! ------------

// STATIC FOLDERS
app.use('/css', express.static('css')) // static folder for css at localhost:3000/css/style.css
app.use('/icons', express.static('icons')) // icons folder
app.use('/js', express.static('js')) // client-side JS files
app.use('/images', express.static('images'))


// set up template engine
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine', 'mustache')

//start server
app.listen(PORT, () => console.log("Server is Running"))