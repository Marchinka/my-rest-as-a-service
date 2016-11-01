var mongooseErrorConverter = require('./mongooseErrorConverter');
var Metadata = require('./metadata');

module.exports = {
	insert: function(data, callback) {
		var metadata = new Metadata(data);

		metadata.save(function (err, doc) {
			var errors = mongooseErrorConverter.getErrors(err);
			callback(errors, doc);
		});		
	},
	getAll: function (callback) {
		Metadata.find(callback);
	},
	getById: function(id, callback) {
		Metadata.findById(id, callback);
	},
	getByName: function(name, callback) {
		Metadata.findOne({ 'name': name }, callback);
	},	
	deleteById: function(id, callback) {
		Metadata.findByIdAndRemove(id, callback);
	},
	updateById: function(id, data, callback) {
		var query = { _id: id };
		Metadata.findOneAndUpdate(
			query, 
			data, 
			{ runValidations: true, new: true }, 
			callback);
	}
};