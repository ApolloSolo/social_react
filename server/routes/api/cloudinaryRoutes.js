const router = require("express").Router();
const {getAllImages, uploadImage} = require("../../controllers/cloudinaryControllers");

router.get("/images", getAllImages);
router.post("/upload", uploadImage)

module.exports = router;
