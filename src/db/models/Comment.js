const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = require('./User');

const commentSchema = new Schema({
  posted: String,
  resource_id: {
    type: Schema.Types.ObjectId,
    ref: 'resources'
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  body: String
});
//create a new collection called comments
//two arguments means we are loading something into mongoose
//one argument means we are fetching something
mongoose.model('comments', commentSchema);
