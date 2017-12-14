// MYSQL DB Initial
var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
// Create connection to database
var config = 
   {
     userName: 'wanchai', // update me
     password: 'Abcd1234', // update me
     server: 'wanchai.database.windows.net', // update me
     options: 
        {
           database: 'calc' //update me
           , encrypt: true
           , rowCollectionOnRequestCompletion: true
        }
   }
var connection = new Connection(config);

// 'module.exports' is a node.JS specific feature, it does not work with regular JavaScript
module.exports = 
{
  // This is the function which will be called in the main file, which is server.js
  // The parameters 'name' and 'surname' will be provided inside the function
  // when the function is called in the main file.
  // Example: concatenameNames('John,'Doe');
  concatenateNames: function (name, surname) 
  {
     var wholeName = name + " " + surname;

     return wholeName;
  },

  sampleFunctionTwo: function () 
  {

  },
  getCalcFromId: function (id, callback) 
  {
      return readData(id, callback);
  },
  insertCalc: function(id, a, b, operation, result, callback){
      return insertData(id, a, b, operation, result, callback);
  },
  updateCalc: function(id, a, b, operation, result, callback){
      return updateData(id, a, b, operation, result, callback);
  }
};

// Private variables and functions which will not be accessible outside this file
var privateFunction = function () 
{
};


var readData = function(id, callback){
    // Attempt to connect and execute queries if connection goes through
    connection.on('connect', function(err) 
        {
        if (err) 
            {
            console.log(err)
            }
        else
            {
                // Read all rows from table
                var request = new Request(
                    "SELECT * FROM SaveData WHERE id=@id",
                    function(err, rowCount, rows) 
                        {
                            var respond = new Array();
                            for(var i = 0;i < rows.length; i ++){
                                respond.push({
                                    id : rows[i][0].value
                                    ,a : rows[i][1].value
                                    ,b : rows[i][1].value
                                    ,operaion : rows[i][1].value
                                    ,result : rows[i][1].value
                                });
                            }
                            callback(respond);
                        }
                    );
                request.addParameter('id', TYPES.VarChar, id);  
                connection.execSql(request);
            }
        }
    );
    
}
var insertData = function(id, a, b, operation, result, callback){
     // Attempt to connect and execute queries if connection goes through
     connection.on('connect', function(err) 
     {
        if (err) 
            {
            console.log(err)
            }
        else
            {
                request = new Request("INSERT SaveData (id, a, b, operation, result) VALUES (@id, @a, @b, @operation, @result);"
                , function(err) {  
                    if (err) {  
                        console.log(err);}  
                    });
                request.addParameter('id', TYPES.VarChar, id);  
                request.addParameter('a', TYPES.Int , a);
                request.addParameter('a', TYPES.Int , b);
                request.addParameter('a', TYPES.Varchar , a);
                request.addParameter('a', TYPES.Int , result);
                request.on('done', function (rowCount, more, rows) { 
                    callback('done');
                });
                connection.execSql(request); 
            }
        }
    );
}

var updateData = function(id, a, b, operation, result){
    // Attempt to connect and execute queries if connection goes through
    connection.on('connect', function(err) 
    {
       if (err) 
           {
           console.log(err)
           }
       else
           {
               request = new Request("UPDATE SaveData SET a=@a, b=@b, operation=@operation, result=@result WHERE id=@id;"
               , function(err) {  
                   if (err) {  
                       console.log(err);}  
                   });
               request.addParameter('id', TYPES.VarChar, id);  
               request.addParameter('a', TYPES.Int , a);
               request.addParameter('a', TYPES.Int , b);
               request.addParameter('a', TYPES.Varchar , a);
               request.addParameter('a', TYPES.Int , result);
               request.on('done', function (rowCount, more, rows) { 
                   callback('done');
               });
               connection.execSql(request); 
           }
       }
   );
}