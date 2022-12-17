const { cloudinary } = require("../utils/cloudinary");

const getAllImages = async (req, res) => {
  try {
    const { resources } = await cloudinary.search
      .expression("folder: social_react")
      .sort_by("public_id", "desc")
      .max_results(30)
      .execute();

    const publicIds = resources.map(file => file.public_id);

    res.send(publicIds);
  } catch (error) {
    res.json({
      error: error.message
    });
  }
};

const uploadImage = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: process.env.UPLOAD_PRESET
    });
    res.json(uploadResponse.secure_url);
  } catch (error) {
    res.json({
      error: error.message
    });
  }
};

module.exports = {
  getAllImages,
  uploadImage
};