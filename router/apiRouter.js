var express = require('express');
var router = express.Router();

router.use(function (req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

router.get('/:collection', function(req, res) {
	var collectionName = req.params.collection;
	res.send('Bellissima API GET su ' + collectionName);
});

router.get('/:collection/:id', function(req, res) {
	var collectionName = req.params.collection;
	var id = req.params.id;
	res.send('Bellissima API GET su ' + collectionName + ' su id ' + id);
});

router.post('/:collection', function(req, res) {
	var collectionName = req.params.collection;
	res.send('Bellissima API POST su ' + collectionName);

});

router.delete('/:collection/:id', function(req, res) {
	var collectionName = req.params.collection;
	var id = req.params.id;
	res.send('Bellissima API DELETE su ' + collectionName + ' su id ' + id);

});

router.put('/:collection/:id', function(req, res) {
	var collectionName = req.params.collection;
	var id = req.params.id;
	res.send('Bellissima API PUT su ' + collectionName + ' su id ' + id);
});

module.exports = router;