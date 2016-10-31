var mongoose = require('mongoose');
var Schema = Schema = mongoose.Schema;

 // TODO fare lo schema anche per il contenuto dei campi a partire dalla documentazione di Mongoose

module.exports = mongoose.model('Metadata', { 
	name: { "type": "String", "required": "true" },
	label: { "type": "String", "required": "true" },
	fields: Schema.Types.Mixed
});