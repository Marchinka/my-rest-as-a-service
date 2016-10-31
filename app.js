var express = require('express');
var app = express();
var apiRouter = require('./router/apiRouter');
var metadataRouter = require('./router/metadataRouter');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/api/baas/', apiRouter);
app.use('/api/metadata/', metadataRouter);

module.exports = app;
