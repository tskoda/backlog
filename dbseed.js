var Feature = require('./models/feature.js');
var Project = require('./models/project.js');

//
exports.seed = function() {
	//
	Project.remove().exec();
	Feature.remove().exec();

	//
	var p1 = new Project({
		_id:1, 
		name:"Backlog",
		description:"Minimalistic, web based <strong>product backlog management</strong> application,<br>as delivered for <strong>CS50x</strong> final project.",
		status:"Active",
		customer:{
			name:"CS50x", 
			stakeholders: [
			{
				_id:1,
				name:"Joseph Turner",
				email:"joseph.turner@acme.net"
			},
			{
				_id:2,
				name:"George Crawford",
				email:"george.crawford@acme.com"
			},					
			]
		},
		team: {
			scrumMaster: {
				name:"Robert Cabell",
				email:"rcabell@team77.com"
			},
			members: [
			{
				_id:1,
				name:"Russell Schoonover", 
				email:"rschoonover@team77.com"
			},
			{
				_id:2,
				name:"Brenda Jones", 
				email:"bjones@team77.com"
			}
			]
		}
	});
	p1.save();

	//
	var f1 = new Feature({
		id:1,
		project:1,
		name:"Project schedule",
		status:"Active",
		value:5,
		size:3,
		story:"As a user I need a possibility to link my projects with google calendar, so on project page next 3-4 related calendar entries are shown.",
	});
	f1.save();

	var f2 = new Feature({
		id:2,
		project:1,
		name:"Sprint backlog export",
		status:"Planned",
		value:5,
		size:5,
		story:"As a user I need a possibility to export selected features in form of sprint backlog."
	});
	f2.save();

	var f3 = new Feature({
		id:3,
		project:1,
		name:"Feature view",
		status:"Done",
		value:2,
		size:4,
		story:"As a user I want to have a single page view which shows all properties of selected feature.<br>The view should shown basic  properties like a feature name, user story and current size/value/risk estimations."
	});
	f3.save();

	var f4 = new Feature({
		id:4,
		project:1,
		name:"Features view",
		status:"Done",
		value:2,
		size:4,
		story:"As a user I want to have a single page view which shows all features for selected project.<br>The view should shown basic properties like a feature name, user story and current feature status and estimations."
	});
	f4.save();

	var f5 = new Feature({
		id:5,
		project:1,
		name:"Project view",
		status:"Done",
		value:5,
		size:3,
		story:"As a user I want to have a single page view which shows all properties for selected project.<br>The view should shown basic project properties like a project name, project description, current project status, and contacts for  all project stakeholders and team members."
	});
	f5.save();

	var f6 = new Feature({
		id:6,
		project:1,
		name:"Projects view",
		status:"Done",
		value:5,
		size:2,
		story:"As a user I want to have a single page view which shows all my projects at a glance.<br>The view should shown basic project properties like a project name, short project description and current project status."
	});
	f6.save();

	//
	var p2 = new Project({
		_id:2, 
		name:"Backlog Phase 2",
		description:"Planned extensions to original <strong>backlog</strong> project.",
		status:"Planned",
		customer:{
			name:"ACME", 
			stakeholders: [
				{
					id:1,
					name:"Joseph Turner",
					email:"joseph.turner@acme.net"
				}				
			]
		},
		team: {
			scrumMaster: {
				name:"Robert Cabell",
				email:"rcabell@team77.com"
		},
		members: [
			{
				name:"Russell Schoonover", 
				email:"rschoonover@team77.com"
			},
			{
				name:"Brenda Jones", 
				email:"bjones@team77.com"
			}
		]
		}
	});
	p2.save();

	var f21 = new Feature({
		id:1,
		project:2,
		name:"Test Feature #1",
		story:"As a user I want to have a coffee ready each day.",
		status:"Active",
		value:1,
		size:5
	})
	f21.save();

	var f22 = new Feature({
		id:2,
		project:2,
		name:"Test Feature #2",
		story:"As a user I want to have a newspaper ready each day.",
		status:"Done",
		value:2,
		size:4,
	})
	f22.save();

};