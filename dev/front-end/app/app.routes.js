// inject ngRoute for all our routing needs
angular.module('routerRoutes', ['ngRoute'])

// configure our routes
.config(function($routeProvider, $locationProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : 'app/views/pages/home.html',
            controller  : 'homeController',
            controllerAs: 'home'
        })

        // route for the contacts page
        .when('/contacts', {
            templateUrl : 'app/views/pages/contacts.html',
            controller  : 'contactsController',
            controllerAs: 'contacts'
        })

        // route for the contacts page
        .when('/planner', {
            templateUrl : 'app/views/pages/planner.html',
            controller  : 'plannerController',
            controllerAs: 'planner'
        })

    $locationProvider.html5Mode(true);
});