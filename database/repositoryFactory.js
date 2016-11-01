var mongoose = require('mongoose');
var Schema = Schema = mongoose.Schema;
var mongooseErrorConverter = require('./mongooseErrorConverter');

module.exports = function (metadata) {
	delete mongoose.models[metadata.name];
	
	var Model = mongoose.model(metadata.name, metadata.fields);

	var repository =  {
		insert: function(data, callback) {
			var model = new Model(data);

			model.save(function (err, doc) {
				var errors = mongooseErrorConverter.getErrors(err);
				callback(errors, doc);
			});		
		},		
		getAll: function (callback) {
			Model.find(callback);
		},
		getById: function(id, callback) {
			Model.findById(id, callback);
		},
		updateById: function(id, data, callback) {
			var query = { _id: id };
			Model.findOneAndUpdate(
				query, 
				data, 
				{ runValidations: true, new: true }, 
				callback);
		},	
		deleteById: function(id, callback) {
			Model.findByIdAndRemove(id, callback);
		}	
	};
	return repository;
};