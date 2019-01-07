const mongoose = require('mongoose');
const Resource = mongoose.model('resources');
const Comment = mongoose.model('comments');

module.exports = {
  getUnitResources(unit, callback) {
    return Resource.find({ unit: unit }, { file_data: 0 }).then(resources => {
      callback(null, resources);
    });
  },
  async getResource(_id, callback) {
    let result = {};
    const resource = await Resource.findOne({ _id });
    resource.populate('_user');
    result['resource'] = resource;
    const comments = await Comment.find({ resource_id: _id }).populate('_user');

    result['comments'] = comments;
    callback(null, result);
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
