const Joi = require("@hapi/joi");
const mongoose = require("mongoose");
require("dotenv").config();

const schema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    subCategory: [
      {
        type: mongoose.Types.ObjectId,
        ref: "subCategory",
      },
    ],
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
    },
    title: { type: String },

    description: { type: String },

    quantity: { type: String },

    sold: { type: Number, default: "0" },

    price: { type: Number },

    priceAfterDiscount: { type: Number },

    colors: [{ type: String }],

    imageCover: { type: String },

    images: [{ type: String }],
    ratingAverage: { type: Number },
    ratingQuantity: { type: Number, default: 0 },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const setUrlImages = (doc) => {
  if (doc.imageCover) {
    const imageUrl = `${process.env.BASE_URL}/products/${doc.imageCover}`;
    doc.imageCover = imageUrl;
  }
  if (doc.images) {
    images = [];
    doc.images.forEach((doc) => {
      const imageUrl = `${process.env.BASE_URL}/products/${doc}`;
      images.push(imageUrl);
    });
    doc.images = images;
  }
};
// for find and update
schema.post("init", (doc) => {
  setUrlImages(doc);
});
//  for post
schema.post("save", (doc) => {
  setUrlImages(doc);
});

//  populate Review schema
schema.virtual("reviews", {
  ref: "Review",
  foreignField: "productId",
  localField: "_id",
});

const Product = mongoose.model("Product", schema);

exports.Product = Product;
