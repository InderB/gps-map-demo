'use strict';

//dependencies
var config = require('./config'),
    express = require('express'),
    path = require('path'),
    http = require('http');

//create express app
var app = express();

//keep reference to config
app.config = config;

//setup the web server
app.server = http.createServer(app);

//settings
app.disable('x-powered-by');
app.set('port', config.port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(require('serve-static')(path.join(__dirname, 'client')));
require('./routes')(app);
// require('./serviceBackend')(app)
app.server.listen(app.config.port, function(){
  //and... we're live
});
