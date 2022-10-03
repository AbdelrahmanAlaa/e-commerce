const express = require("express");
const router = express.Router();
const {
  updateLoggedUserPassword,
  getLoggedUserData,
  updateLoggedUser,
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

router.get("/getMe", protect, getLoggedUserData, getUserById);
router.patch("/updateMe", protect, updateUserValidator, updateLoggedUser);
router.patch(
  "/changeMyPassword",
  protect,
  changeUserPasswordValidator,
  updateLoggedUserPassword
);

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

router.patch(
  "/changePassword/:id",
  protect,
  changeUserPasswordValidator,
  updateUserPassword
);

module.exports = router;
