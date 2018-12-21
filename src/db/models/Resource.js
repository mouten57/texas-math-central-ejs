const mongoose = require('mongoose');
const { Schema } = mongoose;

const resourceSchema = new Schema({
  name: String,
  unit: String,
  type: String,
  link: String,
  description: String,
  _user: { type: Schema.Types.ObjectId, ref: 'users' },
  created: String,
  file: Object,
  comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
  s3Link: String
});

mongoose.model('resources', resourceSchema);

/////THE ID OF THE COMMENT NEEDS TO GET PUSHED TO THE 'COMMENTS' SECTION
///OF THE RESOURCE-COMMENTS SECTION

//ON CREATE COMMENT, ALSO UPDATE RESOURCE COMMENTS?
