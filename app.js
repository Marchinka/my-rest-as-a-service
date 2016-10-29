var express = require('express');
var app = express();
var apiRouter = require('./router/apiRouter');
var collectionsRouter = require('./router/collectionsRouter');

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.use('/api/baas/', apiRouter);
app.use('/api/collections/', collectionsRouter);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});