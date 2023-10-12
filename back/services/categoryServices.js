const slugify = require("slugify");

const asyncHandler = require("express-async-handler");

const Category = require("../models/categoryModel");

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
// asyncHandler or try and catch or then catch
exports.createCategory = asyncHandler(async (req, res) => {

  req.body.slug = slugify(req.body.name);

  const category = await Category.create(req.body);
  res.status(201).json({ data: category });
  
});

// @desc    Get list of categories
// @route   GET /api/v1/categories
// make pagination GET /api/v1/categories?page=1&limit=4
// @access  Public

exports.getCategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 6;
  const skip = (page - 1) * limit;
  const cateories = await Category.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: cateories.length, page, data: cateories });
});


// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public

exports.getcategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  !category
    ? res.status(404).json({ msg: "there is no category for this id" })
    : res.status(200).json({ data: category });
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


// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private

exports.deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);

  !category
  ? res.status(404).json({ msg: "there is no category for this id" })
  : res.status(204).send();

});