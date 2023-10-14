const mongoose = require('mongoose');
// 1- Create Schema
const PostSchema = new mongoose.Schema(
  {
    title : {
      type: String,
      minlength: [3, 'Too short Title name'],
      maxlength: [100, 'Too long Title name'],
      // required: [true, 'title required'],

    },
    imageCover : {
        type: String,
        // required: [true, 'image required'],
    } ,
    content : {
        type: String,
        // required: [true, 'content required'],
        minlength: [3, 'Too short Title name'],
        // maxlength: [1000, 'Too long Title name'],
        // required: [true, 'content required'],

    } ,
    // A and B => shoping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    category : {
        type : mongoose.Schema.ObjectId ,
        ref : "Category",
        // required : [true , "Post must belong to category"]
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