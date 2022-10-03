const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  setProductIdAndUserIdToBody,
  createFilterObj,
  createReview,
  deleteReview,
  getReviewById,
  getReview,
  updateReview,
} = require("../controller/reviewController");

const {
  createReviewValidator,
  deleteReviewValidator,
  //   getReviewValidator,
  updateReviewValidator,
} = require("../utils/validation/validationReview");

const { protect, allowedTo } = require("../controller/authUsersController");

router
  .route("/")
  .get(createFilterObj, getReview)
  .post(
    protect,
    allowedTo("user"),
    setProductIdAndUserIdToBody,
    createReviewValidator,
    createReview
  );
router
  .route("/:id")
  .get(getReviewById)
  .delete(
    protect,
    allowedTo("user", "admin", "manger"),
    deleteReviewValidator,
    deleteReview
  )
  .patch(
    protect,
    updateReviewValidator,
    allowedTo("user"),

    updateReview
  );
module.exports = router;
