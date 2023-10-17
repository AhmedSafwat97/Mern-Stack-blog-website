const mongoose = require('mongoose');
// 1- Create Schema
const PostSchema = new mongoose.Schema(
  {
    title : {
      type: String,
      minlength: [3, 'Too short Title name'],
      maxlength: [100, 'Too long Title name'],

    },
    imageCover : {
        type: String,
    } ,
    content : {
        type: String,
        minlength: [3, 'Too short Title name'],
    } ,
    // A and B => shoping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    category : {
        type : mongoose.Schema.ObjectId ,
        ref : "Category",
    } ,
    author: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    postedAt : {
      type : String,
    } , 
    posttime : {
      type : String,
    }
  },
  { timestamps: true } 
);


// Create a static method to get the count of posts in a category
PostSchema.statics.getPostCountByCategory = async function (categoryId) {
  const count = await this.countDocuments({ category: categoryId });
  return count;
};

// 2- Create model
const postModel = mongoose.model('Post', PostSchema);

module.exports = postModel;