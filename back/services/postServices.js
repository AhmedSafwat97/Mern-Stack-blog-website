const slugify = require("slugify");

const asyncHandler = require("express-async-handler");

const Post = require("../models/postsModel");

const Category = require("../models/categoryModel")

// @desc    Create post
// @route   POST  /api/v1/categories/
// @access  Private
// asyncHandler or try and catch or then catch
exports.createpost = asyncHandler(async (req, res) => {

  // to create post from this category (Nested route)
  if (!req.body.category) req.body.category = req.params.categoryId;

  // check if the category is valid or not
  // const category = Category.findById(req.body.category)

  req.body.slug = slugify(req.body.title);

  const post = await Post.create(req.body);
  res.status(201).json({ data: post });
});

// @desc    Get list of categories
// @route   GET /api/v1/categories
// make pagination GET /api/v1/categories?page=1&limit=4
// to change category id in to category name we use populate
// @access  Public

exports.getposts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 6;
  const skip = (page - 1) * limit;

  // to filter the posts with category
  let filterposts = {};
  if (req.params.categoryId) filterposts = { category: req.params.categoryId };

  const posts = await Post.find(filterposts)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" });
  res.status(200).json({ results: posts.length, page, data: posts });
});

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public

exports.getpost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  !post
    ? res.status(404).json({ msg: "there is no category for this id" })
    : res.status(200).json({ data: post });
});

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private

exports.updatepost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  req.body.slug = slugify(req.body.title);

  const post = await Post.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true } //to return the after updateing
  );

  !post
    ? res.status(404).json({ msg: "there is no category for this id" })
    : res.status(200).json({ data: post });
});

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private

exports.deletepost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);

  !post
    ? res.status(404).json({ msg: "there is no category for this id" })
    : res.status(205).send();
});
