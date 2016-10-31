var express = require('express');
var router = express.Router();
var metadataRepository = require('./../database/metadataRepository');

router.get('/', function(req, res) {
	var sendResponse = function (err, docs) {
		if (err) {
			res.status(404).json({ err: err });
		} else {
			res.status(200).json(docs);
		}
	};
	metadataRepository.getAll(sendResponse);});

router.get('/:id', function(req, res) {
	var id = req.params.id;
	var sendResponse = function (err, doc) {
		if (err) {
			res.status(404).json({ err: err });
		} else {
			res.status(200).json(doc);
		}
	};
	metadataRepository.getById(id, sendResponse);
});

router.post('/', function(req, res) {
	var metadata = req.body;
	var sendResponse = function (err, doc) {
		if (err) {
			res.status(400).json({ err: err });
		} else {
			res.status(201).json(doc);
		}
	};
	metadataRepository.insert(metadata, sendResponse)
});

router.delete('/:id', function(req, res) {
	var id = req.params.id;
	var sendResponse = function (err, doc) {
		if (err) {
			res.status(400).json({ err: err });
		} else {
			res.status(202).json({ id: id });
		}
	};
	metadataRepository.deleteById(id, sendResponse);
});

router.put('/:id', function(req, res) {
	var id = req.params.id;
	var metadata = req.body;
	var sendResponse = function (err, doc) {
		if (err) {
			res.status(400).json({ err: err });
		} else {
			res.status(202).json(doc);
		}
	};
	metadataRepository.updateById(id, metadata, sendResponse);});

module.exports = router;