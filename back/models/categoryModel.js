const mongoose = require('mongoose');

// Define the schema for Category
const categorySchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true, // Ensure uniqueness if needed
    },
    Description: String,
    image: String,
  },
  { timestamps: true } // Automatically add createdAt and updatedAt timestamps
);

// Create the model for Category
const CategoryModel = mongoose.model('Category', categorySchema);

module.exports = CategoryModel;