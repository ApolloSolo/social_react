const router = require("express").Router();
const {getPosts, createPost, editPost, deletePost} = require("../../controllers/postControllers")

router.get("/", getPosts);
router.post("/create", createPost);
router.patch("/edit/:post_id", editPost);
router.delete("/delete/:post_id/:user_id", deletePost)

module.exports = router;

