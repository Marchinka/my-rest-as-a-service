var assert = require('assert');
var expect = require('expect.js');
var request = require('supertest');
var mongoose = require('mongoose');

var app = require('./../app.js');
var metadataRepository = require('./../database/metadataRepository');
var createRepository = require('./../database/repositoryFactory');
var dbConfig = require('./../database/dbConfig');

var options = {
	user: dbConfig.dbuser,
	pass: dbConfig.dbpassword
};

var getTestMetadata = function () {
	return {
		name:"articles",
		label:"my-articles",
		fields: {
			title: { type: "String", required: true },
			subTitle: { type: "String" },
			content: { type: "String", required: true }
		}
	}
};

var getTestData = function () {
	return {
		title: "Title",
		subTitle: "Sub Title",
		content: "The article body",
	}
};

describe('/api/baas', function() {

	beforeEach(function(done) {
    	mongoose.connect(dbConfig.dburl, options, function (err) {
    		if (err) {
    			throw new Error("An instance of mongodb should be launched in order to execute the tests.");
    		} else {
	    		mongoose.models = {};
	    		mongoose.connection.db.dropDatabase();
    		}
    		done();
    	});
  	});

	beforeEach(function(done) {
		var metadata = getTestMetadata();
		metadataRepository.insert(metadata, done);
  	});

	afterEach(function(done) {
		mongoose.connection.close(done);
  	});

	describe('GET/', function() {
		describe('not valid collection name', function() {
			it('returns not found', function(done) {
				request(app)
					.get('/api/baas/wrong/')
					.expect('Content-Type', /json/)
					.expect(404, done);
			});
		});

		describe('valid collection name', function() {
			it('returns collection json', function(done) {
				request(app)
					.get('/api/baas/articles/')
					.expect('Content-Type', /json/)
					.expect(200, done);
			});
		});		
	});

	describe('GET/:id', function() {
		describe('not valid collection name', function() {
			it('returns not found', function(done) {
				request(app)
					.get('/api/baas/wrong/12')
					.expect('Content-Type', /json/)
					.expect(404, done);
			});
		});

		describe('valid collection name', function() {
			describe('not valid id', function() {
				it('returns not found', function(done) {
					request(app)
						.get('/api/baas/articles/not_on_db')
						.expect('Content-Type', /json/)
						.expect(404, done);
				});
			});

			describe('valid id', function() {
				var id;

				beforeEach(function(done) {
					var data = getTestData();
					var metadata = getTestMetadata();
					var repository = createRepository(metadata);
					repository.insert(data, function (err, doc) {
						id = doc._id;
						done();
					});
				});

				it('returns success', function(done) {
					request(app)
						.get('/api/baas/articles/' + id)
						.expect('Content-Type', /json/)
						.expect(200, done);
				});
			});
		});
	});

	describe('POST/', function() {
		describe('not valid collection name', function() {
			it('returns not found', function(done) {
				request(app)
					.post('/api/baas/wrong/')
					.expect('Content-Type', /json/)
					.expect(404, done);
			});
		});

		describe('valid collection name', function() {		
			describe('valid data', function() {
				var data = getTestData();
				it('returns success', function(done) {
					request(app)
						.post('/api/baas/articles/')
						.send(data)
						.expect('Content-Type', /json/)
						.expect(201, done);
				});
			});

			describe('not valid data', function() {
				it('returns error', function(done) {
					request(app)
						.post('/api/baas/articles/')
						.send({})
						.expect('Content-Type', /json/)
						.expect(400, done);
				});
			});
		});
	});

	describe('PUT/:id', function() {
		describe('not valid collection name', function() {
			it('returns not found', function(done) {
				request(app)
					.put('/api/baas/wrong/12')
					.expect('Content-Type', /json/)
					.expect(404, done);
			});
		});

		describe('valid collection name', function() {

			var id;

			beforeEach(function(done) {
				var data = getTestData();
				var metadata = getTestMetadata();
				var repository = createRepository(metadata);
				repository.insert(data, function (err, doc) {
					id = doc._id;
					done();
				});
			});

			describe('not valid id', function() {
				it('returns bad request', function(done) {
					request(app)
						.put('/api/baas/articles/not_on_db')
						.expect('Content-Type', /json/)
						.expect(400, done);
				});
			});

			describe('valid id', function() {
				it('returns bad request', function(done) {
					request(app)
						.put('/api/baas/articles/' + id)
						.expect('Content-Type', /json/)
						.expect(202, done);
				});
			});			
		});
	});

	describe('DELETE/:id', function() {
		describe('not valid collection name', function() {
			it('returns not found', function(done) {
				request(app)
					.delete('/api/baas/wrong/12')
					.expect('Content-Type', /json/)
					.expect(404, done);
			});
		});		

		describe('valid collection name', function() {
			var id;

			beforeEach(function(done) {
				var data = getTestData();
				var metadata = getTestMetadata();
				var repository = createRepository(metadata);
				repository.insert(data, function (err, doc) {
					id = doc._id;
					done();
				});
			});

			describe('not valid id', function() {
				it('returns bad request', function(done) {
					request(app)
						.delete('/api/baas/articles/not_on_db')
						.expect('Content-Type', /json/)
						.expect(400, done);
				});
			});

			describe('valid id', function() {
				it('returns accepted', function(done) {
					request(app)
						.delete('/api/baas/articles/' + id)
						.expect('Content-Type', /json/)
						.expect(202, done);
				});
			});			
		});
	});  	
});