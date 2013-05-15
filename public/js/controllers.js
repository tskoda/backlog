'use strict'

/** */
function ProjectCtrl($scope, $routeParams, $log, Project) {	
	//
	$scope.project = Project.get({id:$routeParams.projectId});

	//
	$scope.addStakeholder = function() {
		var stakeholder = {};
		stakeholder.id = generateStakeholderId($scope.project.customer.stakeholders)
		$scope.project.customer.stakeholders.push(stakeholder);
		$scope.onChange();
	}

	//
	$scope.removeStakeholder = function(stakeholder) {
		for (var i = 0; i < $scope.project.customer.stakeholders.length; i++) {
			if ($scope.project.customer.stakeholders[i] == stakeholder) {
				$scope.project.customer.stakeholders.splice(i, 1);
			}
		}
		if ($scope.project.customer.stakeholders.length == 0) {
			$scope.project.customer.stakeholders.push({});
		}	
		$scope.onChange();
	}

	//
	$scope.addTeamMember = function() {
		var teamMember = {}
		teamMember.id = generateTeamMemberId($scope.project.team.members);
		$scope.project.team.members.push(teamMember);	
		$scope.onChange();	
	}

	//
	$scope.removeTeamMember = function(teamMember) {
		for (var i = 0; i < $scope.project.team.members.length; i++) {
			if ($scope.project.team.members[i] == teamMember) {
				$scope.project.team.members.splice(i, 1);
			}
		}
		if ($scope.project.team.members.length == 0) {
			$scope.project.team.members.push({});
		}
		$scope.onChange();	
	}

	//
	$scope.onChange = function() {
		$scope.project.$save({id:$scope.project._id});
	}
}

/** */
function ProjectsCtrl($scope, $location, $log, $http, Project, Projects) {
	$scope.projects = Projects.query();

	//
	$scope.showProject = function(projectId) {
		var path = '/projects/' + projectId;
		$location.path(path);
	}

	//
	$scope.showProjectFeatures = function(projectId) {
		var path = '/projects/' + projectId + '/features'
		$location.path(path);		
	}

	//
	$scope.newProject = function() {
		var project = new Project();
		project._id = generateProjectId($scope.projects);
		project.name = "New Project #" + project._id;
		project.status = "Planned";
		project.customer = {}
		project.customer.name = "somebody";
		project.customer.stakeholders = [];
		project.customer.stakeholders[0] = {};
		project.team = {};
		project.team.scrumMaster = {};
		project.team.members = [];
		project.team.members[0] = {};		
		project.features = [];

		$scope.projects.push(project);
		project.$save({id:project._id});
	}

	//
	$scope.removeProject = function(project) {
		for (var i = 0; i < $scope.projects.length; i++) {
			if ($scope.projects[i] == project) {
				$scope.projects.splice(i, 1);
				Project.delete({id:project._id});
			}
		}		
	}
}

/** */
function FeatureCtrl($scope, $routeParams, $location, $log, Project, Feature) {
	//
	$scope.project = Project.get({id:$routeParams.projectId});
	$scope.feature = Feature.get({id:$routeParams.projectId, featureId:$routeParams.featureId});  

	//
	$scope.onChange = function() {
		$scope.feature.$save({id:$scope.feature.project,featureId:$scope.feature.id});
	}
}

/** */
function FeaturesCtrl($scope, $routeParams, $location, $log, Project, Features, Feature) {
	//
	$scope.project = Project.get({id:$routeParams.projectId});
	$scope.features = Features.query({id:$routeParams.projectId});

	//
	$scope.featureSortValue = function(feature) {
		var sortValue = feature.value - feature.size;
		switch (feature.status) {
			case 'Active':
				sortValue += 1000;
				break;
			case 'Planned':
				sortValue += 100;
				break;
		}
		return (-1) * sortValue;
	}

	//
	$scope.showFeature = function(featureId) {
		var feature = findFeatureById($scope.features, featureId);
		var path = '/projects/' + feature.project + '/features/' + featureId;
		$location.path(path);
	}

	//
	$scope.newFeature = function() {
		var feature = new Feature();
		feature.id = generateFeatureId($scope.features);
		feature.project = $scope.project._id;
		feature.name = 'New Feature #' + feature.id;
		feature.status = 'Planned';

		$scope.features.push(feature);
		feature.$save({id:feature.project,featureId:feature.id}); 
	}

	//
	$scope.copyFeature = function(featureId) {
		var featureToCopy = findFeatureById($scope.features, featureId);
		var feature = angular.copy(featureToCopy);
		feature.id = generateFeatureId($scope.features);
		feature.name = 'Copy of ' + feature.name;

		$scope.features.push(feature);
		Feature.save({id:feature.project,featureId:feature.id}, feature);
	}

	//
	$scope.removeFeature = function(feature) {
		for (var i = 0; i < $scope.features.length; i++) {
			if ($scope.features[i].id == feature.id) {
				$scope.features.splice(i, 1);
				Feature.delete({id:feature.project,featureId:feature.id});
			}
		}	
	}
}

/** */
function generateProjectId(projects) {
	var id = -1;
	for (var p in projects) {
		var project = projects[p];
		if (project._id > id) {
			id = project._id;
		}
	}
	return id + 1;
}

/** */
function findFeatureById(features, featureId) {
	for (var f in features) {
		var feature = features[f];
		if (feature.id == featureId) {
			return feature;
		}
	}
	return;
}

/** */
function generateFeatureId(features) {
	var id = -1;
	for (var f in features) {
		var feature = features[f];
		if (feature.id > id) {
			id = feature.id;
		}
	}
	return id + 1;
}

/** */
function generateStakeholderId(stakeholders) {
	var id = -1;
	for (var s in stakeholders) {
		var stakeholder = stakeholders[s];
		if (stakeholder.id > id) {
			id = stakeholder.id;
		}
	}
	return id + 1;	
}

/** */
function generateTeamMemberId(teamMembers) {
	var id = -1;
	for (var t in teamMembers) {
		var teamMember = teamMembers[t];
		if (teamMember.id > id) {
			id = teamMember.id;
		}
	}
	return id + 1;	
}
