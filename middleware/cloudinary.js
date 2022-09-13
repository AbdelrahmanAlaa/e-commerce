const cloudinary = require('cloudinary');
 require('dotenv').config()


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KET,
    api_secret:process.env.API_SECRET
});


exports.uploads = async (file) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (res) => {
        // if (err) return res.status(500).send("upload image error");
        resolve({ url: res.url, id: res.public_id });
      },
      { resource_type: "auto" }
    );
  });
};