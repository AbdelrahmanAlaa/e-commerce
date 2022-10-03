const mongoose = require("mongoose");
const { Product } = require("./productModel");

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required "],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
    },
    rating: {
      type: Number,
      min: [1, "Min rating value is 1.0"],
      max: [5, "Max rating value is 5.0"],
      required: [true, "rating is required "],
    },
  },
  { timestamps: true }
);

reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "userId",
    select: "name profileImage ",
  });
  next();
});

reviewSchema.statics.calcAverageRating = async function (productId) {
  const result = await this.aggregate([
    // stage 1
    {
      $match: { productId },
    },
    {
      $group: {
        _id: "productId",
        avgRating: { $avg: "$rating" },
        ratingQuantity: { $sum: 1 },
      },
    },
  ]);

  if (result.length > 0) {
    await Product.findByIdAndUpdate(productId, {
      ratingAverage: result[0].avgRating,
      ratingQuantity: result[0].ratingQuantity,
    });
  } else {
    await Product.findByIdAndUpdate(productId, {
      ratingAverage: 0,
      ratingQuantity: 0,
    });
  }
};

reviewSchema.post("save", async function () {
  await this.constructor.calcAverageRating(this.productId);
});
reviewSchema.post("remove", async function () {
  await this.constructor.calcAverageRating(this.productId);
});

const Review = new mongoose.model("Review", reviewSchema);

exports.Review = Review;
