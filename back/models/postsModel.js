const mongoose = require('mongoose');
// 1- Create Schema
const PostSchema = new mongoose.Schema(
  {
    title : {
      type: String,
      minlength: [3, 'Too short Title name'],
      maxlength: [32, 'Too long Title name'],
    },
    imageCover : {
        type: String,
        // required: [true, 'content required'],
    } ,
    image: [String], 
    content : {
        type: String,
        required: [true, 'content required'],
        minlength: [3, 'Too short Title name'],
        maxlength: [250, 'Too long Title name'],
    } ,
    // A and B => shoping.com/a-and-b
    slug: {
      type: String,
      lowercase: true,
    },
    category : {
        type : mongoose.Schema.ObjectId ,
        ref : "Category",
        required : [true , "Post must belong to category"]
    }

  },
  { timestamps: true } // to get the time the the category created in 
);

// 2- Create model
const CategoryModel = mongoose.model('Post', PostSchema);

module.exports = CategoryModel;