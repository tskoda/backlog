// requires
var path = require('path');
var express = require('express');
var mongoose = require('mongoose');

//
var Feature = require('./models/feature.js');
var Project = require('./models/project.js');

//
var dbseed = require('./dbseed.js');

// create express app
var app = express();

// all environments
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.compress());
app.use(express.bodyParser());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//
app.get('/api/projects', function(req, res, next) {
	Project.find(function(error, projects) {
		res.send(projects);
	});
});

app.get('/api/projects/:id', function(req, res, next) {
	Project.findById(req.params.id, function(error, project) {
		if (project == null) {
			return next();
		}
		res.send(project);
	});	
});

app.post('/api/projects/:id', function(req, res, next) {
	var newProject = req.body;
	var id = newProject._id;
	delete newProject._id;

	Project.findOneAndUpdate({_id:id}, newProject, {upsert:true}, function(err, project) {
		res.end();	
	});
});

app.delete('/api/projects/:id', function(req, res, next) {
	Project.remove({_id:req.params.id}, function(error) {
		Feature.remove({project:req.params.id}, function(error) {
			res.end();
		})
	});
});

app.get('/api/projects/:id/features', function(req, res, next) {
	Feature.find({project:req.params.id}, function(error, features) {
		res.send(features);
	});	
});

app.get('/api/projects/:id/features/:featureId', function(req, res, next) {
	Feature.findOne({id:req.params.featureId, project:req.params.id}, function(error, feature) {
		if (feature == null) {
			return next();
		}
		res.send(feature);
	});
});

app.post('/api/projects/:id/features/:featureId', function(req, res, next) {
	var newFeature = req.body;
	delete newFeature._id;

	Feature.findOneAndUpdate({id:req.params.featureId, project:req.params.id}, newFeature, {upsert:true}, function(err, feature) {
		res.end();	
	});
});

app.delete('/api/projects/:id/features/:featureId', function(req, res, next) {
	Feature.remove({id:req.params.featureId, project:req.params.id}, function(error) {
		res.end();
	});
});

// prepare db
//
mongoose.connect('mongodb://localhost/backlog');
var db = mongoose.connection;
db.on('open', function() {
	dbseed.seed();	
})

// run http server
var port = process.env.PORT || 3000;
app.listen(port, function() {
	console.log('Express server listening on port ' + port + ' in ' + app.get('env') + ' mode.');
});
