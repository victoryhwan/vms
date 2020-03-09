var express = require('express');
var http = require('http');
var app = express();
require('dotenv').config();
app.set('port', process.env.PORT || 3030);


http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', (req, res) => res.send('Hello World!'));