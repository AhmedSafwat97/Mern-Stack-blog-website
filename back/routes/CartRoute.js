const express = require('express');
const router = express.Router();
const { addToCart , getCartItems ,removeFromCart } = require('../services/CartServices'); // Update the path as necessary
// Define routes

router.route("/").get(getCartItems).post(addToCart)
.delete(removeFromCart);

router.route("DecreaseQuantity").delete(removeFromCart);

module.exports = router;