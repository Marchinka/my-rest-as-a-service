var assert = require('assert');
var expect = require('expect.js');
var request = require('supertest');
var mongoose = require('mongoose');

var app = require('./../app.js');
var metadataRepository = require('./../database/metadataRepository');
var dbConfig = require('./../database/dbConfig');

var options = {
	user: dbConfig.dbuser,
	pass: dbConfig.dbpassword
};

var getValidMetadata = function () {
	return {
		name: "articles",
		label: "my-articles",
		fields: {
			title: { "type": "String", "required": "true" },
			subTitle: { "type": "String" },
			content: { "type": "String", "required": "true" }
		}
	};
};

describe('/api/metadata', function() {

	beforeEach(function(done) {
    	mongoose.connect(dbConfig.dburl, options, function () {
    		mongoose.models = {};
    		mongoose.connection.db.dropDatabase();
    		done();
    	});
  	});

	afterEach(function(done) {
		mongoose.connection.close(done);
  	});

	describe('DELETE/:id', function() {
		describe('not valid id', function() {
			it('returns bad request', function(done) {
				request(app)
					.delete('/api/metadata/not_on_db')
					.expect('Content-Type', /json/)
					.expect(400, done);
			});
		});

		describe('valid id', function() {
			var id;

			beforeEach(function (done) {
				var metadata = getValidMetadata();
				metadataRepository.insert(metadata, function (err, doc) {
					id = doc._id;
					done();
				})				
			});

			it('returns success', function(done) {
				request(app)
					.delete('/api/metadata/' + id)
					.expect('Content-Type', /json/)
					.expect(202, done);
			});
		}); 		
	});  	

	describe('GET/', function() {
		it('returns json', function(done) {
			request(app)
				.get('/api/metadata/')
				.expect('Content-Type', /json/)
				.expect(200, done);
		});
	});

	describe('GET/:id', function() {
		describe('not valid id', function() {
			it('returns not found', function(done) {
				request(app)
					.get('/api/metadata/not_on_db')
					.expect('Content-Type', /json/)
					.expect(404, done);
			});
		});

		describe('valid id', function() {
			var id;

			beforeEach(function (done) {
				var metadata = getValidMetadata();
				metadataRepository.insert(metadata, function (err, doc) {
					id = doc._id;
					done();
				})				
			});

			it('returns success', function(done) {
				request(app)
					.get('/api/metadata/' + id)
					.expect('Content-Type', /json/)
					.expect(200, done);
			});
		}); 		
	});

	describe('PUT/:id', function() {
		describe('not valid id', function() {
			it('returns bad request', function(done) {
				request(app)
					.put('/api/metadata/not_on_db')
					.expect('Content-Type', /json/)
					.expect(400, done);
			});
		});

		describe('valid id', function() {
			var id;

			beforeEach(function (done) {
				var metadata = getValidMetadata();
				metadataRepository.insert(metadata, function (err, doc) {
					id = doc._id;
					done();
				})				
			});

			describe('valid metadata', function() {
				var metadata = getValidMetadata();
				it('returns success', function(done) {
					request(app)
						.put('/api/metadata/' + id)
						.send(metadata)
						.expect('Content-Type', /json/)
						.expect(202, done);
				});
			});
		}); 		
	});	

	describe('POST', function() {
		describe('valid metadata', function() {
			var metadata = getValidMetadata();
			it('returns success', function(done) {
				request(app)
					.post('/api/metadata')
					.send(metadata)
					.expect('Content-Type', /json/)
					.expect(201, done);
			});
		});

		describe('not valid metadata', function() {
			it('returns error', function(done) {
				request(app)
					.post('/api/metadata')
					.send({})
					.expect('Content-Type', /json/)
					.expect(400, done);
			});
		});
	});
});