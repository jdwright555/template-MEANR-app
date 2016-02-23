angular.module('plannerCtrl', ['appService'])

.controller('plannerController', function(Planner) {

    var vm = this;

    // vm.message = 'Create a new contact using the form below:'

    // grab all the contacts at page load for display
    Planner.all()
        .success(function(data) {

            // when all the contacts come back, remove the processing variable
            vm.processing = false;

            // create display tag to allow for variation in content
            if (data.length === 0) {
                vm.displaytag = false;
            } else {
                vm.displaytag = true;
            };

            // bind the results that come back to vm.planner
            vm.planner = data;

    	});

    // clean up - remove data tables after data load
    Planner.cleanup()
        .success(function(data) {

            vm.processing = false;

            // put the message to console
            console.log(data.message);

        });

})