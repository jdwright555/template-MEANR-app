angular.module('homeCtrl', ['appService'])

.controller('homeController', function(Contact) {

    var vm = this;

    vm.message = 'Create a new contact using the form below:'

    // function to create a user
	vm.saveContact = function() {
		vm.processing = true;

		// convert dob to US format (for mongo)
		var dob = vm.contactData.dob.split('/');
		vm.contactData.dob = dob[1] + "/" + dob[0] + "/" + dob[2]; 

		// use the create function in the appService
		Contact.create(vm.contactData)
			.success(function(data) {
				vm.processing = false;
				vm.contactData = {}; 		// clears form if creation was successful
				alert(data.message);		// sends message to alert user
			});
			
	};

})