const mongoose = require('mongoose');
const { Schema } = mongoose;
const resourceSchema = require('./Resource');
const userSchema = require('./User');

const uploadSchema = new Schema({
  name: String,
  unit: String,
  type: String,
  link: String,
  description: String,
  _user: [userSchema],
  created: String,
  file: Object,
  file_data: String,
  comments: [resourceSchema],
  s3Link: String
});

mongoose.model('resources', uploadSchema);
