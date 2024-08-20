const express = require("express");

const { createProduct, getProducts , getProduct , updateProduct , deleteProduct } = require("../services/ProductServices");

const router = express.Router({mergeParams : true});
router.route("/").get(getProducts).post(createProduct);
router.route('/:id').get(getProduct)


// .put(updateProduct).delete(deleteProduct)

// router.get("/Product/:id", getAuthorById);

module.exports = router; 


