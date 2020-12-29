
var model = require('../models/linkdedincourses')
var settings = require('../db/settings')


exports.saveMany = function (rows, callback) {
    model.linkedincourses.insertMany(rows, function (err, docs) {
        callback(err, docs)
    })

}


// RETRIEVE game packages based on criteria & fields
// options = {
//    fields: {/** Projection **/}
//    pagination: {limit:5, offset:1}
// }
exports.select = function (criteria,options, callback) {

    // Local variable for capturing limit & offset
    var lim = 0
    var off = 0
    if(options.pagination !== undefined){
        if(options.pagination.limit !== undefined)  lim = parseInt(options.pagination.limit)
        if(options.pagination.offset !== undefined)  off = parseInt(options.pagination.offset)
    }

    model.linkedincourses.find(criteria, function (err, data) {
        callback(err, data)
    }).select(options.fields).limit(lim).skip(off)
}
