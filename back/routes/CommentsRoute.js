const express = require("express");
const { getComment, createcomments, deleteComment } = require("../services/commentServices");


const router = express.Router({mergeParams : true});

router.route("/").get(getComment).post(createcomments);

router.route("/:commentid").delete(deleteComment)


module.exports = router;
