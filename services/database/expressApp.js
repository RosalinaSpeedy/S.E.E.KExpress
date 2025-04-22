//Databases and the web code (ammended)
require('@dotenvx/dotenvx').config({ path: `./.env` });


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
const port = process.env.PORT || 8000

// Set up the body parser 
app.use(express.urlencoded({ extended: true }))

// Create an input sanitizer
app.use(expressSanitizer());

// Define the database connection
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'seek_forum_app',
//     password: 'qwertyuiop',
//     database: 'seek_forum'
// })
const db = mysql.createPool({
    create: () => {
        return mysql.createConnection({
            host: process.env.HOST_NAME,
            user: process.env.USER,
            password: process.env.PASSWORD,
            database: process.env.DATABASE
        });
    },
    validate: connection => {
        // work-around for https://github.com/sidorares/node-mysql2/issues/939
        return !connection?.connection?._closing;
    },
    destroy: connection => {
        connection.destroy();
    },
    keepAliveInitialDelay: 10000, // 0 by default.
    enableKeepAlive: true, // false by default.
});
// Connect to the database
db.connect((err) => {
    if (err) {
	console.log("DATABASE CONNECTION FAILED")
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
app.listen(process.env.PORT || 8000, () => console.log(`Node app listening on port ${port}!`))