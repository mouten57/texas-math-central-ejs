const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = {
  getAllUsers(callback) {
    return User.find({})
      .then(users => {
        callback(null, users);
      })
      .catch(err => {
        callback(err);
      });
  }
};
