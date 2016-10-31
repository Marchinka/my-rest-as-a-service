var mongoose = require('mongoose');

module.exports = function (config) {
	this.dbUrl = config.dbUrl;
	this.user = config.user;
	this.password = config.password;

	this.insert = function(data, callback) {
		var options = {
			user: this.user,
			pass: this.password
		};
		mongoose.connect(this.dbUrl, options);

		var Metadata = mongoose.model('Metadata', { 
			name: String 
		});

		var metadata = new Metadata(data);
		metadata.save(function (err) {
			if (err) {
				console.log(err);
			} else {
				console.log('meow');
			}
			callback(err);
		});		
	}
};