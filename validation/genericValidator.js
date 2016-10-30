var stringValidator = require('./stringValidator');

var validateMandatoryField = function(entity, fieldName) {
	if(!entity[fieldName]) {
		var error = { field: fieldName, message: "Cannot be empty" };
		return error;
	}

	return false;
};

var validateStringField = function(entity, fieldName) {
	var type = typeof entity[fieldName];
	if(type !== "string") {
		var error = { field: fieldName, message: "Must be text" };
		return error;
	}

	return false;
};

var validateBooleanField = function(entity, fieldName) {
	var type = typeof entity[fieldName];
	if(type !== "boolean") {
		var error = { field: fieldName, message: "Must be true or false" };
		return error;
	}

	return false;
};

var validateNumberField = function(entity, fieldName) {
	var type = typeof entity[fieldName];
	if(type !== "number") {
		var error = { field: fieldName, message: "Must be a number" };
		return error;
	}

	return false;
};

var addValidation = function(errors, validationCallback, entity, fieldName) {
	var error = validationCallback(entity, fieldName);
	if(error) {
		errors.push(error);
		return false;	
	}

	return true;
}

module.exports = function(options) {

	if (!Array.isArray(options.fields)) {
		throw new Error("Not valid fields in generica validator");
	}
	
	for (var i = 0; i < options.fields.length; i++) {
		var field = options.fields[i];
		if (!field.name) {
			throw new Error("Field without name property");
		}

		if (!field.type) {
			throw new Error("Field without name property");
		}
	};

	this.fields = options.fields;

	this.validate = function (entity, callback) {
		var errors = [];
		
		for (var i = 0; i < options.fields.length; i++) {
			var field = options.fields[i];
			if (field.required) {
				addValidation(errors, validateMandatoryField, entity, field.name);
			}

			if (entity[field.name]) {
				switch(field.type) {
				    case "string":
				    	addValidation(errors, validateStringField, entity, field.name);
				        break;
				    case "boolean":
				        addValidation(errors, validateBooleanField, entity, field.name);
				        break;
				    case "number":
				        addValidation(errors, validateNumberField, entity, field.name);
				        break;				        
				    default:
				    	throw new Error("Type " + field.type + " is unknown");
				        break;
				}
			}
		};

		// addValidation(error, validateMandatoryString, "collectionName");
		// addValidation(error, validateMandatoryString, "collectionLabel");
		// addValidation(error, validateMandatoryString, "url");

		return callback ? callback(errors) : errors;
	}
};