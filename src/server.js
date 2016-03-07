/* global __dirname */
/* global process */
/* global require */
/* global module */

var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    passport = require('passport');

//configurations
var port = process.env.PORT || 3000;
var config = require('./config/database.js');

//init database
mongoose.connect(config.connString);

// pass passport for configuration
require('./config/passport')(passport);

// bundle our routes
var apiRoutes = require('./routes/user.js');

//express config
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// log to console
app.use(morgan('dev'));
 
// Use the passport package in our application
app.use(passport.initialize());

app.get('/', function (req, res) {
    res.send('Welcome to Cost Control!');
});

app.use('/api', apiRoutes, function (req, res) {
    res.json({ message: 'Welcome to Control Manager API!' });
});

app.listen(port, function () {
    console.log('Gulp is running my app on Port: ' + port);
});

module.exports = app;
