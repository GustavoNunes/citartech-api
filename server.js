var express = require('express');
var cors    = require('cors');
var router  = require('./src/routes.js');
var app     = express();

var port = 8081;

app.use(cors());
app.use('/', router);

app.listen(port);
console.log('API listening on port ' + port);
