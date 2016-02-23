angular.module('appService', [])

.factory('Contact', function($http) {

	// create a new object
	var contactFactory = {};

	// get all contacts
	contactFactory.all = function() {
		return $http.get('/api/contacts/');
	};

	// create a contact
	contactFactory.create = function(contactData) {
		return $http.post('/api/contacts/', contactData);
	};

	// update a contact
	contactFactory.update = function(id, contactData) {
		return $http.put('/api/contacts/' + id, contactData);
	};

	// delete a contact
	contactFactory.delete = function(id) {
		return $http.delete('/api/contacts/' + id);
	};

	// run the R script
	contactFactory.run = function() {
		return $http.get('/api/script/');
	};

	// return our entire contactFactory object
	return contactFactory;

})

.factory('Planner', function($http) {

	// create a new object
	var plannerFactory = {};

	// get all entries in planner table
	plannerFactory.all = function() {
		return $http.get('/api/planner/');
	};

	// deletes mongo tables
	plannerFactory.cleanup = function() {
		return $http.get('/api/cleanup/');
	};

	// return our entire plannerFactory object
	return plannerFactory;

})
