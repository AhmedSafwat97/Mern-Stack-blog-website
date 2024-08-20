const slugify = require("slugify");

const asyncHandler = require("express-async-handler");

const Category = require("../models/categoryModel");

const Product = require('../models/ProductModel');


// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
// asyncHandler or try and catch or then catch
exports.createCategory = asyncHandler(async (req, res) => {
  try {
    const { Name, Description, image } = req.body;

    // Check if the Name is provided
    if (!Name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    // Create the Category
    const category = await Category.create({
      Name,
      Description,
      image,
    });

    res.status(201).json({ data: category, message: 'Category created successfully' });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Category name must be unique', details: error.message });
    }

    console.error('Error creating category:', error);
    res.status(400).json({ error: 'Failed to create category', details: error.message });
  }
});

// @desc    Get list of categories
// @route   GET /api/v1/categories
// make pagination GET /api/v1/categories?page=1&limit=4
// @access  Public

exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 6;
  const skip = (page - 1) * limit;
  const categories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});


// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public

exports.getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the category by ID
  const category = await Category.findById(id);

  // If the category does not exist, return a 404 response
  if (!category) {
    return res.status(404).json({ msg: "There is no category with this ID" });
  }

  // Find all products that belong to this category
  const products = await Product.find({ category: category.Name });

  // Send the category data along with the products
  res.status(200).json({
    data: {
      CategoryData : category,
      products
    }
  });
});

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private

exports.updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true } //to return the after updateing
  );

  !category
    ? res.status(404).json({ msg: "there is no category for this id" })
    : res.status(200).json({ data: category });

});


// // @desc    Delete specific category
// // @route   DELETE /api/v1/categories/:id
// // @access  Private

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  !category
  ? res.status(404).json({ msg: "there is no category for this id" })
  : res.status(204).send();

});