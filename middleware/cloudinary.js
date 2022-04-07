const cloudinary = require('cloudinary');



cloudinary.config({
    cloud_name:'car-care3',
    api_key:'921132538581667',
    api_secret:'nTeBdjKJiv8tAQBeePnri_VCGx8'
});

   exports.uploads = (file)=>{
    return new Promise(resolve=>{
      cloudinary.uploader.upload(file,(result)=>{
        resolve({url:result.url , id: result.public_id})
      },{resource_type:"auto"})
    })
   }