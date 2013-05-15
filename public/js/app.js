'use strict'

//
var backlogManagerApp = angular.module('BacklogManager', ['ui.bootstrap', 'ngResource']).
	config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/intro', {
            templateUrl: 'partials/intro.html'
        });    	
        $routeProvider.when('/projects', {
    		templateUrl: 'partials/projects.html', 
    		controller: ProjectsCtrl
    	});
    	$routeProvider.when('/projects/:projectId', {
    		templateUrl: 'partials/project.html', 
    		controller: ProjectCtrl
    	}); 
    	$routeProvider.when('/projects/:projectId/features', {
    		templateUrl: 'partials/features.html', 
    		controller: FeaturesCtrl
    	});  
    	$routeProvider.when('/projects/:projectId/features/:featureId', {
    		templateUrl: 'partials/feature.html', 
    		controller: FeatureCtrl
    	});   	
    	$routeProvider.otherwise({
    		redirectTo: '/intro'
    	});
  	}]);