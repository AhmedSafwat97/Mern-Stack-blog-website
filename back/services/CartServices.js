const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');

// @desc    Add product to cart
// @route   POST /api/v1/cart/add
// @access  For Users
exports.addToCart = asyncHandler(async (req, res) => {
    // Extract token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
  
      // Extract productId and quantity from headers
      const productId = req.headers['productid'];
      const quantity = parseInt(req.headers['quantity'], 10);
  
      // Validate input
      if (!productId) {
        return res.status(400).json({ error: 'Product ID is required' });
      }
  
      if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ error: 'Quantity must be a positive number' });
      }
  
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Find or create the cart for the user
      let cart = await Cart.findOne({ user: userId }).populate('items.product');
      if (!cart) {
        cart = new Cart({ user: userId, items: [] });
      }
  
      // Find the item in the cart
      let updatedItem;
      const existingItem = cart.items.find(item => item.product.toString() === productId);
  
      if (existingItem) {
        // Update quantity to the exact value provided
        existingItem.quantity = quantity;
        updatedItem = existingItem; // Capture the updated item
      } else {
        // Add new product to the cart with the specified quantity
        updatedItem = { product: productId, quantity };
        cart.items.push(updatedItem);
      }
  
      // Save the cart
      await cart.save();
  
      // Calculate total price and quantity
      const totalPrice = cart.items.reduce((sum, item) => {
        // Assuming that item.product is a populated object with a price field
        return sum + (item.product.price * item.quantity);
      }, 0);
  
      const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
  
      // Respond with the updated cart and item details
      res.status(200).json({
        totalPrice,
        totalQuantity,
        CartItems: cart,
        UpdatedItem: updatedItem,
        message: existingItem ? 'Quantity updated successfully' : 'Product added successfully'
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });


// @desc    Add product to cart
// @route   GET /api/v1/cart/add
// @access  For Users
exports.getCartItems = asyncHandler(async (req, res) => {

      // Extract token from the Authorization header
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ msg: 'Not authorized, token failed' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.userId;

  if (!userId) {
    return res.status(401).json({ msg: 'Not authorized, token failed' });
    
  }
    // Find the cart for the user
    const cart = await Cart.findOne({ user: userId }).populate('items.product');
  
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found for this user' });
    }
  
    const totalPrice = cart.items.reduce((sum, item) => {
        const product = item.product;
        return sum + (product.price * item.quantity);
      }, 0);
      const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);



    res.status(200).json({ totalPrice : totalPrice, totalProducts : totalQuantity , data: cart });
  });


// @desc    Add product to cart
// @route   REMOVE /api/v1/cart/add
// @access  For Users
exports.removeFromCart = asyncHandler(async (req, res) => {
    // Extract token from the Authorization header
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ msg: 'Not authorized, token failed' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
  
      const productId = req.headers['productid'];
  
      // Validate input
      if (!userId || !productId) {
        return res.status(400).json({ error: 'User ID and Product ID are required' });
      }
  
      // Find the cart for the user
      const cart = await Cart.findOne({ user: userId }).populate('items.product');
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
  
      // Remove the product from the cart
      const initialItemCount = cart.items.length;
      cart.items = cart.items.filter(item => {
        console.log(`Checking item: ${item.product._id.toString()} against ${productId}`);
        return item.product._id.toString() !== productId;
      });
  
      // Check if the product was found and removed
      if (cart.items.length === initialItemCount) {
        return res.status(404).json({ error: 'Product not found in cart' });
      }
  
      // Save the updated cart
      await cart.save();
  

      const totalPrice = cart.items.reduce((sum, item) => {
        const product = item.product;
        return sum + (product.price * item.quantity);
      }, 0);
      const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);



      res.status(200).json({ totalPrice : totalPrice, totalProducts : totalQuantity ,data: cart, message: 'Product removed successfully' });
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(400).json({ error: error.message });
    }
  });


