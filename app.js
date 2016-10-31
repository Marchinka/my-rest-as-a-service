var express = require('express');
var app = express();
var bodyParser = require('body-parser')

var apiRouter = require('./router/apiRouter');
var metadataRouter = require('./router/metadataRouter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/api/baas/', apiRouter);
app.use('/api/metadata/', metadataRouter);

module.exports = app;
