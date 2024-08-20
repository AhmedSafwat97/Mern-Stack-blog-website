const slugify = require("slugify");

const asyncHandler = require("express-async-handler");

const Product = require("../models/ProductModel");

const Category = require("../models/categoryModel");

const { formatDistanceToNow } = require("date-fns");

// @desc    Create Product
// @route   post  /api/v1/Product/
// @access  Private
// asyncHandler or try and catch or then catch
exports.createProduct = asyncHandler(async (req, res) => {
  try {
    const { Name, Description, images, category } = req.body;

    // Find the category by name and get its ObjectId
    const TargetCategory = await Category.findOne({ Name: category });
    if (!TargetCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }

    // Create the Product
    const product = await Product.create({
      Name,
      Description,
      images,
      category: TargetCategory._id, // Use the ObjectId of the category
    });

    // Respond with the newly created product
    res.status(201).json({ data: product });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(400).json({ error: 'Failed to create product', details: error.message });
  }
});

// @desc    Get list of Products
// @route   GET /api/v1/Products
// make pagination GET /api/v1/Products?page=1&limit=4
// to change category id in to category name we use populate
// @access  Public

exports.getProducts = asyncHandler(async (req, res) => {
  const PageNumber = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 6;
  const skip = (PageNumber - 1) * limit;
  const TotalProducts = await Product.countDocuments();
  const TotalPages = Math.ceil(TotalProducts / limit);

  // to filter the Products with category
  let filterProducts = {};
  if (req.params.categoryName) filterProducts = { category: req.params.categoryName };
  // ///////// here
  const Products = await Product.find(filterProducts)
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" })
  res.status(200).json({ results: Products.length, TotalProducts , PageNumber , TotalPages ,data: Products });
});

// @desc    Get specific category by id
// @route   GET /api/v1/Product/:id
// @access  Public

exports.getProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    // Find the product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ msg: "There is no product with this ID" });
    }

    res.status(200).json({ data: product });
  } catch (error) {
    res.status(400).json({ error: error.message , message : "failed to get this product" });
  }
});

// @desc    Update specific category
// @route   PUT /api/v1/Product/:id
// @access  Private

// exports.updateProduct = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   // to create Product from this category (Nested route)
//   if (!req.body.category) req.body.category = req.params.categoryId;

//   if (req.file && req.file.filename) {
//     const filename = req.file.filename;

//     // Construct the image URL
//     const imageUrl = `uploads/${filename}`;

//     // Set the imageCover field to the imageUrl
//     req.body.imageCover = imageUrl;
//   }

//   req.body.slug = slugify(req.body.title);

//   const Product = await Product.findOneAndUpdate(
//     { _id: id },
//     req.body,
//     { new: true } //to return the after updateing
//   );

//   !Product
//     ? res.status(404).json({ msg: "there is no category for this id" })
//     : res.status(200).json({ data: Product });
// });


// // @desc    Delete specific category
// // @route   DELETE /api/v1/categories/:id
// // @access  Private

// exports.deleteProduct = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const Product = await Product.findByIdAndDelete(id);

//   !Product
//     ? res.status(404).json({ msg: "there is no category for this id" })
//     : res.status(205).send();
// });
