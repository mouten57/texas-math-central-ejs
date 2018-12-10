const mongoose = require('mongoose');
const Resource = mongoose.model('resources');

module.exports = {
  getAllResources(callback) {
    //get all resources, EXCEPT for the file data
    //..was TOO slow to load. Need to set up so if they want it,
    //they should click a download button to get it.

    return Resource.find({}, { file_data: 0 }).then(resources => {
      callback(null, resources);
    });
  },
  getUnitResources(unit, callback) {
    return Resource.find({ unit: unit }, { file_data: 0 }).then(resources => {
      callback(null, resources);
    });
  },
  getResource(id, callback) {
    return Resource.find({ _id: id }).then(resource => {
      callback(null, resource[0]);
    });
  }
};
