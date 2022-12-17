const router = require("express").Router();
const {
  getPosts,
  createPost,
  editPost,
  deletePost,
  getOnePostById,
  getAllUserPosts
} = require("../../controllers/postControllers");

router.get("/", getPosts);
router.get("/:post_id", getOnePostById);
router.get("/user/:user_id", getAllUserPosts);
router.post("/create", createPost);
router.patch("/edit/:post_id/:user_id", editPost);
router.delete("/delete/:post_id/:user_id", deletePost);

module.exports = router;
