var RESOURCE_NAME = 'linkedin';
var VERSION = 'v1';
var URI = '/' + VERSION + '/' + RESOURCE_NAME;

var db = require("../../db/linkedin")
var apiErrors = require('../../util/errors')
var apiMessages = require('../../util/messages')

module.exports = function(router) {
    'use strict';

    router.route(URI).get(function(req, res, next) {
        console.log("GET Linkedin");

        var criteria = { duration: {$gte: 10}}

        db.select(criteria, function(err, docs) {
            if(err) {
                console.log(err);
                res.status(500);
                res.send("error connecting to db")
            } else {
                if(docs.length == 0) {
                    res.status(400)
                }
                console.log("Retrieved courses = %d", docs.length);
                res.send(docs)
            }
        })
    })

    router.route(URI).post(function(req, res, next){
        console.log("Post Linkedin");

        var doc = req.body;

        db.save(doc, function(err, saved) {
            if(err){
                
            }
        })
    })
}


var processMongooseErrors = function (message, method, endpoint, err,payload) {
    var errorList = []
    // Check for validation error
    if (err.name === 'ValidationError'){
        errorList = processValidationErrors(err)
    } else if(err.code == 11000){
        // it could be database error - 11000 is for duplicate key
        errorList.push(apiErrors.errors.PACKAGE_ALREADY_EXISTS)
    } else {
        var errUnknown = apiErrors.errors.UNKNOWN_ERROR
        errUnknown.payload = err
        errorList = [apiErrors.errors.UNKNOWN_ERROR]
    }
    return apiErrors.create(message, method, endpoint, errorList, payload)
}

/**
 * Converts Mongoose errors to API specific errors
 */
var processValidationErrors = function (err) {
    var errorList = []
    // Check if there is an issue with the Num of Nights
    if (err.errors.numberOfNights) {
        if (err.errors.numberOfNights.kind === apiErrors.kinds.MIN_ERROR 
        || err.errors.numberOfNights.kind  === apiErrors.kinds.MAX_ERROR 
        || err.errors.numberOfNights.kind === apiErrors.kinds.NUMBER_ERROR ) {
            errorList.push(apiErrors.errors.FORMAT_NUM_OF_NIGHTS)
        }
    }
    // Check if name of the package is missing
    if (err.errors.name) {
        if (err.errors.name.kind === apiErrors.kinds.REQUIRED) {
            errorList.push(apiErrors.errors.MISSING_PACKAGE_NAME)
        }
    }

    // Check if description of the package is missing
    if (err.errors.description) {
        if (err.errors.description.kind === apiErrors.kinds.REQUIRED) {
            errorList.push(apiErrors.errors.MISSING_PACKAGE_DESCRIPTION)
        }
    }

    return errorList;
}
