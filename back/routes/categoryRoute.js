const express = require('express');

const {
  getCategories,
  getCategory ,
  createCategory,
  updateCategory ,
  deleteCategory
} = require('../services/categoryServices');

const router = express.Router();

const ProductRoutes = require("./ProductRoute.js")

router.route('/').get(getCategories).post(createCategory);
router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory)

// to get nested routes
router.use('/:categoryId/Products' , ProductRoutes)


module.exports = router;
