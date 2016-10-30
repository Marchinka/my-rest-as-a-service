var assert = require('assert');
var expect = require('expect.js');

var Validator = require('./../validation/genericValidator');

describe('genericValidator', function() {
	describe('ctor', function() {
		describe('throws error', function() {
      		it('when fields are not array', function() {
      			// SETUP
      			var fields = {};
      			var options = { fields: fields };

      			// EXERCISE
      			var errorThrower = function () {
      				new Validator(options);
      			};

      			// ASSERT
      			expect(errorThrower).to.throwError();
			});

			it('when a field does not have name property', function() {
      			// SETUP
      			var fields = [{ type: "string" }];
      			var options = { fields: fields };

      			// EXERCISE
      			var errorThrower = function () {
      				new Validator(options);
      			};

      			// ASSERT
      			expect(errorThrower).to.throwError();
			});

			it('when a field does not have type property', function() {
      			// SETUP
      			var fields = [{ name: "fieldName" }];
      			var options = { fields: fields };

      			// EXERCISE
      			var errorThrower = function () {
      				new Validator(options);
      			};

      			// ASSERT
      			expect(errorThrower).to.throwError();
			});				
		});
	});

	describe('with required field', function() {
		describe('validate', function() {
			describe('entity without required field', function() {
				it('returns error', function() {
					// SETUP
      				var field = { name: "fieldName", type: 'string', required: true };
      				var options = { fields: [field] };
      				var validator = new Validator(options);
      				var entity = { no_fieldName: "text" };

      				// EXERCISE
      				var errors = validator.validate(entity);

      				// ASSERT
      				expect(errors.length).to.equal(1);
      				var error = errors[0];
      				expect(error.field).to.equal(field.name);
      				expect(error.message).to.equal("Cannot be empty");
				});
			});

			describe('entity with required field', function() {
				it('returns no error', function() {
					// SETUP
      				var field = { name: "fieldName", type: 'boolean', required: true };
      				var options = { fields: [field] };
      				var validator = new Validator(options);
      				var entity = { fieldName: true };

      				// EXERCISE
      				var errors = validator.validate(entity);

      				// ASSERT
      				expect(errors).to.be.empty();
				});
			});			
		});
	});

	describe('with unknown field', function() {
		describe('validate', function() {
				it('throws error', function() {
					// SETUP
      				var field = { name: "fieldName", type: 'FLYNG SPAGHETTI MONSTER', required: true };
      				var options = { fields: [field] };
      				var validator = new Validator(options);
      				var entity = { fieldName: true };

      				// EXERCISE
      				var errorThrower = function () { 
      					validator.validate(entity);
      				};

      				// ASSERT
      				expect(errorThrower).to.throwError();
				});
		});
	});

	describe('with string field', function() {
		describe('validate', function() {
			describe('entity with wrong type', function() {
				it('returns error', function() {
					// SETUP
      				var field = { name: "fieldName", type: 'string', required: true };
      				var options = { fields: [field] };
      				var validator = new Validator(options);
      				var entity = { fieldName: true };

      				// EXERCISE
      				var errors = validator.validate(entity);

      				// ASSERT
      				expect(errors.length).to.equal(1);
      				var error = errors[0];
      				expect(error.field).to.equal(field.name);
      				expect(error.message).to.equal("Must be text");
				});
			});

			describe('entity with correct type', function() {
				it('returns no error', function() {
					// SETUP
      				var field = { name: "fieldName", type: 'string', required: true };
      				var options = { fields: [field] };
      				var validator = new Validator(options);
      				var entity = { fieldName: "true" };

      				// EXERCISE
      				var errors = validator.validate(entity);

      				// ASSERT
      				expect(errors).to.empty();					
				});
			});			
		});
	});

	describe('with boolean field', function() {
		describe('validate', function() {
			describe('entity with wrong type', function() {
				it('returns error', function() {
					// SETUP
      				var field = { name: "fieldName", type: 'boolean', required: true };
      				var options = { fields: [field] };
      				var validator = new Validator(options);
      				var entity = { fieldName: "true" };

      				// EXERCISE
      				var errors = validator.validate(entity);

      				// ASSERT
      				expect(errors.length).to.equal(1);
      				var error = errors[0];
      				expect(error.field).to.equal(field.name);
      				expect(error.message).to.equal("Must be true or false");
				});
			});

			describe('entity with correct type', function() {
				it('returns no error', function() {
					// SETUP
      				var field = { name: "fieldName", type: 'boolean', required: true };
      				var options = { fields: [field] };
      				var validator = new Validator(options);
      				var entity = { fieldName: true };

      				// EXERCISE
      				var errors = validator.validate(entity);

      				// ASSERT
      				expect(errors).to.empty();					
				});
			});			
		});
	});

	describe('with number field', function() {
		describe('validate', function() {
			describe('entity with wrong type', function() {
				it('returns error', function() {
					// SETUP
      				var field = { name: "fieldName", type: 'number', required: true };
      				var options = { fields: [field] };
      				var validator = new Validator(options);
      				var entity = { fieldName: "42" };

      				// EXERCISE
      				var errors = validator.validate(entity);

      				// ASSERT
      				expect(errors.length).to.equal(1);
      				var error = errors[0];
      				expect(error.field).to.equal(field.name);
      				expect(error.message).to.equal("Must be a number");
				});
			});

			describe('entity with correct type', function() {
				it('returns no error', function() {
					// SETUP
      				var field = { name: "fieldName", type: 'number', required: true };
      				var options = { fields: [field] };
      				var validator = new Validator(options);
      				var entity = { fieldName: 42 };

      				// EXERCISE
      				var errors = validator.validate(entity);

      				// ASSERT
      				expect(errors).to.empty();					
				});
			});			
		});
	});
});
