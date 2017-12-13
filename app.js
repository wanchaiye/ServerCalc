// var http = require('http');

// //create a server object:
// http.createServer(function (req, res) {
// //   res.write('Hello World!'); //write a response to the client
// //   res.end(); //end the response
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(req.url);
//     res.end();
// }).listen(8080); //the server object listens on port 8080
'use strict'
var express = require('express');
var app = express();

app.get('/', function(req, resp){
    resp.status(200).send('Hello World!! Calc');
});

var server = app.listen(process.env.PORT || '8080', function(){
    console.log('App listening on port %s', server.address().port);
    console.log('Press Ctrl+C to quit');
});