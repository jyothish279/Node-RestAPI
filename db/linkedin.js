const model = require("../models/veg");
var settings = require("../db/settings");

exports.save = function (data, callback) {
  model.Vacations(data).save(function (err, inserted) {
    callback(err, inserted);
  });
};

exports.saveMany = function (rows, callback) {
  model.Vacations.insertMany(rows, function (err, docs) {
    callback(err, docs);
  });
};

exports.update = function (criteria, doc, callback) {
  model.Vacations.updateMany(criteria, doc, function (err, data) {
    callback(err, data);
  });
};

exports.select = function (criteria, callback) {
  model.Vacations.find(criteria, function (err, data) {
    callback(err, data);
  });
};
