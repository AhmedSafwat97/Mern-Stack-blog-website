const Comments = require("../models/commentsModel");

const asyncHandler = require("express-async-handler");

// @desc    Create comments
// @route   POST  /api/v1/post/
// @access  Private

exports.createcomments = asyncHandler(async (req , res) => {

  if (!req.body.user) req.body.user = req.params.postId;

  try {
    const comment = await Comments.create(req.body);

    res.status(201).json({ data: comment });
  } catch (error) {
    res.status(500).json({ error: "Comment creation failed" });
    
  }
})

// @desc    Get list of comments
// @route   GET /api/v1/comments
// to change user id in to user info we use populate
// @access  Public

exports.getComment = asyncHandler(async (req, res) => {
  // To filter the comments with a specific post ID

  let filtercomments = {};

  if (req.params.postId) {
    filtercomments = { post: req.params.postId };
  }

  const comments = await Comments.find(filtercomments)
    .populate({ path: 'post', select: 'title -_id' })
    .populate({ path: 'user' });

  res.status(200).json({ results: comments.length, data: comments });
});


// @desc    Delete a comment by ID
// @route   DELETE /api/v1/comments/:commentId
// @access  Private (you might want to restrict this to authenticated users)
exports.deleteComment = asyncHandler(async (req, res) => {
  const commentId = req.params.commentid;

  // Use the Comments model to find and delete the comment
  const comment = await Comments.findById(commentId);

  if (!comment) {
    return res.status(404).json({ error: 'Comment not found' });
  }

  // Optionally, check if the user has permission to delete the comment (e.g., if the user is the comment author)

  await Comments.findByIdAndDelete(commentId);

  res.status(200).json({ message: 'Comment deleted successfully' });
});






