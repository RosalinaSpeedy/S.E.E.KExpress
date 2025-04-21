//Databases and the web code (ammended)
require('@dotenvx/dotenvx').config({ path: `../../.env` });


// Import express and express-session
var express = require('express')
var session = require('express-session')
var validator = require ('express-validator');
const expressSanitizer = require('express-sanitizer');

console.log(process.env.REACT_APP_SEEK_FORUM_API_KEY);

//Import mysql module
var mysql = require('mysql2')


// Create the express application object
const app = express()
var cors = require('cors');
app.use(cors());
const port = 8000

// Set up the body parser 
app.use(express.urlencoded({ extended: true }))

// Create an input sanitizer
app.use(expressSanitizer());

// Define the database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'seek_forum_app',
    password: 'qwertyuiop',
    database: 'seek_forum'
})
// Connect to the database
db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('Connected to database')
})

global.db = db
global.API_KEY = process.env.REACT_APP_SEEK_FORUM_API_KEY;

// Create a session
app.use(session({
    secret: 'somerandomstuff',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}))

// Load the route handlers for /api
const apiRoutes = require('../routes/api')
app.use('/api', apiRoutes)

// Start the web app listening
app.listen(port, () => console.log(`Node app listening on port ${port}!`))