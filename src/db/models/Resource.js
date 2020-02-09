const mongoose = require('mongoose');
const { Schema } = mongoose;

const resourceSchema = new Schema({
  name: String,
  unit: String,
  fullUnit: String,
  type: String,
  link: String,
  description: String,
  _user: { type: Schema.Types.ObjectId, ref: 'users' },
  created: String,
  file: Object,
  s3Object: Object,
  s3Link: String
});

mongoose.model('resources', resourceSchema);
