var bodyParser 		= require('body-parser'); 				// get body-parser middleware
var Contact 		= require('../models/contact'); 		// call contacts data model 
var Planner	   		= require('../models/planner');			// call the planner data model
var config     		= require('../../config');				// contains reference to database path
var rio 	   		= require('rio');						// calls node-rio module; allows calling of R scripts
var path 	   		= require('path');						// calls "path" module; for specifying/manipulating path names

module.exports = function(app, express) {

	var apiRouter = express.Router();

	// test route to make sure everything is working 
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'hooray! welcome to our api!' });	
	});

	// on routes that end in /contacts
	// ----------------------------------------------------
	apiRouter.route('/contacts')

		// create a contact entry (accessed at POST http://localhost:8080/api/contacts)
		.post(function(req, res) {

			var contact = new Contact();		// create a new instance of the Contact model
			
			contact.firstname 	= req.body.firstname; 	// set firstname
			contact.lastname 	= req.body.lastname; 	// set lastname
			contact.address 	= req.body.address; 	// set address
			contact.town   		= req.body.town;   		// set town
			contact.postcode    = req.body.postcode;    // set postcode
			contact.dob 		= req.body.dob;			// set dob
			
			contact.save(function(err) {
				if (err) {
					return res.send(err);
				}

				// return a message
				res.json({ message: 'Contact data received!' });
			});		

		})

		// get all contacts posted (accessed at GET http://localhost:8080/api/contacts)
		.get(function(req, res) {

			Contact.find(function(err, contacts) {
				if (err) res.send(err);

				// return the contacts
				res.json(contacts);
			});
		});


	// on routes that end in /contact/:contact_id
	// ----------------------------------------------------
	apiRouter.route('/contacts/:contact_id')

		.get(function(req, res) {
			Contact.findById(req.params.contact_id, function(err, contact) {
				if (err) res.send(err);

				// return that contact
				res.json(contact);
			});
		})

		// update the user with this id
		.put(function(req, res) {
			Contact.findById(req.params.contact_id, function(err, contact) {

				if (err) res.send(err);

				// set the new contact information if it exists in the request
				if (req.body.firstname) contact.firstname = req.body.firstname;
				if (req.body.lastname) contact.lastname   = req.body.lastname;
				if (req.body.address) contact.address     = req.body.address;
				if (req.body.town) contact.town 	      = req.body.town;
				if (req.body.postcode) contact.postcode   = req.body.postcode;
				if (req.body.dob) contact.dob 	  	 	  = req.body.dob;

				// save the contact
				contact.save(function(err) {
					if (err) res.send(err);

					// return a message
					res.json({ message: 'Contact updated!' });
				});

			});
		})

		// delete the contact with this id
		.delete(function(req, res) {
			Contact.remove({
				_id: req.params.contact_id
			}, function(err, contact) {
				if (err) res.send(err);

				res.json({ message: 'Contact deleted!' });
			});
		});

	// custom route for executing R sript
	// ----------------------------------------------------
	apiRouter.route('/script')

		.get(function(req, res){

			function displayResponse(err, response) {
        		if (!err) {
        			response = JSON.parse(response);
        	    	console.log(response[0]);
        	    	res.json({ message: response[0] });
        		} else {
        	    	console.log("Rserve call failed. " + err);
        		}
    		};

    		// pass path variable to function to allow calling of secondary R scripts
    		var pathObj = { pathname: __dirname };

			rio.sourceAndEval(path.join(__dirname, "../scripts/script-master.R"), {
    			entryPoint: "master",
    			data: pathObj,
    			callback: displayResponse
			});

		});

	// on routes that end in /planner
	// ----------------------------------------------------
	apiRouter.route('/planner')

		// get all banks posted (accessed at GET http://localhost:8080/api/planner)
		.get(function(req, res) {

			Planner.find({}, function(err, planners) {
				if (err) res.send(err);

				// return the planner
				res.json(planners);
			});
		});

	// custom route for executing cleanup R sript
	// ----------------------------------------------------
	apiRouter.route('/cleanup')

		.get(function(req, res){

			function displayResponse(err, response) {
				if (!err) {
					response = JSON.parse(response);
        	    	console.log(response[0]);
        	    	res.json({ message: response[0] });
        		} else {
        	    	console.log("Rserve call failed. " + err);
        		}
    		};

			rio.sourceAndEval(path.join(__dirname, "../scripts/script-cleanup.R"), {
    			entryPoint: "cleanup",
    			callback: displayResponse
			});

		});

	return apiRouter;
};