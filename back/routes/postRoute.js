const express = require("express");

const { createpost, getposts , getpost , updatepost , deletepost } = require("../services/postServices");

const router = express.Router({mergeParams : true});

router.route("/").post(createpost).get(getposts);
router.route('/:id').get(getpost).put(updatepost).delete(deletepost)

module.exports = router;
