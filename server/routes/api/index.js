const router = require("express").Router();
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const userPostsRoutes = require("./postRoutes");
const cloudinaryRoutes = require("./cloudinaryRoutes")

router.use("/auth", authRoutes)
router.use("/user", userRoutes);
router.use("/posts", userPostsRoutes);
router.use("/cloud", cloudinaryRoutes)


module.exports = router;
