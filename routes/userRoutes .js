const express = require("express");
const router = express.Router();
const {
  createUser,
  deleteUser,
  getUser,
  resizeImage,
  updateUser,
  updateUserPassword,
  uploadImage,
  getUserById,
} = require("../controller/userController");

const {
  createUserValidator,
  changeUserPasswordValidator,
  getUserValidator,
  updateUserValidator,
} = require("../utils/validation/validationUser");

const { protect, allowedTo } = require("../controller/authUsersController");

router
  .route("/")
  .get(protect, allowedTo("admin", "manger"), getUser)
  .post(
    protect,
    allowedTo("admin"),
    uploadImage,
    resizeImage,
    createUserValidator,
    createUser
  );
router
  .route("/:id")
  .get(protect, allowedTo("admin", "manger"), getUserValidator, getUserById)
  .delete(protect, allowedTo("admin"), deleteUser)
  .patch(
    protect,
    allowedTo("admin"),
    uploadImage,
    resizeImage,
    updateUserValidator,
    updateUser
  );

router
  .route("/changePassword/:id")
  .patch(changeUserPasswordValidator, updateUserPassword);

// router.use("/:UserId/subUser", UserRoutes);
module.exports = router;
