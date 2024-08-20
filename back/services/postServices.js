const slugify = require("slugify");

const asyncHandler = require("express-async-handler");

const Post = require("../models/postsModel");

const Category = require("../models/categoryModel");

const { formatDistanceToNow } = require("date-fns");

// @desc    Create post
// @route   POST  /api/v1/post/
// @access  Private
// asyncHandler or try and catch or then catch
exports.createpost = asyncHandler(async (req, res) => {
  // to create post from this category (Nested route)
  if (!req.body.category) req.body.category = req.params.categoryId;

  if (req.file && req.file.filename) {
    const filename = req.file.filename;

    // Construct the image URL
    const imageUrl = `uploads/${filename}`;

    // Set the imageCover field to the imageUrl
    req.body.imageCover = imageUrl;
  }

  req.body.slug = slugify(req.body.title);

  const post = await Post.create(req.body);
  res.status(201).json({ data: post });
});

// @desc    Get list of posts
// @route   GET /api/v1/posts
// make pagination GET /api/v1/posts?page=1&limit=4
// to change category id in to category name we use populate
// @access  Public

exports.getposts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 6;
  const skip = (page - 1) * limit;

  // to filter the posts with category
  let filterposts = {};
  if (req.params.categoryId) filterposts = { category: req.params.categoryId };
  // ///////// here
  if (req.params.authorId) filterposts = { author: req.params.authorId };

  const posts = await Post.find(filterposts)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" })
    .populate({ path: "author", select: "-password" });
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
// @route   PUT /api/v1/post/:id
// @access  Private

exports.updatepost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // to create post from this category (Nested route)
  if (!req.body.category) req.body.category = req.params.categoryId;

  if (req.file && req.file.filename) {
    const filename = req.file.filename;

    // Construct the image URL
    const imageUrl = `uploads/${filename}`;

    // Set the imageCover field to the imageUrl
    req.body.imageCover = imageUrl;
  }

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


// // @desc    Update specific user
// // @route   PUT /api/v1/auth/:id
// // @access  Private

exports.updatepostimage = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const filename = req.file.filename;

  // Construct the image URL

  const imageUrl = `uploads/${filename}`;


  // Create an object to specify the update, in this case, the `profileimage` field
  const update = { imageCover : imageUrl };

  const post = await Post.findOneAndUpdate({ _id: id }, update, {
    new: true, 
  });

  if (!post) {
    res.status(404).json({ msg: "There is no post for this id" });
  } else {
    res.status(200).json({ data: post });
  }
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
