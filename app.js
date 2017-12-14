'use strict'
const express = require('express');
const app = express();

// store data in value
var storeCal = new Array();


app.get('/', function(req, resp){
    resp.status(200).send('Hello World!! Calc ');
});

app.get('/getdata/:id', (req, res) =>{
    if(req.params.id == undefined){
        res.send('Error');
    }
    var findIndex = findStoreCallIndex(req.params.id);
    if(findIndex != -1){
        res.send(JSON.stringify(storeCal[findIndex]));
    }else{
        res.send('Error : Not found');
    }
});

app.get('/uploaddata/:id/:a/:b/:operation/:result', function(req, res) {
    var findIndex = findStoreCallIndex(req.params.id);
    if(req.params.operation == 'slash') req.params.operation = '/';
    var storageData = {
        id: req.params.id,
        a : req.params.a,
        b : req.params.b,
        operation : req.params.operation,
        result : req.params.result
    }
    if(findIndex != -1){
        storeCal[findIndex] = storageData;
    }else{
        storeCal.push(storageData);
    }
    res.send('Done');
});

function findStoreCallIndex(id){
    // console.log("ID : "+id);
    // console.log(JSON.stringify(storeCal));
    for(var i = 0;i < storeCal.length;i++){
        if(storeCal[i].id == id){
            // console.log("i : "+i+" ,"+storeCal.length);
            // console.log(JSON.stringify(storeCal[i]));
            // console.log(JSON.stringify(storeCal));
            return i;
        }
    }
    return -1;
}

// app.get('/getdata/:id', (req, res) =>{
//     if(req.params.id == undefined){
        
//     }
//     var helper = require('./helper');
    
//     helper.getCalcFromId(req.params.id, function(data){
//         res.send(data);
//     });
// });

// app.get('/uploaddata/:id/:a/:b/:operation/:result/:isFirst', function(req, res) {
//     // Include the public functions from 'helpers.js'
//     var helper = require('./helper');
//     if(req.params.isFirst == 'true'){
//         helper.insertCalc(req.params.id, req.params.a, req.params.b, req.params.operation, req.params.result, function(data){
//             res.send(data);
//         });  
//     }else{
//         helper.updateCalc(req.params.id, req.params.a, req.params.b, req.params.operation, req.params.result, function(data){
//             res.send(data);
//         }); 
//     }
      
// });

var server = app.listen(process.env.PORT || '8080', function(){
    console.log('App listening on port %s', server.address().port);
    console.log('Press Ctrl+C to quit');
});