const express = require("express");

const { createpost, getposts , getpost , updatepost , deletepost } = require("../services/postServices");

const CommentsRoute = require("./CommentsRoute")


const {uploadCategoryImage} = require("../middleware/UploadImageMiddleware")

const router = express.Router({mergeParams : true});

router.route("/").get(getposts).post(uploadCategoryImage , createpost);
router.route('/:id').get(getpost).put(updatepost).delete(deletepost)

// to get nested routes
router.use('/:postId/comments' , CommentsRoute)

// router.get("/post/:id", getAuthorById);

module.exports = router;
