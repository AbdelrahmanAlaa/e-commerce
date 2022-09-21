const cloudinary = require('cloudinary');
 require('dotenv').config()


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.API_KET,
    api_secret:process.env.API_SECRET
});


exports.uploads =  (file) => {
  return (resolve => {
    cloudinary.v2.uploader.upload(file,
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });
    // cloudinary.uploader.upload(
    //   file,
    //   (res) => {
    //     // if (err) return res.status(500).send("upload image error");
    //     resolve({ url: res.url, id: res.public_id });
    //   },
    //   { resource_type: "auto" }
    //   );
    //   console.log(resolve)
    });
};