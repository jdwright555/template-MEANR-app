// BASE SETUP
// =======================================

// CALL THE PACKAGES --------------------
var express 	= require('express'); // call express
var app 		= express(); // define our app using express
var bodyParser 	= require('body-parser'); // get body-parser
var morgan 		= require('morgan'); // used to see requests
var mongoose 	= require('mongoose'); // for working w/ our database
var config 		= require('./config'); // calling config file
var path		= require('path'); // calling path for passing html file

// APP CONFIGURATION =====================
// =======================================
// use body parser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// log all requests to the console
app.use(morgan('dev'));

// connect to our database, locally hosted
mongoose.connect(config.database);

// set static files location
// used for requests that our frontend will make
app.use(express.static(__dirname + '/front-end'));

// ROUTES FOR OUR API ====================
// =======================================
var apiRoutes = require('./back-end/routes/api')(app, express);
app.use('/api', apiRoutes);

// MAIN CATCH-ALL ROUTE 
// SEND USERS TO FRONTEND
// has to be registered after API routes =
app.get('*', function(req,res){
	res.sendFile(path.join(__dirname + '/front-end/app/views/index.html'))
}); 

// START THE SERVER
// =======================================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
