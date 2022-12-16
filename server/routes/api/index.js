const router = require("express").Router();
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const userPostsRoutes = require("./postRoutes");

router.use("/auth", authRoutes)
router.use("/user", userRoutes);
router.use("/posts", userPostsRoutes)


module.exports = router;
