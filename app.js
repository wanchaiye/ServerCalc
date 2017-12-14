'use strict'
const express = require('express');
const app = express();




app.get('/', function(req, resp){
    resp.status(200).send('Hello World!! Calc');
});

app.get('/getdata/:id', (req, res) =>{
    if(req.params.id == undefined){
        
    }
    var helper = require('./helper');
    
    helper.getCalcFromId(req.params.id, function(data){
        res.send(data);
    });
});

app.get('/uploaddata/:id/:a/:b/:operation/:result/:isFirst', function(req, res) {
    // Include the public functions from 'helpers.js'
    var helper = require('./helper');
    if(req.params.isFirst == 'true'){
        helper.insertCalc(req.params.id, req.params.a, req.params.b, req.params.operation, req.params.result, function(data){
            res.send(data);
        });  
    }else{
        helper.updateCalc(req.params.id, req.params.a, req.params.b, req.params.operation, req.params.result, function(data){
            res.send(data);
        }); 
    }
      
});

var server = app.listen(process.env.PORT || '8080', function(){
    console.log('App listening on port %s', server.address().port);
    console.log('Press Ctrl+C to quit');
});