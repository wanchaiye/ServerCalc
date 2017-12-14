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
    
    helper.getCalcFromId('bank', function(data){
        res.send(data);
    });
});

app.get('/uploaddata/:id/:calc/:isFirst', function(req, res) {
    // Include the public functions from 'helpers.js'
    var helper = require('./helper');
    if(req.params.isFirst == 'true'){
        helper.insertCalc(req.params.id, req.params.calc, function(data){
            res.send(data);
        });  
    }else{
        helper.updateCalc(req.params.id, req.params.calc, function(data){
            res.send(data);
        }); 
    }
      
});

var server = app.listen(process.env.PORT || '8080', function(){
    console.log('App listening on port %s', server.address().port);
    console.log('Press Ctrl+C to quit');
});