const express = require("express");

const { createpost, getposts , getpost , updatepost , deletepost } = require("../services/postServices");


const {uploadCategoryImage} = require("../middleware/UploadImageMiddleware")

const router = express.Router({mergeParams : true});

router.route("/").get(getposts).post(uploadCategoryImage , createpost);
router.route('/:id').get(getpost).put(updatepost).delete(deletepost)

module.exports = router;
