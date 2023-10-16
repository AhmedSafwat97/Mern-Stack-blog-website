const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  commentText: String,
  date : String ,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User', // Reference to the User model
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post', // Reference to the Post model
  },
} ,
{ timestamps: true } 
);

module.exports = mongoose.model('Comment', commentSchema);