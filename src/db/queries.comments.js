const mongoose = require('mongoose');
const Comment = mongoose.model('comments');
const Resource = mongoose.model('resources');

module.exports = {
  async createComment(newComment, callback) {
    const resource = await Resource.findOne({ _id: newComment.resource_id });
    //user data already available in memory while resource is not
    return Comment.create({
      resource_id: newComment.resource_id,
      resource,
      posted: newComment.posted,
      _user: newComment._user,
      body: newComment.body
    })
      .then(comment => {
        callback(null, comment);
      })
      .catch(err => {
        callback(err);
      });
  },

  getResourceComments(resource_id, callback) {
    return Comment.find({ resource_id })
      .then(comments => callback(null, comments))
      .catch(err => {
        callback(err);
      });
  },

  deleteComment(_id, callback) {
    return Comment.deleteOne({ _id })
      .then(comment => {
        callback(null, comment);
      })
      .catch(err => {
        throw err;
      });
  }
};
