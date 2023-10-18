const express = require("express");

const { createpost, getposts , getpost , updatepost , deletepost, updatepostimage } = require("../services/postServices");

const CommentsRoute = require("./CommentsRoute")


const {uploadCategoryImage} = require("../middleware/UploadImageMiddleware");

const router = express.Router({mergeParams : true});

router.route("/").get(getposts).post(uploadCategoryImage , createpost);
router.route('/:id').get(getpost).put(updatepost).delete(deletepost)

router.route("/imagecover/:id").post( uploadCategoryImage , updatepostimage );


// to get nested routes
router.use('/:postId/comments' , CommentsRoute)

// router.get("/post/:id", getAuthorById);

module.exports = router;
