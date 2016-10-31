var app = require('./app');
var mongoose = require('mongoose');

var dbConfig = require('./database/dbConfig');
var options = {
	user: dbConfig.dbuser,
	pass: dbConfig.dbpassword
};
mongoose.connect(dbConfig.dburl, options);

app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});