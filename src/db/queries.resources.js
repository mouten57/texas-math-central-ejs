const mongoose = require('mongoose');
const Resource = mongoose.model('resources');

module.exports = {
  getUnitResources(unit, callback) {
    return Resource.find({ unit: unit }, { file_data: 0 }).then(resources => {
      callback(null, resources);
    });
  },
  getResource(id, callback) {
    return Resource.findOne({ _id: id })
      .populate('_user')
      .populate('comments')
      .then(resource => {
        callback(null, resource);
      });
  },
  addResource(newResource, callback) {
    new Resource(newResource)
      .save()
      .then(resource => {
        callback(null, resource);
      })
      .catch(err => callback(err));
  }
};
