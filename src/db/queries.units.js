const unitFields = require('../views/units/unitFields');
const mongoose = require('mongoose');
const Resource = mongoose.model('resources');

module.exports = {
  getAllUnits(callback) {
    callback(null, unitFields);
  }
};
