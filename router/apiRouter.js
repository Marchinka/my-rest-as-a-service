var express = require('express');
var router = express.Router();
var createRepository = require('./../database/repositoryFactory');
var metadataRepository = require('./../database/metadataRepository');

router.use('/:collection/', function (req, res, next) {
	metadataRepository.getByName(req.params.collection, function (err, doc) {
		if (doc) {
			req.metadata = doc;
			next();
		} else {
			res.status(404).json({ error: "Collection " + req.params.collection + " not initialized." });		
		}
	})
});

router.get('/:collection', function(req, res) {
	var repository = createRepository(req.metadata);
	var sendResponse = function (err, docs) {
		if (err) {
			res.status(404).json({ err: err });
		} else {
			res.status(200).json(docs);
		}
	};
	repository.getAll(sendResponse);});

router.get('/:collection/:id', function(req, res) {
	var id = req.params.id;
	var repository = createRepository(req.metadata);
	var sendResponse = function (err, doc) {
		if (err) {
			res.status(404).json({ err: err });
		} else {
			res.status(200).json(doc);
		}
	};
	repository.getById(id, sendResponse);
});

router.post('/:collection', function(req, res) {
	var data = req.body;
	var repository = createRepository(req.metadata);
	var sendResponse = function (err, doc) {
		if (err) {
			res.status(400).json({ err: err });
		} else {
			res.status(201).json(doc);
		}
	};
	repository.insert(data, sendResponse)

});

router.delete('/:collection/:id', function(req, res) {
	var id = req.params.id;
	var repository = createRepository(req.metadata);
	var sendResponse = function (err, doc) {
		if (err) {
			res.status(400).json({ err: err });
		} else {
			res.status(202).json({ id: id });
		}
	};
	repository.deleteById(id, sendResponse);
});

router.put('/:collection/:id', function(req, res) {
	var id = req.params.id;
	var data = req.body;
	var repository = createRepository(req.metadata);
	var sendResponse = function (err, doc) {
		if (err) {
			res.status(400).json({ err: err });
		} else {
			res.status(202).json(doc);
		}
	};
	repository.updateById(id, data, sendResponse);
});

module.exports = router;