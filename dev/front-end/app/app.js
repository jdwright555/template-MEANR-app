angular.module('routerApp', ['routerRoutes', 'ngAnimate', 'homeCtrl', 'contactsCtrl', 'plannerCtrl', 'appService'])

// create the controller and inject Angular's 
// this will be the controller for the ENTIRE site
.controller('mainController', function() {

	var vm = this;

    // create a bigMessage variable to display in our view
    vm.bigMessage = 'A big message';

});