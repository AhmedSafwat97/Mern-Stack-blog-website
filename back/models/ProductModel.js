const mongoose = require('mongoose');
const slugify = require('slugify');

// Create Schema
const ProductSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      minlength: [3, 'Too short product name'],
      maxlength: [100, 'Too long product name'],
      required: [true, 'Product name is required'],
    },
    images: [
      {
        type: String,
      }
    ],
    Description: {
      type: String,
      minlength: [3, 'Too short description'],
      maxlength: [1000, 'Too long description'],
      required: [true, 'Description is required'],
    },
    slug: {
      type: String,
      lowercase: true,
      unique: true, // Ensure slug is unique
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Product must belong to a category'],
    },
    price : {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be greater than or equal to 0'],
    }
  },
  { timestamps: true }
);

// Create a pre-save hook to generate the slug
ProductSchema.pre('save', function (next) {
  if (this.isModified('Name') || this.isNew) {
    this.slug = slugify(this.Name, { lower: true, strict: true });
  }
  next();
});

// Create a static method to get the count of Products in a category
ProductSchema.statics.getProductCountByCategory = async function (categoryId) {
  // Ensure `categoryId` is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    throw new Error('Invalid category ID');
  }

  const count = await this.countDocuments({ category: categoryId });
  return count;
};

// Create model
const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;