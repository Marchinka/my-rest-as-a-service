var express = require('express');
var router = express.Router();
var MetadataRepository = require('./database/metadataRepository');

router.use(function (req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

router.get('/', function(req, res) {
	res.send('Collezione GET');
});

router.get('/:id', function(req, res) {
	var id = req.params.id;
	res.send('Collezione GET su id ' + id);
});

router.post('/', function(req, res) {
	var metadata = {
		name: 'test'
	};

	var metadataRepository = new MetadataRepository({ 
		dbUrl: 'ds139267.mlab.com:39267/heroku_13pcdmpq',
		user: 'admin',
		password: 'maldive'
	});

	metadataRepository.insert(metadata, function (err) {
		res.send('Collezione POST ' + err);
	})
});

router.delete('/:id', function(req, res) {
	var id = req.params.id;
	res.send('Collezione DELETE su id ' + id);

});

router.put('/:id', function(req, res) {
	var id = req.params.id;
	res.send('Collezione PUT su id ' + id);
});

module.exports = router;