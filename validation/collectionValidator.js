var stringValidator = require('./stringValidator');
var Error = require('./error');

var validateMandatoryString = function(fieldName) {
	if(stringValidator.isEmpty(entity[fieldName])) {
		var error = new Error(fieldName, "Cannot be empty");
		return error;
	}

	return false;
};

var addValidation = function(errors, validationCallback, fieldName) {
	var error = validationCallback(fieldName);
	if(collectionNameError) {
		errors.push(collectionNameError);
		return false;	
	}

	return true;
}

module.exports = function(fields) {
	this.fields = fields;

	this.validate = function (entity, callback) {
		var errors = [];
		
		for (var i = 0; i < fields.length; i++) {
			var field = fields[i];
		};

		// addValidation(error, validateMandatoryString, "collectionName");
		// addValidation(error, validateMandatoryString, "collectionLabel");
		// addValidation(error, validateMandatoryString, "url");

		return callback ? callback(errors) : errors;
	}
};