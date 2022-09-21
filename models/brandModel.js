// const Joi = require("@hapi/joi");
const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: String,

    image: String,
  },
  { timestamps: true }
);
const setImageUrl = (doc) => {
  if (doc.image) {
    const imageUrl = `${process.env.BASE_URL}/category/${doc.image}`;
    doc.image = imageUrl;
  }
};

brandSchema.post("init", (doc) => {
  setImageUrl(doc);
});
// for post
brandSchema.post("save", (doc) => {
  setImageUrl(doc);
});

const Brand = mongoose.model("Brand", brandSchema);

exports.Brand = Brand;
