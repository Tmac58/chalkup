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

// path for directory ./views
const VIEWS_PATH = path.join(__dirname, '/views')
// local host port
const PORT = 3000
//salt rounds for password encryption
SALT_ROUNDS = 10

// GLOBAL VARIALBES
global.__basedir = __dirname // global variable for root directory path name

// MIDDLEWARE
app.use('/', indexRoutes) // any route at root handled in ./routes/index
app.use('/users', userRoutes) // an rout at /users/...

// STATIC FOLDERS
app.use('/css', express.static('css')) // static folder for css at localhost:3000/css/style.css

// set up template engine
app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'))
app.set('views', VIEWS_PATH)
app.set('view engine', 'mustache')

app.get('/', (req,res) => {
    res.render('index')
})

//start server
app.listen(PORT, () => console.log("Server is Running"))