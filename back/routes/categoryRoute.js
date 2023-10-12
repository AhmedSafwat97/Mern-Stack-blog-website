const express = require('express');

const {
  getCategories,
  getcategory ,
  createCategory,
  updateCategory ,
  deleteCategory
} = require('../services/categoryServices');

const router = express.Router();

const postsRoutes = require("./postRoute.js")

router.route('/').get(getCategories).post(createCategory);
router.route('/:id').get(getcategory).put(updateCategory).delete(deleteCategory)

// to get nested routes
router.use('/:categoryId/posts' , postsRoutes)


module.exports = router;
