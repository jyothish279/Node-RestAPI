

// Setup the DB_URI
process.env.DB_URI = require("../db/clouddb").DB_URI


var db = require('../db/linkedincourses')
var data = require('../data/linkedincourses')



// Save multiple rows
db.saveMany(data.MultipleRows,function(err, docs){
    if(err){
        console.log("Failed multiple row insert")
        //console.log(err)
        //process.exit(1)
    } else {
        console.log("Success - Multiple rows inserted - %d",docs.length)
    }
});



