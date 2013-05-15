'use strict'

//
backlogManagerApp.factory('Projects', function($resource) {
	return $resource('api/projects');
});

//
backlogManagerApp.factory('Project', function($resource) {
	return $resource('api/projects/:id');
});

//
backlogManagerApp.factory('Features', function($resource) {
	return $resource('api/projects/:id/features');
});

//
backlogManagerApp.factory('Feature', function($resource) {
	return $resource('api/projects/:id/features/:featureId');
});
